const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Dummy data
let animals = [
  { id: 1, name: "Misu", type: "Kissa", age: 3, description: "Suloinen kissa", status: "available" },
  { id: 2, name: "Rekku", type: "Koira", age: 5, description: "Energiaa täynnä", status: "available" }
];

// GET all animals
app.get("/animals", (req, res) => {
  res.json(animals);
});

// GET single animal
app.get("/animals/:id", (req, res) => {
  const animal = animals.find(a => a.id == req.params.id);
  res.json(animal);
});

// POST adopt
app.post("/animals/:id/adopt", (req, res) => {
  const animal = animals.find(a => a.id == req.params.id);
  if (animal) {
    animal.status = "adopted";
  }
  res.json({ success: true });
});

// POST return (peru/palauta adoptointi)
app.post("/animals/:id/return", (req, res) => {
  const animal = animals.find(a => a.id == req.params.id);
  if (animal) {
    animal.status = "available";
  }
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
