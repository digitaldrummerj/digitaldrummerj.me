---
categories: ["blogging", "hugo"]
date: 2022-03-05T13:00:00Z
published: false
title: "Hugo - Add Copy Code Snippet Button"
url: '/hugo-add-copy-code-snippet-button'
series: ['Blogging With Hugo']
---


Highlighter site configuration

```toml
[markup]
  [markup.highlight]
    anchorLineNos = false
    codeFences = true
    guessSyntax = false
    hl_Lines = ''
    lineAnchors = ''
    lineNoStart = 1
    lineNos = false
    lineNumbersInTable = true
    noClasses = false
    noHl = false
    style = 'monokailight'
    tabWidth = 4
```

Generate CSS for Highlighter

```shell
hugo gen chromastyles --style monokailight assets\css\syntax.css
```

**syntax.css:**

```css
/* Background */ .chroma { color: #272822; background-color: #f1f1f1; }
/* Error */ .chroma .err { color: #272822; background-color: #f1f1f1; }
```

**copy-code-button.js:**

```javascript
function createCopyButton(highlightDiv) {
  const button = document.createElement("button");
  button.className = "copy-code-button";
  button.type = "button";
  button.innerText = "Copy";
  button.addEventListener("click", () => copyCodeToClipboard(button, highlightDiv));
  addCopyButtonToDom(button, highlightDiv);
}

async function copyCodeToClipboard(button, highlightDiv) {
  const codeToCopy = highlightDiv.querySelector(":last-child > .chroma > code").innerText;
  try {
    var result = await navigator.permissions.query({ name: "clipboard-write" });
    if (result.state == "granted" || result.state == "prompt") {
      await navigator.clipboard.writeText(codeToCopy);
    } else {
      copyCodeBlockExecCommand(codeToCopy, highlightDiv);
    }
  } catch (_) {
    copyCodeBlockExecCommand(codeToCopy, highlightDiv);
  } finally {
    codeWasCopied(button);
  }
}

function copyCodeBlockExecCommand(codeToCopy, highlightDiv) {
  const textArea = document.createElement("textArea");
  textArea.contentEditable = "true";
  textArea.readOnly = "false";
  textArea.className = "copyable-text-area";
  textArea.value = codeToCopy;
  highlightDiv.insertBefore(textArea, highlightDiv.firstChild);
  const range = document.createRange();
  range.selectNodeContents(textArea);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  textArea.setSelectionRange(0, 999999);
  document.execCommand("copy");
  highlightDiv.removeChild(textArea);
}

function codeWasCopied(button) {
  button.blur();
  button.innerText = "Copied!";
  setTimeout(function () {
    button.innerText = "Copy";
  }, 2000);
}

function addCopyButtonToDom(button, highlightDiv) {
  highlightDiv.insertBefore(button, highlightDiv.firstChild);
  const wrapper = document.createElement("div");
  wrapper.className = "highlight-wrapper";
  highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
  wrapper.appendChild(highlightDiv);
}

document.querySelectorAll(".highlight").forEach((highlightDiv) => createCopyButton(highlightDiv));
```

**copy-code-button.css:**

```css
.highlight-wrapper {
  display: block;
}

.highlight-wrapper .lntd pre {
    padding: 0;

}

.chroma .lntd pre {
    border: 0px solid #ccc;
}
.highlight {
  position: relative;
  z-index: 0;
  padding: 0;
  margin:40px 0 10px 0;
  border-radius: 4px;
}

.highlight > .chroma {
  position: static;
  z-index: 1;
  border-radius: 4px;
  padding: 10px;
}

.chroma .lntd:first-child {
  padding: 7px 7px 7px 10px;
  margin: 0;
}

.chroma .lntd:last-child {
  padding: 7px 10px 7px 7px;
  margin: 0;
}

.copy-code-button {
  position: absolute;
  z-index: 2;
  right: 0;
  top: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0.5px;
  width: 65px;
  color: #ffffff;
  background-color: #000000;
  border: 1.25px solid #232326;
  border-top-left-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 4px;
  white-space: nowrap;
  padding: 6px 6px 7px 6px;
  margin: 0 0 0 1px;
  cursor: pointer;
  opacity: 0.6;
}

.copy-code-button:hover,
.copy-code-button:focus,
.copy-code-button:active,
.copy-code-button:active:hover {
  color: #222225;
  background-color: #b3b3b3;
  opacity: 0.8;
}

.copyable-text-area {
  position: absolute;
  height: 0;
  z-index: -1;
  opacity: .01;
}
.chroma [data-lang]:before {
    position: absolute;
    z-index: 0;
    top: -24px;
    left: 0;
    content: attr(data-lang);
    font-size: 1em;
    font-weight: 700;
    color: white;
    background-color: black;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 5px 10px 7px;
    line-height: 1
}
```

**header.html:**

```go-html-template
{{ if (findRE "<pre" .Content 1) }}
    {{ $syntax := resources.Get "css/syntax.css" | minify }}
    <link href="{{ $syntax.RelPermalink }}" rel="stylesheet">

    {{ $copyCss := resources.Get "css/copy-code-button.css" | minify }}
    <link href="{{ $copyCss.RelPermalink }}" rel="stylesheet">
{{ end }}
```

**footer.html:**

```go-html-template
{{ if (findRE "<pre" .Content 1) }}
{{ $jsCopy := resources.Get "js/copy-code-button.js" | minify }}
<script src="{{ $jsCopy.RelPermalink }}"></script>
{{ end }}
```

Thank you to the following post.  They were a great help getting this working.

* copy to clipboard for code snippets.   see [https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/](https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/)
* Put copy button inside code snippet, make work with line numbers, add type of highlight [https://aaronluna.dev/blog/add-copy-button-to-code-blocks-hugo-chroma/](https://aaronluna.dev/blog/add-copy-button-to-code-blocks-hugo-chroma/)
