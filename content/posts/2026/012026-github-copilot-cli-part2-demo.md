---
categories: ["AI", "github copilot", "developer tools"]
published: 2026-01-20T13:00:00Z
draft: true
title: "Part 2: Github Copilot CLI Demo: Build a real app with just terminal prompts"
url: '/github-copilot-cli-demo'
series: ['github-copilot-cli-start']
---


> Part 2 of the series. This is where things stop being theoretical and gets real.

## Why This Demo Exists

Demos that only generate "Hello World" are a waste of electricity and honestly rarely are useful to show you how to use a given technology.

The demo we are building is a quick console app that I build for a client to parse their list of contacts that were in a CSV file and then look at a comma delimited column and create a file for each value and add the contacts rows to the file.

The app is a Node console app that was build 100% from the terminal using only copilot.  

### Features

- Parses CSV contact files
- Splits records into separate CSVs by tag
- Handles multiple tags per record
- Creates timestamped backups automatically
- Supports diffing two CSVs
- Exposes interactive commands
- Full text suite

This project proves Copilot CLI can:

Repo: <https://github.com/digitaldrummerj/demo-gh-copilot-cli-csv-parser>

## What This Demo Proves

Copilot CLI is not a toy.

It can:

- Design an application
- Evolve requirements
- Handle edge cases
- Refactor safely
- Produce tests
- Document itself
- Maintain long-running context
- Follow architectural constraints
- Respect safety boundaries
- Generate production-quality code

And it does it **without ever leaving the terminal**.

## How the Project Was Built

The entire application was created using **progressive prompts** inside Copilot CLI.

No scaffolding tools.
No generators.
No hand-written boilerplate.

Each feature was added incrementally based on user intent. The exact prompts used are documented in the demo repo so that you can see how they were build.

## Core Commands Implemented

### Parse

- Reads a CSV
- Detects the tag column case-insensitively
- Splits records into one file per tag
- Writes `untagged.csv` when needed
- Generates `summary.log`

### Diff

- Compares base vs updated CSV
- Outputs only changed or new records
- Organizes output by tags
- Maintains its own backup chain

### Headers

- Reads headers
- Sorts alphabetically
- Outputs to console only

### Clear

- Deletes output directories
- Or only backup folders
- Always confirms first

All behavior is defined in the project spec that was created from the code after it was completed.  This is one of the most complete spec files that I have ever created and it took just a few minutes for the AI to do it for me.

## Prompts

Below are the prompts that I used to generate and evolve the application.  

I have created a number of quick CSV parsing tools over the years in various programming languages and honestly it always felt like a quick tool to create but always ended up taking severals hours to several days to get everything working as expected and none of them ever ended up having automated tests with them since we never had time for a simple one off tool to do them.  

You will see as you go through the prompts that after the 1st couple of prompts you have the parse command that you needed initially

Even though this was a simple application to inititally and I could have stopped after the 1st prompt did what I need it to do, I wanted to see how far we could go with the application to move from just a quick script to a full blown tool that I could use 

### Prompt 1

This created the project directory, made it a Node application and initialized a git repository.

```bash
I want to create a node application called contact-csv-parser.  please create me the project folder and initalize the application for node and git.
```

> after the project folder was created, I ran `/cwd contact-csv-parser` to move my copilot session into my project folder.

### Prompt 2


```bash
in this directory, I need to parse a csv file that has a bunch of contact records with multiple contacts that has a tags column that is comma delimited and I need to create a file for each tag that has all of the records for contacts that have that tag.  I want to write the output to a directory called output and within that directory create a directory named after the csv file without csv extension. Each time the output is written, if there are any files in the csv output directory, create a backup directory based on the date and time and move all of the files into that.
```

### Prompt 4

```bash
create me a sample csv file and make sure that it has several columns of data in it like first name, last name, email, date added, tags, list name and a few other random ones.  For the tags column, make sure some records only have a single tag, others have 2 tags and others have 3 or more tags.
```

### Prompt 5

```bash
for the created output lines, I do not need the folder.  I just need the output/ and further
```

### Prompt 6

```bash
lets add a clear command for a given csv that will remove the output directory for that csv file.  lets add a yes/no prompt and default it to no.
```

### Prompt 7

```bash
instead of writing our own prompt library, is there one that we can use where it will allow us to pass in the csv file to clear the output for and if no file is passed in then it will show us a list of csv files to select from and then prompt a yes/no prompt with the default being no. these prompts need to be interactive.  I typically use @inquirer/prompts but am open to suggestions
```

### Prompt 8

```bash
when running the app currently you have to tell it what you want to do.  lets modify that and add a select menu for the available functions if no parameters are passed in.  As well for the parse command, if no file is passed then display the list of csv file to choose from.
```

### Prompt 9

```bash
lets add a headers only command that will output the name of the columns to the console and order them A-Z.
```

### Prompt 10

```bash
for the parse command, prompt me to select the tag column if one is not passed in as a parameter.  default to Tags.  also, make the column finding for the tags case insensitive and error if it find two Tags columns with different casing.
```

### Prompt 11

```bash
create me a sample csv file that has multiple Tag columns with different casing so I can test the error of more than 1 existing.
```

### Prompt 12

```bash
when the user exists the prompt it currently displays a very ugly errors.  can we capture that and just display a user existed message instead?
```

### Prompt 13

```bash
lets create a compare files (e.g. diff) command that will take in a csv file that is the base file and then the updated file and it will only output the csv files for the records that are different.  lets create this as a diff folder within the csv output folder and do the same backups within the diff folder like we do for the csv file.  also, create me a sample csv file for the diff.
```

### Prompt 14

```bash
when the parse and diff commands are run, I would like a log file output that says which files were created and with how many records in each file.  sort the list of files A to Z.  lets call the file summary.log
```

### Prompt 15

```bash
for the clear command, lets add the option to only remove the backup folders
```

### Prompt 16

```bash
I would like you to parse the prompts.md and copy all of the user prompts and commands that were not done by copilot and write them to the file user-prompts2.md.  only write files within the project directory
```

### Prompt 17

```bash
please create me an automated test suite.  please recommend the testing framework to use and why you picked that framework. make sure that the tests write only to the project directory even for tmp files and make sure it clears up temp files when it is done with them.  for the test suite, we want to write any output to a output-test directory instead of the output directory so that we do not accidentally override any user based files.  Do not remove the output directory as that is user content, only the clear command should be able to remove files in the output directory. for the test suite, please put the tests into a file for each of the commands instead of having all of them in a single file.  This will make it easier to find the test for a specific function and to test a specific function without running the whole suite.  Also, move any utility type methods into helper files.
```

## Prompt 18: Project Specification Document

```bash
create me a spec file for this project and call the spec file project-spec-csv-parser-011226.md
```

## Prompt 19: Extract User Prompts (First Request) after running `/share file session.md`

```bash
I would like you to parse the session.md and copy all of the user prompts and commands that were not done by copilot and write them to the file prompts.md.  only write files within the project directory
```

## Prompt 20: Handle User Exiting the Application

```bash
 when a user runs npm start and then does a ctrl+c to exit the application it is throwing a the following error and we want to handle it gracefully.  ExitPromptError: User force closed the prompt with SIGINT
```

## Final Take

If your workflow already lives in the terminal, Copilot CLI feels inevitable.

Not magical.
Not scary.
Just quietly effective.

The demo project is small on purpose. The implications are not.


