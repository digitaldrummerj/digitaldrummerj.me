---
categories: ["git"]
date: 2019-05-06T00:00:00Z
published: true
title: "Git: Clone Branch to New Repo without History"
---

For my Angular workshop [repository](https://github.com/digitaldrummerj/angular-tutorial-code) I wanted to clone the final branch without any history to a new repository so that I could try out some different technologies but I didn't want to polute the workshop repository.

Luckily, we can do this using the git clone command.

## Command

Here is the basic command.  Replace "Branch Name" with the name of your branch, "Git Repo" with the url to your Git repository, and "Folder Name" to the directory that you want to clone the branch into.

```shell
git clone --depth 1 --branch "Branch Name" "Git Repo" "Folder Name"
```

## Example

Here is the actual command that I used to clone the chapter-ui-tests branch from https://github.com/angular-tutorial-code repository to the directory percy-cypress-example

```shell
git clone --depth 1 --branch chapter-ui-tests https://github.com/angular-tutoral-code percy-cypress-example
```

Now we have a new repository that is a clone of our branch with only the last commit in the history.
