import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  createEntry,
  addProject,
  setProjectStatus,
  removeProject,
} = require("../lib/feed-admin.js");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const flags = {};

  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = rest[index + 1];
    const value = !next || next.startsWith("--") ? true : next;

    if (value !== true) {
      index += 1;
    }

    if (flags[key]) {
      flags[key] = Array.isArray(flags[key])
        ? [...flags[key], value]
        : [flags[key], value];
    } else {
      flags[key] = value;
    }
  }

  return { command, flags };
}

function createEntryFile(flags) {
  try {
    const result = createEntry({
      title: typeof flags.title === "string" ? flags.title : "",
      date: typeof flags.date === "string" ? flags.date : undefined,
      slug: typeof flags.slug === "string" ? flags.slug : undefined,
      projectId: typeof flags.project === "string" ? flags.project : undefined,
      kind: typeof flags.kind === "string" ? flags.kind : undefined,
      blogLink: typeof flags.blog === "string" ? flags.blog : undefined,
      content: undefined,
      mediaPaths: flags.media,
    });

    console.log(`Created ${result.path}`);
    if (result.mediaUrls.length > 0) {
      console.log(`Copied media into public/uploads/feed`);
    }
  } catch (error) {
    fail(error instanceof Error ? error.message : "Failed to create entry");
  }
}

function addProjectCli(flags) {
  try {
    addProject({
      id: typeof flags.id === "string" ? flags.id : "",
      name: typeof flags.name === "string" ? flags.name : "",
      status: typeof flags.status === "string" ? flags.status : undefined,
      description:
        typeof flags.description === "string" ? flags.description : undefined,
      shortLabel:
        typeof flags["short-label"] === "string"
          ? flags["short-label"]
          : undefined,
    });
    console.log(`Added project ${flags.id}`);
  } catch (error) {
    fail(error instanceof Error ? error.message : "Failed to add project");
  }
}

function setProjectStatusCli(flags) {
  try {
    setProjectStatus({
      id: typeof flags.id === "string" ? flags.id : "",
      status: typeof flags.status === "string" ? flags.status : "",
    });
    console.log(`Set ${flags.id} to ${flags.status}`);
  } catch (error) {
    fail(
      error instanceof Error ? error.message : "Failed to set project status",
    );
  }
}

function removeProjectCli(flags) {
  try {
    removeProject({
      id: typeof flags.id === "string" ? flags.id : "",
      deleteEntries: flags["delete-entries"] === true,
    });
    console.log(`Removed project ${flags.id}`);
  } catch (error) {
    fail(error instanceof Error ? error.message : "Failed to remove project");
  }
}

function printHelp() {
  console.log(`Feed admin

Commands:
  help
  new-entry --title "Title" [--date YYYY-MM-DD] [--project id] [--kind thought|project] [--blog /blog/post] [--media /path/file]
  add-project --id slug --name "Project Name" [--status active|inactive] [--description text] [--short-label text]
  set-project-status --id slug --status active|inactive
  remove-project --id slug [--delete-entries]

Examples:
  npm run feed -- new-entry --title "Kernel note" --project cuda-notes --media ~/Desktop/trace.png
  npm run feed -- add-project --id world-models --name "World Models" --status active
  npm run feed -- set-project-status --id cuda-notes --status inactive
`);
}

const { command, flags } = parseArgs(process.argv.slice(2));

switch (command) {
  case "help":
  case undefined:
    printHelp();
    break;
  case "new-entry":
    createEntryFile(flags);
    break;
  case "add-project":
    addProjectCli(flags);
    break;
  case "set-project-status":
    setProjectStatusCli(flags);
    break;
  case "remove-project":
    removeProjectCli(flags);
    break;
  default:
    fail(`Unknown command: ${command}`);
}

Commands:
  help
  new-entry --title "Title" [--date YYYY-MM-DD] [--project id] [--kind thought|project] [--blog /blog/post] [--media /path/file]
  add-project --id slug --name "Project Name" [--status active|inactive] [--description text] [--short-label text]
  set-project-status --id slug --status active|inactive
  remove-project --id slug [--delete-entries]

Examples:
  npm run feed -- new-entry --title "Kernel note" --project cuda-notes --media ~/Desktop/trace.png
  npm run feed -- add-project --id world-models --name "World Models" --status active
  npm run feed -- set-project-status --id cuda-notes --status inactive
`);
}

const { command, flags } = parseArgs(process.argv.slice(2));

switch (command) {
  case "help":
  case undefined:
    printHelp();
    break;
  case "new-entry":
    createEntryFile(flags);
    break;
  case "add-project":
    addProject(flags);
    break;
  case "set-project-status":
    setProjectStatus(flags);
    break;
  case "remove-project":
    removeProject(flags);
    break;
  default:
    fail(`Unknown command: ${command}`);
}
