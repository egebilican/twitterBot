
const express = require('express')
const app = express()
const routes = require('./routes');
const bodyParser = require("body-parser");
var cors = require('cors')

port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
routes(app);


app.listen(port, () => console.log('Example app listening on port', port))


