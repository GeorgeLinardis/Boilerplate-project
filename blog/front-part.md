`npm install express nodemon react react-dom --save`

changing ports on docker-compose.yml, adding 3040

add script on package for running server

// server index 

```js
import express from 'express';

const app = express();
const port = 3040;

app.use('/', express.static('./dist', {
  index: "index.html"
}));

app.listen(port, () => console.log(`App is listening on port ${port}!`));

```

npm install babel-loader @babel/core @babel/preset-react html-webpack-plugin --save-dev

