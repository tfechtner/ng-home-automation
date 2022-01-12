'use strict';
import fs from 'fs';
import https from 'https';
import express from 'express';
import compression from 'compression';

const ip = process.env.NODE_ENV === 'production' ? '192.168.0.44' : '192.168.0.32';
const port = 443;
const appFolder = 'frontend-server/www';

const app = express();
app.use(compression());

const httpsServer = https.createServer({
    key: fs.readFileSync('./frontend-server/certs/server.key'),
    cert: fs.readFileSync('./frontend-server/certs/server.crt'),
}, app);

// ---- SERVE STATIC FILES ---- //
app.use(express.static(appFolder, {maxAge: '1y'}));

// ---- SERVE APPLICATION PATHS ---- //
app.all('*', (req, res) => {
    res.status(200).sendFile(`/`, {root: appFolder});
});

// ---- START UP THE NODE SERVER  ----
httpsServer.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log('Node Express server for ' + app.name + ' listening on https://:' + ip + ':' + port);
});
