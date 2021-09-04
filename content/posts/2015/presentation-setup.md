---
categories:
- speaking
- windows
date: 2015-07-09T00:00:00Z
excerpt: "One of the first things that you learn when giving presentations is that
  fonts and font size matters just as much as the content.  Below is a listing of
  the various font settings that I have found to be effective and how to set them
  in the programs that I use.  \n\nIf you have other programs that you use, feel free
  to leave a comment on the font settings that you use.\n"
published: true
title: Presentation Environment Setup

---

One of the first things that you learn when giving presentations is that fonts and font size matters just as much as the content.  Below is a listing of the various font settings that I have found to be effective and how to set them in the programs that I use.  

If you have other programs that you use, feel free to leave a comment on the font settings that you use.

## Notepad

1. Format -> Fonts
	* Font: Lucida Console
	* Font Style: Regular
	* Size: 18-22


## Notepad++

1. Settings -> Style Configurator ...
	* Select Theme: Default (stylers.xml)
	* Language: Default Styles
	* Style: Global Override
	* Font Name: Lucida Console
	* Font Size: 18
	* Bold: sometimes checked depending on the day
	 
	  
## Command Prompt

1. Open cmd
1. Click on menu and select Defaults
1. **Font**
	* Font: Lucida Console
	* Size: 14pt-18pt
	* Check "Bold fonts"
1. **Colors**
	* Screen Text: Lime (Kermit Green or Green: 255, Red: 0, Blue: 9)
	* Screen Background: Black

## Powershell and Azure Powershell Command Prompt 

1. For Win 8.1 On Start find PowerShell or Azure Powershell
1. Open file location. 
1. Open shortcut Properties (right click menu). 
1. Security tab -> Edit your permissions to Modify. 
1. Select Font tab. (skip errors - nothing is set hence problem)
1.  Select Font Tab
	*  Font: Lucida Console
	*  Size: 20
	*  Bold Fonts: Checked
1. Select Colors Tag
	* Screen Text: Gray / Red: 238, Green: 237, Blue: 240
	* Screen background: blue / Red: 1, Green: 36, Blue: 86
1. Select Layout Tab
	* Windows Size Width: 80 (match screen buffer size)
	* Window Size Height: 27 (various depending on resolution) 
	* Let system position window: checked
1.  Click Apply Button
1.  Security tab Edit permissions remove modify. 
1.  Click Ok

Remember to always launch powershell from the start menu.  For some reason this does not seem to affect the fonts if you do win+r.

Don't forget to pin to start menu or task bar if going to be using for demo.

## Powershell ISE

Powershell ISE: C:\Windows\System32\WindowsPowerShell\v1.0

1. For Win 8.1, on start find powershell_ise.exe
1. Tools -> Options -> Colors and Fonts
	*  Click "Manage Themse..."
	*  Select Presentation

Don't forget to pin to start menu or task bar if going to be using for demo.

## Visual Studio Code

1. File -> Preferences -> User Settings
	
		{
				// Wrap based on screen size
				"editor.wrappingColumn": 0,	
		
				// Version: 1.03
				//Controls the indentation of wrapped lines. Can be one of 'none', 'same' or 'indent'.
				//"editor.wrappingIndent": "indent",	
				
				"editor.tabSize": "2",
	
				// Controls the font family.
				"editor.fontFamily": "Consolas",
		
				// Controls the font size.
				"editor.fontSize": 22,
	
				// Version: 1.0.3
				//"editor.formatOnType": true
		}

## Visual Studio Community / Ultimate / Enterprise

1. Go to **Tools -> Options** 
1. **Environment -> General**
	* Change the color theme back to "Blue" if you changed it.  You color scheme might be cool but it will distract attendees.
1. Go to **Environment -> Fonts and Colors**
	* Under the **Show Settings For** drop down make the following changes:
		* Text Editor: Arial 14
		* Editor Tooltip: Calibri 14
		* Statement Completion: Calibri 14,
		* All Text Tool Windows: Tahoma 13
		* Watch, Locals, and Autos Tool Windows: Tahoma 14
		* Environment Font: Calibri 14
		* Package Manager Console:  ??? (if using it for demos)
1. Go to **Environment -> Start up**
	* Change At startup dropdown to "Show Empty Environment"
	* Uncheck Download content every
1. Go to **Environment -> Synchronized Settings**
	* Uncheck "Synchronize settings across devices when signed into Visual Studio"
	* Note: This is done so that your presentation settings do affect any other machines
1. Go to **Environment -> Keyboard**
	* Build.BuildSelection -> Ctrl + \
1. Go To **Projects and Solutions**
	* Check "Track Active Item in Solution Explorer"
	* Check "Always Show Solution"
	* Check "Always show Error List if build finishes with errors"
	* Check "Show Output windows when build starts"
1. Go To **Text Editor**
	* ** All Languages**
		* Check "Word Wrap"
		* Check "Line Numbers"
		* Check "Navigation Bar"
		* Check "Auto Brace Completion"
	* Go To **All Languages -> Tabs**
		* Set "Indenting" to Smart
		* Set "Tab size" to 2
		* Set "Indent size" to 2
		* Check "Keep tabs"

## Sources Used

Here are some various sources that I got information from.

* [http://blogs.msdn.com/b/saraford/archive/2008/06/09/did-you-know-how-to-increase-your-visual-studio-environment-fonts-for-presentations-233.aspx](http://blogs.msdn.com/b/saraford/archive/2008/06/09/did-you-know-how-to-increase-your-visual-studio-environment-fonts-for-presentations-233.aspx)
* [http://www.hanselman.com/blog/PresentationTipsForPeopleRunningVirtualPCOrVMWare.aspx](http://www.hanselman.com/blog/PresentationTipsForPeopleRunningVirtualPCOrVMWare.aspx)
* [http://www.hanselman.com/blog/11TopTipsForASuccessfulTechnicalPresentation.aspx](http://www.hanselman.com/blog/11TopTipsForASuccessfulTechnicalPresentation.aspx)
