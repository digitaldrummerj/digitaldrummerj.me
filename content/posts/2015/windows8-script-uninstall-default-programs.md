---
categories:
- vagrant
- windows
- powershell
date: 2015-05-27T00:00:00Z
excerpt: "When I am provisioning a new development virtual machine with vagrant, I
  do not need all of the Windows 8 modern applications such as bing maps, finance,
  skype, etc to be installed onto the virtual machine.  These applications are nice
  on a non-virtualized machine but on a virtual machine it just uses extra resources
  that aren't needed.  \n\nThe base install of Windows has all of these programs installed
  with live tiles turned on that I don't need.  This is a huge amount of clutter in
  the start menu.  \n\nWe will be going through 3 steps:\n\n1. Figure out which applications
  that you want to remove.  \n1. Update the script with the list of applications to
  remove.  \n1. Add the vagrant provisioning configuration to run the script when
  you initially run vagrant up  \n"
published: true
title: Windows 8.1 - Powershell Script to Uninstall Default Programs

---

When I am provisioning a new development virtual machine with vagrant, I do not need all of the Windows 8 modern applications such as bing maps, finance, skype, etc to be installed onto the virtual machine.  These applications are nice on a non-virtualized machine but on a virtual machine it just uses extra resources that aren't needed.

The base install of Windows has all of these programs installed with live tiles turned on that I don't need.  This is a huge amount of clutter.

!["Windows before removing start menu default programs](/images/vagrant/Vagrant-Pre-RemoveDefaultProgramsProvisioning.png)

Luckily enough Ben Hunter, wrote a powershell script that we will be going through and setting up as part of the vagrant provisioning process.    [View Original Script](http://blogs.technet.com/b/deploymentguys/archive/2013/10/21/removing-windows-8-1-built-in-applications.aspx).

We will be going through 3 steps:

1. Figure out which applications that you want to remove.
1. Update the script with the list of applications to remove.
1. Add the vagrant provisioning configuration to run the script when you initially run vagrant up

## Getting a List of Possible Applications to Remove

The first step is to get the list of possible application to remove.  We are going to get this list by running the Get-AppxPackage powershell function,  saving output to a file named ModernApps.txt that will be saved to the Windows temp directory and open it in notepad.

1. Open up a powershell command prompt.
	* Use Windows Key + R, type powershell and press enter

1. Run the following command to get the list of applications, save the output to a file and open it in notepad.

		Get-AppxPackage | Format-Wide -Property Name -Column 1 | Out-File "${env:temp}\ModernApps.txt" | notepad "${env:temp}\ModernApps.txt"

1. In the script in the next section, modify the $AppsList variable with the programs that you wish to uninstall.

## Powershell Script to Remove Specified Applications

The second step is to create the script to remove the specific applications.  The script below takes a list of application and calls the Remove-AppxPackage command to uninstall the application.  The list of applications to remove is stored in the $AppsList variable within the script.

Some applications such as camera and photos are not programs that you can be uninstall and may still be pinned to your start menu after this script has run.  Unfortunately, starting with Windows 8.1 Microsoft removed the ability to programmatically pin and unpin applications from the start menu, so you will have to manually unpin them.  Having to manually unpin a couple of application is much better than having to manually uninstall 19 applications.

Note:  If you are testing out the script below by running it from the Powershell ISE, you will get a warning that the environment does not support Transcripts.  This warning will not happen when run from the powershell command line.

```powershell
#*********************
# Purpose:    Remove built in apps specified in list
# Pre-Reqs:    Windows 8.1
#*********************

#------------------------
# Main Routine
#------------------------

# Get log path.
# Will log to Task Sequence log folder if the script is running in a Task Sequence
# Otherwise log to \windows\temp

try
{
	$tsenv = New-Object -COMObject Microsoft.SMS.TSEnvironment
	$logPath = $tsenv.Value("LogPath")
}
catch
{
	Write-Host "This script is not running in a task sequence"
	$logPath = $env:windir + "\temp"
}

$logFile = "$logPath\$($myInvocation.MyCommand).log"

# Start logging
Start-Transcript $logFile
Write-Host "Logging to $logFile"

# *********************
# Update the List of Applications to be removed with your own
#*********************
$AppsList =
	"microsoft.windowscommunicationsapps",
	"Microsoft.BingFinance",
	"Microsoft.BingMaps",`
	"Microsoft.BingWeather",
	"Microsoft.ZuneVideo",
	"Microsoft.ZuneMusic",
	"Microsoft.Media.PlayReadyClient.2",`
	"Microsoft.XboxLIVEGames",
	"Microsoft.HelpAndTips",
	"Microsoft.BingSports",`
	"Microsoft.BingNews",
	"Microsoft.BingFoodAndDrink",
	"Microsoft.BingTravel",
	"Microsoft.WindowsReadingList",`
	"Microsoft.BingHealthAndFitness",
	"Microsoft.WindowsAlarms",
	"Microsoft.WindowsScan",
	"Microsoft.WindowsSoundRecorder",
	"Microsoft.SkypeApp"

ForEach ($App in $AppsList)
{
	$Packages = Get-AppxPackage | Where-Object {$_.Name -eq $App}

	if ($Packages -ne $null)
	{
			Write-Host "Removing Appx Package: $App"

			foreach ($Package in $Packages)
			{
				Remove-AppxPackage -package $Package.PackageFullName
			}
	}
	else
	{
			Write-Host "Unable to find package: $App"
	}

	$ProvisionedPackage = Get-AppxProvisionedPackage -online | Where-Object {$_.displayName -eq $App}

	if ($ProvisionedPackage -ne $null)
	{
			Write-Host "Removing Appx Provisioned Package: $App"
			Remove-AppxProvisionedPackage -online -packagename $ProvisionedPackage.PackageName
	}
	else
	{
			Write-Host "Unable to find provisioned package: $App"
	}
}

# Stop logging
Stop-Transcript
```

##Executing Powershell Script as Part of Vagrant Provisioning

The last step is to add the running of the script to the vagrant provisioning process.

1. In the directory where you have your VagrantFile, create a directory called shell.
1. Create a new file called RemoveDefaultPrograms.ps1 int the shell folder.
1. In the shell directory, create a file called main.cmd.
1. Add the following contents to the main.cmd file.

		echo 'Removing Default Windows Programs'
		@powershell -NoProfile -ExecutionPolicy Bypass -File "%systemdrive%\vagrant\shell\RemoveDefaultPrograms.ps1"

1. Open up your VagrantFile in a text editor of your choice.
1. Add the following line in the area where you have your provisioning setup.

		config.vm.provision :shell, path: "shell/main.cmd"

1. When you run vagrant up, the last step it will run is the provisioning scripts.
1. If you already have a machine controlled by vagrant up and running, you can run vagrant provision to rerun the provisioning scripts.

**Sample Output from the vagrant provisioning**

	==> default: C:\Windows\system32>echo 'Removing Default Windows Programs'
	==> default:
	==> default: 'Removing Default Windows Programs'
	==> default: This script is not running in a task sequence
	==> default: Transcript started, output file is C:\Windows\temp\RemoveDefaultPrograms.ps1.log
	==> default:
	==> default: Logging to C:\Windows\temp\RemoveDefaultPrograms.ps1.log
	==> default: Unable to find package: microsoft.windowscommunicationsapps
	==> default: Removing Appx Provisioned Package: microsoft.windowscommunicationsapps
	==> default:
	==> default: Path           :
	==> default: Online         : True
	==> default: Restart Needed : False
	==> default:
	==> default:
	==> default: Unable to find package: Microsoft.BingFinance
	==> default: Removing Appx Provisioned Package: Microsoft.BingFinance
	==> default: Path           :
	......
	==> default:
	==> default: Transcript stopped, output file is C:\Windows\temp\RemoveDefaultPrograms.ps1.log

After we have run the script, if you used the application list that I had in the script, the start menu will look like this.

![Windows start menu after removing default programs](/images/vagrant/Vagrant-Post-RemoveDefaultProgramsProvisioning.png)

## Conclusion

Now the start menu is mine again control again and I can actually make it useful.  No longer is the first 30 minutes of creating a new virtual machine nothing more than uninstall the default programs and messing with the start menu.
