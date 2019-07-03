const ParseDashboard = require('parse-dashboard');
const vars = require('./vars');

const {
  APP_ID,
  MASTER_KEY,
  APP_NAME,
  APP_DASHBOARD_ENDPOINT,
  DASHBOARD_USERS
} = vars;

const parseDashboardUsers = str =>
  String(str)
    .split(';')
    .filter(e => e)
    .map(userStr =>
      userStr
        .split(',')
        .filter(e => e)
        .reduce((pre, curr, inx, arr) => {
          if (inx == 0) {
            pre['user'] = curr || `user${inx}`;
            return pre;
          } else if (inx == 1) {
            pre['pass'] = curr || `pass${inx}`;
            return pre;
          }
        }, {})
    )
    .map((obj, i) => {
      if (!obj['user']) {
        obj['user'] = 'user' + i;
      }
      if (!obj['pass']) {
        obj['pass'] = 'pass' + i;
      }
      return obj;
    });

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: APP_DASHBOARD_ENDPOINT,
        appId: APP_ID,
        masterKey: MASTER_KEY,
        appName: APP_NAME,
        supportedPushLocales: ['en', 'ru', 'fr', 'es']
      }
    ],
    users: parseDashboardUsers(DASHBOARD_USERS)
  },
  { allowInsecureHTTP: false }
);

module.exports = dashboard;
