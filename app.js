
const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(`Adres IP serwera: ${req.socket.localAddress}\n`);
  res.write(`Nazwa serwera (hostname): ${os.hostname()}\n`);
  res.write(`Wersja aplikacji: ${process.env.APP_VERSION}\n`);
  res.end();
});

server.listen(8080, () => {
  console.log('Aplikacja działa na http://localhost:8080');
});
