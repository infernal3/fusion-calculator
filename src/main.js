const el = e => getElementById(e);

var calculateFusionResult = function(ShardTable, ShardA, ShardB) {
    // Chameleon-fusion overrides all other fusion type. Check for the presence of a Chameleon.
    if (ShardA == "L4") {
        return calculateChameleonFusionResult(ShardTable, ShardB);
    }
    if (ShardB == "L4") {
        return calculateChameleonFusionResult(ShardTable, ShardA);
    }
    // Now the remaining shard spaces are free-form between Special Fusion and ID Fusion. Priority: Special Fusion(s) > ID Fusion (Shard A) > ID Fusion (Shard B).
    // candidateA and candidateB are the ID fusion results for Shard A and Shard B.
    var candidateA = calculateIDFusionResult(ShardTable, ShardA);
    var candidateB = calculateIDFusionResult(ShardTable, ShardB);
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
