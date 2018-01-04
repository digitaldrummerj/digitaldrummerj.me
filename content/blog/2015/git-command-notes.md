---
categories:
- github
- git
date: 2015-01-14T20:45:35Z
excerpt: |
  I am finally making myself learn the git command line instead of just using a UI so that I can actually understand what git is really doing.  Plus I have started playing a lot with the IonicBox and running a Ubuntu vagrant controlled VM for this blog and both of those are just linux shell command prompt only machines.

  Below are my notes on various commands so that I can stop having to Google each time I forgot one of them.
published: true
redirect_from: /git/
title: Git Command Notes
---

I am finally making myself learn the git command line instead of just using a UI so that I can actually understand what git is really doing.  Plus I have started playing a lot with the IonicBox and running a Ubuntu vagrant controlled VM for this blog and both of those are just linux shell command prompt only machines.

Below are my notes on various commands so that I can stop having to Google each time I forgot one of them.


## Caching Credentials

**To cache credentials for 1 hour.  The timeout is in seconds.**

	git config --global credential.helper 'cache --timeout 3600'


## Basic Commands

**Getting code to local machine**

In Git terms, this is called cloning a repository and the command to use is git clone.  

**Directory name will match repository name**

	git clone [Remote Repository Url]  
    
**Use this command if you want to name the directory different than the repository name**

	git clone [Remote Repository Url]  [Directory to Clone into]
    
**Where did the local repository come from?**


	git remote -v

**Change the Remote Origin Url**

    git remote set-url origin [https or ssh url]

**Get Latest Changes but don't merge**

	git fetch
	
**Get Latest Changes and Merge**

	git pull
	
**Generate SSH Keys**

**Adding  Key**

    ls -al ~/.ssh
    ssh-keygen -t rsa -C "your_email@example.com"
    ssh-agent -s or eval(ssh-agent) or eval $(ssh-agent)
    ssh-add ~/.ssh/id_rsa
    clip < ~/.ssh/id_rsa.pub
    Go to github settings for your account
    Click on SSH Keys
    Click Add Key
    Give it a name and paste in the key
    Put in your github password
    Click confirm

**To test**

    ssh -T git@github.com

Should get a response like: Hi username! You've successfully authenticated, but GitHub does not  provide shell access.


Full details at [https://help.github.com/articles/generating-ssh-keys/](https://help.github.com/articles/generating-ssh-keys/)

**See what files have changed**

	Long Form: git status  
	Short Form: git status -s
	Show Files: git status -u or to always show git config status.showuntrackedfile=yes 


**Turning a directory into a repository on the local machine**

	git init
    
**Adding files to the repository**

	git add [file name]

**Adding all files in a directory except the ones in the .gitignore file**

	git add .

**Reverting a file that has changes not been added or staged**

	git checkout [file name]
	
**Unadding a file that has been added and not committed but leave file**

	git reset
	
**Unadding a file that has been added and not committed but delete file**

	git reset --hard

**Ignoring files**

- create .gitignore file 
- starter files available at [https://github.com/github/gitignore](https://github.com/github/gitignore)
- Create a .gitignore file for any number of languages at [http://gitignore.io](http://gitignore.io) 
  
**Committing files to the local repository**

	git commit -m "Your Message"
  
**Removing Files**
  
	git rm [File Name]
  
**Moving Files**
  
	git mv [Old File Name] [New File Name]
  
**Publishing files to the remote repository**
  
	git push
  
## Merge
 
#### Storing work that you want to keep but not commit
  
**Storing the work**
  
	git stash
  
**Seeing what work is stored**
	
	git stash list
  
**Applying the last stash to the current code**

	git stash apply
  
**Applying a different stash then the last one to the current code**
	
	git stash apply stash@{[Number for stash from git stash list command]}
  
## Branching
  
**See Available Branch Including Remote Branches**

	git branch -v
	
**Creating a Branch**
  
	git branch [Branch Name]
  
**Switch to a branch**
  
	git checkout [Branch Name]
  
**Switch to last branch you were on**

	git checkout -
	
**Merging a branch into the master (HEAD)**
  
	First make sure you are on the master branch: git checkout master
  
	Then issue the merge command: git merge [branch name]
  
**List the branches for the repository**
  
	git branch
  
  - Note: the * in the results indicates the branch currently checked out. 
  
  
**See last commit of each branch**
  
	git branch -v 
  
**See branches already merged**
  
	git branch --merged
  
**See branches NOT already merged**
  
	git branch --no-merged
  
**Push branch to remote repository**
	
	git push origin [branch name]
  
**Delete a Local branch**
	
	git branch -d [branch name]


**Deleting Remote Branch**

	git push origin --delete [branch name]

## Proxy Settings

See Post on [Proxy  Configurations]({{"/proxy-configurations" | prepend: site.baseurl | prepend: site.url }}) for configuring your proxy settings with Git

## Configurations

**Listing of Configurations:**

	git config -l
	git config -l --global
	git config -l --system
	git config -l --local

**Set Configuration**

	git config --add [variable name] [value]

**Unset Configuration**

	git config --unset [variable name]
