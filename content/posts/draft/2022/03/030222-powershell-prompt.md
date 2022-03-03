---
categories: ["Powershell"]
date: 2022-03-02T13:00:00Z
draft: true
title: "Take your Windows Terminal and PowerShell to the next level"
url: '/next-level-powershell-prompt'
---

I was watching the [Bald Bearded Builder, Michael Jolley](https://www.twitch.tv/baldbeardedbuilder), and I had shell envy as I was watching him use Powershell. Powershell showed the git status, node version, folder/file icons, had a cool color scheme, and had predictive completion when typing commands based on his Powershell history.

![Michael's Powershell Terminal](/images/powershell/powershell-prompt-example.png)

I asked Michael in chat if he would be willing to share his Powershell profile which he was nice enough to do right then and there on stream.

However, even with his Powershell profile in hand, it still took me a bit of time to figure out what I needed to do take advantage of the profile.

Let’s walk through the steps I took to get my she'll working like Michael's.

<!--more-->

Several pieces are being used for the profile:

* Nerd Font - this is the font that provides the icons for folders and files
* Starship - The minimal, blazing-fast, and infinitely customizable prompt for any shell!
* Terminal-Icons - Powershell module to display the icons from the Nerd Font
* devtoolbox - a Powershell module with a bunch of useful aliases for dev tools that Michael released
* PSReadLine - a Powershell module that allows the predictive suggestions as you type a command

## Font Install

Nerd Fonts patches developer targeted fonts with a high number of glyphs (icons). Specifically to add an increased number of extra glyphs from popular ‘iconic fonts’ such as Font Awesome, Devicons, Octicons, and others.

Dowload the CaskaydiaCove Nerd Font from [Nerd Font](https://www.nerdfonts.com/font-downloads).

Once you have the font installed, open Powershell as an Administrator and run:

```powershell
key = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Console\TrueTypeFont'
Set-ItemProperty -Path $key -Name '000' -Value 'CaskaydiaCove Nerd Font'
```

## Starship

Next, we need to install [Starship](https://starship.rs/), the minimal, blazing-fast, and infinitely customizable prompt for any shell!

You install Starship using [Chocolatey ](https://chocolatey.org)

```shell
choco install -y starship
```

Now that we have Starship install, we need to add it to our Powershell profile.

1. Open Powershell 
1. Open the profile by typing `notepad profile`
1. Add the following line at the top of the profile and save it  

	```Powershell 
	Invoke-Expression (&starship init powershell)
	```

## Terminal-Icons

A Powershell module show file and folder icons in the terminal.

1. To install [Terminal Icons](https://github.com/devblackops/Terminal-Icons), open Powershell and run: 

	```powershell
	Install-Module Terminal-Icons -Scope CurrentUser
	```
	
1.  To use the Terminal Icons, add the following line to your Powershell profile 

	```Powershell 
	Import-Module Terminal-Icons
	```

## devtoolbox

The [devtoolbox](https://github.com/builders-club/devtoolbox) is a set of aliases for common developer command for docker, docler-compose and git.

Your can install devtoolbox from the [Powershell Gallery](https://www.powershellgallery.com/packages/devtoolbox/)


```Powershell 
Install-Module -Name devtoolbox
```

To use the devtoolbox now that we have it installed, open up your Powershell profile and add the following statement.

```Powershell 
Import-Module devtoolbox
```

## PSReadLine Predictions

For the predictive suggests when typing commands, we need to install PSReadline

```powershell
Import-Module PSReadLine
```

To our Powershell profile, we need to add the following lines :

``Powershell 
Install-Module PSReadLine
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode 
```

## update function

The update function is designed to MI can easily make sure Powershell]

```Powershell 
function update {
  iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI"
}
```

## profile ended

The last piece to do is set up the profile function to quickly launch the profile into VSCode.


```Powershell 
function profile {
  code $profile
}
``›
