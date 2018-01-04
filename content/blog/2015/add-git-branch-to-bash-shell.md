---
categories:
- git
- github
date: 2015-06-11T00:00:00Z
excerpt: When I am working on a git repository and using the command line, one of
  the things that I often end up checking is which git branch I am on and if there
  are any pending changes.  How awesome would it be if the bash shell prompt, told
  you the branch name if the directory is part of a git repository and if there are
  any changes.  Well, thankfully someone has done this work already and with a little
  bit of configuration on your part, you can implement the changes.
published: true
title: Add Git Branch Name to Bash Prompt
---

When I am working on a git repository and using the git command line, one of the things that I often end up checking it which git branch I am on and if there are any pending changes.  How awesome would it be if the bash shell prompt, told you the branch name if the directory is part of a git repository and if there are any changes.  Well, thankfully someone has done this work already and with a little bit of configuration on your part, you can implement the changes.

1. mkdir ~/.bash
1. cd ~/.bash
1. git clone git://github.com/jimeh/git-aware-prompt.git
1. edit your bash profile (~/.bashrc or ~/.bash_profile)
1. At the top of your bash profile, add the following 2 lines.

		export GITAWAREPROMPT=~/.bash/git-aware-prompt
		source $GITAWAREPROMPT/main.sh
		
1. At the end of your bash profile, update the prompt with the following line.  

		export PS1="\${debian_chroot:+(\$debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\] \[$txtcyn\]\$git_branch\[$txtred\]\$git_dirty\[$txtrst\]\$ "
		
1. If you are in a git repository directory like I am in the ~blog directory, your prompt will now look like this:
	* No Uncommited changes
	
			vagrant@vagrant-ubuntu-trustry-64:~/blog (master) $[]
	* Changes that have not been committed.  Notice the star after the word master
	
			vagrant@vagrant-ubuntu-trustry-64:~/blog (master)* $[]
	

1. If you are in a non-git repository directory such as the ~/ directory, your prompt will now look like this:

		vagrant@vagrant-ubuntu-trustry-64:~/ $ 
	