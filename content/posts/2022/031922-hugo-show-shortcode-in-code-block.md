---
categories: ["hugo", "blogging"]
date: 2022-03-18T13:00:00Z
published: true
title: "Hugo - Show ShortCode Markdown in Code Block"
url: '/hugo-show-shortcode-markdown-in-code-block'
---

I was trying to add a code block to a post and show how to generate a figure using the built-in figure shortcode and it kept generating the actual figure instead of showing the markdown.

<!--more-->

I wanted a post show the following code block to show how to add an image figure

```markdown
{{</* figure src="/images/aspnet-core-dotcover/teamcity-run-unit-tests.png" caption="Build Configuration Example" */>}}
```

Instead though it kept generating the actual figure

{{< figure src="/images/aspnet-core-dotcover/teamcity-run-unit-tests.png" caption="Build Configuration Example" >}}

The trick to make this work is to add a `/*` after the `<` and before the `>` in the figure markdown and then it will render actual markdown instead of the figure without the `/*`

![image of the actual markdown](/images/hugo/shortcode-in-code-block/markdown-to-show-shortcode.png)
