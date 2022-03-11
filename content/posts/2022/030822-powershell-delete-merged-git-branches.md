---
categories: ["powershell" , "git"]
date: 2022-03-08T13:00:00Z
draft: false
title: "Git: Delete Merged Local Branches That No Longer Exist with Powershell"
url: '/git-remove-local-merged-branches-powershell/'
---

Previously, I wrote about [how to delete git branches that have been merged and no longer exist on the remote using git bash](/git-remove-local-merged-branches/).  Using git bash worked just fine for this.  However, my normal shell is PowerShell and I want to stay in PowerShell.

In this post, we will look at how to use PowerShell instead to delete your local git branches that have been merged and no longer exist on the remote.

<!--more-->

1. Open PowerShell and navigate to your git repository that you want to clean up
1. Make sure you are on the main branch

    ```PowerShell
    git checkout main
    ```

1. Fetch the latest from the git

    ```PowerShell
    git pull --prune
    ```

1. See the list of local git branches

    ```PowerShell
    git branch
    ```

1. Delete all local branches that have been merged to main branch

    ```PowerShell

    git branch -vv | where {$_ -match '\[origin/.*: gone\]'} | foreach { git branch -d $_.split(" ", [StringSplitOptions]'RemoveEmptyEntries')[0]}

    ```

    > Sometimes it may give you an error that the the branch is not fully merged and you will need to change the -d to a -D

1. See the list of local git branches that remain

    ```PowerShell
    git branch
    ```
