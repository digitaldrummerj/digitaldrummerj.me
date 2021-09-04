---
categories:
- productivity
- visual studio
date: 2015-08-13T00:00:00Z
excerpt: I am keyboard person and like shortcut keys.  There are lot of available
  shortcuts in Visual Studio and here is a list of the Visual Studio shortcuts that
  I use.
published: true
series: ["developer-productivity"]
title: Favorite Visual Studio Shortcuts

---

Here is a list of  Visual Studio Community Edition shortcuts that I use.  

## Building Solution

<table class="exampleTable">
<tr>
	<th>Name</th>
	<th>Shortcut</th>
</tr>
<tr>
		<td>Build Solution</td>
	<td>Ctrl+Shift+B</td>
</tr>
<tr class="alt">

	<td>Run Code Analysis on Solution</td>
	<td>Alt+F11</td>
</tr>
</table>

## Building Current Project

There is no default shortcut for building the current project or running code analysis on it.  You can go  under the Build menu and select to build just the current project but this is a manual step that requires you to navigate through the menus.  

To accomplish this, I set the keyboard shortcut Ctrl + \ .

1. Tools -> Options -> Keyboard or Ctrl + Q, type Keyboard, and hit Enter
2. Set shortcut for Build.BuildSelection.
3. Open a file and Ctrl+\ should now build that project  

**Run Code Analysis on Current Project**

You can also run code analysis on the current project like you can on the whole solution.  

To accomplish this, I set the keyboard shortcut Ctrl+Alt+\

1. Tools -> Options -> Keyboard or Ctrl + Q, type Keyboard, and hit Enter
1. Set shortcut for Build.RunCodeAnalysisonSelection.  
1. Open a file and Ctrl+Alt+\ to run the the code analysis for the project

## Debugging

<table class="exampleTable">
<tr>
	<th>Name</th>
	<th>Shortcut</th>
</tr>
<tr>
		<td>Start Debugging</td>
	<td>F5</td>
</tr>
<tr class="alt">

	<td>Start without Debugging</td>
	<td>Ctrl+F5</td>
</tr>
<tr>
	<td>Toggle Breakpoint On/Off for line</td>
	<td>F9</td>
</tr>
<tr class="alt">
	<td>Run to Cursor and then stop like there is a breakpoint on that line</td>
	<td>Ctrl+F10</td>
</tr>
<tr>
	<td>Step Through the Code Line by Line</td>
	<td>F11</td>
</tr>
<tr class="alt">
	<td>Modify what the debugger displays for an object</td>
	<td><a href="http://tinyurl.com/vsdebugattrib">http://tinyurl.com/vsdebugattrib</a></td>
</tr>

</table>

## Searching

<table class="exampleTable">
<tr>
	<th>Name</th>
	<th>Shortcut</th>
</tr>
<tr>
	<td>Quick Search</td>
	<td>Ctrl+Q</td>
</tr>
<tr class="alt">
	<td>Find in Files</td>
	<td>Ctrl+Shift+F</td>
</tr>
<tr>
	<td>Next Search Result</td>
	<td>F8</td>
</tr>
<tr class="alt">
	<td>Previous Search Result</td>
	<td>Shift+F8</td>
</tr>

</table>

## Navigation

<table class="exampleTable">
<tr>
	<th>Name</th>
	<th>Shortcut</th>
</tr>
<tr >
	<td>Go To Definition</td>
	<td>F12 <br />Ctrl+Click with <a href="http://tinyurl.com/vsprodpower">Productivity Power Tools</a></td>
</tr>
<tr class="alt">
	<td>Close All Documents</td>
	<td>Alt+W,L</td>
</tr>

</table>


## Visual Studio Windows Layout

In Visual Studio 2015, you can now save the Windows Layout and change them with a shortcut key.  

1. To Save:  In Visual Studio 2015, under the Windows menu, click the Save Windows Layout
1. To Apply Layout: In Visual Studio 2015, under the Windows menu, select the Apply Windows layout popout and pick the layout to apply.  There is also a shortcut key for each of the saved Windows layouts.  By default it is Ctrl+Alt+# (e.g. Ctrl+Alt+1 for the 1st saved layout)

If you have Visual Studio 2013 and below, you can use use the Visual Studio extension, [Layouts O Rama](http://tinyurl.com/vslayout)

## Resharper Searching/Navigation

If you have Resharper there are several additional options that you get for searching.

Note: Assumes Visual Studio keyboard layout for Resharper

<table class="exampleTable">
<tr>
	<th>Name</th>
	<th>Shortcut</th>
</tr>
<tr>
	<td>Go to Everything</td>
	<td>Ctrl + T</td>
</tr>
<tr class="alt">
	<td>Go to File</td>
	<td>Ctrl + Shift + T</td>
</tr>
<tr>
	<td>Go to Member in File</td>
	<td>Alt + \</td>
</tr>
<tr class="alt">
	<td>Find Current File In Solution Explorer</td>
	<td>Alt + Shift + L</td>
</tr>

</table>

## Format Document


<table class="exampleTable">
<tr>
	<th>Name</th>
	<th>Shortcut</th>
</tr>
<tr>
	<td>Format Document</td>
	<td>Ctrl+K,D</td>
</tr>
<tr class="alt">
	<td>Resharper Format Document</td>
	<td>Ctrl+E,F
	<br />Note: Assumes Visual Studio keyboard layout
	</td>
</tr>
</table>

## Additional Shortcuts

There are a lot more shortcuts that are set in Visual Studio.  I have only covered the ones that I use the most.  To see the full list, visit [http://visualstudioshortcuts.com](http://visualstudioshortcuts.com).

