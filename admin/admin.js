document.addEventListener("DOMContentLoaded", displayEntries);

document.getElementById("entry-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const fullContent = document.getElementById("fullContent").value;
    const screenshotInput = document.getElementById("screenshot");

    if (screenshotInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = e.target.result;
            console.log("Image Data:", image); // Debugging Log
            saveEntry(title, description, fullContent, image);
        };
        reader.readAsDataURL(screenshotInput.files[0]);
    } else {
        saveEntry(title, description, fullContent, null);
    }
});

function saveEntry(title, description, fullContent, image) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    const newEntry = { title, description, fullContent, image };
    entries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(entries));

    displayEntries();
    document.getElementById("entry-form").reset();
}

function displayEntries() {
    const entriesContainer = document.getElementById("entries");
    entriesContainer.innerHTML = ""; // Clear previous content

    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    entries.forEach((entry, index) => {
        const entryCard = document.createElement("div");
        entryCard.classList.add("card");

        entryCard.innerHTML = `
            <h3>${entry.title}</h3>
            <p>${entry.description}</p>
            ${entry.image ? `<img src="${entry.image}" alt="Post Image" style="width: 100%; height: auto; border-radius: 10px;">` : ""}
            <button onclick="editEntry(${index})">Edit</button>
            <button onclick="deleteEntry(${index})">Delete</button>
        `;

        entriesContainer.appendChild(entryCard);
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    displayEntries();
}

function editEntry(index) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    const entry = entries[index];

    document.getElementById("title").value = entry.title;
    document.getElementById("description").value = entry.description;
    document.getElementById("fullContent").value = entry.fullContent;

    // Remove old entry and allow re-saving with new data
    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    displayEntries();
}
