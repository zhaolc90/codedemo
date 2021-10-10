global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

var express = require("express"),
  config = require("./config"),
  spdy = require("spdy"),
  fs = require("fs"),
  path = require("path"),
  mongoose = require("mongoose");
var app = express();
var errorHandlers = require("./middleware/errorhandlers");
app.set("port", process.env.PORT || 3300);
app.set("views", __dirname + "/views");
// implementing a cookie parser before a session handler
// Having an error handler configured as one of the last middleware
// app.get("/", function (req, res) {
//   res.send("Hello World");
// });
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("open", function () {
  console.log("Mongoose connected.");
});

config(app);
app.get("/error", function (req, res, next) {
  next(new Error("A contrived error"));
});

app.use(errorHandlers.error); //last one
app.use(errorHandlers.notFound); //last one
app.listen(app.get("port"), function () {
  console.log(`Server up: http://localhost:${app.get("port")}`);
});

// app.get("*", (req, res) => {
//   res.status(200).json({ message: "ok" });
// });
// const options = {
//   key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
//   cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
// };
// const port = app.get("port");
// spdy.createServer(options, app).listen(port, (error) => {
//   if (error) {
//     console.error(error);
//     return process.exit(1);
//   } else {
//     console.log("Listening on port: https://localhost:" + port + ".");
//   }
// });
