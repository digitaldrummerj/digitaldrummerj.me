---
categories: ["AI", "github copilot", "developer tools"]
published: 2026-01-18T13:00:00Z
draft: true
title: "Part 1: Copilot in your terminal: what it is, what it can do, and why it’s not just a gimmick."
url: '/github-copilot-cli'
series: 'github-copilot-cli-start'
---

GitHub Copilot CLI is **Copilot for your terminal**. Not a plugin you forget to update. Not another tab you’ll ignore. It runs where you already work and it’s built to read, write, and run code in-context.

<!--more-->

- **Your terminal’s new sidekick:** it reads, writes, and runs code where you work.
- **Less setup, more shipping:** it’s included with Copilot plans so rollout is simpler.
- **Agent-powered, GitHub-native:** it can execute tasks with awareness of repos, issues, and PRs.
- **Collaboration with full control:** it inherits policies and requires explicit approvals.

## Why this matters

If you spend a lot of time in the shell (build tools, scripts, Git ops, quick experiments), CLI-native assistance is a productivity multiplier because it removes the constant context switching.

### Where to get it

GitHub’s product page for the CLI lives here: [https://github.com/features/copilot/cli](https://github.com/features/copilot/cli)

## Supported operating systems

All of the major operating systems are supported

- **macOS**
- **Linux**
- **Windows (PowerShell v6 or higher)**

> You also need an active Copilot subscription

## Install methods

Pick your poison for the install:

### Install with [WinGet](https://github.com/microsoft/winget-cli) (Windows)

```bash
winget install GitHub.Copilot
```

### Install with [npm](https://www.npmjs.com/package/@github/copilot) (macOS, Linux, and Windows)

```bash
npm install -g @github/copilot
```

### Install with [Homebrew](https://formulae.brew.sh/cask/copilot-cli) (macOS and Linux)

```bash
brew install copilot-cli
```

### Install with the install script (macOS and Linux)

```bash
curl -fsSL https://gh.io/copilot-install | bash
```

Or

```bash
wget -qO- https://gh.io/copilot-install | bash
```

## Launching the CLI and Start a session

Open your terminal and run: `copilot`

> If you're not currently logged in to GitHub, you'll be prompted to use the `/login` slash command. Enter this command and follow the on-screen instructions to authenticate.

That’s it. No “copy this token into a portal while standing on one foot.”

## AI Models

By default, copilot utilizes Claude Sonnet 4.5. Run the `/model` command to choose from other available models

> Each time you submit a prompt to GitHub Copilot CLI, your monthly quota of [premium requests](https://docs.github.com/copilot/managing-copilot/monitoring-usage-and-entitlements/about-premium-requests) is reduced by one.

You are now ready to start coding away using the Github Copilot CLI!

---

## References

- [https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [https://github.com/features/copilot/cli](https://github.com/features/copilot/cli)

---
