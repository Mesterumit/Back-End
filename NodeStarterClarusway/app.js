require("dotenv").config();
const http = require("http");

const { router } = require("./routes");

const PORT = process.env.PORT ?? 7000;

const server = http.createServer(router);

server.listen(PORT, console.log(`Server is listening on port: ${PORT}`));
