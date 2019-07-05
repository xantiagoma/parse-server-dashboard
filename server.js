const { ParseServer } = require('parse-server');
const path = require('path');
const vars = require('./vars');

const {
  APP_ID,
  MASTER_KEY,
  FILE_KEY,
  CLIENT_KEY,
  JS_KEY,
  REST_KEY,
  DOTNET_KEY,
  PARSE_PORT_DEV,
  DB_URI,
  PARSE_ENV,
  APP_DASHBOARD_ENDPOINT,
  LIVEQUERY_CLASSES,
  USE_LIVEQUERY,
  USE_CLOUD_PATH,
  CLOUD_PATH,
  DOMAIN
} = vars;

const isDev = PARSE_ENV.toLocaleLowerCase().startsWith('d');
const parseServer = new ParseServer({
  databaseURI: DB_URI,
  cloud: USE_CLOUD_PATH ? CLOUD_PATH : path.join(__dirname, 'cloud/main.js'),
  appId: APP_ID,
  masterKey: MASTER_KEY,
  fileKey: FILE_KEY,
  clientKey: CLIENT_KEY,
  javascriptKey: JS_KEY,
  restAPIKey: REST_KEY,
  dotNetKey: DOTNET_KEY,
  serverURL: isDev
    ? `http://localhost:${PARSE_PORT_DEV}${APP_DASHBOARD_ENDPOINT}`
    : `https://${DOMAIN}${APP_DASHBOARD_ENDPOINT}`,
  liveQuery: USE_LIVEQUERY
    ? {
        classNames: LIVEQUERY_CLASSES.split(','),
        redisURL: 'redis://localhost:6379'
      }
    : undefined
});

module.exports = parseServer;
