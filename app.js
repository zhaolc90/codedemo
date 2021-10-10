//require the mongoClient from mongodb module
var MongoClient = require("mongodb").MongoClient;

//mongodb configs
var connectionUrl = "mongodb://root:example@localhost:27017",
    sampledb = "myproject",
  sampleCollection = "chapters";

//We need to insert these chapters into mongoDB
var chapters = [
  {
    Title: "Snow Crash",
    Author: "Neal Stephenson",
  },
  {
    Title: "Snow Crash",
    Author: "Neal Stephenson",
  },
];

MongoClient.connect(connectionUrl, function (err, client) {
  console.log("Connected correctly to server");
  // Get some collection
  var database = client.db(sampledb)
  var collection = database.collection(sampleCollection);
  collection.insertMany(chapters, function (error, result) {
    //here result will contain an array of records inserted
    if (!error) {
      console.log(
        "Success :" + result.insertedCount + " chapters        inserted!"
      );
    } else {
      console.log("Some error was encountered!");
    }
    client.close();
  });
});
