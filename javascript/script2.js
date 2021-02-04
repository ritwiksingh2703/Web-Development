//console.log("hello");
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<html>
  <head>
      <meta charset="utf-8">
      <title>Javascript</title>
      <body>
          
          Javascript Tutorials
          <p class="a23">First para</p>
          <p id="b245">Second Para</p>
          <span id="time"></span>
          <button id="btn">Hey you</button>
          <style>
              #b245{
                  background:red !important;
                  height: 100px;
                  padding-left: 40px;
                  padding-top: 10px ;
                  align-items: center;

              }
              #time{
                  font-weight: bold;
                  background-color: aqua;
                  padding: 10px;
                  color:green;
                  align-content: center;
                  font-size: 23px;
                  
              }
          </style>
          <button onclick="first()">hit me</button>

          
          <script src ="script.js"></script>
      </body>
  </head>
</html>`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
