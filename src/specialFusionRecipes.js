var specialFusionRecipes = {
    // Fusion recipes for Common Shards
    C1: {
        predicateA: (A) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "C",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Common Forest Shard" }, B: { shardID: "shape", shape: "Uncommon or Higher Shard" }, amount: 2 },
    },
    C2: {
        predicateA: (A) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "C",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Common Water Shard" }, B: { shardID: "shape", shape: "Uncommon or Higher Shard" }, amount: 2 },
    },
    C3: {
        predicateA: (A) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "C",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Common Combat Shard" }, B: { shardID: "shape", shape: "Uncommon or Higher Shard" }, amount: 2 },
    },
    C16: {
        predicateA: (A) => A.shardFamily.includes("Shulker"),
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 1,
        shape: { A: { shardID: "shape", shape: "Shulker Family" }, B: { shardID: "shape", shape: "Any Shard" }, amount: 2 },
    },
    C24: {
        predicateA: (A) => A.shardFamily.includes("Bird"),
        predicateB: (B) => B.shardCategory == "Combat",
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },
    C34: {
        predicateA: (A) => A.shardFamily.includes("Bird"),
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 1,
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Any Shard" }, amount: 2 },
    },
    C35: {
        predicateA: (A) => A.shardFamily.includes("Axolotl"),
        predicateB: (B) => B.shardCategory == "Water",
        shape: { A: { shardID: "shape", shape: "Axolotl Family" }, B: { shardID: "shape", shape: "Water Shard" }, amount: 2 },
    },
    // Fusion recipes for Uncommon Shards
    U1: {
        predicateA: (A) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "U",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Uncommon Forest Shard" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    U2: {
        predicateA: (A) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "U",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Uncommon Water Shard" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    U3: {
        predicateA: (A) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "U",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Uncommon Combat Shard" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    U5: {
        predicateA: (A) => A.shardName == "Golden Ghoul",
        predicateB: (B) => B.shardCategory == "Water",
        shape: { A: { shardID: "C27" }, B: { shardID: "shape", shape: "Water Shard" }, amount: 2 },
    },
    U6: {
        predicateA: (A) => A.shardFamily.includes("Cave Dweller"),
        predicateB: (B) => B.shardCategory == "Combat",
        shape: { A: { shardID: "shape", shape: "Cave Dweller Family" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },
    U7: {
        predicateA: (A) => A.shardFamily.includes("Shulker"),
        predicateB: (B) => B.shardFamily.includes("Cave Dweller"),
        shape: { A: { shardID: "shape", shape: "Shulker Family" }, B: { shardID: "shape", shape: "Cave Dweller Family" }, amount: 2 },
    },
    U8: {
        predicateA: (A) => A.shardName == "Newt",
        predicateB: (B) => B.shardCategory == "Water",
        shape: { A: { shardID: "C35" }, B: { shardID: "shape", shape: "Water Shard" }, amount: 2 },
    },
    U9: {
        predicateA: (A) => A.shardFamily.includes("Shulker"),
        predicateB: (B) => B.shardFamily.includes("Reptile"),
        shape: { A: { shardID: "shape", shape: "Shulker Family" }, B: { shardID: "shape", shape: "Reptile Family" }, amount: 2 },
    },
    U11: {
        predicateA: (A) => A.shardName == "Tadgang",
        predicateB: (B) => B.shardCategory == "Forest",
        shape: { A: { shardID: "C20" }, B: { shardID: "shape", shape: "Forest Shard" }, amount: 2 },
    },
    U21: {
        predicateA: (A) => A.shardName == "Cuboa",
        predicateB: (B) => B.shardCategory == "Combat",
        shape: { A: { shardID: "U9" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },
    /*"U22": {

        predicate: (A, B) => A.shardName == "Pest" && B.shardCategory == "Combat",
        shape: { A: { shardID: "U10" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },*/
    U34: {
        predicateA: (A) => A.shardFamily.includes("Bird"),
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Uncommon or Higher Shard" }, amount: 2 },
    },
    U39: {
        predicateA: (A) => A.shardFamily.includes("Frog"),
        predicateB: (B) => B.shardCategory == "Combat",
        shape: { A: { shardID: "shape", shape: "Frog Family" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },
    U40: {
        predicateA: (A) => A.shardFamily.includes("Bug"),
        predicateB: (B) => B.shardSkill == "Mining",
        shape: { A: { shardID: "shape", shape: "Bug Family" }, B: { shardID: "shape", shape: "Mining Category" }, amount: 2 },
    },
    U41: {
        predicateA: (A) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "U",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 1,
        shape: { A: { shardID: "shape", shape: "Uncommon Water Shard" }, B: { shardID: "shape", shape: "Any Shard" }, amount: 2 },
    },
    U65: {
        predicateA: (A) => A.shardName == "Tadgang",
        predicateB: (B) => B.shardCategory == "Combat",
        shape: { A: { shardID: "C20" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },
    U79: {
        predicateA: (A) => A.shardName == "Ant",
        predicateB: (B) => B.shardFamily.includes("Elusive"),
        shape: { A: { shardID: "C40" }, B: { shardID: "shape", shape: "Elusive Family" }, amount: 2 },
    },
    // Fusion recipes for Rare Shards
    R1: {
        predicateA: (A) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "R",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Rare Forest Shard" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    R2: {
        predicateA: (A) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "R",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Rare Water Shard" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    R3: {
        predicateA: (A) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "R",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Rare Combat Shard" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    R4: {
        predicateA: (A) => A.shardFamily.includes("Panda"),
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Panda Family" }, B: { shardID: "shape", shape: "Uncommon or Higher Shard" }, amount: 2 },
    },
    R5: {
        predicateA: (A) => A.shardFamily.includes("Frog"),
        predicateB: (B) => B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Frog Family" }, B: { shardID: "shape", shape: "Uncommon or Higher Forest Shard" }, amount: 2 },
    },
    R8: {
        predicateA: (A) => A.shardFamily.includes("Lizard"),
        predicateB: (B) => B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Lizard Family" }, B: { shardID: "shape", shape: "Uncommon or Higher Water Shard" }, amount: 2 },
    },
    R9: {
        predicateA: (A) => A.shardName == "Viper",
        predicateB: (B) => B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "U21" }, B: { shardID: "shape", shape: "Uncommon or Higher Combat Shard" }, amount: 2 },
    },
    R13: {
        predicateA: (A) => A.shardFamily.includes("Shulker"),
        predicateB: (B) => B.shardName == "Wither",
        shape: { A: { shardID: "R60" }, B: { shardID: "shape", shape: "Shulker Family" }, amount: 2 },
    },
    R15: {
        predicateA: (A) => A.shardName == "Lapis Zombie",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "C9" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    //{ id: "R16", predicate: (A, B) => A.shardName == "Termite" && B.shardName == "Praying Mantis" },
    R22: {
        predicateA: (A) => A.shardFamily.includes("Shulker"),
        predicateB: (B) => B.shardFamily.includes("Demon"),
        shape: { A: { shardID: "shape", shape: "Shulker Family" }, B: { shardID: "shape", shape: "Demon Family" }, amount: 2 },
    },
    R30: {
        predicateA: (A) => A.shardName == "Lapis Skeleton",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R15" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    R33: {
        predicateA: (A) => A.shardName == "Troglobyte",
        predicateB: (B) => B.shardFamily.includes("Cave Dweller") || B.shardName == "Abyssal Lanternfish",
        shape: [
            { A: { shardID: "U6" }, B: { shardID: "shape", shape: "Cave Dweller Family" }, amount: 2 },
            { A: { shardID: "U6" }, B: { shardID: "R23" }, amount: 2 },
        ],
    },
    R34: {
        predicateA: (A) => A.shardFamily.includes("Shulker") && getRarityIndex(A.shardID.slice(0, 1)) >= 3,
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Rare or Higher Shulker Family" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    R43: {
        predicateA: (A) => A.shardName == "Earthworm",
        predicateB: (B) => B.shardName == "Invisibug",
        shape: { A: { shardID: "U40" }, B: { shardID: "R10" }, amount: 2 },
    },
    R46: {
        predicateA: (A) => A.shardName == "Groundhog",
        predicateB: (B) => B.shardName == "Honeyhog",
        shape: { A: { shardID: "C55" }, B: { shardID: "C45" }, amount: 2 },
    },
    R47: {
        predicateA: (A) => A.shardFamily.includes("Frog"),
        predicateB: (B) => B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Frog Family" }, B: { shardID: "shape", shape: "Rare or Higher Forest Shard" }, amount: 2 },
    },
    R49: {
        predicateA: (A) => A.shardName == "Phanpyre" || A.shardName == "Phanflare",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: [
            { A: { shardID: "C4" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
            { A: { shardID: "C7" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
        ],
    },
    R51: {
        predicateA: (A) => A.shardName == "Quartzfang",
        predicateB: (B) => B.shardFamily.includes("Cave Dweller") || B.shardName == "Silentdepth",
        shape: [
            { A: { shardID: "R33" }, B: { shardID: "shape", shape: "Cave Dweller Family" }, amount: 2 },
            { A: { shardID: "R33" }, B: { shardID: "R29" }, amount: 2 },
        ],
    },
    R52: {
        predicateA: (A) => A.shardFamily.includes("Cave Dweller"),
        predicateB: (B) => B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Cave Dweller Family" }, B: { shardID: "shape", shape: "Epic or Higher Forest Shard" }, amount: 2 },
    },
    R54: {
        predicateA: (A) => A.shardName == "Python",
        predicateB: (B) => B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "R9" }, B: { shardID: "shape", shape: "Uncommon or Higher Combat Shard" }, amount: 2 },
    },
    R58: {
        predicateA: (A) => A.shardFamily.includes("Bird"),
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    R62: {
        predicateA: (A) => A.shardFamily.includes("Creation") && getRarityIndex(A.shardID.slice(0, 1)) >= 4,
        predicateB: (B) => B.shardName == "Shrieky Tiki" || B.shardName == "Sneaky Tiki" || B.shardName == "Cheeky Tiki",
        shape: [
            { A: { shardID: "U69" }, B: { shardID: "shape", shape: "Epic or Higher Creation Family" }, amount: 2 },
            { A: { shardID: "U72" }, B: { shardID: "shape", shape: "Epic or Higher Creation Family" }, amount: 2 },
            { A: { shardID: "U75" }, B: { shardID: "shape", shape: "Epic or Higher Creation Family" }, amount: 2 },
        ],
    },
    R65: {
        predicateA: (A) => A.shardFamily.includes("Trash Lover"),
        predicateB: (B) => B.shardFamily.includes("Bug") && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Trash Lover Family" }, B: { shardID: "shape", shape: "Uncommon or Higher Bug Family" }, amount: 2 },
    },
    R70: {
        predicateA: (A) => A.shardName == "Queen Ant",
        predicateB: (B) => B.shardName == "King Cobra",
        shape: { A: { shardID: "U79" }, B: { shardID: "R54" }, amount: 2 },
    },
    // Fusion recipes for Epic Shards
    E1: {
        predicateA: (A) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "E",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "shape", shape: "Epic Forest Shard" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    E2: {
        predicateA: (A) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "E",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "shape", shape: "Epic Water Shard" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    E3: {
        predicateA: (A) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "E",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "shape", shape: "Epic Combat Shard" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    E4: {
        predicateA: (A) => A.shardFamily.includes("Panda"),
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Panda Family" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    E5: {
        predicateA: (A) => A.shardFamily.includes("Lizard"),
        predicateB: (B) => B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Lizard Family" }, B: { shardID: "shape", shape: "Rare or Higher Water Shard" }, amount: 2 },
    },
    E6: {
        predicateA: (A) => A.shardName == "Crocodile",
        predicateB: (B) => B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R45" }, B: { shardID: "shape", shape: "Rare or Higher Combat Shard" }, amount: 2 },
    },
    E7: {
        predicateA: (A) => A.shardName == "Bullfrog",
        predicateB: (B) => B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R47" }, B: { shardID: "shape", shape: "Rare or Higher Forest Shard" }, amount: 2 },
    },
    E9: {
        predicateA: (A) => A.shardName == "King Cobra",
        predicateB: (B) => B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R54" }, B: { shardID: "shape", shape: "Rare or Higher Combat Shard" }, amount: 2 },
    },
    E10: {
        predicateA: (A) => A.shardName == "Gecko",
        predicateB: (B) => B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R61" }, B: { shardID: "shape", shape: "Rare or Higher Forest Shard" }, amount: 2 },
    },
    E11: {
        predicateA: (A) => A.shardName == "Eel",
        predicateB: (B) => B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R53" }, B: { shardID: "shape", shape: "Rare or Higher Water Shard" }, amount: 2 },
    },
    E12: {
        predicateA: (A) => A.shardName == "Zealot",
        predicateB: (B) => B.shardCategory == "Combat" && B.shardFamily.includes("Elusive"),
        shape: { A: { shardID: "C21" }, B: { shardID: "shape", shape: "Elusive Family Combat Shard" }, amount: 2 },
    },
    E13: {
        predicateA: (A) => A.shardName == "Ladybug",
        predicateB: (B) => B.shardFamily.includes("Bug") && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R43" }, B: { shardID: "shape", shape: "Rare or Higher Bug Family" }, amount: 2 },
    },
    E14: {
        predicateA: (A) => A.shardName == "Moray Eel",
        predicateB: (B) => B.shardName == "Eel" || B.shardName == "Firefly" || B.shardName == "Firefox",
        shape: [
            { A: { shardID: "R53" }, B: { shardID: "E11" }, amount: 2 },
            { A: { shardID: "E31" }, B: { shardID: "E11" }, amount: 2 },
            { A: { shardID: "C52" }, B: { shardID: "E11" }, amount: 2 },
        ],
    },
    E16: {
        predicateA: (A) => A.shardFamily.includes("Shulker") && getRarityIndex(A.shardID.slice(0, 1)) >= 3,
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Rare or Higher Shulker Family" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    E19: {
        predicateA: (A) => A.shardFamily.includes("Phantom"),
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Phantom Family" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    E22: {
        predicateA: (A) => A.shardName == "Iguana",
        predicateB: (B) => B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "E10" }, B: { shardID: "shape", shape: "Rare or Higher Forest Shard" }, amount: 2 },
    },
    E23: {
        predicateA: (A) => A.shardFamily.includes("Crustacean") && getRarityIndex(A.shardID.slice(0, 1)) >= 3,
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3 && B.shardFamily.includes("Treasure Fish"),
        shape: { A: { shardID: "shape", shape: "Rare or Higher Crustacean Family" }, B: { shardID: "shape", shape: "Rare or Higher Treasure Fish Family" }, amount: 2 },
    },
    E28: {
        predicateA: (A) => A.shardFamily.includes("Bird"),
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    E30: {
        predicateA: (A) => A.shardName == "Alligator",
        predicateB: (B) => B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "E6" }, B: { shardID: "shape", shape: "Rare or Higher Combat Shard" }, amount: 2 },
    },
    E31: {
        predicateA: (A) => A.shardName == "Praying Mantis",
        predicateB: (B) => B.shardName == "Bezal" || B.shardName == "Cinderbat" || B.shardName == "Flare" || B.shardName == "Lava Flame" || B.shardName == "Fire Eel" || B.shardName == "Bal" || B.shardName == "Flaming Spider",
        shape: [
            { A: { shardID: "U22" }, B: { shardID: "C30" }, amount: 2 },
            { A: { shardID: "U22" }, B: { shardID: "L28" }, amount: 2 },
            { A: { shardID: "U22" }, B: { shardID: "E18" }, amount: 2 },
            { A: { shardID: "U22" }, B: { shardID: "R56" }, amount: 2 },
            { A: { shardID: "U22" }, B: { shardID: "E14" }, amount: 2 },
            { A: { shardID: "U22" }, B: { shardID: "E15" }, amount: 2 },
            { A: { shardID: "U22" }, B: { shardID: "U33" }, amount: 2 },
        ],
    },
    E32: {
        predicateA: (A) => A.shardName == "Moray Eel",
        predicateB: (B) => B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "E11" }, B: { shardID: "shape", shape: "Rare or Higher Water Shard" }, amount: 2 },
    },
    E35: {
        predicateA: (A) => A.shardName == "Shellwise",
        predicateB: (B) => B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "E26" }, B: { shardID: "shape", shape: "Rare or Higher Water Shard" }, amount: 2 },
    },
    E36: {
        predicateA: (A) => A.shardFamily.includes("Cave Dweller") && getRarityIndex(A.shardID.slice(0, 1)) >= 3,
        predicateB: (B) => B.shardFamily.includes("Cave Dweller") && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Rare or Higher Cave Dweller Family" }, B: { shardID: "shape", shape: "Epic or Higher Cave Dweller Family" }, amount: 2 },
    },
    E37: {
        predicateA: (A) => A.shardName == "Firefly",
        predicateB: (B) => B.shardFamily.includes("Dragon"),
        shape: { A: { shardID: "E31" }, B: { shardID: "shape", shape: "Dragon Family" }, amount: 2 },
    },
    E52: {
        predicateA: (A) => A.shardName == "Queen Bee",
        predicateB: (B) => B.shardName == "Lunar Moth",
        shape: { A: { shardID: "E49" }, B: { shardID: "E13" }, amount: 2 },
    },
    E63: {
        predicateA: (A) => A.shardName == "Gimmiegold",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "R77" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    // Fusion recipes for Legendary Shards
    L1: {
        predicateA: (A) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "L",
        predicateB: (B) => B.shardFamily.includes("Elemental") && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Legendary Forest Shard" }, B: { shardID: "shape", shape: "Epic or Higher Elemental Family" }, amount: 2 },
    },
    L2: {
        predicateA: (A) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "L",
        predicateB: (B) => B.shardFamily.includes("Elemental") && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Legendary Water Shard" }, B: { shardID: "shape", shape: "Epic or Higher Elemental Family" }, amount: 2 },
    },
    L3: {
        predicateA: (A) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "L",
        predicateB: (B) => B.shardFamily.includes("Elemental") && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Legendary Combat Shard" }, B: { shardID: "shape", shape: "Epic or Higher Elemental Family" }, amount: 2 },
    },
    L6: {
        predicateA: (A) => A.shardName == "Caiman",
        predicateB: (B) => B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "E30" }, B: { shardID: "shape", shape: "Epic or Higher Combat Shard" }, amount: 2 },
    },
    L7: {
        predicateA: (A) => A.shardName == "Komodo Dragon",
        predicateB: (B) => B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "E22" }, B: { shardID: "shape", shape: "Epic or Higher Forest Shard" }, amount: 2 },
    },
    L8: {
        predicateA: (A) => A.shardName == "Leatherback",
        predicateB: (B) => B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "E35" }, B: { shardID: "shape", shape: "Epic or Higher Water Shard" }, amount: 2 },
    },
    L10: {
        predicateA: (A) => A.shardName == "Rabbit Godmother",
        predicateB: (B) => B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "E46" }, B: { shardID: "shape", shape: "Legendary Combat Shard" }, amount: 2 },
    },
    L11: {
        predicateA: (A) => A.shardName == "Sea Serpent",
        predicateB: (B) => B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "E32" }, B: { shardID: "shape", shape: "Epic or Higher Water Shard" }, amount: 2 },
    },
    L12: {
        predicateA: (A) => A.shardName == "Lapis Skeleton",
        predicateB: (B) => B.shardName == "Ghost" || getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: [
            { A: { shardID: "R15" }, B: { shardID: "E33" }, amount: 2 },
            { A: { shardID: "R15" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
        ],
    },
    L13: {
        predicateA: (A) => A.shardName == "Dragonfly",
        predicateB: (B) => B.shardName == "Lunar Moth",
        shape: { A: { shardID: "E37" }, B: { shardID: "E13" }, amount: 2 },
    },
    L18: {
        predicateA: (A) => A.shardName == "Kraken",
        predicateB: (B) => B.shardName == "Kraken",
        shape: { A: { shardID: "L15" }, B: { shardID: "L15" }, amount: 2 },
    },
    L20: {
        predicateA: (A) => A.shardName == "Kraken",
        predicateB: (B) => B.shardCategory == "Water",
        shape: { A: { shardID: "L15" }, B: { shardID: "shape", shape: "Water Shard" }, amount: 2 },
    },
    L24: {
        predicateA: (A) => A.shardName == "Kraken",
        predicateB: (B) => B.shardFamily.includes("Bird"),
        shape: { A: { shardID: "L15" }, B: { shardID: "shape", shape: "Bird Family" }, amount: 2 },
    },
    L25: {
        predicateA: (A) => A.shardFamily.includes("Shulker") && getRarityIndex(A.shardID.slice(0, 1)) >= 4,
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "shape", shape: "Epic or Higher Shulker Family" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    L29: {
        predicateA: (A) => A.shardName == "Tortoise",
        predicateB: (B) => B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "L8" }, B: { shardID: "shape", shape: "Epic or Higher Water Shard" }, amount: 2 },
    },
    L31: {
        predicateA: (A) => A.shardFamily.includes("Bird"),
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    L32: {
        predicateA: (A) => A.shardName == "Shinyfish",
        predicateB: (B) => B.shardName == "Bezal" || B.shardName == "Cinderbat" || B.shardName == "Flare" || B.shardName == "Lava Flame" || B.shardName == "Fire Eel" || B.shardName == "Bal" || B.shardName == "Flaming Spider",
        shape: [
            { A: { shardID: "L23" }, B: { shardID: "C30" }, amount: 2 },
            { A: { shardID: "L23" }, B: { shardID: "L28" }, amount: 2 },
            { A: { shardID: "L23" }, B: { shardID: "E18" }, amount: 2 },
            { A: { shardID: "L23" }, B: { shardID: "R56" }, amount: 2 },
            { A: { shardID: "L23" }, B: { shardID: "E14" }, amount: 2 },
            { A: { shardID: "L23" }, B: { shardID: "E15" }, amount: 2 },
            { A: { shardID: "L23" }, B: { shardID: "U33" }, amount: 2 },
        ],
    },
    L33: {
        predicateA: (A) => A.shardName == "Power Dragon",
        predicateB: (B) => true,
        shape: { A: { shardID: "L30" }, B: { shardID: "shape", shape: "Any Shard" }, amount: 2 },
    },
    L34: {
        predicateA: (A) => A.shardName == "Condor",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "L31" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    L35: {
        predicateA: (A) => A.shardName == "Queen Bee",
        predicateB: (B) => B.shardName == "Queen Ant",
        shape: { A: { shardID: "E49" }, B: { shardID: "U79" }, amount: 2 },
    },
    L36: {
        predicateA: (A) => A.shardName == "Power Dragon",
        predicateB: (B) => B.shardName == "Kraken",
        shape: { A: { shardID: "L30" }, B: { shardID: "L15" }, amount: 2 },
    },
    L38: {
        predicateA: (A) => A.shardName == "Blue Crab",
        predicateB: (B) => getRarityIndex(B.shardID.slice(0, 1)) >= 3 && B.shardFamily.includes("Poltergeist"),
        shape: { A: { shardID: "L23" }, B: { shardID: "shape", shape: "Rare or Higher Poltergeist Family" }, amount: 2 },
    },
    L39: {
        predicateA: (A) => A.shardName == "Apex Dragon",
        predicateB: (B) => B.shardName == "Kraken",
        shape: { A: { shardID: "L33" }, B: { shardID: "L15" }, amount: 2 },
    },
    L41: {
        predicateA: (A) => A.shardName == "Sun Fish",
        predicateB: (B) => B.shardName == "Sun Fish",
        shape: { A: { shardID: "L32" }, B: { shardID: "L32" }, amount: 2 },
    },
    L42: {
        predicateA: (A) => A.shardName == "Etherdrake",
        predicateB: (B) => B.shardName == "Jormung",
        shape: { A: { shardID: "L36" }, B: { shardID: "L39" }, amount: 2 },
    },
    L44: {
        predicateA: (A) => A.shardFamily.includes("Elemental") && A.shardID.slice(0, 1) == "L",
        predicateB: (B) => B.shardName == "Galaxy Fish",
        shape: { A: { shardID: "L41" }, B: { shardID: "shape", shape: "Legendary Elemental Family" }, amount: 2 },
    },
};
