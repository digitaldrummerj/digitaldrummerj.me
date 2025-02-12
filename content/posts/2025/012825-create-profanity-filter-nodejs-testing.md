---
title: "Testing Our Node Profanity Filter"
date: 2025-02-01T13:00:00
draft: false
url: '/nodejs-profanity-filter-testing'
series: ['Node Filters']
categories: ["node"]
---

In our previous post, we create a [profanity filter in NodeJS](/nodejs-profanity-filter/) but the one thing we did not do was add any automated tests.  I am huge fan of automated testing so in this article we are going to use Jest to add some automated tests to our profanity filter.

<!--more-->

## Install Jest

```shell
npm install jest --save-dev
```

## Create Our Test Filter

1. Create a folder called tests
1. Create a file called profanityFilter.test.js
1. Add the following code to the profanityFilter.test.js file to import our API and create our describe that will hold our tests

    ```javascript
    import filter from './profanityFilter'; // Adjust path as necessary

    describe('Custom Profanity Filter', () => {

    })
    ```

## Create Our First Test

Within the describe statement that we added above, add the following code for our 1st test to make sure we do not have multiple blank lines

```javascript
test('should remove multiple blank lines but keep valid punctuation', () => {
    const input = 'Line 1\n\n\nLine 2...';
    const expectedOutput = 'Line 1<br><br>Line 2...';
    expect(filter.clean(input)).toBe(expectedOutput);
});
```

## Run Our Tests

Run the following command to run our tests

```shell
npx jest
```

For our API, since I have the type set as module, when you run Jest you may get the error below that had me scratching your head as it was unexpected.

```shell
 FAIL  tests/profanityFilter.test.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    C:\Work\repos\ourApi\tests\profanityFilter.test.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import filter from './profanityFilter'; // Adjust path as necessary
                                                                                      ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1505:14)
```

To fix this issue, instead of running `npx jest` we need to run node and turn on th experimental-vm-modules

```shell
node --experimental-vm-modules node_modules/jest/bin/jest.js
```

This will run your tests and the tests should pass.  You will, however, notice the 1st two lines in the output have a warning since we are using an experimental flag.

```shell
(node:90036) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  tests/profanityFilter.test.js
  Custom Profanity Filter
    √ should remove multiple blank lines but keep valid punctuation (68 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.444 s, estimated 1 s
```

Now we are ready to write our remaining test cases.

Here is a quick brainstorm of the things that I would test:

1. Verify that all of the added banned words are removed from the output
1. Verify that th excluded from the custom filter is not removed from the output
1. Verify that a mix of \r\n  and \n is converted to \n and does not return multiple blank lines
1. Verify that extra spaces at the beginning and end is removed
1. Verify that * is replaced with an empty string

Having these tests cases will ensure that our profanity filter continues to work as we make changes.

Happy testing!!!
