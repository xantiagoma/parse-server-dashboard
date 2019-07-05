const dotenv = require('dotenv');
dotenv.config();

const toBoolean = exp => {
  try {
    return JSON.parse(String(exp).toLowerCase());
  } catch (e) {
    return false;
  }
};

const {
  PARSE_ENV = 'env',
  APP_ID = 'appIdDefault',
  APP_NAME = 'appNameDefault',
  APP_DASHBOARD_ENDPOINT = '/parse',
  MASTER_KEY = 'secretMasterKeyDefault',
  CLIENT_KEY = 'secretClientKeyDefault',
  JS_KEY = 'secretJavascriptKeyDefault',
  FILE_KEY = 'secretFileKeyDefault',
  REST_KEY = 'secretRestAPIKeyDefault',
  DOTNET_KEY = 'secretDotNetKeyDefault',
  PARSE_PORT_DEV = process.env.PORT || 3000,
  DB_URI = 'mongodb://localhost:27017/myproject',
  DOMAIN = 'localhost',
  USE_LIVEQUERY = true,
  LIVEQUERY_CLASSES = '',
  USE_CLOUD_PATH = false,
  CLOUD_PATH = path.join(__dirname, 'cloud/main.js'),
  DASHBOARD_USERS = 'admin,adminpass;user,userpass',
  REDIS_URL = 'redis://localhost:6379'
} = process.env;

module.exports = {
  PARSE_ENV,
  APP_ID,
  APP_NAME,
  APP_DASHBOARD_ENDPOINT,
  MASTER_KEY,
  CLIENT_KEY,
  JS_KEY,
  FILE_KEY,
  REST_KEY,
  DOTNET_KEY,
  PARSE_PORT_DEV,
  DB_URI,
  DOMAIN,
  USE_LIVEQUERY: toBoolean(USE_LIVEQUERY),
  LIVEQUERY_CLASSES,
  USE_CLOUD_PATH: toBoolean(USE_CLOUD_PATH),
  CLOUD_PATH,
  DASHBOARD_USERS,
  REDIS_URL
};
