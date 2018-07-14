const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors({origin:true,credentials: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3005;

routes(app);

app.listen(PORT, () => console.log('Example app listening on port', PORT));
