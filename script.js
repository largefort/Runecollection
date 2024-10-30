// Elder Futhark Rune Data
const elderFutharkRunes = [
    { name: "Fehu", description: "Wealth", lore: "Symbolizes prosperity and good fortune." },
    { name: "Uruz", description: "Strength", lore: "Represents physical and spiritual strength." },
    { name: "Thurisaz", description: "Giant", lore: "Symbolizes chaos and conflict, as well as powerful forces." },
    { name: "Ansuz", description: "God", lore: "Represents communication and divine inspiration." },
    { name: "Raidho", description: "Journey", lore: "Symbolizes a journey, both physical and spiritual." },
    { name: "Kenaz", description: "Torch", lore: "Represents knowledge, creativity, and enlightenment." },
    { name: "Gebo", description: "Gift", lore: "Symbolizes generosity and relationships." },
    { name: "Wunjo", description: "Joy", lore: "Represents harmony and joy." },
    { name: "Hagalaz", description: "Hail", lore: "Symbolizes transformation through hardship." },
    { name: "Nauthiz", description: "Need", lore: "Represents necessity and resilience." },
    { name: "Isa", description: "Ice", lore: "Symbolizes stillness and challenges." },
    { name: "Jera", description: "Year", lore: "Represents cycles, harvest, and reward." },
    { name: "Eihwaz", description: "Yew Tree", lore: "Symbolizes endurance and connection between worlds." },
    { name: "Perthro", description: "Mystery", lore: "Represents fate, secrets, and the unknown." },
    { name: "Algiz", description: "Elk", lore: "Symbolizes protection and defense." },
    { name: "Sowilo", description: "Sun", lore: "Represents success, guidance, and energy." },
    { name: "Tiwaz", description: "Tyr", lore: "Symbolizes honor, sacrifice, and justice." },
    { name: "Berkano", description: "Birch", lore: "Represents growth, fertility, and new beginnings." },
    { name: "Ehwaz", description: "Horse", lore: "Symbolizes teamwork, loyalty, and trust." },
    { name: "Mannaz", description: "Man", lore: "Represents humanity, the self, and community." },
    { name: "Laguz", description: "Water", lore: "Symbolizes flow, intuition, and the subconscious." },
    { name: "Ingwaz", description: "Seed", lore: "Represents fertility, potential, and growth." },
    { name: "Dagaz", description: "Day", lore: "Symbolizes breakthrough, transformation, and clarity." },
    { name: "Othala", description: "Inheritance", lore: "Represents heritage, tradition, and legacy." }
];

// Younger Futhark Rune Data
const youngerFutharkRunes = [
    { name: "Fe", description: "Livestock", lore: "Represents wealth and resources." },
    { name: "Ur", description: "Rain", lore: "Symbolizes strength and endurance." },
    { name: "Thurs", description: "Giant", lore: "Represents chaotic forces and challenges." },
    { name: "As", description: "God", lore: "Symbolizes divine inspiration and communication." },
    { name: "Reið", description: "Journey", lore: "Represents travel and spiritual movement." },
    { name: "Kaun", description: "Ulcer", lore: "Symbolizes pain, hardship, and healing." },
    { name: "Hagall", description: "Hail", lore: "Represents transformation and change." },
    { name: "Naudhr", description: "Need", lore: "Symbolizes necessity and endurance." },
    { name: "Is", description: "Ice", lore: "Represents stillness and challenge." },
    { name: "Ar", description: "Harvest", lore: "Represents reward and abundance." },
    { name: "Sol", description: "Sun", lore: "Symbolizes success and energy." },
    { name: "Tyr", description: "Honor", lore: "Represents justice, honor, and self-sacrifice." },
    { name: "Bjarkan", description: "Birch", lore: "Represents new beginnings and growth." },
    { name: "Madhr", description: "Man", lore: "Symbolizes humanity and the self." },
    { name: "Løgr", description: "Water", lore: "Represents intuition and flow." },
    { name: "Yr", description: "Yew", lore: "Symbolizes endurance and resilience." }
];

// Collected Runes Data
const collectedRunes = { elder: [], younger: [] };

// Roll Button Event
document.getElementById("rollButton").addEventListener("click", rollForRune);

// Load collections from localStorage on page load
window.addEventListener("load", loadRunesFromStorage);

function loadRunesFromStorage() {
    const savedElderRunes = JSON.parse(localStorage.getItem("elderRunes")) || [];
    const savedYoungerRunes = JSON.parse(localStorage.getItem("youngerRunes")) || [];

    savedElderRunes.forEach(rune => addRuneToCollection(rune, "elder"));
    savedYoungerRunes.forEach(rune => addRuneToCollection(rune, "younger"));
}

// Roll for a Rune
function rollForRune() {
    const allRunes = elderFutharkRunes.concat(youngerFutharkRunes);
    const randomRune = allRunes[Math.floor(Math.random() * allRunes.length)];
    const runeType = elderFutharkRunes.includes(randomRune) ? "elder" : "younger";
    addRuneToCollection(randomRune, runeType);
}

// Save to localStorage
function saveToStorage() {
    localStorage.setItem("elderRunes", JSON.stringify(collectedRunes.elder));
    localStorage.setItem("youngerRunes", JSON.stringify(collectedRunes.younger));
}

// Add Rune to Collection
function addRuneToCollection(rune, type) {
    const listId = type === "elder" ? "elderList" : "youngerList";
    const list = document.getElementById(listId);

    if (collectedRunes[type].some(collected => collected.name === rune.name)) return;

    collectedRunes[type].push(rune);
    saveToStorage();

    const runeElement = document.createElement("div");
    runeElement.classList.add("rune-item");
    runeElement.innerText = rune.name;

    runeElement.addEventListener("click", () => openModal(rune));
    list.appendChild(runeElement);
}

// Bottom Navigation
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
        document.getElementById(button.dataset.target).classList.remove("hidden");
    });
});

// Modal Functionality
function openModal(rune) {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("runeName").innerText = rune.name;
    document.getElementById("runeDescription").innerText = rune.description;
    document.getElementById("runeLore").innerText = rune.lore;
}

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
});
