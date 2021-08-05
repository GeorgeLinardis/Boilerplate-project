import express  from 'express';
const app = express();
const port = 3030; // it could be any port

app.get('/', (req, res) => {
  res.status(200).send('Ok'); // The result of your server when you visit localhost:3030
})

app.listen(port, () => {
  console.log(`App is running in port ${port}`); // You will see that in your console
})
