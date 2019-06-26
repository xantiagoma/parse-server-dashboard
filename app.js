const vars = require('./vars');
const { PARSE_PORT } = vars;

const parseServer = require('./server');
const parseDashboard = require('./dashboard');
const express = require('express');
const app = express();
app.use(express.json());
app.use('/parse', parseServer);
app.use('/dashboard', parseDashboard);

app.listen(PARSE_PORT, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${PARSE_PORT}`);
});
