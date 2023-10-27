const http = require("http");
const math = require("./math");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT ?? 7000;
console.log(process.env.NODE_ENV);
console.log(math.add(5, 10));
const app = http.createServer((req, res) => {
  //   res.end("<h1>Welcome to our Node Class</h1>");
  if (req.url === "/") {
    res.statusCode = 404;
    res.statusMessage = "Not Found";
    res.setHeader("Content-Type", "text/html");
    res.setHeader("another-header", "another-value");

    res.write("* Row 1");
    res.write("* Row 2");
    res.write("* Row 3");
    res.end();
  } else if (req.url === "/api") {
    if (req.method === "GET") {
      res.writeHead(200, "Status Message", {
        "Content-Type": "application/json",
        "another-header": "another-value",
      });

      const obj = {
        result: true,
        age: 25,
        message: "Process completed successfully",
      };

      res.end(`<h1>${JSON.stringify(obj.message)}</h1>`);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
