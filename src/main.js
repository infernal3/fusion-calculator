const el = (e) => document.getElementById(e);

// ShardA and ShardB should be Shard ID, not the shard name or the processed shard object.
var calculateFusionResult = function (ShardTable, ShardA, ShardB) {
    // Chameleon-fusion overrides all other fusion type. Check for the presence of a Chameleon:
    if (ShardA == "L4") {
        return calculateChameleonFusionResult(ShardTable, ShardB);
    }
    if (ShardB == "L4") {
        return calculateChameleonFusionResult(ShardTable, ShardA);
    }

    // candidateA and candidateB are the ID Fusion results for Shard A and Shard B:
    var candidateA = calculateIDFusionResult(ShardTable, ShardA);
    var candidateB = calculateIDFusionResult(ShardTable, ShardB);

    // Each Special Fusion has its own combination, and they can check for rarity, family, category, etc:
    var specialCandidates = calculateAllSpecialFusions(ShardTable, ShardA, ShardB);

    /*if (specialCandidates.length >= 1) {
        candidateB = "empty slot";
    }*/

    // Merge Special Fusion and ID Fusion candidates into one array. Purge duplicates and invalid results:
    var candidates = Array.from(new Set(specialCandidates.concat(candidateA, candidateB)))
        .filter((item) => {
            return item != "empty slot";
        })
        .filter((item) => {
            return item.shardID != ShardA;
        })
        .filter((item) => {
            return item.shardID != ShardB;
        })
        .sort((a, b) => {
            if (a.shardID.slice(0, 1) != b.shardID.slice(0, 1)) {
                return getInfoForShardLetter(b.shardID.slice(0, 1)).index - getInfoForShardLetter(a.shardID.slice(0, 1)).index;
            }
            return parseInt(a.shardID.slice(1)) - parseInt(b.shardID.slice(1));
        });

    // If there are more than 3 candidates remaining after purging, omit lower priority candidates:
    /*while (candidates.length > 3) {
        candidates.pop();
    }*/
    return candidates;
};

var calculateInverseResult = function (ShardTable, Shard) {
    var candidates = [];
    // Add the Special Fusion recipe, if it exists:
    var specialCandidate = calculateInverseSpecialFusions(ShardTable, Shard);
    if (specialCandidate != "no recipe" && "shape" in specialCandidate) {
        if ("length" in specialCandidate.shape) {
            candidates = candidates.concat(specialCandidate.shape);
        } else {
            candidates.push(specialCandidate.shape);
        }
    }
    // Add the ID Fusion that can create this shard:
    var idCandidate = calculateInverseIDFusionResult(ShardTable, Shard);
    if (checkIfShardIDExists(ShardTable, idCandidate)) {
        candidates.push({ A: { shardID: idCandidate }, B: { shardID: "shape", shape: "Any Shard" }, amount: 1 });
    }
    // Add any possible Chameleon Fusions that can create this shard:
    var candidate1 = Shard.slice(0, 1) + (parseInt(Shard.slice(1)) - 1);
    var candidate2 = Shard.slice(0, 1) + (parseInt(Shard.slice(1)) - 2);
    var candidate3 = Shard.slice(0, 1) + (parseInt(Shard.slice(1)) - 3);
    if (checkIfShardIDExists(ShardTable, candidate1)) {
        candidates.push({ A: { shardID: candidate1 }, B: { shardID: "L4" }, amount: 1 });
    }
    if (checkIfShardIDExists(ShardTable, candidate2)) {
        candidates.push({ A: { shardID: candidate2 }, B: { shardID: "L4" }, amount: 1 });
    }
    if (checkIfShardIDExists(ShardTable, candidate3)) {
        candidates.push({ A: { shardID: candidate3 }, B: { shardID: "L4" }, amount: 1 });
    }
    // Purge duplicates
    return Array.from(new Set(candidates));
};

var getShardIDFromName = function (ShardTable, ShardName) {
    var result = "C0";
    ShardTable.sorted.forEach((item) => {
        if (!item || !("shardName" in item)) {
            return;
        }
        if (item.shardName.toLowerCase() == ShardName.toLowerCase()) {
            result = item.shardID;
        }
    });
    if (result == "C0") {
        // Could not find a shard ID. Return a valid-seeming (but junk) shard ID to avoid things breaking.
        console.log("Could not find a shard ID.");
    }
    return result;
};

var calculateInverseSpecialFusions = function (ShardTable, Shard) {
    var result = "no recipe";
    specialFusionRecipes.forEach((recipe) => {
        if (recipe.id == Shard) {
            result = recipe;
        }
    });
    return result;
};

var calculateAllSpecialFusions = function (ShardTable, ShardA, ShardB) {
    // Fetch rarity, family, category, name for both of the shards:
    var ShardObjectA = ShardTable[getInfoForShardLetter(ShardA.slice(0, 1)).cuteName][parseInt(ShardA.slice(1))];
    var ShardObjectB = ShardTable[getInfoForShardLetter(ShardB.slice(0, 1)).cuteName][parseInt(ShardB.slice(1))];
    var array = [];

    // Iterate through all of the special fusion recipes and check if any apply
    specialFusionRecipes.forEach((recipe) => {
        if (recipe.predicate(ShardObjectA, ShardObjectB)) {
            array.push(recipe.id);
            return;
        }
        if (recipe.predicate(ShardObjectB, ShardObjectA)) {
            array.push(recipe.id);
            return;
        }
    });
    // Sort the array by Shard ID (Highest to lowest).
    return array.toReversed().map((item) => {
        return { shardID: item, amount: 2 };
    });
};

var getInfoForShardLetter = function (ShardLetter) {
    switch (ShardLetter) {
        case "C":
            return { cssClass: "mcf", nextTier: "U", cuteName: "common", index: 1 };
        case "U":
            return { cssClass: "mca", nextTier: "R", cuteName: "uncommon", index: 2 };
        case "R":
            return { cssClass: "mc9", nextTier: "E", cuteName: "rare", index: 3 };
        case "E":
            return { cssClass: "mc5", nextTier: "L", cuteName: "epic", index: 4 };
        case "L":
            return { cssClass: "mc6", nextTier: "Z", cuteName: "legendary", index: 5 };
        default:
            return { cssClass: "mc4", nextTier: "Z", cuteName: "unsorted", index: -1 };
    }
};

var getRarityIndex = function (ShardLetter) {
    return getInfoForShardLetter(ShardLetter).index;
};

var calculateIDFusionResult = function (ShardTable, Shard) {
    var ShardLetter = Shard.slice(0, 1);
    var ShardNumber = parseInt(Shard.slice(1));
    var ShardTableOfRarity = ShardTable[getInfoForShardLetter(ShardLetter).cuteName];
    var ShardCategory = ShardTableOfRarity[ShardNumber].shardCategory;
    var index = ShardNumber;
    for (var index = ShardNumber + 1; index < 100; index++) {
        if (ShardCategory == ShardTableOfRarity[index]?.shardCategory) {
            return { shardID: ShardLetter + index, amount: 1 };
        }
    }
    return "empty slot";
};

var calculateInverseIDFusionResult = function (ShardTable, Shard) {
    var ShardLetter = Shard.slice(0, 1);
    var ShardNumber = parseInt(Shard.slice(1));
    var ShardTableOfRarity = ShardTable[getInfoForShardLetter(ShardLetter).cuteName];
    var ShardCategory = ShardTableOfRarity[ShardNumber].shardCategory;
    var index = ShardNumber;
    for (var index = ShardNumber - 1; index > 0; index--) {
        if (ShardCategory == ShardTableOfRarity[index]?.shardCategory) {
            return ShardLetter + index;
        }
    }
    return "empty slot";
};

var calculateChameleonFusionResult = function (ShardTable, NonChameleonShard) {
    var ShardLetter = NonChameleonShard.slice(0, 1);
    var ShardNumber = parseInt(NonChameleonShard.slice(1));
    var candidate1 = ShardLetter + (ShardNumber + 1);
    var candidate2 = ShardLetter + (ShardNumber + 2);
    var candidate3 = ShardLetter + (ShardNumber + 3);
    var missingCandidates = 0;
    var validate = function (candidate) {
        if (checkIfShardIDExists(ShardTable, candidate)) {
            return candidate;
        }
        return getInfoForShardLetter(ShardLetter).nextTier + ++missingCandidates;
    };
    return [
        {
            shardID: validate(candidate1),
            amount: 1,
        },
        {
            shardID: validate(candidate2),
            amount: 1,
        },
        {
            shardID: validate(candidate3),
            amount: 1,
        },
    ]
        .filter((item) => {
            return !item.shardID.includes("Z");
        })
        .filter((item) => {
            return item.shardID != "L4"; // Chameleon Fusion will never output a Chameleon
        })
        .filter((item) => {
            return item.shardID != NonChameleonShard; // Chameleon Fusion will never output the non-chameleon shard used
        });
};

var checkIfShardIDExists = function (ShardTable, ShardID) {
    if (!ShardID || ShardID == "empty slot" || ShardID == "C0") {
        return false;
    }
    // might optimize this if necessary. but my array only has a 400-ish elements. hopefully this doesn't bite me in the back.
    var flag = false;
    ShardTable.sorted.forEach((item) => {
        if (!item || !("shardID" in item)) return;
        if (item.shardID == ShardID) flag = true;
    });
    return flag;
};

var getShardNamesWithPrefix = function (ShardTable, Prefix) {
    if (!Prefix) {
        return ShardTable.sorted;
    }
    Prefix = Prefix.toLowerCase();
    var array = [];
    for (var index = 0; index < ShardTable.sorted.length; index++) {
        var item = ShardTable.sorted[index];
        if (!item || !("shardName" in item)) {
            continue;
        }
        if (item.shardName.toLowerCase().startsWith(Prefix)) {
            array.push(item);
            continue;
        }
        if ([Prefix, item.shardName.toLowerCase()].sort()[1] != Prefix) {
            return array;
        }
    }
    return array;
};

var switchTabs = function (tab) {
    flushCalculatorResults();
    var totalTabs = 3;
    for (i = 1; i <= totalTabs; i++) {
        el("tab" + i).style = "display: none;";
        el("tab-click-" + i).style = "";
    }
    el("tab" + tab).style = "";
    el("tab-click-" + tab).style = "background-color: #bbb;";
    console.log("Switched tab to tab " + tab);
};

var loadOneShardConstant = async function (resource) {
    var response = await fetch(new Request(resource));
    var json = await response.json();
    return json;
};

var loadManyShardConstants = async function () {
    var common = await loadOneShardConstant("src/lib/common.json");
    var uncommon = await loadOneShardConstant("src/lib/uncommon.json");
    var rare = await loadOneShardConstant("src/lib/rare.json");
    var epic = await loadOneShardConstant("src/lib/epic.json");
    var legendary = await loadOneShardConstant("src/lib/legendary.json");
    return {
        common: common,
        uncommon: uncommon,
        rare: rare,
        epic: epic,
        legendary: legendary,
        unsorted: [].concat(common, uncommon, rare, epic, legendary),
    };
};

var generateDirectHTMLResults = function (ShardTable, results) {
    if (!results || !(typeof results === "object") || !("length" in results)) {
        return `<span style="color: #f00">An unexpected error occurred: "results" argument in generateHTMLResults is not an array</span>`;
    }
    var html = "";
    results.forEach((element) => {
        var tempHTML = `<div class="fusion-result-box">`;
        var object = ShardTable[getInfoForShardLetter(element.shardID.slice(0, 1)).cuteName][element.shardID.slice(1)];
        var cssClass = getInfoForShardLetter(element.shardID.slice(0, 1)).cssClass;
        tempHTML += `<span class="minecraft-font mc7">${object.shardID} </span>`;
        tempHTML += `<span class="minecraft-font ${cssClass}">${object.shardName} Shard <span class="mcf">x${element.amount}</span></span>`;
        tempHTML += `<span class="minecraft-font mcf"> (<span class="${cssClass}">${object.attributeName}</span>)</span><br />`;
        var families = object.shardFamily.split(", ");

        if (families.length > 2) {
            var temp2 = ", and " + families[families.length - 1] + " Family";
            for (var index = families.length - 2; index > 0; index--) {
                temp2 = ", " + families[index] + temp2;
            }
            tempHTML += `<span class="minecraft-font minecraft-font-small mc7">${temp2.slice(2)}</span><br />`;
        } else if (families.length == 2) {
            tempHTML += `<span class="minecraft-font minecraft-font-small mc7">${families[0]} and ${families[1]} Family</span><br />`;
        } else if (object.shardFamily != "") {
            tempHTML += `<span class="minecraft-font minecraft-font-small mc7">${families[0]} Family</span><br />`;
        }
        tempHTML += `<span class="minecraft-font minecraft-font-small mc7">${object.shardSkill} Attribute Category, ${object.shardCategory} Shard</span><br />`;
        tempHTML += `<span class="minecraft-font mcf">${object.attributeEffect}</span><br />`;
        html += tempHTML + `</div><br />`;
    });
    return html;
};

var generateInverseHTMLResults = function (ShardTable, results) {
    if (!results || !(typeof results === "object") || !("length" in results)) {
        return `<span style="color: #f00">An unexpected error occurred: "results" argument in generateHTMLResults is not an array</span>`;
    }
    var html = "";
    if (results.length == 0) {
        return `<div class="fusion result-box minecraft-font mcc">Couldn't find any fusion recipes for this shard.</div>`;
    }
    results.forEach((element) => {
        var tempHTML = `<div class="fusion-result-box">`;
        var amountA = 5,
            amountB = 5;
        tempHTML += `<span class="minecraft-font mcf">(${element.amount}&nbsp;Shard${element.amount == 1 ? "" : "s"})</span>&nbsp;`;
        if (element.A.shardID == "shape") {
            tempHTML += `<span class="minecraft-font mcc">[${element.A.shape}]</span>`;
            tempHTML += `&nbsp;<span class="minecraft-font mcf">x?</span></span>`;
        } else {
            var objectA = ShardTable[getInfoForShardLetter(element.A.shardID.slice(0, 1)).cuteName][element.A.shardID.slice(1)];
            var cssClassA = getInfoForShardLetter(element.A.shardID.slice(0, 1)).cssClass;
            if (element.A.shardID == "L4") {
                amountA = 1;
            } else if (objectA.shardFamily.includes("Reptile") || objectA.shardFamily.includes("Elemental")) {
                amountA = 2;
            }
            tempHTML += `<span class="minecraft-font mc7">${objectA.shardID} </span>`;
            tempHTML += `<span class="minecraft-font ${cssClassA}">${objectA.shardName} Shard`;
            tempHTML += `&nbsp;<span class="mcf">x${amountA}</span></span>`;
        }

        tempHTML += `<span class="minecraft-font mcf">&nbsp;+&nbsp;</span>`;
        if (element.B.shardID == "shape") {
            tempHTML += `<span class="minecraft-font mcc">[${element.B.shape}]</span>`;
            tempHTML += `&nbsp;<span class="minecraft-font mcf">x?</span></span>`;
        } else {
            var objectB = ShardTable[getInfoForShardLetter(element.B.shardID.slice(0, 1)).cuteName][element.B.shardID.slice(1)];
            var cssClassB = getInfoForShardLetter(element.B.shardID.slice(0, 1)).cssClass;
            if (element.B.shardID == "L4") {
                amountB = 1;
            } else if (objectB.shardFamily.includes("Reptile") || objectB.shardFamily.includes("Elemental")) {
                amountB = 2;
            }
            tempHTML += `<span class="minecraft-font mc7">${objectB.shardID} </span>`;
            tempHTML += `<span class="minecraft-font ${cssClassB}">${objectB.shardName} Shard`;
            tempHTML += `&nbsp;<span class="mcf">x${amountB}</span></span>`;
        }
        html += tempHTML + `</div><br />`;
    });
    return html;
};

var flushCalculatorResults = function () {
    el("results-direct").innerHTML = "";
    el("results-reverse").innerHTML = "";
    el("results-viewer").innerHTML = "";
    console.log("cleared calculator results");
};

var calculateButtonCallback = function () {
    if (Loading) {
        return;
    }
    flushCalculatorResults();
    var input1 = "" + el("input1").value;
    var input2 = "" + el("input2").value;
    console.log(`call function: calculate_direct(${input1}, ${input2})`);

    var shard1 = "empty slot",
        shard2 = "empty slot";
    if (checkIfShardIDExists(ShardTable, input1.toUpperCase())) {
        shard1 = input1.toUpperCase();
    } else {
        var temp1 = getShardIDFromName(ShardTable, input1);
        if (temp1 != "C0") {
            shard1 = temp1;
        } else {
            el("results-direct").innerHTML = `<span style="color: #f00">Failed validation: "${input1}" is not a valid Shard ID or name.</span>`;
            return;
        }
    }
    if (checkIfShardIDExists(ShardTable, input2.toUpperCase())) {
        shard2 = input2.toUpperCase();
    } else {
        var temp2 = getShardIDFromName(ShardTable, input2);
        if (temp2 != "C0") {
            shard2 = temp2;
        } else {
            el("results-direct").innerHTML = `<span style="color: #f00">Failed validation: "${input2}" is not a valid Shard ID or name.</span>`;
            return;
        }
    }

    if (getInfoForShardLetter(shard1.slice(0, 1)).index == -1 || getInfoForShardLetter(shard2.slice(0, 1)).index == -1) {
        el("results-direct").innerHTML = `<span style="color: #f00">An unexpected error occurred. Your inputs: ["${input1}]", "[${input2}]".</span>`;
        console.log("Invalid input to direct fuse calculation function.");
        return;
    }
    try {
        var result = calculateFusionResult(ShardTable, shard1, shard2);
        el("results-direct").innerHTML = generateDirectHTMLResults(ShardTable, result);
        console.log(result);
    } catch (error) {
        el("results-direct").innerHTML = `<span style="color: #f00">An unexpected error occurred: ${error}</span>`;
        console.error(error);
    } finally {
        console.log("Direct Fusion: Calculation script finished execution.");
    }
};

var inverseCalculateCallback = function () {
    if (Loading) {
        return;
    }
    flushCalculatorResults();
    var input1 = "" + el("input3").value;
    console.log(`call function: calculate_inverse(${input1})`);
    var shard1 = "empty slot";

    if (checkIfShardIDExists(ShardTable, input1.toUpperCase())) {
        shard1 = input1.toUpperCase();
    } else {
        var temp1 = getShardIDFromName(ShardTable, input1);
        if (temp1 != "C0") {
            shard1 = temp1;
        } else {
            el("results-reverse").innerHTML = `<span style="color: #f00">Failed validation: "${input1}" is not a valid Shard ID or name.</span>`;
            return;
        }
    }
    if (getInfoForShardLetter(shard1.slice(0, 1)).index == -1) {
        el("results-reverse").innerHTML = `<span style="color: #f00">An unexpected error occurred. Your input: "${input1}".</span>`;
        console.log("Invalid input to viewer calculation function.");
        return;
    }
    try {
        var result = calculateInverseResult(ShardTable, shard1);
        el("results-reverse").innerHTML = generateInverseHTMLResults(ShardTable, result);
        console.log(result);
    } catch (error) {
        el("results-reverse").innerHTML = `<span style="color: #f00">An unexpected error occurred: ${error}</span>`;
        console.error(error);
    } finally {
        console.log("Inverse Fusion: Calculation script finished execution.");
    }
};

var shardViewerCallback = function () {
    if (Loading) {
        return;
    }
    flushCalculatorResults();
    var input1 = "" + el("input4").value;
    console.log(`call function: calculate_viewer(${input1})`);
    var shard1 = "empty slot";

    if (input1.toUpperCase() == "EVERYTHING" || input1.toLowerCase() in ShardTable) {
        // TODO: refactor this weird spaghetti code
        var temp = input1.toLowerCase();
        if (input1.toUpperCase() == "EVERYTHING") {
            temp = "unsorted";
        }
        ShardTable[temp].forEach((element) => {
            if (!element || !("shardID" in element)) return;
            window.requestAnimationFrame(() => {
                el("results-viewer").innerHTML += generateDirectHTMLResults(ShardTable, [{ shardID: element.shardID, amount: 1 }]);
            });
        });
        console.log("Shard Viewer: Calculation script (view everything) finished execution.");
        return;
    }

    if (checkIfShardIDExists(ShardTable, input1.toUpperCase())) {
        shard1 = input1.toUpperCase();
    } else {
        var temp1 = getShardIDFromName(ShardTable, input1);
        if (temp1 != "C0") {
            shard1 = temp1;
        } else {
            el("results-viewer").innerHTML = `<span style="color: #f00">Failed validation: "${input1}" is not a valid Shard ID or name.</span>`;
            return;
        }
    }
    if (getInfoForShardLetter(shard1.slice(0, 1)).index == -1) {
        el("results-viewer").innerHTML = `<span style="color: #f00">An unexpected error occurred. Your input: "${input1}".</span>`;
        console.log("Invalid input to viewer calculation function.");
        return;
    }
    try {
        el("results-viewer").innerHTML = generateDirectHTMLResults(ShardTable, [{ shardID: shard1, amount: 1 }]);
    } catch (error) {
        el("results-viewer").innerHTML = `<span style="color: #f00">An unexpected error occurred: ${error}</span>`;
        console.error(error);
    } finally {
        console.log("Shard Viewer: Calculation script finished execution.");
    }
};

var Loading = true;
var InputsValidated = false;
var ShardTable = {};
(function () {
    loadManyShardConstants()
        .then((result) => {
            ShardTable = result;
        })
        .then(() => {
            ShardTable.sorted = ShardTable.unsorted.toSorted((a, b) => {
                if (a == null) {
                    return 1;
                }
                if (b == null) {
                    return -1;
                }
                var genericSort = [a.shardName, b.shardName].sort();

                if (genericSort[0] == genericSort[1]) {
                    return 0;
                }
                if (genericSort[0] == a.shardName) {
                    return -1;
                }
                return 1;
            });
        })
        .then(() => {
            Loading = false;
            el("loading").style = "display: none";
            el("calculate-direct").addEventListener("click", calculateButtonCallback);
            el("calculate-reverse").addEventListener("click", inverseCalculateCallback);
            el("clickable-viewer").addEventListener("click", shardViewerCallback);
            el("tab-click-1").addEventListener("click", () => {
                switchTabs(1);
            });
            el("tab-click-2").addEventListener("click", () => {
                switchTabs(2);
            });
            el("tab-click-3").addEventListener("click", () => {
                switchTabs(3);
            });
        });
})();
