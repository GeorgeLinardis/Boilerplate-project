# Using Webpack

Future self... find a horror image here... it will help build up the right
sentiment for sure!

Ok now lets try to add webpack in our system.

Have your fingers crossed, prepare yourself and, future self? Don't worry
that you won't remember anything... I got you covered.


Begin by typing 

`npm install --save webpack`

`npm install --save-dev webpack-cli`

_(You will need it because we'll test some webpack things using its cli while adding webpack in our project)_

Let's create a basic folder structure and we' ll explain how this goes.

In your root folder (main project folder) 

```
mkdir src webpack config
cd src
touch index.js
cd ..
cd webpack
touch config.js
cd ..
cd config
touch envs.js
```

add the following content to each file

_This file is not mandatory for webpack, it is used only for organizing our variables_

_Interesting info: Webpack has 2 modes of operation, the 'production' and the 'development' mode._
```js
// config/envs.js
const ENV_DEVELOPMENT = 'developent';
const NODE_ENV = process.env.NODE_ENV || ENV_DEVELOPMENT;


export {
  ENV_DEVELOPMENT,
  NODE_ENV,
}

```

_This file will include our webpack configurations_
```js
// webpack/config.js
import path from 'path';
import { ENV_DEVELOPMENT, NODE_ENV } from 'config/envs';

const rootPath = process.cwd();
const buildPath = path.join(rootPath, 'public');

const config =  {
  entry: path.join(rootPath, 'src/index'),
  output: {
    path: buildPath,
    filename: NODE_ENV === ENV_DEVELOPMENT ? '[name].js' : '[name].[hash].js',
  },
}

export default config;
```

_This file is the entry point of webpack, the file that webpack will start from to check what to load for the browser_
```js
// src/index.js
console.log('From index file');
```

We could try and run the following command and see how it goes

`npx webpack --mode development --config ./webpack/config.js`.

Although it won't work!

Ok so you've probably seen `npm` in the past (you must have I guess since you are here). 


`npm` is a package manager, a cli (command line program) tool, its name stands form `node package manager` and it does what it says,
it helps you install and manage all dependencies needed for your project.

`npx` on the other hand is also a cli tool, which comes bundled with `npm` version `5.2+`, its name stands for `node package execute`.

This cli is used mainly for running packages because it offers some advantages in contrast to the `npm` cli.

Some of its greatest advantages are:
- You can run a package without stating it explicitly in the `package.json` file like you have to do when using `npm`.
- You can also run a package that you haven't installed.

So by running e.g `npx packageA` we could use `packageA` without having to install it in our local project binaries or without adding a script for it in the `package.json` file.
(Local project binaries or local project executables, meaning all executables included in the `node_modules/.bin` folder by the `npm`)

In our case, `npx webpack --mode development --config ./webpack/config.js` can be used instead of adding a script in our `package.json` like:

```
 ...
 "scripts": {
    ...
    "webpack": "webpack --mode development --config ./webpack/config.js"
 },
 ...
```


But what about the `--mode development --config ./webpack/config` part of the command?

At the time of writing this file we are using Webpack 5 and through its [cli's documentation](https://github.com/webpack/webpack-cli/blob/master/OPTIONS.md) we can see that
it accepts a `config` options which is used to provide a path for a configuration file like our `config.js` and a mode flag which sets the webpack mode, otherwise it will use its fallback which is `production` mode.


Let's go for it then...

Oops while running it, it looks like we get an import error.This is because we are using es6 `import` way
and not `require`.We need to ask webpack to prepare our files through Babel before executing them.

To do so we need to rename our config file

`config.js` => `config.babel.js`

and also install babel-register `npm install --save-dev babel-register`

But why? what does `config.babel.js` do under the hood.Well webpack uses the [js-interpet](https://github.com/gulpjs/interpret) package which is a dictionary.
This package is used to automatically require dependencies for configuration files.
If I got this right, by using `.babel` inside the filename, it says to webpack that this file needs babel to be loaded for use.

If by doing so you also see a different error in your linter in `config.js` file which says:

`Parsing error: 'import' and 'export' may appear only with 'sourceType: module'`

you need to go to your `.eslintrc.js` file and add another parserOption `sourceType`:
```js
const config = {
  "rules": {},
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
  },
};

module.exports = config;

```

Last error would be that we are using `config/envs.js` file imported in our webpack config file and as it turns out it cannot be found.

```bash
[webpack-cli] Failed to load '/src/webpack/config.babel.js' config
[webpack-cli] Error: Cannot find module '/config/envs'
Require stack:
- /src/webpack/config.babel.js
```
Damn! that was a difficult one...

Problem is that our `envs.js` file is using a path that is not yet recognizable correctly by webpack configs.  

We are saying to webpack to import `envs.js` from `config` folder but webpack cannot understand where this module really is.

Changing to `../config/envs` works.So what do we need to make it work [as it is](https://webpack.js.org/concepts/module-resolution/) without replacing it with a relative path?

We need to use [resolve](https://webpack.js.org/configuration/resolve/#resolvealias) object!

Future self???? I hope you found it cause I didn't but I had to move on.

So till now our config file should be something like this:

```js
import path from 'path';
import { ENV_DEVELOPMENT, NODE_ENV } from 'config/envs';

const rootPath = process.cwd();
const buildPath = path.join(rootPath, 'public');

const config =  {
  entry: path.join(rootPath, 'src/index'),
  output: {
    path: buildPath,
    filename: NODE_ENV === ENV_DEVELOPMENT ? '[name].js' : '[name].[hash].js',
  },
}

export default config;

```

so that we don't keep writing the same command over and over in our
terminal lets add a new script in our package.json file.

```text
  "scripts": {
    ...
    "build": "webpack --mode development --config webpack/config.babel.js"
    ...
},
```

now you can just run `npm run build` instead.

When you run it successfully for the first time you should see a main.js file generated from webpack.

This file since it is auto generated it is not made for you to read it, so don't worry if it doesn't make 100% sense.
Give it a try though, you will see that some things are easier if you try harder.

Let's start adding some loaders in our file to get ready for our project.

In our project we'll need CSS, SASS and image loaders for now.

Without diving too deep (I can't actually even If I wanted to), you should see loaders as functions

that help webpack transform anything that is not javascript to a javascript module so that in the end

webpack can compile it along with any other real js modules. (Oh dear I hope I am correct on this one)


To our config files add:

```js
const config =  {
  entry: path.join(rootPath, 'src/index'),
  output: {
    path: buildPath,
    filename: NODE_ENV === ENV_DEVELOPMENT ? '[name].js' : '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },
}
```

Wait here mister!! You added a loader for `js` files? How come? you told us that you need loaders only to convert to js modules... wtf?

Yes truth be told, the babel loader is needed so that we can use new features of javascript like es6 ones. Nice catch!

After adding these loaders based on webpack documentation we need to install their packages too

`npm install sass-loader sass style-loader css-loader babel-loader --save-dev`

So how will we know that it worked???

Easily (I hope!), go to your `src` file and add two new testing files, call the first one `foo.scss` and the second one `zoo.css`.

Add some styling rules inside both of them.

e.g

```css
body {
    color: red;
}

```

```scss
$foo: red;

body {
  background-color: $foo;
}

```

then import these files in your index file like this:

```js
import './test2.css';
import './test.scss';


console.log('From index file');
```

If you run `npm run build` you will see these rules bundled up in your generated file inside the dist folder.

Magic? Yeeap! 

Oh didn't find it? no worries it's not that easy, try text searching with your filename as an example, it should take you to the right place.


What's next? (Remember to remove these files before moving on, after all they were added there just for testing)

Oh! Forgot about it, we will also need to add source maps, in which case we'll be using
`eval-source-map` which is also the recommended choice by [webpack's documentation](https://webpack.js.org/configuration/devtool/)
But why do we need source maps and what are they?

A source map is a map, but what kind of map? So you know that a map has only one job, to take you from one place to another right?
Oh I need vacation... sorry daydreaming took over... back to reality...
Source maps will direct you from the generated file of webpack to your actual codebase.

When webpack generates its files which will bundle all loaded modules it will have created a file which doesn't
make sense for the human eye.(maybe for a superhero but not for mine at least).

So this map will generate for you a message when you get an error telling you the path to your actual project
and not the path to the generated file.

```text
const config =  {
 ...
  devtool: 'eval-source-map',
 ...
}
```

Hint:
_If you are in any of your projects and you want to commit anything remember to add build folder in `.gitignore` file


Break please!! go and eat something please! I am eating ice cream while writing this and fighting through flames and horror to make it till the end!



Let's add the dev server now.You should already be tired of copy pasting the same build command right?

To remove the development flag from our script lets change, for now, our config to:

```text
const config =  {
  mode: 'development',
  ...
}
```

and remove the mode flag from our scripts, new script should be

`"build": "webpack --config webpack/config.babel.js"`.

// Lets add the server later shall we?


[comment]: <> (Let's proceed with add our webpack server, start by running the following command)

[comment]: <> (`npm install --save-dev webpack-dev-server`)

[comment]: <> (To your config)

[comment]: <> (```js)

[comment]: <> (const config =  {)

[comment]: <> (  ...)

[comment]: <> (  devServer: {)

[comment]: <> (   contentBase: '/build/',)

[comment]: <> (},)

[comment]: <> (```)

[comment]: <> (We have asked our server to serve file from inside the dist folder, lets add a script for our server to see it coming alive.)

[comment]: <> (```json)

[comment]: <> (  "scripts": {)

[comment]: <> (    ...)

[comment]: <> (    "start": "webpack serve --open --config webpack/config.babel.js",)

[comment]: <> (})

[comment]: <> (```)

[comment]: <> (`npm start` please! Oh that beautiful message that my app is running but where is the window opening in the browser?)

[comment]: <> (If you have been here from the beginning of this posts, regardless of the fact that you need to tell me your name so I can thank you for reading my memoires! )

[comment]: <> (You should also remember that we are using docker.)

[comment]: <> (So? That means that our server is running in our guest and we need to tell our host to where ou guest is showing whatever it's showing.)

[comment]: <> (so we need our port in the dev server config)

[comment]: <> (```js)

[comment]: <> (const config =  {)

[comment]: <> (  ...)

[comment]: <> (  devServer: {)

[comment]: <> (    contentBase: '/build/',)

[comment]: <> (    port: 3030,)

[comment]: <> (},)

[comment]: <> (```)

[comment]: <> ( this is the same as the one we added on the mapping of `docker-compose.yml` file.)

[comment]: <> (You should see it saying ,when you run your server, running on localhost:3030. )

[comment]: <> (##### case of localhost vs 0.0.0.0)

[comment]: <> (That was a hard one...)

[comment]: <> (It might be a case where it says _Running on localhost:3030_ but when you visit it on your browser it still doesnt work.)

[comment]: <> (Adding host in your config may do the trick)

[comment]: <> (```js)

[comment]: <> (const config =  {)

[comment]: <> (  ...)

[comment]: <> (  devServer: {)

[comment]: <> (    contentBase: '/build/',)

[comment]: <> (    host: '0.0.0.0',)

[comment]: <> (    port: 3030,)

[comment]: <> (},)

[comment]: <> (```)

[comment]: <> (Why? I may answer sometime in the future.. right now I don't have the knowledge to do so... sorry :&#41;)


