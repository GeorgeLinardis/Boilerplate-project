# Creating a server for the first time, using express.js - WIP - is this needed???

## Adding express.js


- Install express.js and nodemon inside your container
`npm install --save express`
`npm install nodemon`

Add inside your `.gitignore` and your `.dockerignore` file `node_modules` folder.

We are choosing to include `node_modules` inside the `.gitignore` file because we don't want to include it our git repo.
Except from the fact that `node_modules` can always be recreated based on a `package.json` file just by typing `npm install` it also
has some other advantages like:
- Switching between branches is affected by repo size, by excluding `node_modules` we are reducing repo size
- Since we are not adding `node_modules` in our repo, we 'll need to record a list of our app's dependencies through `package.json` file, which can
  help us understand what's needed for our app.
- By submitting `node_modules` we are also submitting dev dependencies which should not be included in production.Why?
  Because dev dependencies are packages needed when we are developing our app e.g testing packages and are not needed on production level.


`express` is the package we need for our server and [nodemon](https://nodemon.io/)
is the package we will be using to watch for any changes in our files.

As nodemon is described by the official docs:  

```
Nodemon is a utility depended on by over 1.5 million projects, that will monitor for any changes in your source and automatically restart your server. Perfect for development.

Swap nodemon instead of node to run your code, and now your process will automatically restart when your code changes.
```

Now you have installed express and nodemon you can create your first server.

Add a new file called `index.js` like the following:

```javascript
// index.js
const express = require('express');
const app = express();
const port = 3030; // it could be any port

app.get('/', (req, res) => {
  res.status(200).send('I am ok now and running'); // The result of your server when you visit localhost:3030
})

app.listen(port, () => {
  console.log(`App is running in port ${port}`); // You will see that in your console
})

```

Now in your console type `nodemon`.You should see the following messages:

In your console
```markdown
[nodemon] <nodemon version here>
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting 'node index.js'
App is running in port 3030

```
In your browser by visiting `localhost:3030` you will also see your response:

```html
I am ok now and running
```

(Reminder) Now it would be a good idea to "save" your changes using git.
While git saving you will also see a `package-lock.json` which should be added in your commits.

If we see the `package-lock.json` it [is described](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json) as:
```markdown
package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.
This file is intended to be committed into source repositories, and serves various purposes...
```

--------

## Adding babel in our toolset

I am sure you have noticed that we are using require instead of import when we needed e.g `express.js`

Although it is perfectly fine to do that, at the time this post was written, import is supported only in experimental mode by node.

We need to change that since we want ES6 features for our little project.

Let's add some babel packages

`npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node`

`--save-dev` is used because we want to save these packages as dev dependencies.
Dev dependencies are packages that our program is dependent but not in a production level.
Meaning we need these to run our site/platform/program in development mode.But in production mode we do not need them.

But why? why? oh dear why?

How can we need something in dev mode but not in production mode?

You could actually even if that doesn't seem as something you could think of right away.For example, 
when you are writing tests for your application you only need them to see that your app is working right?
So no need any packages like mocha, sinon when running the app in the production mode, since in production mode
your tests aren't a "part" of your app right? Since they are just used to support your app but are not an actual part of it?
Does it make any sense? I hope!

Back to our packages...

From Babel docs:


```markdown
@babel-core - The core module that wraps everything up

@babel-cli - the babel cli

@babel/preset-env -  is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms

@babel/node - babel comes with a second CLI which works exactly the same as Node.js CLI, only it will compile ES6 code before running it.

Sometimes you might also see in other cases `babel/preset-env` instead of `@babel/preset-env`

When a package is prefixed with @ it means they are a part of the Babel 7.

But what is Babel after all? And how did it came to our lives?????

Now we need to create a `.babelrc` file. `.babelrc` includes all local configuration of our project, and add
the following content:

```json
  {
  "presets": ["@babel/preset-env"],
  "plugins": []
  }
```
We need to add a new script in our `package.json` file now to use `babel/node`
for helping us with the compilation

under the `scripts` key add:
```
    "start": "nodemon --exec babel-node index.js",
```
So if you want to see what `exec` does you need to look up the nodemon documentation.

In your terminal type `nodemon -h`  You will see there that it says

` -x, --exec app ........... execute script with "app", ie. -x "python -v".`

with an example of:

` nodemon --exec python app.py`

This means that it will run your script with nodemon watching over it.

So by typing in our script `nodemon --exec babel-node index.js`  it means, run `index.js` using `babel-node` but execute using the nodemon watcher.

Are we ready? I hope!! Too many things...damn! sorry bad day I guess...

Go to your files and change your `index.js` file by replacing import with require like:

`const express = require('express');` becomes
`import express from 'express';`

In your console now type `npm start` and you will see your server running using ES6!!

Oh yeah baby we did it!! Yes we did yes we did! 

Wait wait... why did we type `npm start` instead of `npm run start`.

Npm 'understands' some scripts and converts them under the hood as if you were typing `npm run xxx`. 

As seen in the [npm docs](https://docs.npmjs.com/cli/v7/commands/npm-run-script) you can use:

`npm start` instead of `npm run start`

`npm stop` instead of `npm run stop`

`npm restart` instead of `npm run restart`

`npm test` instead of `npm run test`
