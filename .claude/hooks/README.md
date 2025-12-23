# Claude Code Hooks - Context Optimization System

## Overview

This directory contains bash hooks that automate memory management for the eflury.com project. The hooks help maintain low context usage by suggesting relevant memory files only when needed.

## Available Hooks

### 1. suggest-memory.sh (user-prompt-submit-hook)
**Purpose:** Analyzes user messages and suggests relevant memory files

**Triggers:**
- `migration|deploy|build` → Suggests migration-history.md
- `competitor|market|pricing` → Suggests competitive-analysis.md
- `package|service` → Suggests service-packages.md
- `taxed|case study|roi` → Suggests case-study-taxed.md
- `blog|content|seo` → Suggests blog-strategy.md
- `technical|astro|component` → Suggests tech-stack.md

**Example Output:**
```
💡 Memory files available for this topic:
  - competitive-analysis.md
  - service-packages.md

To load, say: 'Load competitive analysis'
```

### 2. context-monitor.sh (user-prompt-submit-hook)
**Purpose:** Reminds about context management every 20 messages

**Example Output:**
```
ℹ️  Context Management Tip: If you've loaded memory files and finished that topic,
   consider starting a new conversation to free up context space.
```

## Installation

Hooks are configured via Claude Code settings. Add to your workspace or global config:

```json
{
  "hooks": {
    "user-prompt-submit-hook": [
      ".claude/hooks/suggest-memory.sh",
      ".claude/hooks/context-monitor.sh"
    ]
  }
}
```

## Making Hooks Executable

```bash
chmod +x .claude/hooks/*.sh
```

## How to Load Memory Files

When a hook suggests a memory file, you can load it by saying:

- "Load migration history"
- "Load competitive analysis"
- "Load service packages"
- "Load case study"
- "Load blog strategy"
- "Load tech stack"

Claude will use the Read tool to load the appropriate file from `.claude/memory/`.

## Memory File Index

| File | Size | Trigger Keywords |
|------|------|-----------------|
| migration-history.md | ~5k tokens | migration, deploy, build, GitHub Actions |
| competitive-analysis.md | ~8k tokens | competitor, market, pricing, OWT, AETHER |
| service-packages.md | ~12k tokens | package, pricing, eflury Method, deliverables |
| case-study-taxed.md | ~6k tokens | Taxed GmbH, case study, ROI, automation |
| blog-strategy.md | ~3k tokens | blog, content, SEO, articles, keywords |
| tech-stack.md | ~4k tokens | technical, Astro, Three.js, components |

**Total:** ~38k tokens (only loaded on demand, not in baseline context)

## Benefits

✅ **Low Baseline Context:** Start at ~32% instead of 66%
✅ **Smart Suggestions:** Hooks remind you when memory is available
✅ **On-Demand Loading:** Context only increases when you need specific info
✅ **Scalable:** Add unlimited memory files without bloating .claude/project.md

## Troubleshooting

### Hooks not running?
1. Check file permissions: `ls -la .claude/hooks/`
2. Ensure scripts are executable: `chmod +x .claude/hooks/*.sh`
3. Verify hook configuration in Claude Code settings

### Memory file not loading?
1. Check file exists: `ls .claude/memory/`
2. Use exact command: "Load [filename]" (case-insensitive)
3. Check file permissions: `chmod 644 .claude/memory/*`

## Customization

To add new memory files:

1. Create file in `.claude/memory/[name].md`
2. Add trigger keywords to `suggest-memory.sh`:
   ```bash
   ["your-new-file"]="keyword1|keyword2|keyword3"
   ```
3. Update this README with file description

---

**Last Updated:** December 2025
**Version:** 1.0
