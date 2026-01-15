---
categories: ["AI", "github copilot", "developer tools"]
published: 2026-01-19T13:00:00Z
draft: true
title: "Part 1: GitHub Copilot CLI: Your Terminal Just Got Opinions"
url: '/github-copilot-cli-overview'
series: ['github-copilot-cli-start']
---

## What the GitHub Copilot CLI Actually Is

GitHub Copilot CLI is Copilot without the editor babysitter. It lives directly in your terminal and lets you **reason, write, modify, and execute code** where real work actually happens. Not in a side panel. Not buried under UI chrome. Right there next to your `ls` and questionable shell aliases.

Think of it as:

- A conversational agent wired directly into your repo
- A task runner that understands intent, not just commands
- An opinionated assistant that still asks before it touches anything important

It reads files, proposes changes, runs commands, and waits for explicit approval before doing anything destructive. No surprises. No silent chaos.

<!--more-->

## How This Is Different From “Copilot in an Editor”

Editor Copilot helps you *type*. Copilot CLI helps you *operate*.

Key difference: **agency**.

- Editor Copilot suggests code snippets
- Copilot CLI can plan, explain, refactor, test, diff, and execute workflows

It behaves more like a junior engineer who actually read the repo and your instructions instead of autocomplete on espresso.

## Pricing and Availability

No surprise gotchas here. The CLI is included with:

- Copilot Pro
- Copilot Pro+
- Copilot Business
- Copilot Enterprise

There is no separate SKU and no per‑tool pricing tax.

Pricing details: <https://github.com/features/copilot/plans>

## Supported Operating Systems

- macOS
- Linux
- Windows (Powershell v6+)

> You also need an active Copilot subscription

## Installing the CLI

Pick your poison:

```bash
npm install -g @github/copilot
```

```bash
brew install copilot-cli
```

```bash
curl -fsSL https://gh.io/copilot-install | bash
```

If you already trust random curl pipes, GitHub is probably not where you draw the line.

## Authentication Flow

Authentication is explicit and boring. That’s good.

```bash
/login
```

You authenticate against GitHub, policies apply automatically, and the session persists. Enterprise rules, org restrictions, and auditability all come along for the ride.

## Model Selection and Quotas

Model choice matters more here than in-editor Copilot because **each prompt consumes a premium request**.

```text
/model
```

You will see:

- Available models
- Relative token cost per request
- Which models require explicit enablement

Every submitted prompt reduces your monthly premium request count by one. Token usage is visible so you are never guessing.

Billing details: <https://docs.github.com/en/copilot/concepts/billing/copilot-requests>

## Starting and Ending a Session

Start:

```bash
copilot
```

End it like a civilized person:

- `/exit`
- `/quit`
- `Ctrl+C` twice

The CLI also auto-updates itself on restart when a new version is available. No manual upgrade rituals required.

## Understanding the Interface

The UI is minimal and intentional:

1. Logged-in GitHub user
2. Current working directory
3. Active model
4. Prompt input area
5. Exit shortcut
6. Recent command expansion

Nothing else. No distractions. No unnecessary chrome. Just enough information to avoid doing something stupid.

## Slash Commands You Will Actually Use

Type `/commands` to see everything, but the highlights:

- `/model` – change models
- `/clear` – clear conversation history
- `/context` – inspect token usage
- `/agent` – browse available agents
- `/add-dir` – explicitly allow directory access
- `/share` – export sessions to Markdown or GitHub Gist

There is also `/help`, which is interactive and context-aware. It does more than dump a static list.

## Shortcuts That Save Real Time

A few worth memorizing:

- `@` mention files into context
- `!` run shell commands directly
- `Esc` cancel current operation
- `Ctrl+R` expand recent history

It respects standard terminal muscle memory instead of inventing new nonsense.

## Security and Control Model

This part matters.

- Every file modification requires approval
- Every command execution requires approval
- Folder trust is explicit
- Org Copilot policies are inherited automatically

You always see **what** it plans to do before it does anything. No silent edits. No rogue shell commands.

## When Copilot CLI Makes Sense

Use it when:

- You work heavily in terminals
- You want repo-aware automation
- You need reproducible workflows
- Your editor is not VS Code

Skip it if:

- You never leave your IDE
- You only want autocomplete
- You are allergic to approving actions

## What’s Next

This post deliberately avoided the demo.

**Part 2** walks through a full real-world project built live using Copilot CLI:

- A CSV contact parser
- Interactive prompts
- File diffing
- Backups
- Tests

Everything driven from the terminal, using nothing but intent and guardrails.
