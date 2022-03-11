---
categories: ["blogging", "hugo"]
date: 2022-03-09T13:00:00Z
draft: false
title: "Hugo - Set Default Front Matter When Creating Post"
url: '/hugo-default-front-matter'
---

Did you know that when you create a new post in Hugo that you can set the default front matter set for you?

I didn't know either until after I had done over 50 posts where I created all of my posts files and front matter by hand. Whereas I could have had Hugo create the files for me and set default front matter that I wanted.

In this post, we will look at how you can also set your default front matter for your post.

<!--more-->

## My Default Front Matter

For my post, my default front matter is:

```markdown
---
categories: [""]
date: {{ dateFormat "2006-01-02" .Date }}T13:00:00Z
draft: true
title: "{{ replace .Name "-" " " | title }}"
url: ''
---

<!--more-->
```

## Create Default Front Matter

To create our default front matter we need to create an archetypes file for your posts section.

> Archetypes files are content templates that contain preconfigured front matter.

1. Create the directory layouts\archetypes
1. Create the file layouts\archetypes\posts.md
1. In your posts.md file, here is my front matter

    ```markdown
    ---
    categories: [""]
    date: {{ dateFormat "2006-01-02" .Date }}T13:00:00Z
    draft: true
    title: "{{ replace .Name "-" " " | title }}"
    url: ''
    ---

    <!--more-->
    ```

## Create New Post

Now that you have your posts archetype template created, the last thing to do is create a new post which you can do by running:

```shell
hugo new posts/my-post.md
```

Your my-post.md file will look like that following with the date updated for the day you created the file.

```markdown
---
categories: [""]
date: 2022-03-09T13:00:00Z
draft: true
title: "My Post"
url: ''
---

<!--more-->
```
