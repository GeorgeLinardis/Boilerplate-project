Ok now lets add the server and React for the front end part of our app.

`npm install express --save`.

Let's create a server directory and add a server file inside:

`mkdir server && touch server/index.js`

Inside the server file we need to use express and create a simple server like this:

```js
import express from 'express';
import path from 'path';

const app = express();
const port = 3030;
const distPath = path.join(__dirname, '../public');

app.use(express.static(distPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
});

app.listen(port, () => console.log(`App is listening on port ${port}!`));
```

If you would like to see your server running just type

`node --require @babel/register server/index.js`

_Remember we need babel register when running our script because of the import we are using inside it. It's ES6 and we need babel to transform it_

You should see a message

`App is listening on port 3030!`

Which is your server telling you its up and running!!! Congrats!

That's it, lets go watch a movie now...

Whaat? oh sorry we have much more to do.

Let's go for the front end part now.

Before we move on let's rename our webpack configuration file from `config.babel.js` to `webpack.config.babel`.js


To add react in our app we need an html file which will have our main html element which will be used as an entry point for React.


Let's ask webpack to do that for us.

`npm install --save html-webpack-plugin`

in your `webpack.config.babel.js` file add a new plugins key in the config object like this:

```js
{
...
  plugins: [new HtmlWebpackPlugin()],
...
}
```

If you try building your app (`npm run build`) you will now see inside your `public` folder 2 files, one for our main.js bundled file and one for our html name index.html.

You will also see a script tag which includes the main.js file added automatically!

Let's do some changes there:

We will need a template file that will be used from webpack as our basic structure file for creating the final index.html.

Add inside a new folder called templates a new index.html file with the following content

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

in your config file:

```js
plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'My app'
      //   template: path.resolve(__dirname, 'examples/src/index.html'),
    })
  ],
```

If you run `npm run build` you will see an `index.html` file generated with a new title!

Nope! actually although you will see a new title in the auto generated html file it will not be generated using your template.

We need to define the template path so that webpack can use it.

Let's do that:

```js

plugins: [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    title: 'My app',
    template: path.resolve(__dirname, 'templates/index.html'),
  })
],
```

DONE!!!


Time to react for React

`npm install --save react react-dom`

inside our `src/index.js` file lets add some react code:

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>My React</div>,
  document.getElementById('app')
);
```

We need babel to build our app now otherwise while trying to build it we''ll get an error:

```
Module parse failed: Unexpected token (5:2)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| 
| ReactDOM.render(
>   <div>My React</div>,
|   document.getElementById('app')
| );

```

So what do we do about it?

First of all we need a loader to handle jsx files:

add a new loader in your webpack config file

```js
 {
  test: /\.jsx?$/,
  loader: 'babel-loader', 
  exclude: /node_modules/,
}
```

also install the following packages

`npm install --save-dev babel-loader @babel/preset-react`.

In your `babelrc` file change to

```js
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
    "plugins": []
}

```



Let's add nodemon in our app

`npm install --save-dev nodemon`

add script in our package.json scripts

`"run-server": "nodemon --exec babel-node server/index.js"`

let run our server now

`npm run run-server`



Dont forget to change ports on docker-compose.yml, adding 3030 mapping.

