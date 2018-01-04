const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

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
  res.json(persons);
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
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name === undefined || body.number === undefined) {
    res.status(400).json({error: "name and number required"});
  } else if (persons.find((person) => person.name === body.name)) {
    res.status(400).json({error: "name must be unique"});
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    };
    persons = persons.concat(person);
    res.json(person);
  }
});

generateId = () => {
  const min = 1;
  const max = 10000000;
  return Math.floor(Math.random() * (max - min)) + min;
};

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
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
