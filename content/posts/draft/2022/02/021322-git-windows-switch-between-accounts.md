---
categories: ["git"]
date: 2022-03-13T13:00:00Z
published: false
title: "Git - Switch Between Github Accounts on Windows"
url: '/git-switch-between-github-accounts-on-windows'
---

**.gitconfig file:**

```config
[includeIf "gitdir:C:/repos/work/"]
  path = .gitconfig-work
[includeIf "gitdir:C:/repos/personal/"]
  path = .gitconfig-personal
[core]
 longpaths = true
[init]
 defaultBranch = main
```

**.gitconfig-work file:**

```config
[user]
 name = Justin James
 email = [Work Email Here]
[credential "https://github.com"]
 helper = dtkeyring
```

**.gitconfig-personal file:**

```config
[user]
 name = Justin James
 email = [Personal Email Here]
[credential "https://github.com"]
 helper = wincred
 useHttpPath = true
```
