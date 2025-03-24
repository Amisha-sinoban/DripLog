document.addEventListener("DOMContentLoaded", () => {
    const entryGrid = document.getElementById("entry-grid");

    function getEntriesFromStorage() {
        return JSON.parse(localStorage.getItem("entries")) || [];
    }

    function displayEntries() {
        let entries = getEntriesFromStorage();
        entryGrid.innerHTML = "";
        entries.forEach((entry, index) => addEntryToDOM(entry, index));
    }

    function addEntryToDOM(entry) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${entry.title}</h3>
            <p>${entry.description}</p>
            ${entry.image ? `<img src="${entry.image}" alt="Uploaded Image" style="max-width: 100px;">` : ""}
            <button onclick="viewEntry('${entry.title.replace(/'/g, "&#39;")}', '${entry.description.replace(/'/g, "&#39;")}', '${entry.fullContent.replace(/'/g, "&#39;")}', '${entry.image}')">View Details</button>
        `;
        entryGrid.appendChild(card);
    }

    displayEntries();
});

function viewEntry(title, description, fullContent, image) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalContent").textContent = fullContent;
    if (image) {
        document.getElementById("modalImage").src = image;
        document.getElementById("modalImage").style.display = "block";
    } else {
        document.getElementById("modalImage").style.display = "none";
    }
    document.getElementById("entryModal").style.display = "block";
}

function closeModal() {
    document.getElementById("entryModal").style.display = "none";
}
