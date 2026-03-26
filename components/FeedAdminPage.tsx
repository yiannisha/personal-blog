"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";

import MarkdownContent from "@/components/MarkdownContent";
import type { FeedEntry, FeedProject, ProjectStatus } from "@/lib/feed";

type FeedAdminPageProps = {
  projects: FeedProject[];
  entries: FeedEntry[];
};

type UploadedAsset = {
  url: string;
  embedCode: string;
};

type EntryFormState = {
  title: string;
  date: string;
  slug: string;
  kind: "thought" | "project";
  projectId: string;
  blogLink: string;
  content: string;
};

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function createEmptyEntryForm(): EntryFormState {
  return {
    title: "",
    date: getToday(),
    slug: "",
    kind: "thought",
    projectId: "",
    blogLink: "",
    content: "Write anything you want in Markdown here.",
  };
}

export default function FeedAdminPage(props: FeedAdminPageProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [projects, setProjects] = useState(props.projects);
  const [entries, setEntries] = useState(props.entries);
  const [entryForm, setEntryForm] = useState<EntryFormState>(createEmptyEntryForm);
  const [editingEntrySlug, setEditingEntrySlug] = useState<string | null>(null);
  const [uploadedAssets, setUploadedAssets] = useState<UploadedAsset[]>([]);
  const [projectForm, setProjectForm] = useState({
    id: "",
    name: "",
    shortLabel: "",
    status: "active" as ProjectStatus,
    description: "",
  });
  const [removeProjectId, setRemoveProjectId] = useState("");
  const [deleteProjectEntries, setDeleteProjectEntries] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);

  const previewContent = useMemo(() => entryForm.content, [entryForm.content]);

  async function refreshData() {
    const response = await fetch("/api/feed/admin");
    const data = (await response.json()) as FeedAdminPageProps;
    setProjects(data.projects);
    setEntries(data.entries);
  }

  function resetEntryEditor() {
    setEntryForm(createEmptyEntryForm());
    setEditingEntrySlug(null);
    setUploadedAssets([]);
  }

  async function uploadFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) {
      return;
    }

    setError(null);
    setMessage(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("slug", entryForm.slug || entryForm.title || "feed-entry");

      for (const file of Array.from(fileList)) {
        formData.append("files", file);
      }

      const response = await fetch("/api/feed/upload-media", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadedAssets((current) => [...current, ...data.assets]);
      setMessage(`Uploaded ${data.assets.length} file(s). Use Insert to place them anywhere in the markdown.`);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed",
      );
    } finally {
      setIsUploading(false);
    }
  }

  function insertIntoMarkdown(snippet: string) {
    const textarea = textareaRef.current;

    if (!textarea) {
      setEntryForm((current) => ({
        ...current,
        content: `${current.content}\n\n${snippet}`,
      }));
      return;
    }

    const start = textarea.selectionStart ?? entryForm.content.length;
    const end = textarea.selectionEnd ?? entryForm.content.length;
    const prefix = entryForm.content.slice(0, start);
    const suffix = entryForm.content.slice(end);
    const needsLeadingBreak = prefix.length > 0 && !prefix.endsWith("\n");
    const needsTrailingBreak = suffix.length > 0 && !suffix.startsWith("\n");
    const insertion = `${needsLeadingBreak ? "\n\n" : ""}${snippet}${needsTrailingBreak ? "\n\n" : ""}`;
    const nextContent = `${prefix}${insertion}${suffix}`;
    const nextCursor = prefix.length + insertion.length;

    setEntryForm((current) => ({
      ...current,
      content: nextContent,
    }));

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(nextCursor, nextCursor);
    });
  }

  async function submitAction(payload: unknown, successMessage: string) {
    setError(null);
    setMessage(null);

    const response = await fetch("/api/feed/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    setProjects(data.projects);
    setEntries(data.entries);
    setMessage(successMessage);
  }

  function handleCreateEntry() {
    startTransition(async () => {
      try {
        await submitAction(
          {
            action: editingEntrySlug ? "update-entry" : "create-entry",
            originalSlug: editingEntrySlug || undefined,
            title: entryForm.title,
            date: entryForm.date,
            slug: entryForm.slug || undefined,
            kind: entryForm.projectId ? "project" : entryForm.kind,
            projectId: entryForm.projectId || undefined,
            blogLink: entryForm.blogLink || undefined,
            content: entryForm.content,
          },
          editingEntrySlug ? "Entry updated." : "Entry created.",
        );

        resetEntryEditor();
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : editingEntrySlug
              ? "Failed to update entry"
              : "Failed to create entry",
        );
      }
    });
  }

  function handleEditEntry(entry: FeedEntry) {
    setError(null);
    setMessage(`Editing ${entry.slug}`);
    setEditingEntrySlug(entry.slug);
    setUploadedAssets([]);
    setEntryForm({
      title: entry.title,
      date: entry.date,
      slug: entry.slug,
      kind: entry.kind,
      projectId: entry.projectId || "",
      blogLink: entry.blogLink || "",
      content: entry.content,
    });
  }

  function handleDeleteEntry(slug: string) {
    startTransition(async () => {
      try {
        await submitAction(
          {
            action: "delete-entry",
            slug,
          },
          `Deleted ${slug}.`,
        );

        if (editingEntrySlug === slug) {
          resetEntryEditor();
        }
      } catch (submitError) {
        setError(
          submitError instanceof Error ? submitError.message : "Failed to delete entry",
        );
      }
    });
  }

  function handleAddProject() {
    startTransition(async () => {
      try {
        await submitAction(
          {
            action: "add-project",
            ...projectForm,
          },
          "Project created.",
        );
        setProjectForm({
          id: "",
          name: "",
          shortLabel: "",
          status: "active",
          description: "",
        });
      } catch (submitError) {
        setError(
          submitError instanceof Error ? submitError.message : "Failed to add project",
        );
      }
    });
  }

  function handleProjectStatusChange(id: string, status: ProjectStatus) {
    startTransition(async () => {
      try {
        await submitAction(
          {
            action: "set-project-status",
            id,
            status,
          },
          `Updated ${id} to ${status}.`,
        );
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Failed to update project status",
        );
      }
    });
  }

  function handleRemoveProject() {
    startTransition(async () => {
      try {
        await submitAction(
          {
            action: "remove-project",
            id: removeProjectId,
            deleteEntries: deleteProjectEntries,
          },
          `Removed ${removeProjectId}.`,
        );
        setRemoveProjectId("");
        setDeleteProjectEntries(false);
      } catch (submitError) {
        setError(
          submitError instanceof Error ? submitError.message : "Failed to remove project",
        );
      }
    });
  }

  return (
    <main className="max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-violet-600">Feed Admin</h1>
          <p className="mt-2 text-base text-gray-300">
            Create entries, upload media, manage project status, and preview markdown exactly as it renders in the feed.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/research-feed" className="text-green-500 underline">
            Feed
          </Link>
          <Link href="/" className="text-green-500 underline">
            Home
          </Link>
        </div>
      </div>

      {message ? (
        <div className="mb-4 rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-300">
          {message}
        </div>
      ) : null}
      {error ? (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <section className="rounded-lg border border-neutral-700 bg-neutral-950/50 p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">
              {editingEntrySlug ? "Edit Entry" : "New Entry"}
            </h2>
            {editingEntrySlug ? (
              <button
                type="button"
                onClick={resetEntryEditor}
                className="rounded border border-neutral-700 px-3 py-1 text-xs text-gray-300"
              >
                Cancel Edit
              </button>
            ) : null}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-gray-300">
              Title
              <input
                className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={entryForm.title}
                onChange={(event) =>
                  setEntryForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
              />
            </label>
            <label className="text-sm text-gray-300">
              Date
              <input
                type="date"
                className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={entryForm.date}
                onChange={(event) =>
                  setEntryForm((current) => ({
                    ...current,
                    date: event.target.value,
                  }))
                }
              />
            </label>
            <label className="text-sm text-gray-300">
              Slug
              <input
                className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={entryForm.slug}
                onChange={(event) =>
                  setEntryForm((current) => ({
                    ...current,
                    slug: event.target.value,
                  }))
                }
              />
            </label>
            <label className="text-sm text-gray-300">
              Blog Link
              <input
                placeholder="/blog/post-slug"
                className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={entryForm.blogLink}
                onChange={(event) =>
                  setEntryForm((current) => ({
                    ...current,
                    blogLink: event.target.value,
                  }))
                }
              />
            </label>
            <label className="text-sm text-gray-300">
              Entry Type
              <select
                className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={entryForm.kind}
                onChange={(event) =>
                  setEntryForm((current) => ({
                    ...current,
                    kind: event.target.value as "thought" | "project",
                  }))
                }
              >
                <option value="thought">Thought</option>
                <option value="project">Project</option>
              </select>
            </label>
            <label className="text-sm text-gray-300">
              Project
              <select
                className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={entryForm.projectId}
                onChange={(event) =>
                  setEntryForm((current) => ({
                    ...current,
                    projectId: event.target.value,
                  }))
                }
              >
                <option value="">No project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-4 block text-sm text-gray-300">
            Markdown
            <textarea
              ref={textareaRef}
              rows={16}
              className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 font-mono text-sm text-white"
              value={entryForm.content}
              onChange={(event) =>
                setEntryForm((current) => ({
                  ...current,
                  content: event.target.value,
                }))
              }
            />
          </label>

          <div className="mt-4">
            <label className="text-sm text-gray-300">
              Upload Images / Videos
              <input
                type="file"
                multiple
                className="mt-2 block w-full text-sm text-gray-300"
                onChange={(event) => void uploadFiles(event.target.files)}
              />
            </label>
            <p className="mt-2 text-xs text-gray-500">
              Uploaded files are copied into `/public/uploads/feed`. They are not auto-attached. Use the insert buttons below to place media exactly where you want it in the markdown.
            </p>
          </div>

          {uploadedAssets.length > 0 ? (
            <div className="mt-4 space-y-3">
              {uploadedAssets.map((asset) => (
                <div
                  key={asset.url}
                  className="rounded-lg border border-neutral-800 bg-black px-3 py-3"
                >
                  <div className="text-xs text-gray-500">{asset.url}</div>
                  <div className="mt-2 rounded border border-neutral-800 bg-neutral-950 px-3 py-2 font-mono text-xs text-gray-300">
                    {asset.embedCode}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => insertIntoMarkdown(asset.embedCode)}
                      className="rounded border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs text-violet-200"
                    >
                      Insert Embed
                    </button>
                    <button
                      type="button"
                      onClick={() => insertIntoMarkdown(asset.url)}
                      className="rounded border border-neutral-700 px-3 py-1 text-xs text-gray-300"
                    >
                      Insert URL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCreateEntry}
              disabled={isPending || isUploading}
              className="rounded border border-violet-500 bg-violet-500/15 px-4 py-2 text-sm text-violet-200 disabled:opacity-50"
            >
              {isPending ? "Saving..." : editingEntrySlug ? "Save Entry" : "Create Entry"}
            </button>
            <button
              type="button"
              onClick={() => void refreshData()}
              className="rounded border border-neutral-700 px-4 py-2 text-sm text-gray-300"
            >
              Refresh
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-neutral-700 bg-neutral-950/50 p-5">
          <h2 className="text-xl font-semibold text-white">Live Preview</h2>
          <div className="mt-4 rounded-lg border border-neutral-800 bg-black p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
              {entryForm.date || "No date"}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-white">
                {entryForm.title || "Untitled entry"}
              </h3>
              {entryForm.projectId ? (
                <span className="rounded-full border border-green-500/40 bg-green-500/10 px-2.5 py-1 text-[11px] font-medium text-green-300">
                  {projects.find((project) => project.id === entryForm.projectId)?.name}
                </span>
              ) : null}
              <span className="rounded-full border border-neutral-700 px-2.5 py-1 text-[11px] font-medium text-gray-400">
                {entryForm.projectId ? "Project Update" : entryForm.kind === "thought" ? "Diary" : "Project Update"}
              </span>
            </div>
            <div className="mt-4">
              <MarkdownContent content={previewContent} />
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-neutral-700 bg-neutral-950/50 p-5">
          <h2 className="text-xl font-semibold text-white">Add Project</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-gray-300">
              Project ID
              <input
                className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={projectForm.id}
                onChange={(event) =>
                  setProjectForm((current) => ({
                    ...current,
                    id: event.target.value,
                  }))
                }
              />
            </label>
            <label className="text-sm text-gray-300">
              Name
              <input
                className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={projectForm.name}
                onChange={(event) =>
                  setProjectForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
            </label>
            <label className="text-sm text-gray-300">
              Short Label
              <input
                className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={projectForm.shortLabel}
                onChange={(event) =>
                  setProjectForm((current) => ({
                    ...current,
                    shortLabel: event.target.value,
                  }))
                }
              />
            </label>
            <label className="text-sm text-gray-300">
              Status
              <select
                className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={projectForm.status}
                onChange={(event) =>
                  setProjectForm((current) => ({
                    ...current,
                    status: event.target.value as ProjectStatus,
                  }))
                }
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </label>
          </div>
          <label className="mt-4 block text-sm text-gray-300">
            Description
            <textarea
              rows={4}
              className="mt-2 w-full rounded border border-neutral-700 bg-black px-3 py-2 text-white"
              value={projectForm.description}
              onChange={(event) =>
                setProjectForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
            />
          </label>
          <button
            type="button"
            onClick={handleAddProject}
            disabled={isPending}
            className="mt-5 rounded border border-violet-500 bg-violet-500/15 px-4 py-2 text-sm text-violet-200 disabled:opacity-50"
          >
            Add Project
          </button>
        </section>

        <section className="rounded-lg border border-neutral-700 bg-neutral-950/50 p-5">
          <h2 className="text-xl font-semibold text-white">Manage Projects</h2>
          <div className="mt-4 space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg border border-neutral-800 bg-black px-4 py-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">{project.name}</div>
                    <div className="text-xs text-gray-500">{project.id}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleProjectStatusChange(project.id, "active")}
                      className={`rounded border px-3 py-1 text-xs ${
                        project.status === "active"
                          ? "border-green-500/40 bg-green-500/10 text-green-300"
                          : "border-neutral-700 text-gray-300"
                      }`}
                    >
                      active
                    </button>
                    <button
                      type="button"
                      onClick={() => handleProjectStatusChange(project.id, "inactive")}
                      className={`rounded border px-3 py-1 text-xs ${
                        project.status === "inactive"
                          ? "border-neutral-500 bg-neutral-700/30 text-gray-200"
                          : "border-neutral-700 text-gray-300"
                      }`}
                    >
                      inactive
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-400">{project.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/5 p-4">
            <h3 className="text-sm font-semibold text-white">Remove Project</h3>
            <div className="mt-3 flex flex-col gap-3">
              <select
                className="rounded border border-neutral-700 bg-black px-3 py-2 text-white"
                value={removeProjectId}
                onChange={(event) => setRemoveProjectId(event.target.value)}
              >
                <option value="">Select project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={deleteProjectEntries}
                  onChange={(event) => setDeleteProjectEntries(event.target.checked)}
                />
                Delete project entries instead of converting them to diary entries
              </label>
              <button
                type="button"
                onClick={handleRemoveProject}
                disabled={isPending || !removeProjectId}
                className="w-fit rounded border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200 disabled:opacity-50"
              >
                Remove Project
              </button>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-lg border border-neutral-700 bg-neutral-950/50 p-5">
        <h2 className="text-xl font-semibold text-white">Recent Entries</h2>
        <div className="mt-4 space-y-2">
          {entries.slice(0, 8).map((entry) => (
            <div
              key={entry.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded border border-neutral-800 bg-black px-3 py-2 text-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-500">{entry.date}</span>
                <span className="text-white">{entry.title}</span>
                {entry.projectId ? (
                  <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-xs text-gray-300">
                    {projects.find((project) => project.id === entry.projectId)?.name}
                  </span>
                ) : null}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEditEntry(entry)}
                  className="rounded border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs text-violet-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteEntry(entry.slug)}
                  className="rounded border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs text-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
