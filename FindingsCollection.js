export class FindingsCollection {
    #findings;

    constructor(findingList) {
        this.#findings = findingList.map(function (finding) {
            return { ...finding };
        });
    }

    getTotalCount() {
        return this.#findings.length;
    }

    filter(severity = "All", status = "All", searchText = "") {
        const normalizedSearch = searchText.trim().toLowerCase();

        const matchingFindings = this.#findings.filter(function (finding) {
            const matchesSeverity = 
                severity === "All" || finding.severity === severity;

            const matchesStatus =
                status === "All" || finding.status === status;

            const matchesAsset =
                finding.asset.toLowerCase().includes(normalizedSearch);

            return matchesSeverity && matchesStatus && matchesAsset;
        });

        return matchingFindings.map(function (finding) {
            return { ...finding };
        });
    }
}
