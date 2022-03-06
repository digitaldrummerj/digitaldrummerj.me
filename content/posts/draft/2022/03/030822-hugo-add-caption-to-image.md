---
categories: ["hugo", "blogging"]
date: 2022-03-08T13:00:00Z
published: false
title: "Hugo - Add Caption to Image"
url: '/hugo-add-caption-to-image'
series: ['Blogging With Hugo']
---


<!--more-->

Default Caption:
![default caption](/images/hugo/figure/default-figure.png)

New Caption:
![new caption](/images/hugo/figure/new-figure.png)

CSS To Generate New Figure

```css
.post-content figure {
    border: thin #c0c0c0 solid;
    display: flex;
    flex-flow: column;
    padding: 5px;
    max-width: 100%;
    margin: auto;
}

.post-content figcaption {
    background-color: #222;
    color: #fff;
    font: italic smaller sans-serif;
    padding: 3px;
    text-align: center;
}
```

Markdown to generate figure

```markdown
{{</* figure src="" caption="Build Configuration Example" */>}}
```
