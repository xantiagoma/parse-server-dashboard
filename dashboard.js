const ParseDashboard = require('parse-dashboard');
const vars = require('./vars');

const { APP_ID, MASTER_KEY, APP_NAME, APP_DASHBOARD_ENDPOINT } = vars;

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
    users: [
      {
        user: 'user1',
        pass: '$2y$12$7Kh94U1yHd6.nxXZtYqLvekIcXO.b7XAM8YziAinF9uxQ2BhtgSfi' // pass1
      },
      {
        user: 'user2',
        pass: '$2y$12$YgQstcgs2jSY8gkt7dxVTOxvE41P.Pzyovq2xmfnKd.4/LF.3ousm' // pass2
      }
    ],
    useEncryptedPasswords: true // https://bcrypt-generator.com/
  },
  { allowInsecureHTTP: false }
);

module.exports = dashboard;
