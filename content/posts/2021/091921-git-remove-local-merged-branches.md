---
categories: ["git"]
published: 2021-09-19T12:00:00Z

url: '/git-remove-local-merged-branches/'
title: Git - Remove Local Branches That Are Merged or No Longer Exist
---

After a while your list of local git branches can get a bit out of control especially if you doing all of your development on a branch, creating a pull request, merging it to main and then deleting the remote git branch when it is merged into main.  Once the branch is deleted on the remote repository there is no need to keep it locally anymore.

<!--more-->

Below is the command to delete all local branches that have been merged into the main branch.  If you git trunk branch is not main or you want to remove all branches that have been merged into a different branch than main, just change the 2 places in the command that say main to what your branch name is.

## Deleting Branches Merged into Main

1. Open git bash and navigate to your git repository that you want to clean up
1. Fetch the latest from the git

    ```shell
    git fetch
    ```

1. See the list of local git branches

    ```shell
    git branch
    ```

1. Delete all local branches that have been merged to main branch

    ```shell
    git branch --merged main | grep -v "^\* main" | xargs -n 1 -r git branch -d
    ```

1. See the list of local git branches that remain

    ```shell
    git branch
    ```

## Deleting Local Branches That No Longer Exist on the Remote

1. Open git bash and navigate to your git repository that you want to clean up
1. Fetch the latest from the git

    ```shell
    git fetch
    ```

1. See the list of local git branches

    ```shell
    git branch
    ```

1. Delete all local branches that have been merged to main branch

    ```shell
    git branch -vv | grep ': gone]' | grep -v '\*' | awk '{ print $1; }' | xargs -r git branch -d
    ```

1. See the list of local git branches that remain

    ```shell
    git branch
    ```
