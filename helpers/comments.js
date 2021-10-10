var models = require("../models"),
  async = require("async");

module.exports = {
  newest: function (callback) {
    // var comments = [];
    models.Comment.find(
      {},
      {},
      { limit: 5, sort: { timestamp: -1 } },
      function (err, comments) {
        // to do – attach an image to each comment...
        var attachImage = function (comment, next) {
          models.Image.findOne(
            { _id: comment.image_id },
            function (err, image) {
              if (err) throw err;
              comment.image = image; // virtual
              next(err);
            }
          );
        };
        async.each(comments, attachImage, function (err) {
          if (err) throw err;
          callback(err, comments);
        });
      }
    );
    // return comments;
  },
};
