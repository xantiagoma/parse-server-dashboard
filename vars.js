const dotenv = require('dotenv');
dotenv.config();

const {
  APP_ID = 'appIdDefault',
  APP_NAME = 'appNameDefault',
  APP_DASHBOARD_ENDPOINT = '/parse',
  MASTER_KEY = 'secretMasterKeyDefault',
  CLIENT_KEY = 'secretClientKeyDefault',
  JS_KEY = 'secretJavascriptKeyDefault',
  FILE_KEY = 'secretFileKeyDefault',
  REST_KEY = 'secretRestAPIKeyDefault',
  DOTNET_KEY = 'secretDotNetKeyDefault',
  PARSE_PORT = (process.env.PORT || 3000),
  DB_URI
} = process.env;

module.exports = {
  APP_ID,
  APP_NAME,
  APP_DASHBOARD_ENDPOINT,
  MASTER_KEY,
  CLIENT_KEY,
  JS_KEY,
  FILE_KEY,
  REST_KEY,
  DOTNET_KEY,
  PARSE_PORT,
  DB_URI
};
