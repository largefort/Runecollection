// Rune data
const elderFuthark = [
    { name: "Fehu", meaning: "Wealth", lore: "Represents material wealth and prosperity." },
    { name: "Uruz", meaning: "Strength", lore: "Symbolizes strength and health." },
    { name: "Thurisaz", meaning: "Giant", lore: "Represents protection and conflict." },
    { name: "Ansuz", meaning: "Wisdom", lore: "Represents knowledge and communication." },
    { name: "Raido", meaning: "Journey", lore: "Symbolizes travel and movement." },
    { name: "Kaunan", meaning: "Torch", lore: "Represents creativity and illumination." },
    { name: "Gebo", meaning: "Gift", lore: "Symbolizes generosity and partnerships." },
    { name: "Wunjo", meaning: "Joy", lore: "Represents joy and harmony." },
    { name: "Hagalaz", meaning: "Hail", lore: "Symbolizes disruption and transformation." },
    { name: "Nauthiz", meaning: "Need", lore: "Represents necessity and survival." },
    { name: "Isa", meaning: "Ice", lore: "Symbolizes stagnation and stillness." },
    { name: "Jera", meaning: "Year", lore: "Represents cycles and harvest." },
    { name: "Eihwaz", meaning: "Yew", lore: "Symbolizes resilience and endurance." },
    { name: "Pethro", meaning: "Lot", lore: "Represents chance and fate." },
    { name: "Algiz", meaning: "Protection", lore: "Symbolizes protection and defense." },
    { name: "Sowilo", meaning: "Sun", lore: "Represents success and positivity." },
    { name: "Tiwaz", meaning: "Victory", lore: "Symbolizes honor and justice." },
    { name: "Berkano", meaning: "Birch", lore: "Represents fertility and growth." },
    { name: "Ehwaz", meaning: "Horse", lore: "Symbolizes trust and partnership." },
    { name: "Madr", meaning: "Man", lore: "Represents humanity and community." },
    { name: "Laguz", meaning: "Water", lore: "Symbolizes intuition and emotions." },
    { name: "Inguz", meaning: "Fertility", lore: "Represents new beginnings and fertility." },
    { name: "Dagaz", meaning: "Day", lore: "Symbolizes awakening and transformation." },
    { name: "Othala", meaning: "Heritage", lore: "Represents inheritance and legacy." },
    { name: "Bree", meaning: "Home", lore: "Symbolizes comfort and security." },
];

const youngerFuthark = [
    { name: "F", meaning: "Wealth", lore: "Represents material wealth and prosperity." },
    { name: "U", meaning: "Strength", lore: "Symbolizes strength and health." },
    { name: "Þ", meaning: "Giant", lore: "Represents protection and conflict." },
    { name: "A", meaning: "Wisdom", lore: "Represents knowledge and communication." },
    { name: "R", meaning: "Journey", lore: "Symbolizes travel and movement." },
    { name: "K", meaning: "Torch", lore: "Represents creativity and illumination." },
    { name: "G", meaning: "Gift", lore: "Symbolizes generosity and partnerships." },
    { name: "V", meaning: "Joy", lore: "Represents joy and harmony." },
    { name: "H", meaning: "Hail", lore: "Symbolizes disruption and transformation." },
    { name: "N", meaning: "Need", lore: "Represents necessity and survival." },
    { name: "I", meaning: "Ice", lore: "Symbolizes stagnation and stillness." },
    { name: "J", meaning: "Year", lore: "Represents cycles and harvest." },
    { name: "E", meaning: "Yew", lore: "Symbolizes resilience and endurance." },
    { name: "P", meaning: "Lot", lore: "Represents chance and fate." },
    { name: "Z", meaning: "Protection", lore: "Symbolizes protection and defense." },
    { name: "S", meaning: "Sun", lore: "Represents success and positivity." },
];

// Collections for Runes
const collectedRunes = {
    elder: [],
    younger: []
};

// Roll for a Rune function
function rollForRune() {
    const randomElder = Math.floor(Math.random() * elderFuthark.length);
    const randomYounger = Math.floor(Math.random() * youngerFuthark.length);
    const elderRune = elderFuthark[randomElder];
    const youngerRune = youngerFuthark[randomYounger];

    // Decide which rune to add based on random chance (for example)
    if (Math.random() < 0.5) {
        addRuneToCollection(elderRune, "elder");
        alert(`You rolled: ${elderRune.name} - ${elderRune.meaning}`);
    } else {
        addRuneToCollection(youngerRune, "younger");
        alert(`You rolled: ${youngerRune.name} - ${youngerRune.meaning}`);
    }
}

// Add Rune to Collection
function addRuneToCollection(rune, type) {
    const listId = type === "elder" ? "elderList" : "youngerList";
    const list = document.getElementById(listId);

    // Check if rune is already collected
    if (collectedRunes[type].some(collected => collected.name === rune.name)) return;

    collectedRunes[type].push(rune);
    saveToStorage();

    // Create a new rune element
    const runeElement = document.createElement("div");
    runeElement.classList.add("rune-item");
    runeElement.innerText = rune.name;

    // Add click event for the modal
    runeElement.addEventListener("click", () => openModal(rune));
    list.appendChild(runeElement);
}

// Save to Local Storage
function saveToStorage() {
    localStorage.setItem("runes", JSON.stringify(collectedRunes));
}

// Load from Local Storage
function loadFromStorage() {
    const storedRunes = localStorage.getItem("runes");
    if (storedRunes) {
        Object.assign(collectedRunes, JSON.parse(storedRunes));
        updateRuneCollections();
    }
}

// Update the collections in the UI
function updateRuneCollections() {
    const elderList = document.getElementById("elderList");
    const youngerList = document.getElementById("youngerList");

    elderList.innerHTML = ""; // Clear the list first
    youngerList.innerHTML = ""; // Clear the list first

    collectedRunes.elder.forEach(rune => {
        const div = document.createElement("div");
        div.className = "rune-item";
        div.innerHTML = rune.name;
        div.title = rune.meaning; // Show meaning on hover
        div.addEventListener("click", () => openModal(rune));
        elderList.appendChild(div);
    });

    collectedRunes.younger.forEach(rune => {
        const div = document.createElement("div");
        div.className = "rune-item";
        div.innerHTML = rune.name;
        div.title = rune.meaning; // Show meaning on hover
        div.addEventListener("click", () => openModal(rune));
        youngerList.appendChild(div);
    });
}

// Open modal with rune details
function openModal(rune) {
    document.getElementById("runeName").innerText = rune.name;
    document.getElementById("runeDescription").innerText = rune.meaning;
    document.getElementById("runeLore").innerText = rune.lore;
    document.getElementById("modal").classList.remove("hidden");
}

// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
});

// Set up event listener for the roll button
document.getElementById("rollButton").addEventListener("click", rollForRune);

// Navigation buttons to switch pages
document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", (event) => {
        const targetPage = event.target.dataset.target;
        document.querySelectorAll(".page").forEach(page => {
            page.classList.add("hidden");
        });
        document.getElementById(targetPage).classList.remove("hidden");
    });
});

// Load stored runes on initialization
loadFromStorage();
