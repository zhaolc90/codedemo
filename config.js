require('dotenv').config();

var path = require("path"),
  routes = require("./routes"),
  exphbs = require("express-handlebars"),
  handlebars = require("handlebars"),
  allowInsecurePrototypeAccess =
    require("@handlebars/allow-prototype-access").allowInsecurePrototypeAccess,
  express = require("express"),
  moment = require("moment"),
  csrf = require('csurf'),
  util = require('./middleware/utilities'),
  flash = require('connect-flash'),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  redis = require("redis"),
  RedisStore = require("connect-redis")(expressSession),
  morgan = require("morgan"),
  methodOverride = require("method-override"),
  errorHandler = require("errorhandler");
let redisClient = redis.createClient({ url: "redis://localhost:6379" });

module.exports = function (app) {
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // app.use(upload);
  app.use(methodOverride());

  app.use("/public/", express.static(path.join(__dirname, "./public")));

  app.use(cookieParser(process.env.SECRET));
  app.use(
    expressSession({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SECRET,
      // name: "secretname",
      store: new RedisStore({
        client: redisClient,
      }),
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 600000, // Time is in miliseconds
      },
    })
  );
  app.use(flash())
  // app.use(csrf());
  // app.use(util.csrf);
  app.use(util.requireAuthentication);
  app.use(util.authenticated);
  
  app.use(function (req, res, next) {
    if (req.session.pageCount) req.session.pageCount++;
    else req.session.pageCount = 1;
    next();
  });

  app.engine(
    "handlebars",
    exphbs.create({
      defaultLayout: "main",
      layoutsDir: app.get("views") + "/layouts",
      partialsDir: [app.get("views") + "/partials"],
      handlebars: allowInsecurePrototypeAccess(handlebars),
      helpers: {
        timeago: function (timestamp) {
          return moment(timestamp).startOf("minute").fromNow();
        },
      },
    }).engine
  );
  app.set("view engine", "handlebars");
  // app.use(function( req, res, next) {
  //   // do whatever you want here, alter req, alter res, throw err, etc.
  //   console.log("foo bar", req);
  //   return next();
  // })
  routes(app); //moving the routes to routes folder.

  if ("development" === app.get("env")) {
    app.use(errorHandler());
  }
  return app;
};
