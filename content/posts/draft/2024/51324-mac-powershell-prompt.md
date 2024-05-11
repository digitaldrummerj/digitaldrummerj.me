---
categories: ["powershell"]
date: 2024-05-13T13:00:00Z
published: true
title: "Use Powershell on Mac"
url: '/mac-powershell-prompt'
---

This post is a Mac version of a post I wrote a couple of years ago titled [Take Your Windows Terminal and Powershell to the next level](/next-level-powershell-prompt).  

![Michael's PowerShell Terminal](/images/powershell/powershell-prompt-example.png)

Let’s walk through the steps I took to get my shell working like Michael's on Mac.

<!--more-->

Several items need to be installed for the profile to work:

* Nerd Font - this is the font that provides the icons for folders and files
* Starship - The minimal, blazing-fast, and infinitely customizable prompt for any shell!
* Terminal-Icons - PowerShell module to display the icons from the Nerd Font
* devtoolbox - a PowerShell module with a bunch of useful aliases for dev tools that Michael released
* PSReadLine - a PowerShell module that allows predictive suggestions as you type a command

## Font Install

Nerd Fonts patches developer targeted fonts with a high number of glyphs (icons). Specifically to add an increased number of extra glyphs from popular ‘iconic fonts’ such as Font Awesome, Devicons, Octicons, and others.

I am using the CaskaydiaCove Nerd Font from [Nerd Font](https://www.nerdfonts.com/font-downloads).

To install:

1. Open Terminal or whatever shell you are using
1. Update brew with the nerd fonts

    ```shell
    brew tap homebrew/cask-fonts
    ```

    > If you are not using brew, you can install it at [https://brew.sh](https://brew.sh)

1. Install the font

    ```shell
    brew install --cask font-caskaydia-cove-nerd-font
    ```

## Powershell Install

1. After the font is installed, you need to install Powershell

    ```shell
    brew install powershell/tap/powershell
    ```

1. To Launch Powershell, run:

    ```shell
    pwsh
    ```

## Powershell Profile Setup

Next, we need to tell Mac Terminal to use the CaskaydiaCove Nerd Font that was just installed.

1. In Terminal, Open settings by pressing Command+, or clicking on the Terminal menu and selecting Settings
1. Click the + to add a new Profile or Duplicate your existing profile
1. Name the new profile Powershell
1. Click the Change... button under Font
1. Click All Fonts
1. Find CaskaydiaCove Nerd Font and Select it
1. For the style, select Regular
1. Click the Font Window

Now we need to tell Terminal to automatically launch Powershell as our default Terminal shell

1. Under the settings for the Powershell profile, click the Shell tab
1. Under Startup, check the Run command: box
1. Add the following command:

    ```text
    /usr/local/microsoft/powershell/7/pwsh
    ```

1. Uncheck Run inside shell
1. Under the Ask Before closing, add the following:

    ```text
    -pwsh
    pwsh
    ```

1. Close the Settings
1. Quit Terminal and Relaunch it

## Use brew in Powershell

In order to use brew in Powershell you need to run the brew shellenv command to set up the profile environment variables.

1. Run: `vi $profile`
1. Add the following to the file:

    ```text
    $(/opt/homebrew/bin/brew shellenv) | Invoke-Expression
   ```

1. Refresh the Powershell profile by running

    ```powershell
   . $profile
   ```

   > You might need to restart Terminal for the profile changes to be picked up

## Starship

Next, we need to install [Starship](https://starship.rs/), the minimal, blazing-fast, and infinitely customizable prompt for any shell!

You install Starship using

```shell
curl -sS https://starship.rs/install.sh | sh
```

> Note: I had issues installing starship with brew and Powershell not recognizing starship command, so using manual install above.

Now that we have Starship installed, we need to add it to our PowerShell profile.

1. Open PowerShell
1. Open the profile by typing `vi $profile`
1. Add the following line at the top of the profile and save it

    ```PowerShell
    Invoke-Expression (&starship init powershell)
    ```

## Terminal-Icons

[Terminal Icons](https://github.com/devblackops/Terminal-Icons) is a PowerShell module to show file and folder icons in the terminal.

1. To install, open PowerShell and run:

    ```PowerShell
    Install-Module Terminal-Icons -Scope CurrentUser
    ```

1. To use the Terminal Icons, add the following line to your PowerShell profile

    ```PowerShell
    Import-Module Terminal-Icons
    ```

## devtoolbox

[devtoolbox](https://github.com/builders-club/devtoolbox) is a set of aliases for common developer command for docker, docker-compose, and git.

You can install devtoolbox from the [PowerShell Gallery](https://www.powershellgallery.com/packages/devtoolbox/)

```PowerShell
Install-Module -Name devtoolbox
```

To use the devtoolbox now that we have installed it, open up your PowerShell profile and add the following statement.

```PowerShell
Import-Module devtoolbox
```

## PSReadLine Predictions

For the predictive suggests when typing commands, we need to install PSReadline.

In a PowerShell administrator shell, run

```PowerShell
Install-Module PSReadLine -RequiredVersion 2.2.2 -Force
```

> Needed to use -Force to have it install PSReadLine 2.2

To our PowerShell profile, we need to add the following lines:

```PowerShell
Import-Module PSReadLine

Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows
```

## update function

The update function is designed to make it easy to update powershell to the latest version

```PowerShell
function update {
  brew update
  brew upgrade powershell
}
```

I would suggest that you run the `update` command and install the latest cross platform version.  Once you get the cross-platform version installed, you need to install the PowerShell modules above and create the profile.

## profile ended

The last piece is to set up the profile function to launch the profile into VSCode quickly.

```PowerShell
function profile {
  code $profile
}
```

Now your prompt is just like Michael's.

## Full PowerShell Profile

There is a couple of bonus functions like getting a random fact, a dad joke, convert a temp to C, and convert a temp to F.

> Originally posted by [Michael Jolley](https://gist.github.com/MichaelJolley/e65a1a46477a85ecff7f660eee02fa25)

```PowerShell
Invoke-Expression (&starship init powershell)
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
    brew update
    brew upgrade powershell
}

function profile {
  code $profile
}
```
