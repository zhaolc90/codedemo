var fs = require("fs"),
  sidebar = require("../helpers/sidebar"),
  path = require("path"),
  md5 = require("MD5"),
  Models = require("../models");

module.exports = {
  index: function (req, res) {
    // res.send("The image:index controller " + req.params.image_id);
    var viewModel = {
      image: {},
      comments: [
        {
          image_id: 1,
          email: "test@testing.com",
          name: "Test Tester",
          gravatar: "http://lorempixel.com/75/75/animals/1",
          comment: "This is a test comment...",
          timestamp: Date.now(),
        },
        {
          image_id: 1,
          email: "test@testing.com",
          name: "Test Tester",
          gravatar: "http://lorempixel.com/75/75/animals/2",
          comment: "Another followup comment!",
          timestamp: Date.now(),
        },
      ],
    };
    // res.render("image", viewModel);
    // sidebar(viewModel, function (viewModel) {
    //   res.render("image", viewModel);
    // });
    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      function (err, image) {
        if (err) {
          throw err;
        }
        if (image) {
          image.views = image.views + 1;
          viewModel.image = image;
          image.save();
          // sidebar(viewModel, function (viewModel) {
          //   res.render("image", viewModel);
          // });
          Models.Comment.find(
            { image_id: image._id },
            {},
            {
              sort: {
                timestamp: 1,
              },
            },
            function (err, comments) {
              if (err) {
                throw err;
              }
              viewModel.comments = comments;
              sidebar(viewModel, function (viewModel) {
                res.render("image", viewModel);
              });
            }
          );
        } else {
          res.redirect("/");
        }
      }
    );
  },
  create: function (req, res) {
    var saveImage = function () {
      var possible = "abcdefghijklmnopqrstuvwxyz0123456789",
        imgUrl = "";
      for (var i = 0; i < 6; i += 1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      Models.Image.find({ filename: imgUrl }, function (err, images) {
        if (images.length > 0) {
          // if a matching image was found, try again (start over):
          saveImage();
        } else {
          // console.log( imgUrl, req.file); res.redirect("/images/1")
          console.log(imgUrl, req.file);
          var tempPath = req.file.path,
            ext = path.extname(req.file.originalname).toLowerCase(),
            targetPath = path.resolve("./public/upload/" + imgUrl + ext);
          if (
            ext === ".png" ||
            ext === ".jpg" ||
            ext === ".jpeg" ||
            ext === ".gif"
          ) {
            fs.rename(tempPath, targetPath, function (err) {
              if (err) throw err;
              // res.redirect("/images/" + imgUrl);
              var newImg = new Models.Image({
                title: req.body.title,
                description: req.body.description,
                filename: imgUrl + ext,
              });
              newImg.save(function (err, image) {
                console.log("Successfully inserted image: " + image.filename);
                res.redirect("/images/" + image.uniqueId);
              });
            });
          } else {
            fs.unlink(tempPath, function () {
              if (err) throw err;
              res.json(500, { error: "Only image files are allowed." });
            });
          }
        }
      });
    };
    saveImage();
  },
  like: function (req, res) {
    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      function (err, image) {
        if (!err && image) {
          image.likes = image.likes + 1;
          image.save(function (err) {
            if (err) {
              res.json(err);
            } else {
              res.json({ likes: image.likes });
            }
          });
        }
      }
    );
  },
  comment: function (req, res) {
    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      function (err, image) {
        if (!err && image) {
          var newComment = new Models.Comment(req.body);
          newComment.gravatar = md5(newComment.email);
          newComment.image_id = image._id;
          newComment.save(function (err, comment) {
            if (err) {
              throw err;
            }
            res.redirect("/images/" + image.uniqueId + "#" + comment._id);
          });
        } else {
          res.redirect("/");
        }
      }
    );
  },
  remove: function (req, res) {
    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      function (err, image) {
        if (err) {
          throw err;
        }
        fs.unlink(
          path.resolve("./public/upload/" + image.filename),
          function (err) {
            if (err) {
              throw err;
            }
            Models.Comment.deleteMany({ image_id: image._id }, function (err) {
              image.remove(function (err) {
                if (!err) {
                  res.json(true);
                } else {
                  res.json(false);
                }
              });
            });
          }
        );
      }
    );
  },
};
