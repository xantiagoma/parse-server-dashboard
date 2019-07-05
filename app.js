const vars = require('./vars');
const {
  PARSE_PORT_DEV,
  PARSE_ENV,
  DOMAIN,
  USE_LIVEQUERY,
  APP_ID,
  MASTER_KEY,
  REST_KEY,
  JS_KEY,
  CLIENT_KEY,
  DOTNET_KEY,
  APP_DASHBOARD_ENDPOINT,
  REDIS_URL
} = vars;

const parseServer = require('./server');
const parseDashboard = require('./dashboard');
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const { ParseServer } = require('parse-server');

const app = express();

app.use(express.json());
app.use('/parse', parseServer);
app.use('/dashboard', parseDashboard);

const IN_DEV = PARSE_ENV.toLocaleLowerCase().startsWith('d');
const domain = IN_DEV
  ? `http://localhost:${PARSE_PORT_DEV}`
  : `https://${DOMAIN}`;

const httpServer = http.createServer(app);
httpServer.listen(IN_DEV ? PARSE_PORT_DEV : 80, err => {
  if (err) throw err;
  console.log(
    IN_DEV
      ? `> Running DEV Server on ${domain}`
      : `> Running HTTP Server on ${domain}`.replace('https://', 'http://')
  );
});

if (!IN_DEV) {
  const DOMAIN_DIR = `/etc/letsencrypt/live/${DOMAIN}`;
  const privateKey = fs.readFileSync(`${DOMAIN_DIR}/privkey.pem`, 'utf8');
  const certificate = fs.readFileSync(`${DOMAIN_DIR}/cert.pem`, 'utf8');
  const ca = fs.readFileSync(`${DOMAIN_DIR}/chain.pem`, 'utf8');
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(443, function() {
    console.log(`> Running Server on ${domain}`);
  });
}

if (USE_LIVEQUERY) {
  ParseServer.createLiveQueryServer(server, {
    appId: APP_ID,
    masterKey: MASTER_KEY,
    keyPairs: {
      restAPIKey: REST_KEY,
      javascriptKey: JS_KEY,
      clientKey: CLIENT_KEY,
      windowsKey: DOTNET_KEY,
      masterKey: MASTER_KEY
    },
    serverURL: `${domain}${APP_DASHBOARD_ENDPOINT}`,
    websocketTimeout: 10 * 1000,
    cacheTimeout: 60 * 600 * 1000,
    logLevel: 'VERBOSE',
    redisURL: REDIS_URL
  });
}
