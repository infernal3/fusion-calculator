const el = e => getElementById(e);
// ShardA and ShardB should be Shard ID, not the shard name or the processed shard object.
var calculateFusionResult = function(ShardTable, ShardA, ShardB) {
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

    // Special Fusions. Each special fusion has its own combination, and they can check for rarity, family, category, etc. Fetch rarity, family, category for both of the shards:
    var ShardObjectA = ShardTable[getRarityCuteName(ShardA.slice(0, 1))][parseInt(ShardA.slice(1))];
    var ShardObjectB = ShardTable[getRarityCuteName(ShardB.slice(0, 1))][parseInt(ShardB.slice(1))];

    var specialFusionRecipes = [
        // Fusion recipes for Common Shards
        {id: "C1", predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "C" && getRarityIndex(B.shardID.slice(0, 1)) >= 2},
        {id: "C2", predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "C" && getRarityIndex(B.shardID.slice(0, 1)) >= 2},
        {id: "C3", predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "C" && getRarityIndex(B.shardID.slice(0, 1)) >= 2},
        {id: "C16", predicate: (A, B) => A.shardFamily == "Shulker" && getRarityIndex(B.shardID.slice(0, 1)) >= 1},
        {id: "C24", predicate: (A, B) => A.shardFamily == "Bird" && B.shardCategory == "Combat"},
        {id: "C34", predicate: (A, B) => A.shardFamily == "Bird" && getRarityIndex(B.shardID.slice(0, 1)) >= 1},
        {id: "C35", predicate: (A, B) => A.shardFamily == "Axolotl" && B.shardCategory == "Water"},
        // Fusion recipes for Uncommon Shards
        {id: "U1", predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 3},
        {id: "U2", predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 3},
        {id: "U3", predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 3},
        {id: "U5", predicate: (A, B) => A.shardName == "Golden Ghoul" && B.shardCategory == "Water"},
        {id: "U6", predicate: (A, B) => A.shardFamily == "Cave Dweller" && B.shardCategory == "Combat"},
        {id: "U7", predicate: (A, B) => A.shardFamily == "Shulker" && B.shardFamily == "Cave Dweller"},
        {id: "U8", predicate: (A, B) => A.shardName == "Newt" && B.shardCategory == "Water"},
        {id: "U9", predicate: (A, B) => A.shardFamily == "Shulker" && B.shardFamily == "Reptile"},
        {id: "U11", predicate: (A, B) => A.shardName == "Tadgang" && B.shardCategory == "Forest"},
        {id: "U21", predicate: (A, B) => A.shardName == "Cuboa" && B.shardCategory == "Combat"},
        {id: "U22", predicate: (A, B) => A.shardName == "Pest" && B.shardCategory == "Combat"},
        {id: "U34", predicate: (A, B) => A.shardFamily == "Bird" && getRarityIndex(B.shardID.slice(0, 1)) >= 2},
        {id: "U39", predicate: (A, B) => A.shardFamily == "Frog" && B.shardCategory == "Combat"},
        {id: "U41", predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 1},
        // Fusion recipes for Rare Shards
        {id: "R1", predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "R" && getRarityIndex(B.shardID.slice(0, 1)) >= 4},
        {id: "R2", predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "R" && getRarityIndex(B.shardID.slice(0, 1)) >= 4},
        {id: "R3", predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "R" && getRarityIndex(B.shardID.slice(0, 1)) >= 4},
        {id: "R4", predicate: (A, B) => A.shardFamily == "Panda" && getRarityIndex(B.shardID.slice(0, 1)) >= 2},
        {id: "R5", predicate: (A, B) => A.shardFamily == "Frog" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 2},
        {id: "R8", predicate: (A, B) => A.shardFamily == "Lizard" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 2},
        {id: "R9", predicate: (A, B) => A.shardName == "Viper" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 2},
        {id: "R13", predicate: (A, B) => A.shardFamily == "Shulker" && B.shardName == "Wither"},
        {id: "R15", predicate: (A, B) => A.shardName == "Lapis Zombie" && getRarityIndex(B.shardID.slice(0, 1)) >= 3},
    ];
}

var getNextTierShardLetter = function(ShardLetter) {
    switch(ShardLetter) {
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
}

var getRarityCuteName = function(ShardLetter) {
    switch(ShardLetter) {
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
}

var getRarityIndex = function(ShardLetter) {
    switch(ShardLetter) {
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
}

var calculateIDFusionResult = function(ShardTable, Shard) {
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
        if (ShardCategory == ShardTableOfRarity[index].shardCategory) return ShardLetter + index;
    }
}

var calculateChameleonFusionResult = function(ShardTable, NonChameleonShard) {
    var ShardLetter = NonChameleonShard.slice(0, 1);
    var ShardNumber = parseInt(NonChameleonShard.slice(1));
    var candidate1 = ShardLetter + (ShardNumber + 1);
    var candidate2 = ShardLetter + (ShardNumber + 2);
    var candidate3 = ShardLetter + (ShardNumber + 3);
    var missingCandidates = 0;
    var validate = function(candidate) {
        if(checkIfShardIDExists(ShardTable, candidate)) {
            return candidate;
        }
        return getNextTierShardLetter(ShardLetter) + (++missingCandidates);
    }
    return [{
        shardID: validate(candidate1), 
        amount: 1,
    }, {
        shardID: validate(candidate2), 
        amount: 1,
    }, {
        shardID: validate(candidate3), 
        amount: 1,
    }].filter((item) => {
        return !item.shardID.includes("Z");
    }).filter((item) => {
        return item.shardID != "L4"; // Chameleon Fusion will never output a Chameleon
    }).filter((item) => {
        return item.shardID != NonChameleonShard; // Chameleon Fusion will never output the non-chameleon shard used
    });
}

var checkIfShardIDExists = function(ShardTable, ShardID) {
    // might optimize this if necessary. but my array only has a 400-ish elements. hopefully this doesn't bite me in the back.
    var flag = false;
    ShardTable.sorted.forEach(item => {
        if(!item || item == null) return;
        if(item.shardID == ShardID + "\n") flag = true;
    });
    return flag;
}

var loadOneShardConstant = async function(resource) {
    var response = await fetch(new Request(resource));
    var json = await response.json();
    return json;
}

var loadManyShardConstants = async function() {
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
}

var Loading = true;
var ShardTable = {};

loadManyShardConstants().then(result => {
    ShardTable = result;
}).then(() => {
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
}).then(() => {
    Loading = false;
});
