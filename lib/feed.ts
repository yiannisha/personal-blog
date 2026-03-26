import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectStatus = "active" | "inactive";

export type FeedProject = {
  id: string;
  name: string;
  shortLabel: string;
  status: ProjectStatus;
  description: string;
};

export type FeedEntryKind = "thought" | "project";

export type FeedEntry = {
  id: string;
  slug: string;
  title: string;
  date: string;
  kind: FeedEntryKind;
  projectId: string | null;
  blogLink: string | null;
  content: string;
};

type FeedEntryFrontmatter = {
  title?: string;
  date?: string | Date;
  kind?: FeedEntryKind;
  project?: string;
  blogLink?: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "feed");
const ENTRIES_DIR = path.join(CONTENT_ROOT, "entries");
const PROJECTS_FILE = path.join(CONTENT_ROOT, "projects.json");

function sortByDateDesc<T extends { date: string }>(items: T[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeedProjects(): FeedProject[] {
  const raw = fs.readFileSync(PROJECTS_FILE, "utf8");
  const parsed = JSON.parse(raw) as FeedProject[];

  return parsed.map((project) => ({
    ...project,
    shortLabel: project.shortLabel || project.name,
  }));
}

export function getFeedEntries(projectIds: Set<string>): FeedEntry[] {
  const filenames = fs
    .readdirSync(ENTRIES_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .sort();

  const entries = filenames.map((filename) => {
    const fullPath = path.join(ENTRIES_DIR, filename);
    const source = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(source);
    const frontmatter = data as FeedEntryFrontmatter;
    const slug = filename.replace(/\.md$/, "");

    if (!frontmatter.title || !frontmatter.date) {
      throw new Error(`Invalid feed entry "${filename}": missing title or date.`);
    }

    const date =
      frontmatter.date instanceof Date
        ? frontmatter.date.toISOString().slice(0, 10)
        : frontmatter.date;

    const projectId = frontmatter.project && projectIds.has(frontmatter.project)
      ? frontmatter.project
      : undefined;

    const kind: FeedEntryKind = projectId
      ? "project"
      : frontmatter.kind === "project"
        ? "project"
        : "thought";

    return {
      id: slug,
      slug,
      title: frontmatter.title,
      date,
      kind,
      projectId: projectId ?? null,
      blogLink: frontmatter.blogLink ?? null,
      content: content.trim(),
    };
  });

  return sortByDateDesc(entries);
}

export function getFeedPageData() {
  const projects = getFeedProjects();
  const projectIds = new Set(projects.map((project) => project.id));
  const entries = getFeedEntries(projectIds);

  return {
    projects,
    entries,
  };
}
