---
title: "Create A Profanity Filter in NodeJS"
date: 2025-01-22T13:29:43-07:00
draft: false
---

I was recently working with a client on a Q&A submission form for student assemblies that they are running and the client needed to strip out any profanity from the question submission.

<!--more -->

We decided that we want this in the API versus on the submission form itself so that the students couldn't just open up the browser developer tools and figure out how to skirt around the filter.  The API is written in NodeJS Express.

I could have rolled my own profanity filter but I figured someone had to have already done this and low and behold they have. I need the library to be able to add additional words. I found an npm package called [bad-words](https://www.npmjs.com/package/bad-words) that had exactly what I was looking for.

## Express API Server

Our Node server will be using express.

### Create Project and Install Express

1. Run `npm init` and follow the prompts
1. Install Express

   ```shell
   npm install express dotenv body-parser
   ```

1. Create a file called index.js
1. Add the following code to index.js

    ```javascript
    import express from 'express';
    import bodyParser from 'body-parser';
    import dotenv from 'dotenv';

    dotenv.config();

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middleware
    app.use(bodyParser.json());

    app.get('/', (req, res) => res.send('Johnny Five Is Alive!'));

    // Start server
    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });

    export default app;
    ```

1. Open up your terminal and run `node ./index.js`
1. Navigate to `http://localhost:3000`
1. You should see a response that says "Johnny Five is alive!"

## Add Profanity Filter

We are now ready to add our API.

### Create our API

In the index.js file we are going to add a new endpoint `/api/question`.  The endpoint will have a request body that is json and contains a firstName and question property.

```javascript
app.post('/api/question', async (req, res) => {
 try {
  const { firstName, question } = req.body;
  
  // LOGIC TO SAVE GOES HERE

  res.status(200).json({ message: 'Question submitted successfully' });
 } catch (error) {
  console.error('Error submitting question:', error);
  res.status(500).json({ message: 'Failed to submit question' });
 }
});
```

### Create Our Profanity Filter

We are now ready to create our profanity filter.  We are going to start by installing the bad-words library as they already have a good profanity filter that allows us to extend it with additional words and custom filters.

1. Open your terminal and run the npm install command

    ```shell
    npm install bad-words
    ```

1. Create a file called profanityFilter.js
1. Add the following code to the profanityFilter.js.  

    ```javascript
    import { Filter } from 'bad-words';

    const filter = new Filter({ placeHolder: '*' }); 
    
    export default filter;
    ```

### Integrate it into Our API

Now lets integrate the profanity filter into our API.

Go to index.js and in the /api/question, add the following two lines after the `const { firstName, question } = req.body;`

```javascript
let firstNameSanitized = profanityFilter.clean(firstName);
let questionSanitized  = profanityFilter.clean(question);
```

The profanity filter is now working.  However, there are three enhancements to the filter that we want to add:

1. We want the filter to remove the bad words instead of replacing with an asterisk
1. We want to want to add extra words into the filter
1. We want to be able to filter multiple word bad words

#### Enhance the Filter Results by Removing Asterisks

By default, the filter replaces the bad words with an asterisk but we want to remove the word completely.  The bad words library does not support replacing the bad words with an empty string, so we are going to have to do it after the bad words filter has been called.

To remove all asterisks, after we call the `clean` method for the first name and question, we can call the built-in JavaScript replaceAll method

```javascript
firstNameSanitized = firstNameSanitized.replaceAll('*', '');

questionSanitized = questionSanitized.replaceAll('*', ''); 
```

Now that we have replaced all of the asterisks with an empty character for the question that can contain multiple lines, there is a potential that we might have multiple blank lines in a row and we want to remove those.

Below we are going to standardize the line breaks to make sure that they are all \n and that we don't have any \r\n and then replace 3 blank lines with 2 lines.

```javascript
questionSanitized
    .replace(/\r\n/g, '\n') // Normalize CRLF to LF
    .replace(/\n{3,}/g, '\n\n') // Replace multiple blank lines with one
    .trim() // Remove leading/trailing whitespace
```

#### Add New Words to the Filter

To add to the default word list for the bad words library, we need to create an array of words and then call the addWords method.

```javascript
const bannedWords = [
    "skill issue",
    "skill 1issue",
    "sk!ll issue",
    "ez"
]

import { Filter } from 'bad-words';

const filter = new Filter({ placeHolder: '*' }); 
filter.addWords(bannedWords);
export default filter;
```

#### Create Custom Filter To Handle Multiple Word Bad Words

The next enhancement we are going to do is write a custom filter to remove multiple word bad words.  Luckily, the bad words library allows us to easily create custom filters.

To create a custom filter, we need to create a class that extends Filter.

We will call super.clean to run the default bad words filter, and then we will loop through our banned words and replace any of them with an asterisk.

In our custom filter, we can also add the remove all asterisks and extra blanks instead of having them within our api method.

```javascript
class CustomFilter extends Filter {
    clean(input) {
        let sanitized = super.clean(input); // run default bad-words filter

        // Apply additional custom bad word filtering
        bannedWords
            .forEach(phrase => {
                const pattern = new RegExp(
                    `\\b${phrase.replace(/\W+/g, '[\\W]*')}\\b`,
                    'gi'
                );
       
            sanitized = sanitized.replace(pattern, '*');
        });

        sanitized = sanitized.replaceAll('*', '')
                            .replace(/\r\n/g, '\n') // Normalize CRLF to LF    
                            .replace(/\n{3,}/g, '\n\n')
                            .trim();

        return sanitized;
    }
}
```

One of the issues with our custom filter is that it matches on partial words so we also need to have an exclude words from custom filter list.

1. Create an exclude words array

    ```javascript
    const excludedWordsFromCustomFilter = [
        "ez"
    ]
    ```

1. Next we need to add a filter statement inside of our custom filter before the forEach

    ```javascript
    bannedWords
        .filter(phrase => !excludedWordsFromCustomFilter.includes(phrase))
    ```

#### Tell Our Profanity Filter to Use Our Custom Filter

The last thing we need to do is tell our profanity filter to use our custom filter.

To do this instead of saying `new Filter` we will say `new CustomFilter` in profanityFilter.js

```javascript
const filter = new CustomFilter({ placeHolder: '*' });
```

Our profanity filter is now complete.  

Below is the full API if you just want to copy the whole thing.

## Complete API

Filename: index.js 

```javascript
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import profanityFilter from './profanityFilter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Question Submission Endpoint
app.post('/api/question', async (req, res) => {
    const { firstName, question } = req.body;
    
    if (!firstName || !question) {
        return res.status(400).json({ message: 'First name and question are required' });
    }

    try {
        let firstNameSanitized = profanityFilter.clean(firstNameSanitized);

        let questionSanitized = profanityFilter.clean(questionSanitized);        

        if (!firstNameSanitized  || !questionSanitized) {
            return res.status(500).json({ message: 'Invalid Submission' });
        }

        // LOGIC TO SAVE GOES HERE
        
        res.status(200).json({ message: 'Question submitted successfully' });
    } catch (error) {
        console.error('Error submitting question:', error);
        res.status(500).json({ message: 'Failed to submit question' });
    }
});

app.get('/', (req, res) => res.send('Johnny Five Is Alive!'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Export the Express API
export default app;
```

## Complete Profanity Filter

Filename: profanityFilter.js

```javascript
import { Filter } from 'bad-words';

const bannedWords = [
 "skill issue",
 "sk1ll issue",
 "skill 1ssue",
 "sk1ll 1ssue",
 "sk!ll issue",
 "sk!ll !ssue",
 "skill !ssue",
 "ez"
];

// This will be excluded from the custom filter but handled by `super.clean`
const excludedWordsFromCustomFilter = [
 "ez",
 "kys",
 "L",
 "sus",
];
class CustomFilter extends Filter {
 clean(input) {
  let sanitized = super.clean(input); // Apply the default bad-words filter

  // Apply additional custom bad word filtering
  bannedWords
   .filter(phrase => !excludedWordsFromCustomFilter.includes(phrase)) // Exclude specific words           
   .forEach(phrase => {
    const pattern = new RegExp(
     `\\b${phrase.replace(/\W+/g, '[\\W]*')}\\b`,
     'gi'
    );

    sanitized = sanitized.replace(pattern, '*');
   });

  sanitized = sanitized.replaceAll('*', '')
                        .replace(/\r\n/g, '\n') // Normalize CRLF to LF    
                        .replace(/\n{3,}/g, '\n\n')
                        .trim();

  return sanitized;
 }
}

const filter = new CustomFilter({ placeHolder: '*' });

// Add custom banned words to the filter
filter.addWords(...bannedWords);

// Export the filter for use in other files
export default filter;
```
