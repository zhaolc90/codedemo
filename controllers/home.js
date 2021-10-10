var sidebar = require("../helpers/sidebar"),
  ImageModel = require("../models").Image;

module.exports = {
  index: function (req, res) {
    // res.send("The home:index controller");
    var viewModel = {
      name: "Jason",
      helpers: {
        timeago1: function (timestamp) {
          return "a long time ago!";
        },
      },
      images: [],
    };
    // res.render("index", viewModel);
    
    // sidebar(viewModel, function (viewModel) {
    //   res.render("index", viewModel);
    // });
    ImageModel.find(
      {},
      {},
      { limit: 3,sort: { timestamp: -1 } },
      function (err, images) {
        if (err) {
          throw err;
        }
        viewModel.images = images;
        viewModel.signedCookie = JSON.stringify(req.signedCookies)
        viewModel.user = res.locals.user
        sidebar(viewModel, function (viewModel) {
          res.render("index", viewModel);
        });
      }
    );
  },
  home: function (req, res) {
    // res.send("The home:index controller");
    var viewModel = {
      name: "Jason",
      helpers: {
        timeago1: function (timestamp) {
          return "a long time ago!";
        },
      },
      images: [],
    };
    // res.render("index", viewModel);
    viewModel.signedCookie = JSON.stringify(req.signedCookies)
    viewModel.session = JSON.stringify(req.session)
    viewModel.message = req.flash('error')
    res.render("home", { ...viewModel, layout: 'home' });
  }
};
