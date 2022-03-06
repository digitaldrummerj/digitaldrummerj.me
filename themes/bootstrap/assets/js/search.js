window.addEventListener("DOMContentLoaded", event => {
    let index = null;
    let lookup = null;
    let queuedTerm = null;
    let queuedDoNotAddState = false;
    let origContent = null;

    const form = document.getElementById("search");
    const input = document.getElementById("search-input");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let term = input.value.trim();
        if (!term) {
            return;
        }
        startSearch(term, false);
    }, false);

    if (history.state && history.state.type == "search") {
        startSearch(history.state.term, true);
    }

    window.addEventListener("popstate", function(event) {
        if (event.state && event.state.type == "search") {
            startSearch(event.state.term, true);
        }
        else if (!event.state && origContent) {
            let target = document.querySelector(".results");
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }

            for (let node of origContent) {
                target.appendChild(node);
            }
            origContent = null;
        }
    }, false);

    function startSearch(term, doNotAddState) {
        input.value = term;
        form.setAttribute("data-running", "true");
        if (index) {
            search(term, doNotAddState);
        }
        else if (queuedTerm) {
            queuedTerm = term;
            queuedDoNotAddState = doNotAddState;
        }
        else {
            queuedTerm = term;
            queuedDoNotAddState = doNotAddState;
            initIndex();
        }
    }

    function searchDone() {
        form.removeAttribute("data-running");

        // A magic trick to make search field loses focus on mobile,
        // which prevents the virtual keyboard from popping up.
        const header = document.querySelector('.search');
        if (header && header.classList.contains('fade')) {
            input.blur();
        }

        queuedTerm = null;
        queuedDoNotAddState = false;
    }

    function initIndex() {
        let request = new XMLHttpRequest();
        request.open("GET", "/lunr.json");
        request.responseType = "json";
        request.addEventListener("load", function(event) {
            let documents = request.response;
            if (!documents)
            {
                console.error("Search index could not be downloaded, was it generated?");
                searchDone();
                return;
            }

            lookup = {};
            index = lunr(function () {
                this.ref("uri");
                this.field("title", { boost: 10 });
                this.field("subtitle");
                this.field("content");
                this.field("description");
                this.field("categories", { boost: 5});
                this.field('summary');
                this.field('publishdate');

                for (let document of documents) {
                    this.add(document);
                    lookup[document.uri] = document;
                }
            });

            search(queuedTerm, queuedDoNotAddState);
        }, false);
        request.addEventListener("error", searchDone, false);
        request.send(null);
    }

    function convertTZ(date, tzString) {
      return new Date(
        (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
          timeZone: tzString,
        })
      );
    }

    function formatDate(date) {
        if (date !== undefined && date !== "") {
            var myDate = new Date(date);
            var month = [
                "January",
                "Febuary",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ][myDate.getMonth()];
            var str = `${month} ${myDate.getDate()}, ${myDate.getFullYear()}`;
            return str;
        }
        return "";
    }
    function search(term, doNotAddState) {
        try {
            let results = index.search(term);

            let target = document.querySelector(".results");
            let replaced = [];
            while (target.firstChild) {
                replaced.push(target.firstChild);
                target.removeChild(target.firstChild);
            }
            if (!origContent) {
                origContent = replaced;
            }

            let title = document.createElement("h1");
            title.id = "search-results";
            title.className = "list-title";

            // This is an overly simple pluralization scheme, it will only work
            // for some languages.
            if (results.length == 0) {
                title.textContent = `No results found for "${term}"`;
            }
            else if (results.length == 1) {
                title.textContent = `Found one result for “${term}"`;
            }
            else {
                title.textContent = `Found ${results.length} results for "${term}"`;
            }
            target.appendChild(title);
            document.title = title.textContent;

            let template = document.getElementById("search-result");
            for (let result of results) {
              let doc = lookup[result.ref];

              let element = template.content.cloneNode(true);
              element.querySelector('.summary-title-link').href = element.querySelector(
                '.read-more-link'
                ).href = doc.uri;

                if (doc.categories !== null && doc.categories !== undefined) {
                    for (let index = 0; index < doc.categories.length; index++) {
                        let tagElement = element.querySelector('.tag').cloneNode(true);
                        const tag = doc.categories[index];
                        if (index > 0) {
                            tagElement.querySelector('.sep').textContent = ' / ';
                        }
                        tagElement.querySelector('.tag-link').href = `/categories/${tag.replace(/ /g, '-')}`;
                        tagElement.querySelector('.tag-link').textContent = `${tag.replace(/ /g, '-')}`;
                        element.querySelector('.tags').appendChild(tagElement);

                    }
                } else {
                    element.querySelector('.meta-tags').innerHTML = '';
                }
                // element.querySelector('.tags').textContent = doc.categories;
              element.querySelector('.post-title').textContent = doc.title;
              element.querySelector('.summary').innerHTML = doc.summary;
                element.querySelector('.time').textContent = formatDate(new Date(
                    convertTZ(
                doc.publishdate,
                'America/Phoenix'
              )));
              target.appendChild(element);
            }
            // title.scrollIntoView(true);

            if (!doNotAddState) {
                history.pushState({type: "search", term: term}, title.textContent, "#search=" + encodeURIComponent(term));
            }
        }
        finally {
            searchDone();
        }
    }

    // This matches Hugo's own summary logic:
    // https://github.com/gohugoio/hugo/blob/b5f39d23b86f9cb83c51da9fe4abb4c19c01c3b7/helpers/content.go#L543
    function truncateToEndOfSentence(text, minWords)
    {
        let match;
        let result = "";
        let wordCount = 0;
        let regexp = /(\S+)(\s*)/g;
        while (match = regexp.exec(text)) {
            wordCount++;
            if (wordCount <= minWords) {
                result += match[0];
            }
            else
            {
                let char1 = match[1][match[1].length - 1];
                let char2 = match[2][0];
                if (/[.?!"]/.test(char1) || char2 == "\n") {
                    result += match[1];
                    break;
                }
                else {
                    result += match[0];
                }
            }
        }
        return result;
    }

    function displayErrorMessage(message) {
      document.querySelector('.search-error-message').innerHTML = message;
      document.querySelector('.search-container').classList.remove('focused');
      document.querySelector('.search-error').classList.remove('hide-element');
      document.querySelector('.search-error').classList.add('fade');
    }

    function getLunrSearchQuery(query) {
      const searchTerms = query.split(' ');
      if (searchTerms.length === 1) {
        return query;
      }
      query = '';
      for (const term of searchTerms) {
        query += `+${term} `;
      }
      return query.trim();
    }
}, {once: true});