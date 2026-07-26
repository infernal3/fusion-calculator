const el = (e) => getElementById(e);

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

    if (specialCandidates.length >= 1) {
        candidateB = "empty slot";
    }
    
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
    while (candidates.length > 3) {
        candidates.pop();
    }
    return candidates;
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
            return {nextTier: "U", cuteName: "common", index: 1};
        case "U":
            return {nextTier: "R", cuteName: "uncommon", index: 2};
        case "R":
            return {nextTier: "E", cuteName: "rare", index: 3};
        case "E":
            return {nextTier: "L", cuteName: "epic", index: 4};
        case "L":
            return {nextTier: "Z", cuteName: "legendary", index: 5};
        default:
            return {nextTier: "Z", cuteName: "unsorted", index: -1};
    }
}

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
        return getInfoForShardLetter(ShardLetter).nextTier + (++missingCandidates);
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
        if (([Prefix, item.shardName.toLowerCase()].sort())[1] != Prefix) {
            return array;
        }
    }
    return array;
}

var loadOneShardConstant = async function (resource) {
    var response = await fetch(new Request(resource));
    var json = await response.json();
    return json;
};

var loadManyShardConstants = async function () {
    var common = await loadOneShardConstant("../src/lib/common.json");
    var uncommon = await loadOneShardConstant("../src/lib/uncommon.json");
    var rare = await loadOneShardConstant("../src/lib/rare.json");
    var epic = await loadOneShardConstant("../src/lib/epic.json");
    var legendary = await loadOneShardConstant("../src/lib/legendary.json");
    return {
        common: common,
        uncommon: uncommon,
        rare: rare,
        epic: epic,
        legendary: legendary,
        unsorted: [].concat(common, uncommon, rare, epic, legendary),
    };
};

var Loading = true;
var ShardTable = {};

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
    });
