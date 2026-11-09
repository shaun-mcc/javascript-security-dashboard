import test from "node:test";
import assert from "node:assert/strict";
import { FindingsCollection } from "../FindingsCollection.js";

function createSampleFindings() {
    return [
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
            title: "Weak Password Policy",
            asset: "lab-server-02",
            severity: "High",
            status: "Closed"
        }
    ];
}

function getIds(findings) {
    return findings.map(function (finding) {
        return finding.id;
    });
}

test("returns the total number of findings", function () {
    const collection = new FindingsCollection(createSampleFindings());

    assert.equal(collection.getTotalCount(), 3);
});

test("returns all findings when no filters are supplied", function () {
    const collection = new FindingsCollection(createSampleFindings());

    assert.deepEqual(
        collection.filter(),
        createSampleFindings()
    );
});

test("filters by severity", function () {
    const collection = new FindingsCollection(createSampleFindings());

    const results = collection.filter("High");

    assert.deepEqual(getIds(results), ["F-001", "F-003"]);
});

test("filters by status", function () {
    const collection = new FindingsCollection(createSampleFindings());

    const results = collection.filter("All", "Open");

    assert.deepEqual(getIds(results), ["F-001", "F-002"]);
});

test("searches asset names regardless of case or surrounding spaces", function () {
    const collection = new FindingsCollection(createSampleFindings());

    const results = collection.filter("All", "All", "  SERVER  ");

    assert.deepEqual(getIds(results), ["F-001", "F-003"]);
});

test("applies severity, status, and asset search together", function () {
    const collection = new FindingsCollection(createSampleFindings());

    const results = collection.filter("High", "Open", "server");

    assert.deepEqual(getIds(results), ["F-001"]);
});

test("returns an empty array when no findings match", function () {
    const collection = new FindingsCollection(createSampleFindings());

    assert.deepEqual(collection.filter("Low"), []);
    assert.deepEqual(collection.filter("Medium", "Closed"), []);
    assert.deepEqual(collection.filter("All", "All", "unknown"), []);
});

test("treats a whitespace only search as an empty search", function () {
    const collection = new FindingsCollection(createSampleFindings());

    const results = collection.filter("All", "All", "   ");

    assert.deepEqual(getIds(results), ["F-001", "F-002", "F-003"]);
});

test("handles an empty collection", function () {
    const collection = new FindingsCollection([]);

    assert.equal(collection.getTotalCount(), 0);
    assert.deepEqual(collection.filter(), []);
});

test("does not permanently narrow the collection after filtering", function () {
    const collection = new FindingsCollection(createSampleFindings());

    collection.filter("High", "Open", "server");

    assert.equal(collection.getTotalCount(), 3);
    assert.deepEqual(
        getIds(collection.filter()),
        ["F-001", "F-002", "F-003"]
    );
});

test("protects stored findings from changes to the original input", function () {
    const originalFindings = createSampleFindings();
    const collection = new FindingsCollection(originalFindings);

    originalFindings[0].severity = "Low";
    originalFindings.pop();

    assert.equal(collection.getTotalCount(), 3);
    assert.deepEqual(
        getIds(collection.filter("High")),
        ["F-001", "F-003"]
    );
});

test("protects stored findings from changes to returned results", function () {
    const collection = new FindingsCollection(createSampleFindings());
    const results = collection.filter();

    results[0].status = "Closed";
    results.pop();

    assert.equal(collection.getTotalCount(), 3);
    assert.deepEqual(
        getIds(collection.filter("All", "Open")),
        ["F-001", "F-002"]
    );
});