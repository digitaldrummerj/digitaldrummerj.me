---
categories: ["git"]
date: 2022-03-13T13:00:00Z
published: false
title: "Git - Switch Between Github Accounts on Windows"
url: '/git-switch-between-github-accounts-on-windows'
---

Recently, I had to create a Github account for work in addition to the one that I have for my personal repos.

Not a big deal having two accounts but getting the repository commits to have the correct author name and email and then to use the correct account credentials took a bit of time time to figure out.

Once I figured out the solution it was really easy but trying to figure it out took the better part of a day of trial and error to get it right.


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
