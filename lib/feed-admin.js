/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content", "feed");
const ENTRIES_DIR = path.join(CONTENT_ROOT, "entries");
const PROJECTS_FILE = path.join(CONTENT_ROOT, "projects.json");
const UPLOADS_DIR = path.join(ROOT, "public", "uploads", "feed");

function loadProjects() {
  return JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf8"));
}

function saveProjects(projects) {
  fs.writeFileSync(PROJECTS_FILE, `${JSON.stringify(projects, null, 2)}\n`);
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function ensureArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function isVideoExtension(extension) {
  return [".mp4", ".webm", ".mov", ".m4v", ".ogg"].includes(extension);
}

function createMarkdownMediaBlock(mediaUrls) {
  if (mediaUrls.length === 0) {
    return "";
  }

  const blocks = mediaUrls.map((url) => {
    const extension = path.extname(url).toLowerCase();

    if (isVideoExtension(extension)) {
      return `<video controls src="${url}"></video>`;
    }

    return `![media](${url})`;
  });

  return `\n\n## Media\n\n${blocks.join("\n\n")}`;
}

function copyMediaFiles(mediaPaths, slug) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });

  return mediaPaths.map((mediaPath, index) => {
    const absoluteInput = path.isAbsolute(mediaPath)
      ? mediaPath
      : path.join(ROOT, mediaPath);

    if (!fs.existsSync(absoluteInput)) {
      throw new Error(`Media file not found: ${mediaPath}`);
    }

    const extension = path.extname(absoluteInput).toLowerCase();
    const outputName = `${slug}-${Date.now()}-${index + 1}${extension}`;
    const absoluteOutput = path.join(UPLOADS_DIR, outputName);
    fs.copyFileSync(absoluteInput, absoluteOutput);

    return `/uploads/feed/${toPosixPath(outputName)}`;
  });
}

function writeUploadedFile(tempFilePath, originalFilename, slug) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });

  const extension = path.extname(originalFilename || "").toLowerCase();
  const safeExtension = extension || ".bin";
  const outputName = `${slug}-${Date.now()}${safeExtension}`;
  const absoluteOutput = path.join(UPLOADS_DIR, outputName);
  fs.copyFileSync(tempFilePath, absoluteOutput);

  return `/uploads/feed/${toPosixPath(outputName)}`;
}

function buildEntryFileContents({
  title,
  date,
  projectId,
  kind,
  blogLink,
  content,
  mediaBlock = "",
}) {
  const projectLine = projectId ? `project: ${projectId}\n` : "";
  const blogLine = blogLink ? `blogLink: ${blogLink}\n` : "";
  const body = content?.trim()
    ? content.trim()
    : "Write anything you want in Markdown here.";

  return `---\ntitle: ${title}\ndate: ${date}\nkind: ${kind}\n${projectLine}${blogLine}---\n\n${body}${mediaBlock}\n`;
}

function createEntry({
  title,
  date,
  slug,
  projectId,
  kind,
  blogLink,
  content,
  mediaPaths,
  appendMediaBlock = true,
}) {
  if (!title) {
    throw new Error("Missing required field: title");
  }

  const projects = loadProjects();
  if (projectId && !projects.some((project) => project.id === projectId)) {
    throw new Error(`Unknown project id: ${projectId}`);
  }

  const entryDate = date || getToday();
  const baseSlug = slug || `${entryDate}-${slugify(title)}`;
  const normalizedSlug = baseSlug.endsWith(".md") ? baseSlug.slice(0, -3) : baseSlug;
  const filePath = path.join(ENTRIES_DIR, `${normalizedSlug}.md`);

  if (fs.existsSync(filePath)) {
    throw new Error(`Entry already exists: ${path.relative(ROOT, filePath)}`);
  }

  const entryKind = kind || (projectId ? "project" : "thought");
  const mediaUrls = copyMediaFiles(ensureArray(mediaPaths), normalizedSlug);
  const mediaBlock = appendMediaBlock
    ? createMarkdownMediaBlock(mediaUrls)
    : "";
  const fileContents = buildEntryFileContents({
    title,
    date: entryDate,
    projectId,
    kind: entryKind,
    blogLink,
    content,
    mediaBlock,
  });

  fs.mkdirSync(ENTRIES_DIR, { recursive: true });
  fs.writeFileSync(filePath, fileContents);

  return {
    slug: normalizedSlug,
    path: path.relative(ROOT, filePath),
    mediaUrls,
  };
}

function updateEntry({
  originalSlug,
  title,
  date,
  slug,
  projectId,
  kind,
  blogLink,
  content,
}) {
  if (!originalSlug) {
    throw new Error("Missing required field: originalSlug");
  }

  if (!title) {
    throw new Error("Missing required field: title");
  }

  const projects = loadProjects();
  if (projectId && !projects.some((project) => project.id === projectId)) {
    throw new Error(`Unknown project id: ${projectId}`);
  }

  const sourcePath = path.join(ENTRIES_DIR, `${originalSlug}.md`);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Entry does not exist: ${originalSlug}`);
  }

  const entryDate = date || getToday();
  const baseSlug = slug || `${entryDate}-${slugify(title)}`;
  const normalizedSlug = baseSlug.endsWith(".md") ? baseSlug.slice(0, -3) : baseSlug;
  const targetPath = path.join(ENTRIES_DIR, `${normalizedSlug}.md`);

  if (normalizedSlug !== originalSlug && fs.existsSync(targetPath)) {
    throw new Error(`Entry already exists: ${path.relative(ROOT, targetPath)}`);
  }

  const entryKind = kind || (projectId ? "project" : "thought");
  const fileContents = buildEntryFileContents({
    title,
    date: entryDate,
    projectId,
    kind: entryKind,
    blogLink,
    content,
  });

  fs.writeFileSync(sourcePath, fileContents);

  if (normalizedSlug !== originalSlug) {
    fs.renameSync(sourcePath, targetPath);
  }

  return {
    slug: normalizedSlug,
    path: path.relative(ROOT, targetPath),
  };
}

function deleteEntry({ slug }) {
  if (!slug) {
    throw new Error("Missing required field: slug");
  }

  const filePath = path.join(ENTRIES_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Entry does not exist: ${slug}`);
  }

  fs.unlinkSync(filePath);
}

function addProject({
  id,
  name,
  status = "active",
  description = "Add a description.",
  shortLabel,
}) {
  if (!id || !name) {
    throw new Error("Missing required fields: id and name");
  }

  const projects = loadProjects();
  if (projects.some((project) => project.id === id)) {
    throw new Error(`Project already exists: ${id}`);
  }

  projects.push({
    id,
    name,
    shortLabel: shortLabel || name,
    status: status === "inactive" ? "inactive" : "active",
    description,
  });

  saveProjects(projects);
}

function setProjectStatus({ id, status }) {
  if (!id || !status) {
    throw new Error("Missing required fields: id and status");
  }

  if (status !== "active" && status !== "inactive") {
    throw new Error(`Unsupported status: ${status}`);
  }

  const projects = loadProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    throw new Error(`Unknown project id: ${id}`);
  }

  project.status = status;
  saveProjects(projects);
}

function removeProject({ id, deleteEntries = false }) {
  if (!id) {
    throw new Error("Missing required field: id");
  }

  const projects = loadProjects();
  const nextProjects = projects.filter((project) => project.id !== id);

  if (nextProjects.length === projects.length) {
    throw new Error(`Unknown project id: ${id}`);
  }

  saveProjects(nextProjects);

  const entryFiles = fs
    .readdirSync(ENTRIES_DIR)
    .filter((filename) => filename.endsWith(".md"));

  for (const filename of entryFiles) {
    const fullPath = path.join(ENTRIES_DIR, filename);
    const source = fs.readFileSync(fullPath, "utf8");

    if (!source.includes(`project: ${id}`)) {
      continue;
    }

    if (deleteEntries) {
      fs.unlinkSync(fullPath);
      continue;
    }

    const updated = source
      .replace(`project: ${id}\n`, "")
      .replace("kind: project\n", "kind: thought\n");
    fs.writeFileSync(fullPath, updated);
  }
}

module.exports = {
  createEntry,
  updateEntry,
  deleteEntry,
  addProject,
  setProjectStatus,
  removeProject,
  writeUploadedFile,
  slugify,
  createMarkdownMediaBlock,
};
