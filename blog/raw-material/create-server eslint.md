# Creating a server for the first time, using express.js (Eslint)

`npm install --save-dev eslint`

create a `.eslintrc.js` file and add the following inside:

```js
const config = {
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

Watch out
- (Webstorm user), since we are using eslint for our project specifically we need to go to Eslint settings and set our eslint package to `node_modules/eslint`.
- Also if you add `"extends": "airbnb"` option to your config file it will start asking for various eslint packages, e.g `eslint-plugin-react` even if you dont have React installed. That will happen because you extend Airbnb eslint rules.
- You will also need the add parserOptions because ESlint defaults to the last supported of version of JS.
```
  "parserOptions": {
  "ecmaVersion": 8,
  "ecmaFeatures": {
  "jsx": true
  }
  },
```
otherwise you will get a `...keyword <keyword> name is reserved` error.

Finally add a basic eslint script in your package.json

`lint: 'eslint --config .eslintrc.js ./`
 
which basically says, run eslint using as a configuration file the `.eslintrc.js` file and run it in the `./` current folder.


#### extending airbnb

now by adding `"extends": "airbnb"` option in your config file, 
```js
  const config = {
    "extends": "airbnb",
    "rules": { ... },
  };
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

