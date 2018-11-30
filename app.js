const express = require('express');
const app = express();

app.all('/', function (req, res) {
  res.sendFile('app.html', { root: __dirname });
});
app.all('/login', function (req, res) {
  res.sendFile('app.html', { root: __dirname });
});
app.use('/static', express.static('.'));

app.listen(3000, function () {
  console.log('app arrancada por el puerto :3000!');
});

