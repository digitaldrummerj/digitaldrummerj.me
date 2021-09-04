---
categories:
- nuget
date: 2015-05-04T00:00:00Z
excerpt: When you are building nuget packages that are not directly using the AssemblyInfo.cs
  for the version number, you need to make sure to increment the nuget version number
  before building the package.  Inevitable though you will forget to increment the
  version number and have to build the package a 2nd time.  Wouldn't it be great if
  you could automatically increment the version number before calling nuget pack.  Well
  I have written a powershell script to do just this.  Below are the details out the
  script.
published: true
title: Nuget - Incrementing Version Before Building

---

When you are building nuget packages that are not directly using the AssemblyInfo.cs for the version number, you need to make sure to increment the nuget version number before building the package.  Inevitable though you will forget to increment the version number and have to build the package a 2nd time.  Wouldn't it be great if you could automatically increment the version number before calling nuget pack.  Well I have written a powershell script to do just this.  Below are the details out the script.

1. In your project directory, create a file called IncrementNugetVersionNumber.ps1
1. Add the following parameters to the top of the file to take in the nuget spec file location and any version parameters.

{{< highlight powershell >}}

param($NuSpecFile = $(throw "Mandatory parameter -NuSpecFile not supplied"),
    $MajorVersion,
    $MinorVersion,
    $RevisionVersion)

{{< / highlight >}}

Next we are going to add a bunch of helper functions right under the param code from above.  These helper functions will make it easier to deal with the xml queries of the nuget spec document.


{{< highlight powershell >}}

function AssignVersionValue(
    [string]$oldValue,
    [string]$newValue)
{
    if ($newValue -eq $null -or $newValue -eq "") {
        $oldValue
    } else {
        $newValue
    }
}

{{< / highlight >}}


{{< highlight powershell >}}

function Get-XmlNamespaceManager(
    [xml]$XmlDocument,
    [string]$NamespaceURI = "")
{
    if ([string]::IsNullOrEmpty($NamespaceURI))
    {
        $NamespaceURI = $XmlDocument.DocumentElement.NamespaceURI
     }

    [System.Xml.XmlNamespaceManager]$xmlNsManager = New-Object System.Xml.XmlNamespaceManager($XmlDocument.NameTable)
    $xmlNsManager.AddNamespace("ns", $NamespaceURI)
    return ,$xmlNsManager
}

{{< / highlight >}}


{{< highlight powershell >}}

function Get-FullyQualifiedXmlNodePath(
    [string]$NodePath,
    [string]$NodeSeparatorCharacter = '.')
{
    return "/ns:$($NodePath.Replace($($NodeSeparatorCharacter), '/ns:'))"
}

{{< / highlight >}}

{{< highlight powershell >}}

function Get-XmlNode(
    [xml]$XmlDocument,
    [string]$NodePath,
    [string]$NamespaceURI = "",
    [string]$NodeSeparatorCharacter = '.')
{
    $xmlNsManager = Get-XmlNamespaceManager -XmlDocument $XmlDocument -NamespaceURI $NamespaceURI
    [string]$fullyQualifiedNodePath = Get-FullyQualifiedXmlNodePath -NodePath $NodePath -NodeSeparatorCharacter $NodeSeparatorCharacter

    $node = $XmlDocument.SelectSingleNode($fullyQualifiedNodePath, $xmlNsManager)
    return $node
}

{{< / highlight >}}

{{< highlight powershell >}}

function Get-XmlNodes(
    [xml]$XmlDocument,
    [string]$NodePath,
    [string]$NamespaceURI = "",
    [string]$NodeSeparatorCharacter = '.')
{
    $xmlNsManager = Get-XmlNamespaceManager -XmlDocument $XmlDocument -NamespaceURI $NamespaceURI
    [string]$fullyQualifiedNodePath = Get-FullyQualifiedXmlNodePath -NodePath $NodePath -NodeSeparatorCharacter $NodeSeparatorCharacter

    $nodes = $XmlDocument.SelectNodes($fullyQualifiedNodePath, $xmlNsManager)
    return $nodes
}

{{< / highlight >}}

{{< highlight powershell >}}

function Get-XmlElementsTextValue(
    [xml]$XmlDocument,
    [string]$ElementPath,
    [string]$NamespaceURI = "",
    [string]$NodeSeparatorCharacter = '.')
{
    $node = Get-XmlNode -XmlDocument $XmlDocument -NodePath $ElementPath -NamespaceURI $NamespaceURI -NodeSeparatorCharacter $NodeSeparatorCharacter

    if ($node) {
        return $node.InnerText
    } else {
        return $null
    }
}
{{< / highlight >}}

{{< highlight powershell >}}

function Set-XmlElementsTextValue(
    [xml]$XmlDocument,
    [string]$ElementPath,
    [string]$TextValue,
    [string]$NamespaceURI = "",
    [string]$NodeSeparatorCharacter = '.')
{
    $node = Get-XmlNode -XmlDocument $XmlDocument -NodePath $ElementPath -NamespaceURI $NamespaceURI -NodeSeparatorCharacter $NodeSeparatorCharacter

    if ($node)
    {
        $node.InnerText = $TextValue
    }
    else
    {
        $elementName = $ElementPath.Substring($ElementPath.LastIndexOf($NodeSeparatorCharacter) + 1)
        $element = $XmlDocument.CreateElement($elementName, $XmlDocument.DocumentElement.NamespaceURI)
        $textNode = $XmlDocument.CreateTextNode($TextValue)
        $element.AppendChild($textNode) > $null

        $parentNodePath = $ElementPath.Substring(0, $ElementPath.LastIndexOf($NodeSeparatorCharacter))
        $parentNode = Get-XmlNode -XmlDocument $XmlDocument -NodePath $parentNodePath -NamespaceURI $NamespaceURI -NodeSeparatorCharacter $NodeSeparatorCharacter

        if ($parentNode)
        {
            $parentNode.AppendChild($element) > $null
        }
        else
        {
            throw "$parentNodePath does not exist in the xml."
        }
    }
}

{{< / highlight >}}

Now that the helper functions are added, it is time to create the meat of the script where you will update the version number and write it back to the file.

1. Get the Full Path of the Nuget spec file from parameter $NuSpecFile

        $NuSpecFile = Resolve-Path $NuSpecFile

1. Once we have the full path, we need to get the contents of the files as an Xml document so that we can run xpath queries on it.

        [ xml ]$fileContents = Get-Content -Path $NuSpecFile


1. Then we need to get the current version number

        $originalVersion = Get-XmlElementsTextValue -XmlDocument $fileContents -ElementPath "package.metadata.version"

1. Set a default version number

        $newVersion = "1.0.0"

1. If there is an existing version number, then we can update it.  If not, then use the default version number.  This bit of code will break apart the version number into individual segments that we can then update.

        if ($originalVersion -ne $null)
        {
            $segments=$originalVersion.Split(".")
            $v1="1"
            $v2="0"
            $v3="0"

            if ($segments.Length -gt 0) { $v1=$segments[0] }
            if ($segments.Length -gt 1) { $v2=$segments[1] }
            if ($segments.Length -eq 3) { $v3=$segments[2] }

            $v1 = AssignVersionValue $v1 $MajorVersion
            $v2 = AssignVersionValue $v2 $MinorVersion
            $v3 = AssignVersionValue $v3 $RevisionVersion

            if ($v1 -eq $null) { $v1 = 1 }
            if ($v2 -eq $null) { $v2 = 0 }
            if ($v3 -eq $null) { $v3 = 0 }


            $newVersion = "$v1.$v2"
                #Write-Host "REV: $RevisionVersion"
            if ($v3 -ne $null -and ($RevisionVersion -eq $null -or $RevisionVersion -eq "")) {
                $v3 = ($v3 -as [int]) + 1
            }

            $newVersion = "$newVersion.$v3"
        }

1. Lastly, we need to set the new version number and save the file.

        write-host "Setting Version to $newVersion"

        Set-XmlElementsTextValue -XmlDocument $fileContents -ElementPath "package.metadata.version" -TextValue $newVersion
        $fileContents.Save($NuSpecFile)


Now that we have the powershell script built to increment the version number, the next piece is to create the batch file that calls the script and nuget pack.

For the batch file you can pass in /major, /minor, /revision, and /outputdir.  If any of these are not passed in, it will use the existing values from the nuget spec and output into the current directory.

1. Create a file called build.cmd
1. Setup the parameters

        @echo off
        SET OUTPUTDIR=""
        SET REVISION=""
        SET MAJOR=""
        SET MINOR=""

1. Next we need to check the parameters and set each of the individual values.

        :checkparameters
        :: REM Grab the first variable supplied as a whole. Ex. /action:start
        set SWITCHPARSE=%1

        :: REM Check to see if there are no more switches, if so goto end of
        :: parsing, prevents endless loop
        IF [%SWITCHPARSE%] == [] goto end

        :: REM Reset variables as clean up.
        set SWITCH=
        set VALUE=

        :: In the SWITCHPARSE variable, grab the two tokens separated
        :: by a : and assign the first to SWITCH and the second to VALUE
        for /F "tokens=1,2 delims=:" %%a IN ("%SWITCHPARSE%") DO (
            SET SWITCH=%%a
            set VALUE=%%b
        )

        :: Check which action to perform based on the switch
        IF [%SWITCH%] == [/revision] goto setrevision
        IF [%SWITCH%] == [/major] goto setmajorversion
        IF [%SWITCH%] == [/minor] goto setminorversion
        IF [%SWITCH%] == [/outputdir] goto setoutputdir
        :: Perform the action by setting the variable for later use and
        :: shift the command line parameters so the next in line is
        :: ready to be processed

        goto end

        :setrevision
        set REVISION=%VALUE%
        SHIFT
        goto checkparameters

        :setmajorversion
        set MAJOR=%VALUE%
        SHIFT
        goto checkparameters

        :setminorversion
        set MINOR=%VALUE%
        SHIFT
        goto checkparameters

        :setoutputdir
        set OUTPUTDIR=%VALUE%
        SHIFT
        goto checkparameters

1. Finally we need to call the powershell script we created above and increment the version number in the nuget spec.

        :end
        echo.

        echo PowerShell -NoProfile -ExecutionPolicy Bypass -File "..\IncrementNugetVersionNumber.ps1" -NuspecFile "log4net.blank.config.nuspec" -RevisionVersion %REVISION% -MajorVersion %MAJOR% -MinorVersion %MINOR%

        PowerShell -NoProfile -ExecutionPolicy Bypass -File "..\IncrementNugetVersionNumber.ps1" -NuspecFile "log4net.appender.console.nuspec" -RevisionVersion %REVISION% -MajorVersion %MAJOR% -MinorVersion %MINOR%

1. Finally, we need to call nuget pack to build the nuget package

        echo.
        echo nuget pack -OUTPUTDIR "%OUTPUTDIR%"
        nuget pack -OUTPUTDIR %OUTPUTDIR%

Now anytime that you need to build the nuget package, you just have to call build.cmd and it will spit out an new package with an incremented version number.

I know this post was a lot of code.  Both of the files that we create can be downloaded at:

[IncrementNugetVersionNumber.ps1](/Downloads/2015-05-03-Nuget-Auto-Incrementing-Version/IncrementNugetVersionNumber.ps1)

[build.cmd](/Downloads/2015-05-03-Nuget-Auto-Incrementing-Version/build.cmd)

