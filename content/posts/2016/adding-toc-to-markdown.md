---
categories:
- github
- markdown
- blogging
- npm
date: 2016-05-10T00:00:00Z
excerpt: |
  When you are writing tutorials that are broken up by sections it is nice to have a table of contents at the top to help the users navigate.  However, maintaining this by hand is a no go.  Luckily there is a great npm package called doctoc that will look at the headings in your markdown file and generated a table of contents for you.
published: true
title: Add Table of Contents to Markdown

---

When you are writing tutorials that are broken up by sections it is nice to have a table of contents at the top to help the users navigate.  However, maintaining this by hand is a no go.  Luckily there is a great npm package called doctoc that will look at the headings in your markdown file and generated a table of contents for you.

**Table of Contents Sample Using This Post**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installing](#installing)
- [Adding to All Files](#adding-to-all-files)
- [Add to Single File](#add-to-single-file)
  - [examples](#examples)
- [Skipping Files](#skipping-files)
- [Specifying Location of the Table of Contents](#specifying-location-of-the-table-of-contents)
- [Changing the Title to the Table of Contents](#changing-the-title-to-the-table-of-contents)
- [Changing Max Level of Headings](#changing-max-level-of-headings)
- [Site Compatibility](#site-compatibility)
- [Using with Jekyll](#using-with-jekyll)
- [Running doctoc as a Git pre-commit](#running-doctoc-as-a-git-pre-commit)
- [More Info](#more-info)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installing

    $ npm install -g doctoc

## Adding to All Files

    $ doctoc .

## Add to Single File

    $ doctoc /path/to/file [...]

### examples

    $ doctoc README.md

    $ doctoc CONTRIBUTING.MD LICENSE.MD

## Skipping Files

There is no built-in mechanism out of the box for doctoc to skip certain files from having a table of contents.  However you can add a comment to each file and then use a little bit of command line logic to exclude those files.  Below are examples using Ack and out-of-the-box Windows commands.

The first step is to add this line of text to the markdown files to skip of:

    <!-- DOCTOC SKIP -->

Using [Ack](http://beyondgrep.com/) which requires Perl


    $ ack -L 'DOCTOC SKIP' | xargs doctoc

Here is an example using built-in Windows command line options.  If you are not running it in the directory that contains your markdown files that you want a table of contents on then make sure to update the source variable.

    @echo off
     setlocal

     set source=.
     set extension=*.md
     set string="DOCTOC SKIP"

     for /f "tokens=*" %%G in ('dir "%source%\%extension%" /a:-d /b') do (
       find /c /i %string% "%%G" > NUL || (
       echo "Add TOC to %%G"
       doctoc --github --title "**Table of Contents**" "%%G"
      )
     )

     pause


## Specifying Location of the Table of Contents

By default doctoc will add the table of contents at the top of the file.  You can however indicate where you would like to have it placed with the following:

    <!-- START doctoc generated TOC please keep comment here to allow auto update -->
    <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

    <!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Changing the Title to the Table of Contents

Pass in the --title option

    doctoc --title '**Contents**' .

## Changing Max Level of Headings

By default it will process 4 levels.  You can change this with the maxlevel option

    doctoc --maxlevel 3 .

## Site Compatibility

By default doctoc generated github formatted links.  To change use the following:

    --bitbucket bitbucket.org
    --nodejs    nodejs.org
    --github    github.com
    --gitlab    gitlab.com
    --ghost     ghost.org

**example**

    doctoc README.md --bitbucket


## Using with Jekyll

>UPDATED 2016-05-10: For Jekyll the recommendation is now to use the kramdown table of contents built-in generator

With the kramdown parser that Jekyll uses by default you can easily add in a table of contents.  The one limitation that had stopped me from using it for the pages that I wanted a table of contents is that it gets all headers and not just the ones after he table of contents.  Granted most of the time that table of contents is at the top of the page but I had an objectives section above my table of contents that was being added in the table of contents which I did not want.  However, I was able to work around this issue by using html and CSS instead of markdown for the headers I wanted to exclude.  I would style the div tag just like it was an H1-H6 tag without it actually being a header.

To use add a table of contents using kramdown on your Jekyll blog, add the follow to your file where you are want your table of contents.

    * TOC
    {:toc}

**Jekyll Kramdown TOC Sample Showing All Headers**

* TOC
{:toc}

This will cause the * TOC to be replaced with the actual table of contents when the jekyll build/serve is run.

## Running doctoc as a Git pre-commit

To remember to always update the Table of Contents before committing to you can use a git hook to run your doctoc call before committing any files to Github for your repo.

1. Go into the .git\hooks directory
1. Copy the pre-commit.sample to pre-commit with no file extension
1. Add your doctoc command to the file and save
1. Now the next time you do a git commit the table of contents will automatically updated


## More Info

[Github Repo](https://github.com/thlorenz/doctoc)

[npm package](https://www.npmjs.com/package/doctoc)

