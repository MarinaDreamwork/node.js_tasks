const http = require('http');
const chalk = require('chalk');
const port = 3000;
const server = http.createServer((req, res) => {
  if(req.method === "GET") {
    const 
  }
  res.end('Hello from server');
});

server.listen(port, () => {
  console.log(chalk.blue(`Server has been started on port ${port}...`))
});