require('dotenv').config();

// NOTE: Remind me to remove this before production
// NOTE: Remind me to ... Well, I don't remember what I want to say here

const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', routes);
routes(express, app);

// app.listen(PORT, () => {
//     console.log(
//       `Server Started at ${new Date().toLocaleString()}\n`
//       + `Running on port ${PORT}`
//     );
// });

server = http.createServer(app);
server.listen(PORT, HOST, () => {
    console.log(
      `Server Started at ${new Date().toLocaleString()}\n`
      + `Running on port ${PORT}`
    );
});
