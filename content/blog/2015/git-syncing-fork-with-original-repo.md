---
categories:
- git
- github
date: 2015-09-28T00:00:00Z
excerpt: "Syncing your forked repository to the original repository is an important
  step before submitting any pull request to the original repository for the changes
  in your forked repository.  Even if you are not going to submit a pull request to
  the original repository, there are times that you want the additional features and/or
  bug fixes that have been done since you forked the original repository.  \n\nYou
  could do a pull request but this adds an additional commit into your forked repository
  instead of making your forked repository match the original repository.  In order
  to sync the forked repository without adding any additional commits as part of the
  process you need to configure the original repository as an upstream remote, merge
  in the changes from the original repository and then push the merged version back
  to Github.  \n"
published: true
title: Sync your Git Fork to the Original Repo
---

Syncing your forked repository to the original repository is an important step before submitting any pull request to the original repository for the changes in your forked repository.  Even if you are not going to submit a pull request to the original repository, there are times that you want the additional features and/or bug fixes that have been done since you forked the original repository.  

You could do a pull request but this adds an additional commit into your forked repository instead of making your forked repository match the original repository.  In order to sync the forked repository without adding any additional commits as part of the process you need to configure the original repository as an upstream remote, merge in the changes from the original repository and then push the merged version back to Github.  

## Adding Original Repo As an Upstream Repo

In order to pull the changes from the original repository into your forked version, you need to add the original git repo as an upstream repository.

1. Open a Command Prompt (Windows) or Terminal (Mac or Linux)
1. Navigate to the directory that contains your forked repository
1. Run the following command to list the currently configured remote repositories

    ```shell
    $ git remote -v
        
        origin https://github.com/[Your UserName]/[Your Fork].git (fetch)
        origin https://github.com/[Your UserName]/[Your Fork].git (push)
    ```

1. Add the original repository as an upstream repository 

    ```shell
    $ git remote add upstream https://github.com/[Original Owner Username]/[Original Repository].git
    ```

1. If you run the git remote command again, you will now see both origin and upstream are configured

    ```shell
    $ git remote -v

    origin https://github.com/[Your UserName]/[Your Fork].git (fetch)
    origin https://github.com/[Your UserName]/[Your Fork].git (push)
    upstream https://github.com/[Original Owner UserName]/[Original Repository].git (fetch)
    upstream https://github.com/[Original Owner UserName]/[Original Repository].git (push)
    ```
You are now ready to pull the changes from the original repository to the your forked repository.

## Merging Original Repo Into Your Fork

1. Open a Command Prompt (Windows) or Terminal (Mac or Linux)
1. Navigate to the directory that contains your forked repository that you configured with the upstream repository
1. The first thing is to fetch all of the changes from the original repository.  Note that commits to the original repository will be stored in a local branch called, upstream/master

        $ git fetch upstream

        remote: Counting objects: 75, done.
        remote: Compressing objects: 100% (53/53), done.
        remote: Total 62 (delta 27), reused 44 (delta 9)
        Unpacking objects: 100% (62/62), done.
        From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
         * [new branch]      master     -> upstream/master

1. Make sure that you are on your fork's master branch

        $ git checkout master

        Switched to branch 'master'

1. Merge the changes from the upstream/master into your local master branch.  This will bring your fork's master branch into sync with the upstream repository without losing your local changes.  If you have made any changes that create a conflict, you will obviously have to resolve those before you can complete the merge.

        $ git merge upstream/master

        Updating a422352..5fdff0f
        Fast-forward
        ....

1. At this point your local branch is synced to the original repositories master branch.  If you want to update the Github repository, you need to push your changes.

        $ git push origin master

## Wrap-Up

To summarize, with the 5 commands below you can sync your forked repository with the original repository and push the changes to your Github repository.     

```shell
$ git remote add upstream https://github.com/[Original Owner Username]/[Original Repository].git
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
$ git push
```
