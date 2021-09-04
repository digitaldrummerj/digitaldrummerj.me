---
categories:
- jekyll
- blogging
date: 2016-05-26T00:00:00Z
excerpt: |
  There are times when you need to be able to output code snippets that contain what jekyll thinks is liquid code or the jekyll templating language.  This especially happens when you are doing Angular tutorial since &#123;&#123; &#125;&#125; is how you output properties to the UI.

  Instead, to include liquid markup in the code snippet you need to surround the code snippet with the raw and endraw tags like so
published: true
title: 'Jekyll Tip: Showing Liquid Code in Code Snippets'

---

When blogging with Jekyll there are times when you want to be able to output a code snippet that contains what Jekyll thinks is liquid code.  This especially happens when you are doing Angular tutorials since using the double brackets (&#123;&#123;  &#125;&#125;) for data binding.  Since the code snippets are enclosed in a pre tag, you are not able to html encode the brackets.

Instead, to include liquid markup in the code snippet you need to surround the code snippet with the raw and endraw tags like so

```liquid
{% raw %}
    {{ Notice the double brackets will be in the output }}
{% endraw %}
```

This will output:

{{< highlight liquid >}}
{{ Notice the double brackets are output }}
{{< / highlight >}}
