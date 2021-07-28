# Creating a server for the first time, using express.js

## Adding express.js
- Create a new empty folder which will be your project's folder

`mkdir my_project`

- Inside this folder initiate a new package.json file

`npm init`

- Start monitoring your changes with git

`git init`

- Create a git ignore file
`touch .gitignore`
Inside that file you can add any folders/files
you don't want to include in your github repo.
For example if you are using Webstorm ID you will see a `.idea` folder
created.You don't want every time this folder changes to include
  it in you repo, since probably this changes don't have anything to do with your work.
Add any files/folders you don't want to watch inside the .gitignore file like:
```gitignore
# IDE folders
.idea
```  

- Install express.js and nodemon
`npm install express`
`npm install -g nodemon`

Another example of folders you don't want git to watch would be `node_modules` folder, you don't want
`node_modules` folder to be included in your repo.  
If/when someone uses your repo, they will get the `node_modules` folder
after they type `npm install` inside the forked repo.  (??????)

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
  res.status(200).send('Ok'); // The result of your server when you visit localhost:3030
})

app.listen(port, () => {
  console.log(`App is running in port ${port}`); // You will see that in your console
})

```

Now in your console type `nodemon`.You should see the following messages:

In your console
```markdown
[nodemon] 1.19.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting 'node index.js'
App is running in port 3030

```
In your browser (url => localhost:3030)

```html
ok
```

(Reminder) Now it would be a good idea to "save" your changes using git.
Remember to add package-lock.json ????????????????

--------

## Adding babel in our toolset

I am sure you have noticed that we are using require instead of import when we needed e.g express.js

Although it is perfectly fine to do that, at the time this post was written, import was not supported by node ????.

We need to change that since we want ES6 features for our little project.

Let's add some babel packages

`npm install --save-dev babel/core babel/cli`

--save-dev is because we want to save these packages as dev dependencies (what is a dev dependency)??????????????

@babel-core - The core module that wraps everything in our transform api

@babel-cli - the babel cli

@babel/preset-env -  is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (Official docs)

@babel/core @babel/node - babel comes with a second CLI which works exactly the same as Node.js's CLI, only it will compile ES6 code before running it.

you might see @babel/preset-env and babel/preset-env

```text
Explanation  
All packages prefixed with @ are part of the Babel 7 family. A few years ago, npm released their scoped packages feature that enables organisations to publish multiple libraries that all start with @insert_name_here, have a slash (/) in between and end with the library's name. Just like:
```

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
so it would end up like this:

if you want to see what exec does you need to look up the nodemon documentation.

in your terminal type `nodemon -h`  You will see there that it says

` -x, --exec app ........... execute script with "app", ie. -x "python -v".`

with an example of:

` nodemon --exec python app.py`

This means that it will run your script with nodemon watching over it.

So by typing in our script `nodemon --exec babel-node index.js`  it means, run `index.js` using `babel-node` but execute using the nodemon watcher

```
  "scripts": {
    "start": "nodemon --exec babel-node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Then change in your index.js file require with import

`const express = require('express');` becomes
`import express from 'express';`

In your console now type
`npm start` and you will see your server running using ES6!!

