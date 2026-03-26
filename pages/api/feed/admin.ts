/* eslint-disable @typescript-eslint/no-var-requires */
import type { NextApiRequest, NextApiResponse } from "next";

import { isFeedAdminEnabled } from "@/lib/feed-admin-access";
import { getFeedPageData } from "@/lib/feed";
const {
  createEntry,
  updateEntry,
  deleteEntry,
  addProject,
  setProjectStatus,
  removeProject,
} = require("../../../lib/feed-admin.js");

type AdminRequestBody =
  | {
      action: "create-entry";
      title: string;
      date?: string;
      slug?: string;
      projectId?: string;
      kind?: "thought" | "project";
      blogLink?: string;
      content?: string;
    }
  | {
      action: "update-entry";
      originalSlug: string;
      title: string;
      date?: string;
      slug?: string;
      projectId?: string;
      kind?: "thought" | "project";
      blogLink?: string;
      content?: string;
    }
  | {
      action: "delete-entry";
      slug: string;
    }
  | {
      action: "add-project";
      id: string;
      name: string;
      shortLabel?: string;
      status?: "active" | "inactive";
      description?: string;
    }
  | {
      action: "set-project-status";
      id: string;
      status: "active" | "inactive";
    }
  | {
      action: "remove-project";
      id: string;
      deleteEntries?: boolean;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!isFeedAdminEnabled()) {
    return res.status(404).json({ error: "Not found" });
  }

  if (req.method === "GET") {
    return res.status(200).json(getFeedPageData());
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body as AdminRequestBody;

    switch (body.action) {
      case "create-entry":
        createEntry({
          title: body.title,
          date: body.date,
          slug: body.slug,
          projectId: body.projectId || undefined,
          kind: body.kind,
          blogLink: body.blogLink,
          content: body.content,
          appendMediaBlock: false,
        });
        break;
      case "update-entry":
        updateEntry({
          originalSlug: body.originalSlug,
          title: body.title,
          date: body.date,
          slug: body.slug,
          projectId: body.projectId || undefined,
          kind: body.kind,
          blogLink: body.blogLink,
          content: body.content,
        });
        break;
      case "delete-entry":
        deleteEntry({
          slug: body.slug,
        });
        break;
      case "add-project":
        addProject({
          id: body.id,
          name: body.name,
          shortLabel: body.shortLabel,
          status: body.status,
          description: body.description,
        });
        break;
      case "set-project-status":
        setProjectStatus({
          id: body.id,
          status: body.status,
        });
        break;
      case "remove-project":
        removeProject({
          id: body.id,
          deleteEntries: body.deleteEntries,
        });
        break;
      default:
        return res.status(400).json({ error: "Unsupported action" });
    }

    return res.status(200).json(getFeedPageData());
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected admin error";
    return res.status(400).json({ error: message });
  }
}
