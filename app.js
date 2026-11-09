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

function summarizeFindings(findingList) {
    let highSeverityCount = 0;
    let openCount = 0;

    for (const finding of findingList) {
        if (finding.severity === "High") {
            highSeverityCount++;
        }

        if (finding.status === "Open") {
            openCount++;
        }
    }

    console.log("Security Findings Summary");
    console.log("-------------------------");
    console.log(`Total findings: ${findingList.length}`);
    console.log(`High-severity findings: ${highSeverityCount}`);
    console.log(`Open findings: ${openCount}`);
}

function filterBySeverity(findingList, severity) {
    return findingList.filter(function (finding) {
        return finding.severity === severity;
    });
}

function filterByStatus(findingList, status) {
    return findingList.filter(function (finding) {
        return finding.status === status;
    });
}

function filterByAsset(findingList, searchText) {
    const normalizedSearch = searchText.trim().toLowerCase();

    return findingList.filter(function (finding) {
        return finding.asset.toLowerCase().includes(normalizedSearch);
    });
}

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

summarizeFindings(findings);

const highSeverityFindings = filterBySeverity(findings, "High");

console.log("\nHigh Severity Findings");
console.log("---------------------");

for (const finding of highSeverityFindings) {
    console.log(`${finding.id}): ${finding.title} | ${finding.asset}`);
}

const openFindings = filterByStatus(findings, "Open");

console.log("\nOpen Findings");
console.log("-------------");

for (const finding of openFindings) {
    console.log(`${finding.id}: ${finding.title} | ${finding.asset}`);
}

const severityFilter = document.getElementById("severity-filter");
const statusFilter = document.getElementById("status-filter");
const resultsCount = document.getElementById("results-count");
const assetSearch = document.getElementById("asset-search");

function applyFilters() {
    let filteredFindings = findings;

    if (severityFilter.value !== "All") {
        filteredFindings = filterBySeverity(
            filteredFindings,
            severityFilter.value
        );
    }

    if (statusFilter.value !== "All") {
        filteredFindings = filterByStatus(
            filteredFindings,
            statusFilter.value
        );
    }

    if (assetSearch.value.trim() !== "") {
        filteredFindings = filterByAsset(
            filteredFindings,
            assetSearch.value
        );
    }

    renderFindings(filteredFindings)

    if (filteredFindings.length === 0) {
        resultsCount.textContent = "No findings match the selected filters";
    } else {
        resultsCount.textContent =
            `Showing ${filteredFindings.length} of ${findings.length} findings`;
    }
}

severityFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
assetSearch.addEventListener("input", applyFilters);

applyFilters();
