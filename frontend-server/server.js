'use strict';
const express = require('express');
const compression = require('compression');

const _ip = '192.168.0.44';
const _port = 4100;
const _app_folder = 'www';

const app = express();
app.use(compression());

// ---- SERVE STATIC FILES ---- //
app.use(express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APPLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, _ip, function () {
    console.log('Node Express server for ' + app.name + ' listening on http://:' + _ip + ':' + _port);
});
