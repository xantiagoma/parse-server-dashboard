const vars = require("./vars");
const { PARSE_PORT, DOMAIN } = vars;

const parseServer = require("./server");
const parseDashboard = require("./dashboard");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use("/parse", parseServer);
app.use("/dashboard", parseDashboard);

const DOMAIN_DIR = `/etc/letsencrypt/live/${DOMAIN}`;
const privateKey = fs.readFileSync(`${DOMAIN_DIR}/privkey.pem`, "utf8");
const certificate = fs.readFileSync(`${DOMAIN_DIR}/cert.pem`, "utf8");
const ca = fs.readFileSync(`${DOMAIN_DIR}/chain.pem`, "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

const https = require("https");
const http = express();
http.all('*', function(req, res) {
    res.redirect('https://' + req.headers.host + req.url);
})
http.listen(80);
https.createServer(credentials, app).listen(PARSE_PORT, function() {
  console.log(`> Ready On Server ${DOMAIN}:${PARSE_PORT}`);
});
