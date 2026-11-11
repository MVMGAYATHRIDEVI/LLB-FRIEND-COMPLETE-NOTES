
const pdfFolder = "Complete%20Notes/";

const subjects = [
    {
        name: "Law of Contract I",
        icon: "📜",
        file: "Contracts Law-1 complete notes.pdf"
    },
    {
        name: "Constitutional Law I",
        icon: "⚖️",
        file: "Constitution Law-1 complete notes.pdf"
    },
    {
        name: "Family Law I",
        icon: "👨‍👩‍👧",
        file: "Family Law-1 complete notes.pdf"
    },
    {
        name: "Law of Torts",
        icon: "🏛️",
        file: "Law of Torts complete notes.pdf"
    },
    {
        name: "Cyber Law",
        icon: "💻",
        file: "Cyber Law complete notes.pdf"
    }
];

const resourceGrid = document.getElementById("resourceGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");
const resourceCount = document.getElementById("resourceCount");

let availableSubjects = [];

document.getElementById("year").textContent = new Date().getFullYear();

function getPdfPath(fileName) {
    return `${pdfFolder}${encodeURIComponent(fileName)}`;
}

async function checkPdfExists(path) {
    try {
        const response = await fetch(path, { method: "HEAD" });
        return response.ok;
    } catch (error) {
        console.error("Unable to check PDF:", path, error);
        return false;
    }
}

function createSubjectCard(subject) {
    const card = document.createElement("article");
    card.className = "resource-card";

    const filePath = getPdfPath(subject.file);

    const statusHTML = subject.available
        ? `<span class="status available">PDF Available</span>`
        : `<span class="status missing">No records found</span>`;

    const actionsHTML = subject.available
        ? `
            <a class="action-button read-button"
               href="${filePath}"
               target="_blank"
               rel="noopener">
               Read PDF
            </a>

            <a class="action-button download-button"
               href="${filePath}"
               download="${subject.file}">
               Download PDF
            </a>
        `
        : `
            <span class="action-button disabled-button">
                PDF Not Available
            </span>
        `;

    card.innerHTML = `
        <div class="card-top">
            <div class="subject-icon">${subject.icon}</div>

            <div class="subject-details">
                <h3>${subject.name}</h3>
                <p>Complete LLB Study Notes</p>
                ${statusHTML}
            </div>
        </div>

        <div class="card-actions">
            ${actionsHTML}
        </div>
    `;

    return card;
}

function displaySubjects(list) {
    resourceGrid.innerHTML = "";

    if (list.length === 0) {
        noResults.hidden = false;
        return;
    }

    noResults.hidden = true;

    list.forEach(subject => {
        resourceGrid.appendChild(createSubjectCard(subject));
    });
}

async function loadSubjects() {
    resourceCount.textContent = "Checking available PDF files...";

    const checkedSubjects = await Promise.all(
        subjects.map(async subject => {
            const path = getPdfPath(subject.file);

            return {
                ...subject,
                available: await checkPdfExists(path)
            };
        })
    );

    availableSubjects = checkedSubjects;

    const availableCount = checkedSubjects.filter(
        subject => subject.available
    ).length;

    resourceCount.textContent =
        `${availableCount} of ${subjects.length} PDF files available`;

    displaySubjects(availableSubjects);
}

searchInput.addEventListener("input", function () {
    const searchText = this.value.trim().toLowerCase();

    const filteredSubjects = availableSubjects.filter(subject =>
        subject.name.toLowerCase().includes(searchText)
    );

    displaySubjects(filteredSubjects);
});

loadSubjects();
