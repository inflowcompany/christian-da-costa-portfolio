import assert from "node:assert/strict";
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { CASE_SECTIONS, getCase, getCases } from "../src/lib/cases.ts";

const sectionTitles = [
  "Overview",
  "Context",
  "Problem",
  "My Role",
  "Discovery",
  "Requirements",
  "Scope",
  "Planning",
  "Product / System Architecture",
  "Execution",
  "QA & Validation",
  "Challenges",
  "Decisions",
  "Delivery",
  "Results",
  "Lessons / Evolution",
  "Evidence",
];

function fixture(
  overrides = {},
  body = sectionTitles.map((title) => `## ${title}\n\n[A VALIDAR]`).join("\n\n"),
) {
  const metadata = {
    title: "Example case",
    summary: "[A VALIDAR]",
    order: 1,
    status: "[A VALIDAR]",
    images: [],
    team: [],
    ...overrides,
  };
  return `---\n${JSON.stringify(metadata)}\n---\n\n${body}\n`;
}

function workspace(t) {
  const temporaryRoot = realpathSync(tmpdir());
  const directory = mkdtempSync(path.join(temporaryRoot, "christian-cases-test-"));
  t.after(() => {
    const resolved = realpathSync(directory);
    assert.equal(path.dirname(resolved), temporaryRoot);
    assert.ok(path.basename(resolved).startsWith("christian-cases-test-"));
    rmSync(resolved, { recursive: true });
  });
  return directory;
}

test("the reusable section contract matches the 17 briefing sections", () => {
  assert.deepEqual(
    CASE_SECTIONS.map((section) => section.title),
    sectionTitles,
  );
  assert.equal(new Set(CASE_SECTIONS.map((section) => section.id)).size, 17);
});

test("cases load without dates, images, team or invented metadata", (t) => {
  const directory = workspace(t);
  writeFileSync(path.join(directory, "example.mdx"), fixture());
  const [entry] = getCases(directory);
  assert.equal(entry.slug, "example");
  assert.equal(entry.metadata.publishedAt, undefined);
  assert.deepEqual(entry.metadata.images, []);
  assert.deepEqual(entry.metadata.team, []);
  assert.deepEqual(entry.metadata.modules, []);
  assert.match(entry.content, /## Evidence/);
});

test("editorial order is independent of filenames and dates", (t) => {
  const directory = workspace(t);
  writeFileSync(path.join(directory, "alpha.mdx"), fixture({ order: 2 }));
  writeFileSync(path.join(directory, "roomix.mdx"), fixture({ title: "Roomix", order: 1 }));
  assert.deepEqual(
    getCases(directory).map((entry) => entry.slug),
    ["roomix", "alpha"],
  );
});

test("missing sections fail with the file and missing heading", (t) => {
  const directory = workspace(t);
  writeFileSync(
    path.join(directory, "example.mdx"),
    fixture(
      {},
      sectionTitles
        .slice(0, -1)
        .map((title) => `## ${title}\n\n[A VALIDAR]`)
        .join("\n\n"),
    ),
  );
  assert.throws(() => getCases(directory), /example\.mdx.*Evidence/);
});

test("duplicate sections fail instead of generating ambiguous anchors", (t) => {
  const directory = workspace(t);
  writeFileSync(path.join(directory, "example.mdx"), `${fixture()}\n## Overview\n\n[A VALIDAR]\n`);
  assert.throws(() => getCases(directory), /duplicate.*Overview/i);
});

test("headings inside code fences do not satisfy required sections", (t) => {
  const directory = workspace(t);
  const body = sectionTitles
    .slice(0, -1)
    .map((title) => `## ${title}\n\n[A VALIDAR]`)
    .join("\n\n");
  writeFileSync(
    path.join(directory, "example.mdx"),
    fixture({}, `${body}\n\n\`\`\`md\n## Evidence\n\`\`\``),
  );
  assert.throws(() => getCases(directory), /missing.*Evidence/i);
});

test("duplicate editorial order fails", (t) => {
  const directory = workspace(t);
  writeFileSync(path.join(directory, "one.mdx"), fixture());
  writeFileSync(path.join(directory, "two.mdx"), fixture());
  assert.throws(() => getCases(directory), /duplicate.*order.*1/i);
});

test("invalid required metadata is rejected", (t) => {
  const directory = workspace(t);
  for (const overrides of [
    { title: " " },
    { summary: null },
    { order: 0 },
    { order: 1.5 },
    { status: "Published" },
  ]) {
    writeFileSync(path.join(directory, "example.mdx"), fixture(overrides));
    assert.throws(() => getCases(directory), /example\.mdx/);
  }
});

test("malformed image lists are rejected", (t) => {
  const directory = workspace(t);
  for (const images of ["/image.png", [null], [12], [""]]) {
    writeFileSync(path.join(directory, "example.mdx"), fixture({ images }));
    assert.throws(() => getCases(directory), /images/);
  }
});

test("unknown module descriptions remain explicitly unvalidated", (t) => {
  const directory = workspace(t);
  writeFileSync(
    path.join(directory, "example.mdx"),
    fixture({ modules: [{ name: "Roomix SaaS", description: "[A VALIDAR]" }] }),
  );
  assert.deepEqual(getCases(directory)[0].metadata.modules, [
    { name: "Roomix SaaS", description: "[A VALIDAR]" },
  ]);
  writeFileSync(
    path.join(directory, "example.mdx"),
    fixture({ modules: [{ name: "Roomix SaaS" }] }),
  );
  assert.throws(() => getCases(directory), /modules/);
});

test("invalid filenames fail and traversal lookups do not read outside the case directory", (t) => {
  const directory = workspace(t);
  writeFileSync(path.join(directory, "Invalid Name.mdx"), fixture());
  assert.throws(() => getCases(directory), /slug/);
  assert.equal(getCase("../outside", directory), undefined);
});

test("unknown case lookups return undefined", (t) => {
  const directory = workspace(t);
  writeFileSync(path.join(directory, "example.mdx"), fixture());
  assert.equal(getCase("unknown", directory), undefined);
  assert.equal(getCase("example", directory)?.metadata.title, "Example case");
});

test("the portfolio contains exactly the five approved cases with Roomix first", () => {
  const entries = getCases();
  assert.deepEqual(
    entries.map((entry) => entry.slug),
    [
      "roomix",
      "inflowork-looping-engineering",
      "inflowork-business-systems",
      "logistics-saas",
      "hqbeds",
    ],
  );
  assert.deepEqual(
    entries[0].metadata.modules.map((module) => module.name),
    [
      "Roomix SaaS",
      "Roomix Console",
      "Roomix Channel Manager",
      "Roomix Direct",
      "Booking Generator",
    ],
  );
  for (const entry of entries) {
    assert.equal(entry.metadata.status, "[A VALIDAR]");
    assert.equal(entry.metadata.publishedAt, undefined);
    assert.deepEqual(entry.metadata.images, []);
    assert.deepEqual(entry.metadata.team, []);
    assert.match(entry.content, /<EvidenceBlock kind="image" \/>/);
  }
});
