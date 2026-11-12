# Notes

One Markdown file per note. The file name becomes the URL:
`why-i-build.md` → https://eflury.com/en/notes/why-i-build/

```markdown
---
title: Why I build companies
description: One or two sentences. Shown in the list, the RSS feed, search results and the newsletter email.
date: 2026-11-20
draft: true
---

The text, in plain Markdown: paragraphs, ## headings, **bold**, [links](https://example.com), lists.
```

- `draft: true` keeps a note off the site, the RSS feed and the sitemap. Remove the line (or set `false`) to publish.
- Publishing = commit and push to `main`; the note and the feed go live with the deploy.
- Then send it to subscribers: `node scripts/newsletter-send.mjs <file-name-without-.md>` (see the script for `--test` and `--send`).
- Files starting with `_` are ignored.
