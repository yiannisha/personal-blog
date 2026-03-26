# Feed Content

This page is now file-based.

## Projects

Projects live in `content/feed/projects.json`.

Each project has:

- `id`
- `name`
- `shortLabel`
- `status` (`active` or `inactive`)
- `description`

## Entries

Entries live in `content/feed/entries/*.md`.

Each entry uses frontmatter:

```md
---
title: My entry
date: 2026-03-26
kind: thought
project: reconstructive-memory
blogLink: /blog/some-post
---

Write anything you want in Markdown here.

Inline math: $E = mc^2$

Block math:

$$
\mathcal{L} = \sum_i x_i
$$

Image:
![caption](/uploads/feed/example.png)

Video:
<video controls src="/uploads/feed/example.mp4"></video>
```

`project` is optional. If you set it, the entry appears both in the daily feed and that project tab.

## CLI

Run `npm run feed -- help` for command usage.
