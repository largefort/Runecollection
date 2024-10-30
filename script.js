// script.js

const elderFutharkRunes = [
    { name: "Fehu", description: "Wealth", lore: "Symbolizes prosperity and good fortune." },
    { name: "Uruz", description: "Strength", lore: "Represents power, endurance, and growth." },
    { name: "Thurisaz", description: "Giant", lore: "Associated with Thor and represents protection." },
    { name: "Ansuz", description: "God", lore: "Symbolizes divine communication and wisdom." },
    { name: "Raido", description: "Journey", lore: "Represents travel, movement, and progress." },
    { name: "Kenaz", description: "Torch", lore: "Symbolizes knowledge and enlightenment." },
    { name: "Gebo", description: "Gift", lore: "Represents partnership, generosity, and exchanges." },
    { name: "Wunjo", description: "Joy", lore: "Symbolizes harmony and well-being." },
    { name: "Hagalaz", description: "Hail", lore: "Represents natural forces beyond human control." },
    { name: "Nauthiz", description: "Need", lore: "Symbolizes necessity and resilience." },
    { name: "Isa", description: "Ice", lore: "Represents stasis, challenges, and obstacles." },
    { name: "Jera", description: "Year", lore: "Symbolizes cycles, harvest, and rewards." },
    { name: "Eihwaz", description: "Yew", lore: "Represents resilience and transformation." },
    { name: "Perthro", description: "Fate", lore: "Symbolizes mysteries, fate, and luck." },
    { name: "Algiz", description: "Elk", lore: "Represents protection and divine influence." },
    { name: "Sowilo", description: "Sun", lore: "Symbolizes success, honor, and achievements." },
    { name: "Tiwaz", description: "Tyr", lore: "Represents justice, honor, and sacrifice." },
    { name: "Berkano", description: "Birch", lore: "Symbolizes birth, growth, and fertility." },
    { name: "Ehwaz", description: "Horse", lore: "Represents teamwork, trust, and movement." },
    { name: "Mannaz", description: "Man", lore: "Symbolizes humanity, support, and cooperation." },
    { name: "Laguz", description: "Water", lore: "Represents intuition, flow, and renewal." },
    { name: "Ingwaz", description: "Seed", lore: "Symbolizes potential and personal growth." },
    { name: "Dagaz", description: "Day", lore: "Represents awakening and new beginnings." },
    { name: "Othala", description: "Inheritance", lore: "Symbolizes heritage and tradition." }
];

const youngerFutharkRunes = [
    { name: "Fe", description: "Livestock", lore: "Represents wealth and resources." },
    { name: "Ur", description: "Drizzle", lore: "Symbolizes the natural world and resilience." },
    { name: "Thurs", description: "Giant", lore: "Represents conflict and protection." },
    { name: "As", description: "God", lore: "Symbolizes divine forces and wisdom." },
    { name: "Reid", description: "Riding", lore: "Represents travel, journeys, and movement." },
    { name: "Kaun", description: "Sore", lore: "Symbolizes inner fire and knowledge." },
    { name: "Hagall", description: "Hail", lore: "Represents natural forces and change." },
    { name: "Naud", description: "Need", lore: "Symbolizes necessity and endurance." },
    { name: "Is", description: "Ice", lore: "Represents stillness and control." },
    { name: "Ar", description: "Harvest", lore: "Symbolizes cycles and rewards." },
    { name: "Sol", description: "Sun", lore: "Represents strength, energy, and success." },
    { name: "Tyr", description: "Tyr", lore: "Symbolizes justice and sacrifice." },
    { name: "Bjarkan", description: "Birch", lore: "Represents new beginnings and growth." },
    { name: "Madr", description: "Man", lore: "Symbolizes humanity and cooperation." },
    { name: "Logr", description: "Water", lore: "Represents intuition and flow." },
    { name: "Yr", description: "Bow", lore: "Symbolizes skill and perseverance." }
];

const collectedRunes = { elder: [], younger: [] };

document.getElementById("rollButton").addEventListener("click", rollForRune);

// Load collections from localStorage on page load
window.addEventListener("load", loadRunesFromStorage);

function loadRunesFromStorage() {
    const savedElderRunes = JSON.parse(localStorage.getItem("elderRunes")) || [];
    const savedYoungerRunes = JSON.parse(localStorage.getItem("youngerRunes")) || [];

    savedElderRunes.forEach(rune => addRuneToCollection(rune, "elder"));
    savedYoungerRunes.forEach(rune => addRuneToCollection(rune, "younger"));
}

function rollForRune() {
    const allRunes = elderFutharkRunes.concat(youngerFutharkRunes);
    const randomRune = allRunes[Math.floor(Math.random() * allRunes.length)];
    const runeType = elderFutharkRunes.includes(randomRune) ? "elder" : "younger";
    addRuneToCollection(randomRune, runeType);
}

function saveToStorage() {
    localStorage.setItem("elderRunes", JSON.stringify(collectedRunes.elder));
    localStorage.setItem("youngerRunes", JSON.stringify(collectedRunes.younger));
}

function addRuneToCollection(rune, type) {
    const gridId = type === "elder" ? "elderGrid" : "youngerGrid";
    const grid = document.getElementById(gridId);

    if (collectedRunes[type].some(collected => collected.name === rune.name)) return;

    collectedRunes[type].push(rune);
    saveToStorage();

    const runeElement = document.createElement("div");
    runeElement.classList.add("rune-item");
    runeElement.innerText = rune.name;

    runeElement.addEventListener("click", () => openModal(rune));

    const description = document.createElement("div");
    description.classList.add("rune-description");
    description.innerText = rune.description;

    runeElement.appendChild(description);
    grid.appendChild(runeElement);

    document.getElementById("runesCollection").classList.remove("hidden");
}

// Function to open modal with detailed information
function openModal(rune) {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("runeName").innerText = rune.name;
    document.getElementById("runeDescription").innerText = rune.description;
    document.getElementById("runeLore").innerText = rune.lore;
}

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
});
