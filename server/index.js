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
