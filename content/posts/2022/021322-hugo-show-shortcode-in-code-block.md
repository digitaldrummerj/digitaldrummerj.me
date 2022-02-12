---
categories: ["hugo", "blogging"]
date: 2022-02-13T13:00:00Z
published: true
title: "Hugo - Show ShortCode Markdown in Code Block"
url: '/hugo-show-shortcode-markdown-in-code-block'
---

I was trying to add a code block to a post to show how to generate an html figure using the Hugo built-in figure shortcode and it instead of showing the markdown of the figure, it kept rendering the actual figure.

I could have just took a screenshot of the code but the whole point of having the code block is to make it easier for you the reader to easily copy and paste the code.  The key to making this work is knowing how to escape the figure shortcode within the code block so that Hugo renders it as a code block and not a figure.

<!--more-->

I wanted the code block to show the following code

```markdown
{{</* figure src="/images/aspnet-core-dotcover/teamcity-run-unit-tests.png" caption="Build Configuration Example" */>}}
```

Instead though it kept generating the actual figure

{{< figure src="/images/aspnet-core-dotcover/teamcity-run-unit-tests.png" caption="Build Configuration Example" >}}

The trick to make this work is to escape the figure by adding a `/*` after the `<` and a `*/` before the `>` in the figure markdown and then it will render actual markdown

![image of the actual markdown](/images/hugo/shortcode-in-code-block/markdown-to-show-shortcode.png)
