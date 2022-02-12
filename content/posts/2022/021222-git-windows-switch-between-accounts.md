---
categories: ["git", "github"]
date: 2022-02-12T13:00:00Z
published: true
title: "Switch Between Github Accounts on Windows"
url: '/switch-between-github-accounts-on-windows'
---

Recently, I had to create a Github account for work in addition to the one that I have for my personal repos. Not a big deal having two accounts but figuring out how to switch the account to use depending on the repository was difficult to figure out.

Luckily, the solution is really straight forward to implement.

<!--more—->

The solution is to:

1. Move all your work repositories to a single directory like c:\repos\work
1. Move all your personal repositories to a single directory like c:\repos\personal
1. Create a .gitconfig-work file in the same directory as your .gitconfig file

	```config
	[user]
		name = Justin James
		email = [Work Email Here]
	[credential “https://github.com”]
		helper = dtkeyring
	```

1. Create a .gitconfig-personal file in the same directory as your .gitconfig file

	```config
	[user]
 		name = Justin James
		email = [Personal Email Here]
	[credential “https://github.com”]
 		helper = wincred
 		useHttpPath = true
	```
	
	> the useHttpPath argument for the credential manager is key as it will will prompt you for credentials for each repository instead of using a single credential for all repositories on a given platform (e.g. GitHub, GitLab, BitBucket, etc)

1. Update your .gitconfig file in your home directory to have an includeif to change which git config pull in based in kn the directory

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

Now your git configuration will change based on the directory your git repository.  This ensures that the right account is associated to your commits.  As well as it will prompt you for your GitHub credentials per repository url.
