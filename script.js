
document.addEventListener("DOMContentLoaded", function () {

    const resources = [
        {
            subject: "Constitutional Law - I",
            filename: "Constitution Law-1 complete notes.pdf",
            icon: "⚖️"
        },
        {
            subject: "Contracts Law - I",
            filename: "Contracts Law-1 complete notes.pdf",
            icon: "📜"
        },
        {
            subject: "Cyber Law",
            filename: "Cyber Law complete notes.pdf",
            icon: "💻"
        },
        {
            subject: "Family Law",
            filename: "Family Law complete notes.pdf",
            icon: "👨‍👩‍👧"
        },
        {
            subject: "Law of Torts",
            filename: "Law of Torts complete notes.pdf",
            icon: "📚"
        }
    ];

    const grid = document.getElementById("resourceGrid");
    const search = document.getElementById("searchInput");
    const count = document.getElementById("resourceCount");
    const noResults = document.getElementById("noResults");

    document.getElementById("year").textContent =
        new Date().getFullYear();

    function displayResources() {

        grid.innerHTML = "";

        resources.forEach(resource => {

            const card = document.createElement("div");
            card.className = "resource-card";

            const icon = document.createElement("div");
            icon.className = "resource-icon";
            icon.textContent = resource.icon;

            const title = document.createElement("h3");
            title.textContent = resource.subject;

            const description = document.createElement("p");
            description.textContent = "Complete Subject Notes";

            const actions = document.createElement("div");
            actions.className = "resource-actions";

            const pdfURL = new URL(
                "./" +
                encodeURIComponent("complete notes") +
                "/" +
                encodeURIComponent(resource.filename),
                document.baseURI
            ).href;

            const read = document.createElement("a");
            read.href = pdfURL;
            read.target = "_blank";
            read.rel = "noopener noreferrer";
            read.className = "read-button";
            read.textContent = "Read PDF";

            const download = document.createElement("a");
            download.href = pdfURL;
            download.download = resource.filename;
            download.className = "download-button";
            download.textContent = "Download PDF";

            actions.append(read, download);

            card.append(icon, title, description, actions);

            grid.appendChild(card);

        });

        count.textContent =
            resources.length + " Subject-wise Complete Notes";

        filterResources();
    }

    function filterResources() {

        const term = search.value.toLowerCase().trim();

        const cards = grid.querySelectorAll(".resource-card");

        let visible = 0;

        cards.forEach(card => {

            const subject = card.querySelector("h3")
                .textContent.toLowerCase();

            const match = subject.includes(term);

            card.style.display = match ? "" : "none";

            if (match) visible++;

        });

        noResults.hidden = visible !== 0;

    }

    search.addEventListener("input", filterResources);

    displayResources();

});
