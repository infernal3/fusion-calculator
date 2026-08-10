var specialFusionRecipes = [
    // Fusion recipes for Common Shards
    {
        id: "C1",
        predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "C" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Common Forest Shard" }, B: { shardID: "shape", shape: "Uncommon or Higher Shard" }, amount: 2 },
    },
    {
        id: "C2",
        predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "C" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Common Water Shard" }, B: { shardID: "shape", shape: "Uncommon or Higher Shard" }, amount: 2 },
    },
    {
        id: "C3",
        predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "C" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Common Combat Shard" }, B: { shardID: "shape", shape: "Uncommon or Higher Shard" }, amount: 2 },
    },
    {
        id: "C16",
        predicate: (A, B) => A.shardFamily.includes("Shulker") && getRarityIndex(B.shardID.slice(0, 1)) >= 1,
        shape: { A: { shardID: "shape", shape: "Shulker Family" }, B: { shardID: "shape", shape: "Any Shard" }, amount: 2 },
    },
    {
        id: "C24",
        predicate: (A, B) => A.shardFamily.includes("Bird") && B.shardCategory == "Combat",
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },
    {
        id: "C34",
        predicate: (A, B) => A.shardFamily.includes("Bird") && getRarityIndex(B.shardID.slice(0, 1)) >= 1,
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Any Shard" }, amount: 2 },
    },
    {
        id: "C35",
        predicate: (A, B) => A.shardFamily.includes("Axolotl") && B.shardCategory == "Water",
        shape: { A: { shardID: "shape", shape: "Axolotl Family" }, B: { shardID: "shape", shape: "Water Shard" }, amount: 2 },
    },
    // Fusion recipes for Uncommon Shards
    {
        id: "U1",
        predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Uncommon Forest Shard" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    {
        id: "U2",
        predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Uncommon Water Shard" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    {
        id: "U3",
        predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Uncommon Combat Shard" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    {
        id: "U5",
        predicate: (A, B) => A.shardName == "Golden Ghoul" && B.shardCategory == "Water",
        shape: { A: { shardID: "C27" }, B: { shardID: "shape", shape: "Water Shard" }, amount: 2 },
    },
    {
        id: "U6",
        predicate: (A, B) => A.shardFamily.includes("Cave Dweller") && B.shardCategory == "Combat",
        shape: { A: { shardID: "shape", shape: "Cave Dweller Family" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },
    {
        id: "U7",
        predicate: (A, B) => A.shardFamily.includes("Shulker") && B.shardFamily.includes("Cave Dweller"),
        shape: { A: { shardID: "shape", shape: "Shulker Family" }, B: { shardID: "shape", shape: "Cave Dweller Family" }, amount: 2 },
    },
    {
        id: "U8",
        predicate: (A, B) => A.shardName == "Newt" && B.shardCategory == "Water",
        shape: { A: { shardID: "C35" }, B: { shardID: "shape", shape: "Water Shard" }, amount: 2 },
    },
    {
        id: "U9",
        predicate: (A, B) => A.shardFamily.includes("Shulker") && B.shardFamily.includes("Reptile"),
        shape: { A: { shardID: "shape", shape: "Shulker Family" }, B: { shardID: "shape", shape: "Reptile Family" }, amount: 2 },
    },
    {
        id: "U11",
        predicate: (A, B) => A.shardName == "Tadgang" && B.shardCategory == "Forest",
        shape: { A: { shardID: "C20" }, B: { shardID: "shape", shape: "Forest Shard" }, amount: 2 },
    },
    {
        id: "U21",
        predicate: (A, B) => A.shardName == "Cuboa" && B.shardCategory == "Combat",
        shape: { A: { shardID: "U9" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },
    /*{
        id: "U22",
        predicate: (A, B) => A.shardName == "Pest" && B.shardCategory == "Combat",
        shape: { A: { shardID: "U10" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },*/
    {
        id: "U34",
        predicate: (A, B) => A.shardFamily.includes("Bird") && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Uncommon or Higher Shard" }, amount: 2 },
    },
    {
        id: "U39",
        predicate: (A, B) => A.shardFamily.includes("Frog") && B.shardCategory == "Combat",
        shape: { A: { shardID: "shape", shape: "Frog Family" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },
    {
        id: "U40",
        predicate: (A, B) => A.shardFamily.includes("Bug") && B.shardSkill == "Mining",
        shape: { A: { shardID: "shape", shape: "Bug Family" }, B: { shardID: "shape", shape: "Mining Category" }, amount: 2 },
    },
    {
        id: "U41",
        predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "U" && getRarityIndex(B.shardID.slice(0, 1)) >= 1,
        shape: { A: { shardID: "shape", shape: "Uncommon Water Shard" }, B: { shardID: "shape", shape: "Any Shard" }, amount: 2 },
    },
    {
        id: "U65",
        predicate: (A, B) => A.shardName == "Tadgang" && B.shardCategory == "Combat",
        shape: { A: { shardID: "C20" }, B: { shardID: "shape", shape: "Combat Shard" }, amount: 2 },
    },
    {
        id: "U79",
        predicate: (A, B) => A.shardName == "Ant" && B.shardFamily.includes("Elusive"),
        shape: { A: { shardID: "C40" }, B: { shardID: "shape", shape: "Elusive Family" }, amount: 2 },
    },
    // Fusion recipes for Rare Shards
    {
        id: "R1",
        predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "R" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Rare Forest Shard" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    {
        id: "R2",
        predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "R" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Rare Water Shard" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    {
        id: "R3",
        predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "R" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Rare Combat Shard" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    {
        id: "R4",
        predicate: (A, B) => A.shardFamily.includes("Panda") && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Panda Family" }, B: { shardID: "shape", shape: "Uncommon or Higher Shard" }, amount: 2 },
    },
    {
        id: "R5",
        predicate: (A, B) => A.shardFamily.includes("Frog") && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Frog Family" }, B: { shardID: "shape", shape: "Uncommon or Higher Forest Shard" }, amount: 2 },
    },
    {
        id: "R8",
        predicate: (A, B) => A.shardFamily.includes("Lizard") && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Lizard Family" }, B: { shardID: "shape", shape: "Uncommon or Higher Water Shard" }, amount: 2 },
    },
    {
        id: "R9",
        predicate: (A, B) => A.shardName == "Viper" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "U21" }, B: { shardID: "shape", shape: "Uncommon or Higher Combat Shard" }, amount: 2 },
    },
    {
        id: "R13",
        predicate: (A, B) => A.shardFamily.includes("Shulker") && B.shardName == "Wither",
        shape: { A: { shardID: "R60" }, B: { shardID: "shape", shape: "Shulker Family" }, amount: 2 },
    },
    {
        id: "R15",
        predicate: (A, B) => A.shardName == "Lapis Zombie" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "C9" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    //{ id: "R16", predicate: (A, B) => A.shardName == "Termite" && B.shardName == "Praying Mantis" },
    {
        id: "R22",
        predicate: (A, B) => A.shardFamily.includes("Shulker") && B.shardFamily.includes("Demon"),
        shape: { A: { shardID: "shape", shape: "Shulker Family" }, B: { shardID: "shape", shape: "Demon Family" }, amount: 2 },
    },
    {
        id: "R30",
        predicate: (A, B) => A.shardName == "Lapis Skeleton" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R15" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    {
        id: "R33",
        predicate: (A, B) => A.shardName == "Troglobyte" && (B.shardFamily.includes("Cave Dweller") || B.shardName == "Abyssal Lanternfish"),
        shape: [
            { A: { shardID: "U6" }, B: { shardID: "shape", shape: "Cave Dweller Family" }, amount: 2 },
            { A: { shardID: "U6" }, B: { shardID: "R23" }, amount: 2 },
        ],
    },
    {
        id: "R34",
        predicate: (A, B) => A.shardFamily.includes("Shulker") && getRarityIndex(A.shardID.slice(0, 1)) >= 3 && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Rare or Higher Shulker Family" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    {
        id: "R43",
        predicate: (A, B) => A.shardName == "Termite" && B.shardName == "Invisibug",
        shape: { A: { shardID: "U40" }, B: { shardID: "R10" }, amount: 2 },
    },
    {
        id: "R46",
        predicate: (A, B) => A.shardFamily.includes("Frog") && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Frog Family" }, B: { shardID: "shape", shape: "Rare or Higher Forest Shard" }, amount: 2 },
    },
    {
        id: "R49",
        predicate: (A, B) => (A.shardName == "Phanpyre" || A.shardName == "Phanflare") && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: [
            { A: { shardID: "C4" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
            { A: { shardID: "C7" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
        ],
    },
    {
        id: "R51",
        predicate: (A, B) => A.shardName == "Quartzfang" && (B.shardFamily.includes("Cave Dweller") || B.shardName == "Silentdepth"),
        shape: [
            { A: { shardID: "R33" }, B: { shardID: "shape", shape: "Cave Dweller Family" }, amount: 2 },
            { A: { shardID: "R33" }, B: { shardID: "R29" }, amount: 2 },
        ],
    },
    {
        id: "R52",
        predicate: (A, B) => A.shardFamily.includes("Cave Dweller") && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Cave Dweller Family" }, B: { shardID: "shape", shape: "Epic or Higher Forest Shard" }, amount: 2 },
    },
    {
        id: "R54",
        predicate: (A, B) => A.shardName == "Python" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "R9" }, B: { shardID: "shape", shape: "Uncommon or Higher Combat Shard" }, amount: 2 },
    },
    {
        id: "R58",
        predicate: (A, B) => A.shardFamily.includes("Bird") && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    {
        id: "R62",
        predicate: (A, B) => A.shardFamily.includes("Creation") && getRarityIndex(A.shardID.slice(0, 1)) >= 4 && (B.shardName == "Shrieky Tiki" || B.shardName == "Sneaky Tiki" || B.shardName == "Cheeky Tiki"),
        shape: [
            { A: { shardID: "U69" }, B: { shardID: "shape", shape: "Epic or Higher Creation Family" }, amount: 2 },
            { A: { shardID: "U72" }, B: { shardID: "shape", shape: "Epic or Higher Creation Family" }, amount: 2 },
            { A: { shardID: "U75" }, B: { shardID: "shape", shape: "Epic or Higher Creation Family" }, amount: 2 },
        ],
    },
    {
        id: "R65",
        predicate: (A, B) => A.shardFamily.includes("Trash Lover") && B.shardFamily.includes("Bug") && getRarityIndex(B.shardID.slice(0, 1)) >= 2,
        shape: { A: { shardID: "shape", shape: "Trash Lover Family" }, B: { shardID: "shape", shape: "Uncommon or Higher Bug Family" }, amount: 2 },
    },
    {
        id: "R70",
        predicate: (A, B) => A.shardName == "Queen Ant" && B.shardName == "King Cobra",
        shape: { A: { shardID: "U79" }, B: { shardID: "R54" }, amount: 2 },
    },
    // Fusion recipes for Epic Shards
    {
        id: "E1",
        predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "E" && getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "shape", shape: "Epic Forest Shard" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    {
        id: "E2",
        predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "E" && getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "shape", shape: "Epic Water Shard" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    {
        id: "E3",
        predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "E" && getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "shape", shape: "Epic Combat Shard" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    {
        id: "E4",
        predicate: (A, B) => A.shardFamily.includes("Panda") && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Panda Family" }, B: { shardID: "shape", shape: "Rare or Higher Shard" }, amount: 2 },
    },
    {
        id: "E5",
        predicate: (A, B) => A.shardFamily.includes("Lizard") && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "shape", shape: "Lizard Family" }, B: { shardID: "shape", shape: "Rare or Higher Water Shard" }, amount: 2 },
    },
    {
        id: "E6",
        predicate: (A, B) => A.shardName == "Crocodile" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R45" }, B: { shardID: "shape", shape: "Rare or Higher Combat Shard" }, amount: 2 },
    },
    {
        id: "E7",
        predicate: (A, B) => A.shardName == "Bullfrog" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R46" }, B: { shardID: "shape", shape: "Rare or Higher Forest Shard" }, amount: 2 },
    },
    {
        id: "E9",
        predicate: (A, B) => A.shardName == "King Cobra" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R54" }, B: { shardID: "shape", shape: "Rare or Higher Combat Shard" }, amount: 2 },
    },
    {
        id: "E10",
        predicate: (A, B) => A.shardName == "Gecko" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R61" }, B: { shardID: "shape", shape: "Rare or Higher Forest Shard" }, amount: 2 },
    },
    {
        id: "E11",
        predicate: (A, B) => A.shardName == "Eel" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R53" }, B: { shardID: "shape", shape: "Rare or Higher Water Shard" }, amount: 2 },
    },
    {
        id: "E12",
        predicate: (A, B) => A.shardName == "Zealot" && B.shardCategory == "Combat" && B.shardFamily.includes("Elusive"),
        shape: { A: { shardID: "C21" }, B: { shardID: "shape", shape: "Elusive Family Combat Shard" }, amount: 2 },
    },
    {
        id: "E13",
        predicate: (A, B) => A.shardName == "Ladybug" && B.shardFamily.includes("Bug") && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "R43" }, B: { shardID: "shape", shape: "Rare or Higher Bug Family" }, amount: 2 },
    },
    {
        id: "E14",
        predicate: (A, B) => (A.shardName == "Eel" && B.shardName == "Moray Eel") || (A.shardName == "Moray Eel" && B.shardName == "Firefly"),
        shape: [
            { A: { shardID: "R53" }, B: { shardID: "E11" }, amount: 2 },
            { A: { shardID: "E31" }, B: { shardID: "E11" }, amount: 2 },
        ],
    },
    {
        id: "E16",
        predicate: (A, B) => A.shardFamily.includes("Shulker") && getRarityIndex(A.shardID.slice(0, 1)) >= 3 && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Rare or Higher Shulker Family" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    {
        id: "E19",
        predicate: (A, B) => A.shardFamily.includes("Phantom") && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Phantom Family" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    {
        id: "E22",
        predicate: (A, B) => A.shardName == "Iguana" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "E10" }, B: { shardID: "shape", shape: "Rare or Higher Forest Shard" }, amount: 2 },
    },
    {
        id: "E23",
        predicate: (A, B) => A.shardFamily.includes("Crustacean") && getRarityIndex(A.shardID.slice(0, 1)) >= 3 && getRarityIndex(B.shardID.slice(0, 1)) >= 3 && B.shardFamily.includes("Treasure Fish"),
        shape: { A: { shardID: "shape", shape: "Rare or Higher Crustacean Family" }, B: { shardID: "shape", shape: "Rare or Higher Treasure Fish Family" }, amount: 2 },
    },
    {
        id: "E28",
        predicate: (A, B) => A.shardFamily.includes("Bird") && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Epic or Higher Shard" }, amount: 2 },
    },
    {
        id: "E30",
        predicate: (A, B) => A.shardName == "Alligator" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "E6" }, B: { shardID: "shape", shape: "Rare or Higher Combat Shard" }, amount: 2 },
    },
    {
        id: "E31",
        predicate: (A, B) => A.shardName == "Praying Mantis" && (B.shardName == "Bezal" || B.shardName == "Cinderbat" || B.shardName == "Flare" || B.shardName == "Lava Flame" || B.shardName == "Fire Eel" || B.shardName == "Bal" || B.shardName == "Flaming Spider"),
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
    {
        id: "E32",
        predicate: (A, B) => A.shardName == "Moray Eel" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "E11" }, B: { shardID: "shape", shape: "Rare or Higher Water Shard" }, amount: 2 },
    },
    {
        id: "E35",
        predicate: (A, B) => A.shardName == "Shellwise" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 3,
        shape: { A: { shardID: "E26" }, B: { shardID: "shape", shape: "Rare or Higher Water Shard" }, amount: 2 },
    },
    {
        id: "E36",
        predicate: (A, B) => A.shardFamily.includes("Cave Dweller") && getRarityIndex(A.shardID.slice(0, 1)) >= 3 && B.shardFamily.includes("Cave Dweller") && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Rare or Higher Cave Dweller Family" }, B: { shardID: "shape", shape: "Epic or Higher Cave Dweller Family" }, amount: 2 },
    },
    {
        id: "E37",
        predicate: (A, B) => A.shardName == "Firefly" && B.shardFamily.includes("Dragon"),
        shape: { A: { shardID: "E31" }, B: { shardID: "shape", shape: "Dragon Family" }, amount: 2 },
    },
    {
        id: "E52",
        predicate: (A, B) => A.shardName == "Queen Bee" && B.shardName == "Lunar Moth",
        shape: { A: { shardID: "E49" }, B: { shardID: "E13" }, amount: 2 },
    },
    {
        id: "E63",
        predicate: (A, B) => A.shardName == "Gimmiegold" && getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "R77" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    // Fusion recipes for Legendary Shards
    {
        id: "L1",
        predicate: (A, B) => A.shardCategory == "Forest" && A.shardID.slice(0, 1) == "L" && B.shardFamily.includes("Elemental") && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Legendary Forest Shard" }, B: { shardID: "shape", shape: "Epic or Higher Elemental Family" }, amount: 2 },
    },
    {
        id: "L2",
        predicate: (A, B) => A.shardCategory == "Water" && A.shardID.slice(0, 1) == "L" && B.shardFamily.includes("Elemental") && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Legendary Water Shard" }, B: { shardID: "shape", shape: "Epic or Higher Elemental Family" }, amount: 2 },
    },
    {
        id: "L3",
        predicate: (A, B) => A.shardCategory == "Combat" && A.shardID.slice(0, 1) == "L" && B.shardFamily.includes("Elemental") && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "shape", shape: "Legendary Combat Shard" }, B: { shardID: "shape", shape: "Epic or Higher Elemental Family" }, amount: 2 },
    },
    {
        id: "L6",
        predicate: (A, B) => A.shardName == "Caiman" && B.shardCategory == "Combat" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "E30" }, B: { shardID: "shape", shape: "Epic or Higher Combat Shard" }, amount: 2 },
    },
    {
        id: "L7",
        predicate: (A, B) => A.shardName == "Komodo Dragon" && B.shardCategory == "Forest" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "E22" }, B: { shardID: "shape", shape: "Epic or Higher Forest Shard" }, amount: 2 },
    },
    {
        id: "L8",
        predicate: (A, B) => A.shardName == "Leatherback" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "E35" }, B: { shardID: "shape", shape: "Epic or Higher Water Shard" }, amount: 2 },
    },
    {
        id: "L11",
        predicate: (A, B) => A.shardName == "Sea Serpent" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "E32" }, B: { shardID: "shape", shape: "Epic or Higher Water Shard" }, amount: 2 },
    },
    {
        id: "L12",
        predicate: (A, B) => A.shardName == "Lapis Skeleton" && (B.shardName == "Ghost" || getRarityIndex(B.shardID.slice(0, 1)) >= 5),
        shape: [
            { A: { shardID: "R15" }, B: { shardID: "E33" }, amount: 2 },
            { A: { shardID: "R15" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
        ],
    },
    {
        id: "L13",
        predicate: (A, B) => A.shardName == "Dragonfly" && B.shardName == "Lunar Moth",
        shape: { A: { shardID: "E37" }, B: { shardID: "E13" }, amount: 2 },
    },
    {
        id: "L18",
        predicate: (A, B) => A.shardName == "Kraken" && B.shardName == "Kraken",
        shape: { A: { shardID: "L15" }, B: { shardID: "L15" }, amount: 2 },
    },
    {
        id: "L20",
        predicate: (A, B) => A.shardName == "Kraken" && B.shardCategory == "Water",
        shape: { A: { shardID: "L15" }, B: { shardID: "shape", shape: "Water Shard" }, amount: 2 },
    },
    {
        id: "L24",
        predicate: (A, B) => A.shardName == "Kraken" && B.shardFamily.includes("Bird"),
        shape: { A: { shardID: "L15" }, B: { shardID: "shape", shape: "Bird Family" }, amount: 2 },
    },
    {
        id: "L25",
        predicate: (A, B) => A.shardFamily.includes("Shulker") && getRarityIndex(A.shardID.slice(0, 1)) >= 4 && getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "shape", shape: "Epic or Higher Shulker Family" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    {
        id: "L29",
        predicate: (A, B) => A.shardName == "Tortoise" && B.shardCategory == "Water" && getRarityIndex(B.shardID.slice(0, 1)) >= 4,
        shape: { A: { shardID: "L8" }, B: { shardID: "shape", shape: "Epic or Higher Water Shard" }, amount: 2 },
    },
    {
        id: "L31",
        predicate: (A, B) => A.shardFamily.includes("Bird") && getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "shape", shape: "Bird Family" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    {
        id: "L32",
        predicate: (A, B) => A.shardName == "Shinyfish" && (B.shardName == "Bezal" || B.shardName == "Cinderbat" || B.shardName == "Flare" || B.shardName == "Lava Flame" || B.shardName == "Fire Eel" || B.shardName == "Bal" || B.shardName == "Flaming Spider"),
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
    {
        id: "L33",
        predicate: (A, B) => A.shardName == "Power Dragon",
        shape: { A: { shardID: "L30" }, B: { shardID: "shape", shape: "Any Shard" }, amount: 2 },
    },
    {
        id: "L34",
        predicate: (A, B) => A.shardName == "Condor" && getRarityIndex(B.shardID.slice(0, 1)) >= 5,
        shape: { A: { shardID: "L31" }, B: { shardID: "shape", shape: "Legendary Shard" }, amount: 2 },
    },
    {
        id: "L35",
        predicate: (A, B) => A.shardName == "Queen Bee" && B.shardName == "Queen Ant",
        shape: { A: { shardID: "E49" }, B: { shardID: "U79" }, amount: 2 },
    },
    {
        id: "L36",
        predicate: (A, B) => A.shardName == "Power Dragon" && B.shardName == "Kraken",
        shape: { A: { shardID: "L30" }, B: { shardID: "L15" }, amount: 2 },
    },
    {
        id: "L38",
        predicate: (A, B) => A.shardName == "Blue Crab" && getRarityIndex(B.shardID.slice(0, 1)) >= 3 && B.shardFamily.includes("Poltergeist"),
        shape: { A: { shardID: "L23" }, B: { shardID: "shape", shape: "Rare or Higher Poltergeist Family" }, amount: 2 },
    },
    {
        id: "L39",
        predicate: (A, B) => A.shardName == "Apex Dragon" && B.shardName == "Kraken",
        shape: { A: { shardID: "L33" }, B: { shardID: "L15" }, amount: 2 },
    },
    {
        id: "L41",
        predicate: (A, B) => A.shardName == "Sun Fish" && B.shardName == "Sun Fish",
        shape: { A: { shardID: "L32" }, B: { shardID: "L32" }, amount: 2 },
    },
    {
        id: "L42",
        predicate: (A, B) => A.shardName == "Etherdrake" && B.shardName == "Jormung",
        shape: { A: { shardID: "L36" }, B: { shardID: "L39" }, amount: 2 },
    },
    {
        id: "L44",
        predicate: (A, B) => A.shardFamily.includes("Elemental") && A.shardID.slice(0, 1) == "L" && B.shardName == "Galaxy Fish",
        shape: { A: { shardID: "L41" }, B: { shardID: "shape", shape: "Legendary Elemental Family" }, amount: 2 },
    },
];
