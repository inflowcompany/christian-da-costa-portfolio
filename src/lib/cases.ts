import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const CASE_SECTIONS = [
  { id: "overview", title: "Overview" },
  { id: "context", title: "Context" },
  { id: "problem", title: "Problem" },
  { id: "my-role", title: "My Role" },
  { id: "discovery", title: "Discovery" },
  { id: "requirements", title: "Requirements" },
  { id: "scope", title: "Scope" },
  { id: "planning", title: "Planning" },
  { id: "product-system-architecture", title: "Product / System Architecture" },
  { id: "execution", title: "Execution" },
  { id: "qa-validation", title: "QA & Validation" },
  { id: "challenges", title: "Challenges" },
  { id: "decisions", title: "Decisions" },
  { id: "delivery", title: "Delivery" },
  { id: "results", title: "Results" },
  { id: "lessons-evolution", title: "Lessons / Evolution" },
  { id: "evidence", title: "Evidence" },
] as const;

export type CaseStudy = {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    order: number;
    status: "[A VALIDAR]";
    publishedAt?: string;
    images: string[];
    image?: string;
    team: [];
    link?: string;
    modules: { name: string; description: string }[];
  };
  content: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function invalid(file: string, detail: string): never {
  throw new Error(`Invalid case ${file}: ${detail}`);
}

function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function readMetadata(data: Record<string, unknown>, file: string): CaseStudy["metadata"] {
  const { title, summary, order, status, publishedAt, images, image, team, link } = data;
  if (!text(title)) invalid(file, "title must be a non-empty string");
  if (!text(summary)) invalid(file, "summary must be a non-empty string");
  if (typeof order !== "number" || !Number.isInteger(order) || order < 1) {
    invalid(file, "order must be a positive integer");
  }
  if (status !== "[A VALIDAR]") invalid(file, "status must be [A VALIDAR] during phase 1");
  if (!Array.isArray(images) || !images.every(text)) {
    invalid(file, "images must be an array of non-empty strings (or [])");
  }
  if (!Array.isArray(team) || team.length !== 0) {
    invalid(file, "team must remain [] until confirmed project documentation is supplied");
  }
  if (image !== undefined && !text(image)) invalid(file, "image must be a non-empty string");
  if (link !== undefined && !text(link)) invalid(file, "link must be a non-empty string");
  if (publishedAt !== undefined) {
    if (!text(publishedAt) || !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
      invalid(file, "publishedAt must be an optional quoted YYYY-MM-DD date");
    }
    const parsed = new Date(publishedAt);
    if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== publishedAt) {
      invalid(file, "publishedAt must be a valid calendar date");
    }
  }

  const rawModules = data.modules ?? [];
  if (!Array.isArray(rawModules)) invalid(file, "modules must be an array");
  const modules = rawModules.map((module: unknown) => {
    if (
      !module ||
      typeof module !== "object" ||
      !("name" in module) ||
      !("description" in module)
    ) {
      invalid(file, "modules require name and description");
    }
    if (!text(module.name) || !text(module.description)) {
      invalid(file, "modules require non-empty name and description strings");
    }
    return { name: module.name, description: module.description };
  });

  return {
    title,
    summary,
    order,
    status,
    images,
    team: [],
    modules,
    ...(publishedAt === undefined ? {} : { publishedAt }),
    ...(image === undefined ? {} : { image }),
    ...(link === undefined ? {} : { link }),
  };
}

function validateSections(content: string, file: string) {
  const headings: string[] = [];
  let fence: string | undefined;
  for (const line of content.split(/\r?\n/)) {
    const marker = /^\s{0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (marker) {
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = undefined;
      continue;
    }
    if (fence) continue;
    const heading = /^##\s+(.+?)\s*$/.exec(line)?.[1];
    if (heading) headings.push(heading);
  }
  for (const { title } of CASE_SECTIONS) {
    const count = headings.filter((heading) => heading === title).length;
    if (count === 0) invalid(file, `missing section ${title}`);
    if (count > 1) invalid(file, `duplicate section ${title}`);
  }
  if (
    headings.length !== CASE_SECTIONS.length ||
    headings.some((title, index) => title !== CASE_SECTIONS[index]?.title)
  ) {
    invalid(
      file,
      "level-2 sections must follow CASE_SECTIONS order; use level-3 headings for subsections",
    );
  }
}

/** Server-side, trusted Git content only. MDX is executable content, not a public upload format. */
export function getCases(
  directory = path.join(process.cwd(), "src", "app", "work", "projects"),
): CaseStudy[] {
  const entries = readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && path.extname(entry.name) === ".mdx")
    .map((entry) => {
      const slug = path.basename(entry.name, ".mdx");
      if (!slugPattern.test(slug))
        invalid(entry.name, "slug must use lowercase letters, numbers and hyphens");
      const { data, content } = matter(readFileSync(path.join(directory, entry.name), "utf8"));
      const metadata = readMetadata(data, entry.name);
      validateSections(content, entry.name);
      return { slug, metadata, content };
    });

  const orders = new Map<number, string>();
  for (const entry of entries) {
    const previous = orders.get(entry.metadata.order);
    if (previous)
      invalid(
        `${entry.slug}.mdx`,
        `duplicate order ${entry.metadata.order} (also used by ${previous})`,
      );
    orders.set(entry.metadata.order, entry.slug);
  }
  return entries.sort(
    (a, b) =>
      a.metadata.order - b.metadata.order || a.metadata.title.localeCompare(b.metadata.title),
  );
}

export function getCase(slug: string, directory?: string): CaseStudy | undefined {
  if (!slugPattern.test(slug)) return undefined;
  return getCases(directory).find((entry) => entry.slug === slug);
}
