require('dotenv').config();

const express = require('express');
// const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
