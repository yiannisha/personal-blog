"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { FeedEntry, FeedProject } from "@/lib/feed";
import MarkdownContent from "@/components/MarkdownContent";

type FeedAndProjectsPageProps = {
  projects: FeedProject[];
  entries: FeedEntry[];
  adminEnabled?: boolean;
};

const activeProjectClassName =
  "text-green-400 border-green-500/40 bg-green-500/10";

const inactiveProjectClassName =
  "text-gray-400 border-neutral-600 bg-neutral-800/60";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function getProjectBadgeClassName(status: FeedProject["status"]) {
  return status === "active"
    ? activeProjectClassName
    : inactiveProjectClassName;
}

export default function FeedAndProjectsPage({
  projects,
  entries,
  adminEnabled = false,
}: FeedAndProjectsPageProps) {
  const [activeTab, setActiveTab] = useState<string>("daily-thoughts");

  const projectMap = useMemo(() => {
    return new Map(projects.map((project) => [project.id, project]));
  }, [projects]);

  const tabs = useMemo(() => {
    return [
      { id: "daily-thoughts", label: "Daily Thoughts" },
      ...projects.map((project) => ({
        id: project.id,
        label: project.name,
      })),
    ];
  }, [projects]);

  const visibleEntries = useMemo(() => {
    if (activeTab === "daily-thoughts") {
      return entries;
    }

    return entries.filter((entry) => entry.projectId === activeTab);
  }, [activeTab, entries]);

  const selectedProject =
    activeTab === "daily-thoughts" ? null : projectMap.get(activeTab) ?? null;

  return (
    <main className="max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-violet-600">
            Feed &amp; Active Projects
          </h1>
          <p className="mt-2 text-base text-gray-300">
            A running diary with project timelines, markdown notes, media, and linked write-ups.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {adminEnabled ? (
            <Link href="/feed-admin" className="text-green-500 underline">
              Admin
            </Link>
          ) : null}
          <Link href="/blog" className="text-green-500 underline">
            Blogs
          </Link>
          <Link href="/" className="text-green-500 underline">
            Home
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] mb-8">
        <section className="border border-neutral-700 rounded-lg p-4 bg-neutral-950/50">
          <h2 className="text-lg font-semibold text-white">Daily Feed Rules</h2>
          <p className="mt-2 text-sm text-gray-400">
            The daily thoughts timeline is the aggregate feed. Standalone diary notes live there, and every project entry also appears there with both project and status tags.
          </p>
        </section>

        <section className="border border-neutral-700 rounded-lg p-4 bg-neutral-950/50">
          <h2 className="text-lg font-semibold text-white">Projects</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {projects.map((project) => (
              <span
                key={project.id}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getProjectBadgeClassName(project.status)}`}
              >
                {project.name} · {project.status}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                isActive
                  ? "border-violet-500 bg-violet-500/15 text-violet-300"
                  : "border-neutral-700 text-gray-300 hover:bg-neutral-900/60"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {selectedProject ? (
        <section className="mb-6 border border-neutral-700 rounded-lg p-4 bg-neutral-950/50">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-white">{selectedProject.name}</h2>
            <span
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getProjectBadgeClassName(selectedProject.status)}`}
            >
              {selectedProject.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-400">{selectedProject.description}</p>
        </section>
      ) : null}

      <div className="relative ml-3 border-l border-neutral-700 pl-6">
        {visibleEntries.map((entry) => {
          const project = entry.projectId ? projectMap.get(entry.projectId) : null;

          return (
            <article key={entry.id} className="relative mb-8 last:mb-0">
              <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border border-violet-500 bg-black" />
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {formatDate(entry.date)}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
                {project ? (
                  <>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getProjectBadgeClassName(project.status)}`}
                    >
                      {project.name}
                    </span>
                    <span className="rounded-full border border-neutral-700 px-2.5 py-1 text-[11px] font-medium text-gray-400">
                      {project.status}
                    </span>
                  </>
                ) : null}
                <span className="rounded-full border border-neutral-700 px-2.5 py-1 text-[11px] font-medium text-gray-400">
                  {entry.kind === "thought" ? "Diary" : "Project Update"}
                </span>
              </div>
              <div className="mt-2">
                <MarkdownContent content={entry.content} />
              </div>
              {entry.blogLink ? (
                <div className="mt-3">
                  <Link href={entry.blogLink} className="text-green-500 underline">
                    Open linked blog
                  </Link>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </main>
  );
}
