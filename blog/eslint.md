# Adding ESlint in our project

Type `npm install --save-dev eslint`

create a `.eslintrc.js` file and add the following:

```js
const config = {
  "rules": {},
  "parserOptions": {
    "ecmaVersion": 8,
  },
};

module.exports = config;
```

This file is used for add all configurations of Eslint for your project.

Watch out though
- (Webstorm user), since we are using eslint for our project specifically we need to go to Eslint settings and set our eslint package to `node_modules/eslint`.
- We need the `parserOptions` because otherwise it will start probably throwing an error in your IDE like `Parsing error: The keyword 'const' is a reserved one`.
Finally, add a basic eslint script in your package.json

`lint: 'eslint --config .eslintrc.js ./`
 
which basically says, run eslint using as a configuration file, the `.eslintrc.js` one and run it in `./` current folder represented as `./`.
