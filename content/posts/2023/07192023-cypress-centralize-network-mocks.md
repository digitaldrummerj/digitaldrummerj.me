---
categories: ["cypress", "testing"]
date: 2023-07-19T13:00:00Z
published: true
title: "Cypress - Scale Your Network Mocks By Centralizing Them"
url: '/cypress-scale-mocks-by-centralizing-them'
---

As your number of Cypress test grows, if you are mocking out your API calls, it can easily and quickly become hard to maintain which is exactly what happened on one of my projects.

We were mocking all of our API calls so that we could focus our tests on UI behaviors and interactions.  The code for the mocks was typically in each test which was fine for a few tests but now with over 1,000 Cypress tests, you can just imagine how much duplicate code there was and the difficulty in maintaining it..

It was difficult to find an existing mock for a new tests, so many times the developer writing the tests just created a new mock and a new fixture file.

It was even more time consuming as the API responses changed over time and we had to find all of the places that a mock was used and update the response for the new API response.

It was also timing consuming to switch from the old way of mocking Cypress with cy.server to cy.intercept.

<!--more-->

To combat these issues, we changed our code to centralize the calls to cy.intercept so that we only had 1 place it was being used, so if we ever needed to change the Cypress method being used or any update any of the parameters to cy.intercept.

From there, we also created files to hold all of our code to mock out an API.  We split the files by the API endpoints so that we could easily figure out where an API mock was located.  In these files, we also needed the ability to change the response, status code, url, and the alias for cy.wait.

This post is about how we accomplished these goals and made a way more manageable mock setup for us.


## Cy.Intercept Helper

The first thing we need to create is a helper file that encapsulates the calls to cy.intercept.

In the helper below, we are checking to see if the response ends in .json and if it does, then we assume we are going to use a fixture file and needed to use the fixture parameter.  If it does not end in .json, then we assume that we need to use the body parameter.

You will also see that we are removing the @ from the alias.  We did this as our aliases values start with @ so that we can use them with cy.wait without having to constantly adding the @ symbol to the name.

**File:** cypress/mocks/api-helper.js

```javascript
export const mock = (response, status, url, alias, method = 'GET') => {
  if (typeof (response) === 'string' && response.substring(response.length - 5) === '.json') {
    cy.intercept({
      method: method,
      url: url,
      }, {
      statusCode: parseInt(status),
      fixture: response
    }).as(alias.replace('@', ''));
  } else {
    cy.intercept({
      method: method,
      path: url,
      }, {
      statusCode: parseInt(status),
      body: response
    }).as(alias.replace('@', ''));
  }
}
```

## Mocks

Now that we had our api helper file created, we needed to create our API mocks.  Below are two samples: 1.) Blog API that uses inline value and 2.) Post API that uses a fixture file.

### 1. Mock Returns Inline Response

In this mock, we need to import the api helper from above.  Then we define our aliases that we are going to use for our cy.wait command.  We make the alias name that same as the method name to make it easy for developers to know which alias to use for the mock.  Lastly, we needed to define our API mock method with the default response, status, url, and alias.

**File:** cypress/mocks/api/mock-api-blogs.js

```javascript
import * as mockRoute from '../api-helper'

export const aliases = {
    getBlog: "@blog"
}

export const getBlog = (
  response = [],
  status = '200',
  url = '/api/v1/blog',
  alias = aliases.getBlog) => {
  mockRoute.mock(response, status, url, alias);
};
```

### 2. Mock Returns Response From Fixture File

This mock is exactly like the previous mock but instead of inline response, we are telling our mock which fixture file to return.  Cypress expects your fixture file to in the fixtures directory, so we just need to set the value of the response to the file location under the fixture directory.

**File:** cypress/mocks/api/mock-api-posts.js

```javascript
import * as mockRoute from '../api-helper'

export const aliases = {
  getPosts: "@getPosts",
}

export const getPosts = (
  response = 'posts/post.json',
  status = '200',
  url = '/api/v1/posts',
  alias = aliases.getgetPosts) => {
  mockRoute.mock(response, status, url, alias);
};
```

Here is what our fixture file looks like.  It is just the response that the API would return.  Typically I create these by grabbing the response from the Chrome Dev Tools.

**File:** cypress/fixtures/posts/post.json

```json
{
  "results": [
    { "id": "011b8bbf-5930-4925-9f3d-f8d81c1fc2f3", "name": "Post 1", "BlogId": 1 },
    { "id": "5d7e0d56-8fd2-4563-a97c-8bd5de312509", "name": "Post 2", "BlogId": 1},
  ]
}
```

## Test That Uses Mock

Now that we have our API helper and our mocks created, we can use them in a test.  We start by importing the mock that we want to use and then call the mock method, do the action that calls the API that is mocked (cy.visit in the sample test) and then call cy.wait using our mocks alias.

**File:** cypress/e2e/test.js

```javascript
import * as postMocks from '../../mocks/api/mock-api-posts';

describe('Posts Tests', () => {
    it('Post Sample Tests', () => {
      postMocks.getPosts();

      cy.visit('/posts');
      cy.wait(postMocks.aliases.getPosts)

      ...your tests code here
    });
});
```

With this setup, we have be able to reduce the number of different mocks by over 70%.  We can also quickly find all of the places that a particicular API mock is used if we need to update it.
