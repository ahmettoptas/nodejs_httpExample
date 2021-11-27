const http = require("http");
const fs = require("fs");

const { readFile, writeFile } = fs;


const logPath = "./logs.txt";

const logFunc = (req, res) => {

   writeFile(
    logPath,
    String([
      "<p>Request Method : '" +
        req.method +
        "'\t" +
        "Request URL : '" +
        req.url +
        "'\n" +
        "Response Headers :\n" +
        res._header +
        "\n</p>",
    ]),
    { flag: "a" },
    (err) => {
      if (err) {
        console.log("Err :\t",err);
        return;
      }
    }
  );
};

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>Home page!</h1>");
    res.write("<p>Simple home paragraph...</p>");
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>About page!</h1>");
    res.write("<p>Simple about paragraph...</p>");
    res.end();
  } //You can see all logs from the browser by typing 'localhost:$PORT/logs'.
    else if (url === "/logs") {
      if (fs.existsSync(logPath)) {
        res.writeHead(200, { "content-type": "text/html" });
        readFile(logPath, (err, data) => {
          if (err) return;
          else {
            res.write("<div>"+data+"</div>");
            res.end();
          }
        });
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      res.write("<h1>Resource Not Found</h1>");
      res.end();

    }
  } else {
    res.writeHead(400, { "content-type": "text/html" });
    res.write("<h1>Bad Request</h1>");
    res.end();
  }

  try {
    logFunc(req, res);
  } 
  catch (error) {
    console.log(error);
  }
});

//You can type node http_examples "your prefer port number"; else it will be listening on port 5000
if (process.argv[2])
  server.listen(Number(process.argv[2]), () =>
    console.log(`Server is listening on port ${process.argv[2]}`)
  );
else server.listen(5000, () => console.log("Server is listening on port 5000"));
