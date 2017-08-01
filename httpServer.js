const http = require('http');
const fs = require('fs');
const path = require('path');
const petPath = path.join(__dirname, 'pets.json');
const port = process.env.PORT || 8000;

function json(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function errorJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/plain');
  res.end(data);
}

const server = http.createServer(function(req, res) {

  if(req.method === "GET" && req.url === "/pets") {
    fs.readFile(petPath, 'utf8', function(err, data) {
      if(err) {return errorJson(res, 500, "error: INTERNAL ERROR");}

      json(res, 200, JSON.parse(data));

    });
  }else if(req.method === "GET" && req.url.match(/^\/pets\/\d+$/)) {
    fs.readFile(petPath, 'utf8', function(err, data) {
      if(err) {return errorJson(res, 500, "error: INTERNAL ERROR");}

      const index = req.url.match(/^\/pets\/(\d+)$/)[1];
      console.log(req.url.match(/^\/pets\/\d+$/));
      var pets = JSON.parse(data);
      console.log(data);

      if(pets[index]) {
        json(res, 200, pets[index])
      }else {
        errorJson(res, 404, 'Not Found');
      }

    });
  }else {
    errorJson(res, 404, 'Not Found');
  }
})

server.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = server;
