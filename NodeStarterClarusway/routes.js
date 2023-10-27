const fs = require("fs");

let tasks = [];

exports.router = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Content-Type", "text/HTML");
  if (url === "/" && method === "GET") {
    let data = fs.readFileSync("./views/home.html", "utf8");
    console.log("data:", data);
    data = data.replace(
      "<ul></ul>",
      `<ul>${tasks.map((task) => `<li>${task}</li>`).join("")}</ul>`
    );
    res.write(data);
  } else if (url === "/add" && method === "GET") {
    let data = fs.readFileSync("./views/add.html", "utf8");
    res.write(data);
  } else if (url === "/add" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      let [name, value] = body.split("=");
      value = value.replaceAll("+", " ");
      tasks.push(value);
    });

    res.writeHead(302, { Location: "/" });
  } else if (url === "/json" && method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(tasks));
  } else {
    res.write("<h1>404 Not Found</h1>");
  }
  res.end();
};
