const express = require("express");
const app = express();

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `Puhelinluettelossa ${persons.length} henkilön tiedot.
    <p>${req.date || new Date()}</p>`
  );
});

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
