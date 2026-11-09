import { FindingsCollection } from "./FindingsCollection.js";
const findings = [
    {
        id: "F-001",
        title: "Unnecessary service exposed",
        asset: "lab-server-01",
        severity: "High",
        status: "Open"
    },
    {
        id: "F-002",
        title: "Outdated software detected",
        asset: "lab-workstation-01",
        severity: "Medium",
        status: "Open"
    },
    {
        id: "F-003",
        title: "Weak password policy",
        asset: "lab-server-02",
        severity: "High",
        status: "Closed"
    }
];

const collection = new FindingsCollection(findings);

function renderFindings(findingList) {
    const tableBody = document.getElementById("findings-body");

    tableBody.textContent = "";

    for (const finding of findingList) {
        const row = document.createElement("tr");

        const values = [
            finding.id,
            finding.title,
            finding.asset,
            finding.severity,
            finding.status
        ];

        for (const value of values) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }
}

const severityFilter = document.getElementById("severity-filter");
const statusFilter = document.getElementById("status-filter");
const resultsCount = document.getElementById("results-count");
const assetSearch = document.getElementById("asset-search");

function applyFilters() {
    const filteredFindings = collection.filter(
        severityFilter.value,
        statusFilter.value,
        assetSearch.value
    );

    renderFindings(filteredFindings);

    if (filteredFindings.length === 0) {
        resultsCount.textContent =
            "No findings match selected filters";
    } else {
        resultsCount.textContent =
        `Showing ${filteredFindings.length} of ${collection.getTotalCount()} findings.`;
    }
}

severityFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
assetSearch.addEventListener("input", applyFilters);

applyFilters();
