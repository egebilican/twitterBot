const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors({origin:true,credentials: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    // do logging
    console.log(req)
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

const PORT = 3005;

routes(app);

app.listen(PORT, () => console.log('Example app listening on port', PORT));
