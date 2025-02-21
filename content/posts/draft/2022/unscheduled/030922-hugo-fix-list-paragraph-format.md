---
categories: ["hugo", "blogging"]
published: 2024-03-09T13:00:00Z
draft: true
title: "Hugo - Fix Extra Lines In List When Adding a Code Block"
url: '/hugo-fix-list-extra-lines-with-code-block'
series: ['Blogging With Hugo']
---


<!--more-->

Here is what a normal list looks like without a code block

![Example of normal list without code block](/images/hugo/fix-extra-line-break/example-without-code-block.png)

Here is an example of the issue where when add our code block as a sub-section under item #4 all of a sudden the list has lots of space.

![Example of Issue](/images/hugo/fix-extra-line-break/example-of-issue.png)

Here is what we want it to look like with a code block

![Example with the fix in place](/images/hugo/fix-extra-line-break/example-after-fix.png)

To fix the issue, I had to add the following css to my theme

```css
.post-content li p {
  margin: 20px 0 10px;
  line-height: 1.5;
}
```
