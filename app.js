const http = require("http");
const port = process.env.PORT ||4000;

const result = {
  slackUsername: "Toluu",
  backend: true,
  age: 29,
  bio: "I am a passionate developer that like solving problem with code",
};

const resultJson = JSON.stringify(result);

const server = http.createServer((req, res) => {
  console.log("server live");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(resultJson);
  res.end();
});

server.listen(port);
