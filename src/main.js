const el = (e) => getElementById(e);
var specialFusionRecipes = [
    // Fusion recipes for Common Shards
    { id: "C1", predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "C" && getRarityIndex(B.shardID.slice(0, 1)) >= 2 },
    { id: "C2", predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "C" && getRarityIndex(B.shardID.slice(0, 1)) >= 2 },
    { id: "C3", predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "C" && getRarityIndex(B.shardID.slice(0, 1)) >= 2 },
    { id: "C16", predicate: (A, B) => A.shardFamily == "Shulker" && getRarityIndex(B.shardID.slice(0, 1)) >= 1 },
    { id: "C24", predicate: (A, B) => A.shardFamily == "Bird" && B.shardCategory == "Combat" },
    { id: "C34", predicate: (A, B) => A.shardFamily == "Bird" && getRarityIndex(B.shardID.slice(0, 1)) >= 1 },
    { id: "C35", predicate: (A, B) => A.shardFamily == "Axolotl" && B.shardCategory == "Water" },
    // Fusion recipes for Uncommon Shards
    { id: "U1", predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "U2", predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "U3", predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "U5", predicate: (A, B) => A.shardName == "Golden Ghoul" && B.shardCategory == "Water" },
    { id: "U6", predicate: (A, B) => A.shardFamily == "Cave Dweller" && B.shardCategory == "Combat" },
    { id: "U7", predicate: (A, B) => A.shardFamily == "Shulker" && B.shardFamily == "Cave Dweller" },
    { id: "U8", predicate: (A, B) => A.shardName == "Newt" && B.shardCategory == "Water" },
    { id: "U9", predicate: (A, B) => A.shardFamily == "Shulker" && B.shardFamily == "Reptile" },
    { id: "U11", predicate: (A, B) => A.shardName == "Tadgang" && B.shardCategory == "Forest" },
    { id: "U21", predicate: (A, B) => A.shardName == "Cuboa" && B.shardCategory == "Combat" },
    { id: "U22", predicate: (A, B) => A.shardName == "Pest" && B.shardCategory == "Combat" },
    { id: "U34", predicate: (A, B) => A.shardFamily == "Bird" && getRarityIndex(B.shardID.slice(0, 1)) >= 2 },
    { id: "U39", predicate: (A, B) => A.shardFamily == "Frog" && B.shardCategory == "Combat" },
    { id: "U40", predicate: (A, B) => A.shardFamily == "Bug" && B.shardSkill == "Mining" },
    { id: "U41", predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 1 },
    // Fusion recipes for Rare Shards
    { id: "R1", predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "R" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "R2", predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "R" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "R3", predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "R" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "R4", predicate: (A, B) => A.shardFamily == "Panda" && getRarityIndex(B.shardID.slice(0, 1)) >= 2 },
    { id: "R5", predicate: (A, B) => A.shardFamily == "Frog" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 2 },
    { id: "R8", predicate: (A, B) => A.shardFamily == "Lizard" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 2 },
    { id: "R9", predicate: (A, B) => A.shardName == "Viper" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 2 },
    { id: "R13", predicate: (A, B) => A.shardFamily == "Shulker" && B.shardName == "Wither" },
    { id: "R15", predicate: (A, B) => A.shardName == "Lapis Zombie" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "R16", predicate: (A, B) => A.shardName == "Termite" && B.shardName == "Praying Mantis" },
    { id: "R22", predicate: (A, B) => A.shardFamily == "Shulker" && B.shardFamily == "Demon" },
    { id: "R30", predicate: (A, B) => A.shardName == "Lapis Skeleton" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "R33", predicate: (A, B) => A.shardName == "Troglobyte" && (B.shardFamily == "Cave Dweller" || B.shardName == "Abyssal Lanternfish") },
    { id: "R34", predicate: (A, B) => A.shardFamily == "Shulker" && getRarityIndex(A.shardID.slice(0, 1)) >= 3 && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "R43", predicate: (A, B) => A.shardName == "Termite" && B.shardName == "Invisibug" },
    { id: "R46", predicate: (A, B) => A.shardFamily == "Frog" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "R49", predicate: (A, B) => (A.shardName == "Phanpyre" || A.shardName == "Phanflare") && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "R51", predicate: (A, B) => A.shardName == "Quartzfang" && (B.shardFamily == "Cave Dweller" || B.shardName == "Silentdepth") },
    { id: "R52", predicate: (A, B) => A.shardFamily == "Cave Dweller" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "R54", predicate: (A, B) => A.shardName == "Python" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 2 },
    { id: "R58", predicate: (A, B) => A.shardFamily == "Bird" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    // Fusion recipes for Epic Shards
    { id: "E1", predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "E" && getRarityIndex(B.shardID.slice(0, 1)) >= 5 },
    { id: "E2", predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "E" && getRarityIndex(B.shardID.slice(0, 1)) >= 5 },
    { id: "E3", predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "E" && getRarityIndex(B.shardID.slice(0, 1)) >= 5 },
    { id: "E4", predicate: (A, B) => A.shardFamily == "Panda" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E5", predicate: (A, B) => A.shardFamily == "Lizard" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E6", predicate: (A, B) => A.shardName == "Crocodile" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E7", predicate: (A, B) => A.shardName == "Bullfrog" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E9", predicate: (A, B) => A.shardName == "King Cobra" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E10", predicate: (A, B) => A.shardName == "Gecko" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E11", predicate: (A, B) => A.shardName == "Eel" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E13", predicate: (A, B) => A.shardName == "Ladybug" && B.shardFamily == "Bug" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E14", predicate: (A, B) => (A.shardName == "Eel" && B.shardName == "Moray Eel") || (A.shardName == "Moray Eel" && B.shardName == "Firefly") },
    { id: "E16", predicate: (A, B) => A.shardFamily == "Shulker" && getRarityIndex(A.shardID.slice(0, 1)) >= 3 && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "E22", predicate: (A, B) => A.shardName == "Iguana" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E28", predicate: (A, B) => A.shardFamily == "Bird" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "E30", predicate: (A, B) => A.shardName == "Alligator" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E31", predicate: (A, B) => A.shardName == "Praying Mantis" && (B.shardName == "Bezal" || B.shardName == "Cinderbat" || B.shardName == "Flare" || B.shardName == "Lava Flame" || B.shardName == "Fire Eel" || B.shardName == "Bal" || B.shardName == "Flaming Spider") },
    { id: "E32", predicate: (A, B) => A.shardName == "Moray Eel" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E35", predicate: (A, B) => A.shardName == "Shellwise" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 },
    { id: "E36", predicate: (A, B) => A.shardFamily == "Cave Dweller" && getRarityIndex(A.shardID.slice(0, 1)) >= 3 && B.shardFamily == "Cave Dweller" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "E37", predicate: (A, B) => A.shardName == "Firefly" && B.shardFamily == "Dragon" },
    // Fusion recipes for Legendary Shards
    { id: "L1", predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "L" && B.shardFamily == "Elemental" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "L2", predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "L" && B.shardFamily == "Elemental" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "L3", predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "L" && B.shardFamily == "Elemental" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "L6", predicate: (A, B) => A.shardName == "Caiman" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "L7", predicate: (A, B) => A.shardName == "Komodo Dragon" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "L8", predicate: (A, B) => A.shardName == "Leatherback" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "L11", predicate: (A, B) => A.shardName == "Sea Serpent" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "L12", predicate: (A, B) => A.shardName == "Lapis Skeleton" && (B.shardName == "Ghost" || getRarityIndex(B.shardID.slice(0, 1)) >= 5) },
    { id: "L13", predicate: (A, B) => A.shardName == "Dragonfly" && B.shardName == "Lunar Moth" },
    { id: "L18", predicate: (A, B) => A.shardName == "Kraken" && B.shardName == "Kraken" },
    { id: "L20", predicate: (A, B) => A.shardName == "Kraken" && B.shardCategory == "Water" },
    { id: "L24", predicate: (A, B) => A.shardName == "Kraken" && B.shardFamily == "Bird" },
    { id: "L25", predicate: (A, B) => A.shardFamily == "Shulker" && getRarityIndex(A.shardID.slice(0, 1)) >= 4 && getRarityIndex(B.shardID.slice(0, 1)) >= 5 },
    { id: "L29", predicate: (A, B) => A.shardName == "Tortoise" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 4 },
    { id: "L31", predicate: (A, B) => A.shardFamily == "Bird" && getRarityIndex(B.shardID.slice(0, 1)) >= 5 },
    { id: "L32", predicate: (A, B) => A.shardName == "Shinyfish" && (B.shardName == "Bezal" || B.shardName == "Cinderbat" || B.shardName == "Flare" || B.shardName == "Lava Flame" || B.shardName == "Fire Eel" || B.shardName == "Bal" || B.shardName == "Flaming Spider") },
    { id: "L33", predicate: (A, B) => A.shardName == "Power Dragon" },
    { id: "L34", predicate: (A, B) => A.shardName == "Condor" && getRarityIndex(B.shardID.slice(0, 1)) >= 5 },
    { id: "L36", predicate: (A, B) => A.shardName == "Power Dragon" && B.shardName == "Kraken" },
    { id: "L39", predicate: (A, B) => A.shardName == "Apex Dragon" && B.shardName == "Kraken" },
    { id: "L41", predicate: (A, B) => A.shardName == "Sun Fish" && B.shardName == "Sun Fish" },
    { id: "L42", predicate: (A, B) => A.shardName == "Etherdrake" && B.shardName == "Jormung" },
    { id: "L44", predicate: (A, B) => A.shardFamily == "Elemental" && A.shardID.slice(0, 1) == "L" && B.shardName == "Galaxy Fish" },
];

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
        });

    // If there are more than 3 candidates remaining after purging, omit lower priority candidates:
    while (candidates.length > 3) {
        candidates.pop();
    }
    return candidates;
};

var calculateAllSpecialFusions = function (ShardTable, ShardA, ShardB) {
    // Fetch rarity, family, category, name for both of the shards:
    var ShardObjectA = ShardTable[getRarityCuteName(ShardA.slice(0, 1))][parseInt(ShardA.slice(1))];
    var ShardObjectB = ShardTable[getRarityCuteName(ShardB.slice(0, 1))][parseInt(ShardB.slice(1))];
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

var getNextTierShardLetter = function (ShardLetter) {
    switch (ShardLetter) {
        case "C":
            return "U";
        case "U":
            return "R";
        case "R":
            return "E";
        case "E":
            return "L";
        default:
            return "Z";
    }
};

var getRarityCuteName = function (ShardLetter) {
    switch (ShardLetter) {
        case "C":
            return "common";
        case "U":
            return "uncommon";
        case "R":
            return "rare";
        case "E":
            return "epic";
        case "L":
            return "legendary";
        default:
            return "unsorted";
    }
};

var getRarityIndex = function (ShardLetter) {
    switch (ShardLetter) {
        case "C":
            return 1;
        case "U":
            return 2;
        case "R":
            return 3;
        case "E":
            return 4;
        case "L":
            return 5;
        default:
            return -1;
    }
};

var calculateIDFusionResult = function (ShardTable, Shard) {
    var ShardLetter = Shard.slice(0, 1);
    var ShardNumber = parseInt(Shard.slice(1));
    var ShardTableOfRarity = ShardTable[getRarityCuteName(ShardLetter)];
    var ShardCategory = ShardTableOfRarity[ShardNumber].shardCategory;
    console.log(ShardTableOfRarity[ShardNumber]);
    console.log(Shard);
    var index = ShardNumber;
    while (true) {
        index++;
        if (ShardTableOfRarity[index] == undefined || index >= 200) return "empty slot";
        if (ShardCategory == ShardTableOfRarity[index].shardCategory) return { shardID: ShardLetter + index, amount: 1 };
    }
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
        return getNextTierShardLetter(ShardLetter) + ++missingCandidates;
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
        if (!item || item == null) return;
        if (item.shardID == ShardID) flag = true;
    });
    return flag;
};

var loadOneShardConstant = async function (resource) {
    var response = await fetch(new Request(resource));
    var json = await response.json();
    return json;
};

var loadManyShardConstants = async function () {
    var common = await loadOneShardConstant("../src/common.json");
    var uncommon = await loadOneShardConstant("../src/uncommon.json");
    var rare = await loadOneShardConstant("../src/rare.json");
    var epic = await loadOneShardConstant("../src/epic.json");
    var legendary = await loadOneShardConstant("../src/legendary.json");
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
    });
