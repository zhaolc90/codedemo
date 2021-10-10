var multer = require("multer");
var util = require("./middleware/utilities");

const upload = multer({ dest: "public/upload/temp/" });

var express = require("express"),
  router = express.Router(),
  home = require("./controllers/home"),
  login = require("./controllers/login"),
  image = require("./controllers/image");

function loginProcess(req, res) {
  var isAuth = util.auth(req.body.username, req.body.password, req.session);
  if (isAuth) {
    res.redirect("/");
  } else {
    req.flash('error', 'Wrong Username or Password')
    res.redirect("/login");
  }
}
function logOut(req, res) {
  util.logOut(req.session);
  res.redirect("/");
}

module.exports = function (app) {
  router.get("/", home.home);
  router.get("/admin", home.index);
  router.get("/login", login.index);
  router.get("/logout", logOut);
  router.post("/login", loginProcess);
  router.get("/images/:image_id", image.index);
  router.delete("/images/:image_id", image.remove);
  router.post("/images", upload.single("file"), image.create);
  router.post("/images/:image_id/like", image.like);
  router.post("/images/:image_id/comment", image.comment);
  app.use(router);
};
