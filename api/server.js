const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8001;

const server = http.createServer(app);

server.listen(port);
