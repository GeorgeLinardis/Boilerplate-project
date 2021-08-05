# Random interesting info

## /bin folder
inside the bin folder you will find many of the unix commands you are using.
E.g `mkdir`, `ls`, `rm`,
Since the bin folder exists in unix envs, it can be used inside docker containers too

Global installs on Unix systems go to `{prefix}/lib/node_modules.`


## dotenv, .env file and the twelve factor app
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

`npm install dotenv --save`

Create a `.env` file, remember to add it in .gitignore file too.

By adding a variable in the `.env` file you can access it through the `process.env` object.

E.g

inside .env file
```env
APP_NAME=my-app;
```
and inside `app.js` file
```js
import dotenv from 'dotenv';

// use dotenv
const result = dotenv.config();
console.log(process.env.APP_NAME); // my-app
```

You do not want to use .env file in production so add 

```js
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
```

What is the process object though?
Very interesting [post](https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7)
The process object is a global that provides information about, and control over, the current Node.js process. 


## environment variables
Very interesting [post](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html)
The act of providing environment variables is referred to as provisioning.
What is the process object?
The process object is a global that provides information about, and control over, the current Node.js process.

`console.log(process.env)` will print all variables that the node process knows.

if you have set for example a PORT variable as 3030 in your `.env` file you would see something like
`console.log(process.env.PORT) // 3030`

You can also pass variables through your console

`PORT=1565 DEBUG=* npm run dev` will use port 1565 now. 

Watch out that there is no comma no nothing between 2 variables used in our script `PORT` and `DEBUG`


## debugging - logging

### namespaces TOREAD
Very interesting [post](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html)

### [Winston logger](https://github.com/winstonjs/winston)
Very interesting [post](https://stackify.com/winston-logging-tutorial/)

`npm install winston`


## libraries

### body-parser

`npm install --save body-parser`

`body-parser` is a middleware used for parsing the body from the request object during POST calls made to the server.

if you try using postman and send a post request in `'/'` route for example

and try logging the `req.body` it will show `undefined`.

by adding 

```js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

it will show the posted key-values.


### cookie-parser

`npm install --save cookie-parser`
cookie-parser is a middleware which parses cookies attached to the client request object.


for eslint content


## Extending airbnb - React addition
If you add `"extends": "airbnb"` option to your `eslintrc.js` config file it will start asking for various eslint packages,
e.g it might add `eslint-plugin-react` even if you don't have React installed. That will happen because you extend Airbnb eslint rules by adding the `extends...` config.

Let's go for it.

```js
 // .eslintrc.js
  const config = {
    "extends": "airbnb",
    "rules": {},
    "parserOptions": {
      "ecmaVersion": 8,
      "ecmaFeatures": {
        "jsx": true
      }
    },
  };

  module.exports = config;
```
you will also need the following packages to be installed

```npm
npm install --save-dev eslint-plugin-react
npm install --save-dev eslint-plugin-jsx-a11y
npm install --save-dev eslint-plugin-import
```
which is the same as :)
```npm
npm install --save-dev eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```

you will also need a `.eslintignore` file so you dont eslint on node_modules for example.

Run `touch .eslintignore` and add `node_modules/**` for now.

add babel-parser by set in your `.eslintrc.js` file

```js
  parser: "babel-eslint"
```


To avoid eslint rules applied to `.eslintrc.js` file add

`/* eslint-disable */` for now at the top of the file.


#### `-ext` flag
This option allows you to specify which file extensions ESLint will use when searching for target files in the directories you specify. By default, ESLint lints *.js files and the files that match the overrides entries of your configuration.

So add for future use in your script section the following lint script for jsx and js files

`"lint-all": "eslint --config .eslintrc.js --ext .js,.jsx ./"`




