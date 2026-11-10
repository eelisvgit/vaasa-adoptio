import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "db",
  user: "postgres",
  password: "postgres",
  database: "vaasa_adoptio"
});

// GET ALL ANIMALS
app.get("/animals", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM animals");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
// GET ONE ANIMAL BY ID
app.get("/animals/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query("SELECT * FROM animals WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Animal not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ADOPT AN ANIMAL
app.put("/animals/:id/adopt", async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query(
      "UPDATE animals SET status = 'adopted' WHERE id = $1",
      [id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ADD NEW ANIMAL
app.post("/animals", async (req, res) => {
  const { name, type, age, description } = req.body;

  try {
    await pool.query(
      "INSERT INTO animals (name, type, age, description, status) VALUES ($1, $2, $3, $4, 'available')",
      [name.toLowerCase(), type.toLowerCase(), age, description]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE AN ANIMAL
app.delete("/animals/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query("DELETE FROM animals WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(3000, () => {
  console.log("server-a running on port 3000");
});
