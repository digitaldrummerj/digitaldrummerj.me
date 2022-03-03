---
categories: ["powershell"]
date: 2022-03-02T13:00:00Z
published: true
title: "Take your Windows Terminal and PowerShell to the next level"
url: '/next-level-powershell-prompt'
---

I was watching the [Bald Bearded Builder, Michael Jolley](https://www.twitch.tv/baldbeardedbuilder), and I had shell envy as I watched him use Powershell terminal. His terminal showed the git status, node version, folder/file icons, cool color scheme, and predictive completion when typing commands based on his Powershell history.

![Michael's Powershell Terminal](/images/powershell/powershell-prompt-example.png)

I asked Michael in chat if he would be willing to share his Powershell profile which he was nice enough to do right then and there on stream.

However, even with his Powershell profile in hand, it still took me a bit of time to figure out what I needed to do to take advantage of the profile.

Let’s walk through the steps I took to get my she'll working like Michael's.

<!--more-->

Several items need to be installed for the profile to work:

* Nerd Font - this is the font that provides the icons for folders and files
* Starship - The minimal, blazing-fast, and infinitely customizable prompt for any shell!
* Terminal-Icons - Powershell module to display the icons from the Nerd Font
* devtoolbox - a Powershell module with a bunch of useful aliases for dev tools that Michael released
* PSReadLine - a Powershell module that allows predictive suggestions as you type a command

## Font Install

Nerd Fonts patches developer targeted fonts with a high number of glyphs (icons). Specifically to add an increased number of extra glyphs from popular ‘iconic fonts’ such as Font Awesome, Devicons, Octicons, and others.

Download the CaskaydiaCove Nerd Font from [Nerd Font](https://www.nerdfonts.com/font-downloads).

Once you have the font installed, open Powershell as an Administrator and run:

```powershell
key = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Console\TrueTypeFont'
Set-ItemProperty -Path $key -Name '000' -Value 'CaskaydiaCove Nerd Font'
```

I am using [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab) to run all of various shells including Powershell.

To use the CaskaydiaCove Nerd Font that you just installed in Windows Terminal, you need to update the JSON settings file and set the font to be CaskaydiaCove Nerd Font.

1. Open Windows Terminal
1. Open settings by pressing ctrl+, or clicking on the down arrow in the title bar and select Settings
1. On the bottom of the left navbar, click on Open JSON file
1. Find the defaults sections under profiles and add the "font" section below

  ```json
  {
    "profiles":
    {
        "defaults":
        {
            // Put settings here that you want to apply to all profiles
            "font": {
                "face": "CaskeydiaCove Nerd Font",
                "weight": "normal"
            }
        }
    }
  }
  ```

## Starship

Next, we need to install [Starship](https://starship.rs/), the minimal, blazing-fast, and infinitely customizable prompt for any shell!

You install Starship using [Chocolatey](https://chocolatey.org)

```shell
choco install -y starship
```

Now that we have Starship installed, we need to add it to our Powershell profile.

1. Open Powershell
1. Open the profile by typing `notepad profile`
1. Add the following line at the top of the profile and save it

    ```Powershell
    Invoke-Expression (& starship init powershell)
    ```

## Terminal-Icons

[Terminal Icons](https://github.com/devblackops/Terminal-Icons) is a Powershell module to show file and folder icons in the terminal.

1. To install, open Powershell and run:

    ```powershell
    Install-Module Terminal-Icons -Scope CurrentUser
    ```

1. To use the Terminal Icons, add the following line to your Powershell profile

    ```Powershell
    Import-Module Terminal-Icons
    ```

## devtoolbox

[devtoolbox](https://github.com/builders-club/devtoolbox) is a set of aliases for common developer command for docker, docker-compose, and git.

You can install devtoolbox from the [Powershell Gallery](https://www.powershellgallery.com/packages/devtoolbox/)

```Powershell
Install-Module -Name devtoolbox
```

To use the devtoolbox now that we have installed it, open up your Powershell profile and add the following statement.

```Powershell
Import-Module devtoolbox
```

## PSReadLine Predictions

For the predictive suggests when typing commands, we need to install PSReadline.

```powershell
Install-Module PSReadLine -Force
```

> Needed to use -Force to have it install PSReadLine 2.2

To our Powershell profile, we need to add the following lines:

```Powershell
Import-Module PSReadLine

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

I would suggest that you run the `update` command and install the latest cross platform version.

## profile ended

The last piece is to set up the profile function to launch the profile into VSCode quickly.

```Powershell
function profile {
  code $profile
}
```

Now your prompt is just like Michael's.


## Full Powershell Profile

There is a couple of bonus functions like getting a random fact, a dad joke, convert a temp to C, and convert a temp to F.

> Originally posted by [Michael Jolley](https://gist.github.com/MichaelJolley/e65a1a46477a85ecff7f660eee02fa25)

```powershell
Invoke-Expression (& Starship init powershell)
Import-Module Terminal-Icons
Import-Module devtoolbox
Import-Module PSReadLine

Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows

function fact {
  irm -Uri https://uselessfacts.jsph.pl/random.json?language=en | Select -ExpandProperty text
}

function joke {
  irm https://icanhazdadjoke.com/ -Headers @{accept = 'application/json'} | select -ExpandProperty joke
}

function 2C {
  param (
      [Parameter()]
      [Alias('Temp')]
      [int]
      $Temperature
  )

  ($Temperature - 30) / 2
}

function 2F {
  param (
      [Parameter()]
      [Alias('Temp')]
      [int]
      $Temperature
  )

  ($Temperature * 2) + 30
}

function update {
  iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI"
}

function profile {
  code $profile
}
```
