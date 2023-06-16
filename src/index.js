require('dotenv').config();

// NOTE: Remind me to remove this before production

const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const multer = require('multer');

const routes = require('./routes');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
app.use(upload.single('photo'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', routes);
routes(express, app, upload);

// app.listen(PORT, () => {
//     console.log(
//       `Server Started at ${new Date().toLocaleString()}\n`
//       + `Running on port ${PORT}`
//     );
// });

const server = http.createServer(app);
server.listen(PORT, HOST, () => {
  console.log(
    `Server Started at ${new Date().toLocaleString()}\n`
    + `Running on port ${HOST}:${PORT}`
  );
});
