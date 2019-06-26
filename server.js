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
  PARSE_PORT,
  DB_URI
} = vars;
const parseServer = new ParseServer({
  databaseURI:
    DB_URI,
  cloud: path.join(__dirname, 'cloud/main.js'),
  appId: APP_ID,
  masterKey: MASTER_KEY,
  fileKey: FILE_KEY,
  clientKey: CLIENT_KEY,
  javascriptKey: JS_KEY,
  restAPIKey: REST_KEY,
  dotNetKey: DOTNET_KEY,
  serverURL: `http://localhost:${PARSE_PORT}/parse`
});

module.exports = parseServer;
