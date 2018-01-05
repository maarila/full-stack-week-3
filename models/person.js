const mongoose = require("mongoose");

const url =
  "mongodb://heroku_prx3n79c:nr7mnknenm4i97og699h658ili@ds141657.mlab.com:41657/heroku_prx3n79c";

mongoose.connect(url);
mongoose.Promise = global.Promise;

const Person = mongoose.model("Person", {
  name: String,
  number: String
});

module.exports = Person;