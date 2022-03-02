---
categories: ["powershell"]
date: 2022-03-02T13:00:00Z
draft: true
title: "Take your Windows Terminal and PowerShell to the next level"
url: '/next-level-powershell-prompt'
---

I was watching the [Bald Bearded Builder, Michael Jolley](https://www.twitch.tv/baldbeardedbuilder) and had shell envy as I was watching him use his Powershell terminal. In Powershell, it was showing the git status and node version for the project directory, the node version of the folder, folder/file icons, and predictive completion when typing commands based off his Powershell history.

![Michael's Powershell Terminal](/images/powershell/powershell-prompt-example.png)

I asked Michael in chat if he would be willing to share his Powershell profile which he was nice enough to do right then and there on stream.

However,even with his Powershell profile, it still took me a bit of time to figure out how to get Powershell working right. So in this post, I am going to walk through what it takes to get Powershell working just like Michael's.

<!--more-->

There are several pieces that are being used to make the shell look and work the same way.

* Nerd Font - this is the font that provides the icons for folders and files
* Starship - The minimal, blazing-fast, and infinitely customizable prompt for any shell!
* Terminal-Icons - Powershell module to display the icons from the Nerd Font
* devtoolbox - a Powershell module with a bunch of useful aliases for dev tools that Michael released
* PSReadLine - a Powershell module that allows the predictive suggestions as you type a command

## Font Install

Font Download: [Nerd Fonts](https://www.nerdfonts.com/font-downloads)

Look for CaskaydiaCove Nerd Font

```powershell
key = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Console\TrueTypeFont'
Set-ItemProperty -Path $key -Name '000' -Value 'CaskaydiaCove Nerd Font'
```

## Starship

The minimal, blazing-fast, and infinitely customizable prompt for any shell!

[https://starship.rs/](https://starship.rs/)

1. `choco install -y starship`
1. `Invoke-Expression (&starship init powershell)`

## Terminal-Icons

## devtoolbox

## PSReadLine Predictions

## update function

## profile

```powershell

#Install-Module Terminal-Icons -Scope CurrentUser
Import-Module Terminal-Icons

# https://github.com/builders-club/devtoolbox
# https://www.powershellgallery.com/packages/devtoolbox/
# Install-Module -Name devtoolbox
Import-Module devtoolbox

# Chocolatey profile
$ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
if (Test-Path($ChocolateyProfile)) {
  Import-Module "$ChocolateyProfile"
}
Import-Module PSReadLine

# Requires PSReadLine 2.2
# Install-Module PSReadLine -Force
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows

function update {
  iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI"
}

function profile {
  code $profile
}
```

```powershell
# This is an example profile for PSReadLine.
#
# This is roughly what I use so there is some emphasis on emacs bindings,
# but most of these bindings make sense in Windows mode as well.

# Searching for commands with up/down arrow is really handy.  The
# option "moves to end" is useful if you want the cursor at the end
# of the line while cycling through history like it does w/o searching,
# without that option, the cursor will remain at the position it was
# when you used up arrow, which can be useful if you forget the exact
# string you started the search on.
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

# This key handler shows the entire or filtered history using Out-GridView. The
# typed text is used as the substring pattern for filtering. A selected command
# is inserted to the command line without invoking. Multiple command selection
# is supported, e.g. selected by Ctrl + Click.
Set-PSReadLineKeyHandler -Key F7 `
                         -BriefDescription History `
                         -LongDescription 'Show command history' `
                         -ScriptBlock {
    $pattern = $null
    [Microsoft.PowerShell.PSConsoleReadLine]::GetBufferState([ref]$pattern, [ref]$null)
    if ($pattern)
    {
        $pattern = [regex]::Escape($pattern)
    }

    $history = [System.Collections.ArrayList]@(
        $last = ''
        $lines = ''
        foreach ($line in [System.IO.File]::ReadLines((Get-PSReadLineOption).HistorySavePath))
        {
            if ($line.EndsWith('`'))
            {
                $line = $line.Substring(0, $line.Length - 1)
                $lines = if ($lines)
                {
                    "$lines`n$line"
                }
                else
                {
                    $line
                }
                continue
            }

            if ($lines)
            {
                $line = "$lines`n$line"
                $lines = ''
            }

            if (($line -cne $last) -and (!$pattern -or ($line -match $pattern)))
            {
                $last = $line
                $line
            }
        }
    )
    $history.Reverse()

    $command = $history | Out-GridView -Title History -PassThru
    if ($command)
    {
        [Microsoft.PowerShell.PSConsoleReadLine]::RevertLine()
        [Microsoft.PowerShell.PSConsoleReadLine]::Insert(($command -join "`n"))
    }
}

# Sometimes you enter a command but realize you forgot to do something else first.
# This binding will let you save that command in the history so you can recall it,
# but it doesn't actually execute.  It also clears the line with RevertLine so the
# undo stack is reset - though redo will still reconstruct the command line.
Set-PSReadLineKeyHandler -Key Alt+w `
                         -BriefDescription SaveInHistory `
                         -LongDescription "Save current line in history but do not execute" `
                         -ScriptBlock {
    param($key, $arg)

    $line = $null
    $cursor = $null
    [Microsoft.PowerShell.PSConsoleReadLine]::GetBufferState([ref]$line, [ref]$cursor)
    [Microsoft.PowerShell.PSConsoleReadLine]::AddToHistory($line)
    [Microsoft.PowerShell.PSConsoleReadLine]::RevertLine()
}
```
