const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());

morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :body :status :res[content-length] - :response-time ms")
);

app.get("/info", (req, res) => {
  res.send(
    `Puhelinluettelossa ${persons.length} henkilön tiedot.
    <p>${req.date || new Date()}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((persons) => {
      res.json(persons.map(formatPerson));
    })
    .catch((error) => {
      console.log(error);
      res.status(404).end();
    });
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(400).send({error: "malformatted id"});
    });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!(body.name && body.number)) {
    res.status(400).json({error: "name and number required"});
  } else {
    const person = new Person({
      name: body.name,
      number: body.number
    });
    person
      .save()
      .then((savedPerson) => {
        res.json(formatPerson(savedPerson));
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.put("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const updatedPerson = persons.find((person) => person.id === id);
  updatedPerson.number = body.number;

  persons = persons.filter((person) => person.id !== id);
  persons = persons.concat(updatedPerson);

  res.json(updatedPerson);
});

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  };
};

generateId = () => {
  const min = 1;
  const max = 10000000;
  return Math.floor(Math.random() * (max - min)) + min;
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "050-8654321",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "045-456789",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-9876543",
    id: 4
  }
];
