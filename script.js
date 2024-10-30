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

// Profile Data
let userProfile = { username: "" };

// Roll Button Event and Local Storage Load Functions
document.getElementById("rollButton").addEventListener("click", rollForRune);
window.addEventListener("load", () => {
    loadRunesFromStorage();
    displayJournalEntries();
    checkUserProfile();
});

// Load collections from localStorage
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
    
    if (randomRune.name.includes("Fehu") || randomRune.name.includes("Uruz")) { // Example probability
        addRuneToCollection(randomRune, randomRune.name.includes("Fehu") ? "elder" : "younger");
    }
}

// Add Rune to Collection
function addRuneToCollection(rune, type) {
    if (type === "elder" && !collectedRunes.elder.includes(rune)) {
        collectedRunes.elder.push(rune);
        localStorage.setItem("elderRunes", JSON.stringify(collectedRunes.elder));
        displayRunes();
    } else if (type === "younger" && !collectedRunes.younger.includes(rune)) {
        collectedRunes.younger.push(rune);
        localStorage.setItem("youngerRunes", JSON.stringify(collectedRunes.younger));
        displayRunes();
    }
}

// Display Runes
function displayRunes() {
    const elderList = document.getElementById("elderList");
    const youngerList = document.getElementById("youngerList");

    elderList.innerHTML = "";
    youngerList.innerHTML = "";

    collectedRunes.elder.forEach(rune => createRuneElement(rune, elderList));
    collectedRunes.younger.forEach(rune => createRuneElement(rune, youngerList));
}

// Create Rune Element
function createRuneElement(rune, list) {
    const runeElement = document.createElement("div");
    runeElement.classList.add("rune-item");
    runeElement.innerText = rune.name;
    runeElement.addEventListener("click", () => openModal(rune));
    list.appendChild(runeElement);
}

// Modal Functionality
function openModal(rune) {
    document.getElementById("runeName").innerText = rune.name;
    document.getElementById("runeDescription").innerText = rune.description;
    document.getElementById("runeLore").innerText = rune.lore;
    document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
});

// Profile Creation Functionality
document.getElementById("createProfileButton").addEventListener("click", createProfile);

function createProfile() {
    const username = document.getElementById("usernameInput").value.trim();
    if (username.startsWith("@") && username.length > 1) {
        userProfile.username = username;
        document.getElementById("profileMessage").innerText = "Profile created: " + username;
        document.getElementById("profileMessage").classList.remove("hidden");
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        switchToPage("homepage");
    } else {
        alert("Please enter a valid username starting with '@'.");
    }
}

function checkUserProfile() {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile && savedProfile.username) {
        userProfile = savedProfile;
        document.getElementById("profileMessage").innerText = "Welcome back, " + userProfile.username;
        document.getElementById("profileMessage").classList.remove("hidden");
        switchToPage("homepage");
    } else {
        switchToPage("profilePage");
    }
}

// Sharing Functionality
document.getElementById("shareButton").addEventListener("click", shareCollection);

function shareCollection() {
    const shareText = `Check out my Norse Runes collection! 
    Elder Runes: ${collectedRunes.elder.map(r => r.name).join(", ")}
    Younger Runes: ${collectedRunes.younger.map(r => r.name).join(", ")}
    #NorseRunesLearning`;

    if (navigator.share) {
        navigator.share({
            title: 'Norse Runes Collection',
            text: shareText,
            url: window.location.href
        }).then(() => {
            console.log('Share successful');
        }).catch((error) => {
            console.log('Error sharing:', error);
        });
    } else {
        alert('Sharing not supported on this browser.');
    }
}

// Search Functionality
document.getElementById("searchInput").addEventListener("input", searchRunes);

function searchRunes() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const elderList = document.getElementById("elderList");
    const youngerList = document.getElementById("youngerList");
    const searchResults = document.getElementById("searchResults");

    searchResults.innerHTML = "";
    elderList.childNodes.forEach(item => {
        if (item.innerText.toLowerCase().includes(query)) {
            searchResults.appendChild(item.cloneNode(true));
        }
    });
    youngerList.childNodes.forEach(item => {
        if (item.innerText.toLowerCase().includes(query)) {
            searchResults.appendChild(item.cloneNode(true));
        }
    });

    if (searchResults.childNodes.length > 0) {
        searchResults.classList.remove("hidden");
    } else {
        searchResults.classList.add("hidden");
    }
}

// --- Journal Functionality ---
let journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

document.getElementById("saveJournalEntry").addEventListener("click", () => {
    const entryText = document.getElementById("journalEntry").value.trim();
    if (entryText) {
        const entry = { text: entryText, date: new Date().toLocaleString() };
        journalEntries.push(entry);
        saveJournalEntries();
        displayJournalEntries();
        document.getElementById("journalEntry").value = "";
    }
});

function saveJournalEntries() {
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
}

function displayJournalEntries() {
    const entriesList = document.getElementById("journalEntriesList");
    entriesList.innerHTML = "";

    journalEntries.forEach((entry, index) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("journal-entry");

        const entryText = document.createElement("p");
        entryText.innerText = entry.text;

        const entryDate = document.createElement("span");
        entryDate.classList.add("entry-date");
        entryDate.innerText = entry.date;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-entry");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteJournalEntry(index);
        });

        entryDiv.appendChild(entryText);
        entryDiv.appendChild(entryDate);
        entryDiv.appendChild(deleteButton);

        entriesList.appendChild(entryDiv);
    });
}

function deleteJournalEntry(index) {
    journalEntries.splice(index, 1);
    saveJournalEntries();
    displayJournalEntries();
}

// Page Switching Functionality
const navButtons = document.querySelectorAll(".nav-btn");
navButtons.forEach(button => {
    button.addEventListener("click", () => {
        const targetPage = button.getAttribute("data-target");
        switchToPage(targetPage);
    });
});

function switchToPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });
    document.getElementById(pageId).classList.remove("hidden");
}
