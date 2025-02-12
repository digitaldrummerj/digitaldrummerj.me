---
title: "Remove All Emojis From Text in Node"
date: 2025-02-13T00:00:00Z
draft: false
series: ['Node Filters']
url: '/nodejs-emoji-filter'
categories: ["node"]
---

As part of the Q&A submission form for student assemblies that we created the profanity removal for, the client also wanted to have all emojis removed from the question submission.

<!--more -->

We decided that we want to do this in the API versus on the submission form itself so that the students couldn't just open up the browser developer tools and figure out how to skirt around the filter.  

I could have rolled my own emoji filter but I figured someone had to have already done this and low and behold they have. I found an npm package called [emoji-regex-xs](https://www.npmjs.com/package/emoji-regex-xs) that had exactly what I was looking for.

## Express API Server

Our Node server will be using express.  We are using the same API that we used in the [emoji filter in NodeJS](/nodejs-profanity-filter/) article.  I included it below in case you have not read the other article.

### Create Project and Install Express

1. Run `npm init` and follow the prompts
1. Open up your package.json file
1. Add a  type attribute to the list right below the main

    ```text
    "type": "module",
    ```

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

## Create our API

We are now ready to add our API endpoint for the question submission.

### Create our API Endpoint

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

### Create Our Emoji Filter

We are now ready to create our emoji filter.  We are going to start by installing the bad-words library as they already have a good emoji filter that allows us to extend it with additional words and custom filters.

1. Open your terminal and run the npm install command

    ```shell
    npm install emoji-regex-xs
    ```

1. Create a file called emojiFilter.js
1. Add the following code to the emojiFilter.js.  

    ```javascript
    import emojiRegex from 'emoji-regex-xs';

    // Function to remove emojis from a string
    function removeEmojis(message) {
        const regex = emojiRegex();
        return message.replace(regex, ''); // Replace emojis with an empty string
    }

    // Export the function for use in other files
    export default removeEmojis;
    ```

### Integrate it into Our API

Now lets integrate the emoji filter into our API.  We are going to remove the emojis before we remove our profanity.

Go to index.js and in the /api/question, add the following two lines after the `const { firstName, question } = req.body;`

> Note: If you followed the [previous post](/nodejs-profanity-filter/), we have already defined firstNameSanitized and questionSanitized for the profanity filter.  We want to run our emoji filter before we run the profanity filter so we would take the output of removeEmojis as the input for our profanity filter.

```javascript
let firstNameSanitized = removeEmojis(firstName);
let questionSanitized = removeEmojis(question);        
```

The emoji filter is now working.  

#### Enhance the Filter Results by Removing Multiple Blank Lines

> Note: If you followed the [previous post](/nodejs-profanity-filter/) and implemented the profanity filter, this is the same thing we are already doing in the profanity filter so we do not need to repeat it here and you can skip this section.

Now that we have replaced all of the emojis with an empty character for the question that can contain multiple lines, there is a potential that we might have multiple blank lines in a row and we want to remove those.

Below we are going to standardize the line breaks to make sure that they are all \n and that we don't have any \r\n and then replace 3 blank lines with 2 lines.

```javascript
questionSanitized
    .replace(/\r\n/g, '\n') // Normalize CRLF to LF
    .replace(/\n{3,}/g, '\n\n') // Replace multiple blank lines with one
    .trim() // Remove leading/trailing whitespace
```

Our emoji filter is now complete.  

Below is the full API if you just want to copy the whole thing.

## Complete API

### Filename: index.js

```javascript
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import emojiFilter from './emojiFilter.js';

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
        let firstNameSanitized = removeEmojis(firstName);
        let questionSanitized = removeEmojis(question);        

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

## Filename: emojiFilter.js

```javascript
import emojiRegex from 'emoji-regex-xs';

// Function to remove emojis from a string
function removeEmojis(message) {
    const regex = emojiRegex();
    return message.replace(regex, ''); // Replace emojis with an empty string
}

// Export the function for use in other files
export default removeEmojis;
```
