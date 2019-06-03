const express = require("express");
const app = express();
const fs = require("fs");

const port = 3000;

var data = {};
var fileNumber;
var count = 0;

app.use((req, res, next) => {
  var p = new Promise(function(resolve, reject) {
    readFiles("jsonFiles/", () => {
      resolve();
    });
  });
  p.then(() => {
    next();
  });
});

var readFiles = (dirname, onEnd) => {
  fs.readdir(dirname, function(err, filenames) {
    fileNumber = filenames.length;
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, "utf-8", function(err, content) {
        count++;
        data[filename] = JSON.parse(content);
        if (fileNumber == count) {
          onEnd();
        }
      });
    });
  });
};

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-credentials", true);
  res.send(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
