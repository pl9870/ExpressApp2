const express = require('express');
const app = express();

const PORT = 8080;

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.get('/welcome', (request, response) => {
  response.send('Welcome!');
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
