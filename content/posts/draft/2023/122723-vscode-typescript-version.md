—
categories: [“vscode”, “typescript”]
date: 2023-12-27T13:00:00Z
published: false
title: “Fix Vscode is Using Weong TypeScript Version”
url: ‘/vscode-typescript-version’
—

Problem: VSCode uses its built-in TypeScript version by default. So if your project uses a different TypeScript version, you may experience random type issues.

<!—more—>

Solution: Tell VSCode to use your workspace’s TypeScript version (the TypeScript version in your package.json).

1. Open a .ts or .tsx file
2. Hit Cmd+Shift+P (Mac) or Ctrl+Shift+p (Win)
3. Enter: “Select TypeScript Version”
4. Select “Use Workspace Version”

The setting is written to .vscode/settings.json.

Now we know everyone using VSCode is using the same TypeScript version. 

