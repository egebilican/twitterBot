const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// routes(app);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", function(req, res) {
  res.status(200).send("kanalima hosgeldiniz");
});

app.listen(port, () => console.log('Example app listening on port', port));
