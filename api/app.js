var express = require("express"),
  bodyParser = require("body-parser"),
  _ = require("underscore"),
  json = require("./movies.json"),
  app = express();
app.set("port", process.env.PORT || 3300);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var router = new express.Router();
// TO DO: Setup endpoints ...
router.get("/test", function (req, res) {
  var data = {
    name: "Jason Krol",
    website: "http://kroltech.com",
  };
  res.json(data);
});
router.get("/", function (req, res) {
  res.json(json);
});
app.use("/", router);
var server = app.listen(app.get("port"), function () {
  console.log("Server up: http://localhost:" + app.get("port"));
});
