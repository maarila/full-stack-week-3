const mongoose = require("mongoose");

const url =
  "mongodb://heroku_prx3n79c:nr7mnknenm4i97og699h658ili@ds141657.mlab.com:41657/heroku_prx3n79c";

mongoose.connect(url);
mongoose.Promise = global.Promise;

const Person = mongoose.model("Person", {
  name: String,
  number: String
});

if (process.argv.length > 2) {
  const name = process.argv[2];
  const number = process.argv[3];
  console.log(`Lisätään henkilön ${name} numero ${number} luetteloon.`);

  const person = new Person({
    name: name,
    number: number
  });

  person.save().then((response) => {
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    const byName = (person1, person2) =>
      person1.name.localeCompare(person2.name);
    console.log("puhelinluettelo:");
    result
      .sort(byName)
      .forEach((person) => console.log(`${person.name}\t\t${person.number}`));
    mongoose.connection.close();
  });
}
