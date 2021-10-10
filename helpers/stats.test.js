const Stats = require("./stats");

test("stats return current site information object", () => {
  expect(Stats()).toMatchObject({
    comments: 10,
    images: 20,
    likes: 2,
    views: 50,
  });
});
