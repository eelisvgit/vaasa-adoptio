const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: "postgres",
  password: "postgres",
  database: "animals",
});

app.post("/adoptions", async (req, res) => {
  const { animal_id, applicant_name, applicant_email, message } = req.body;

  const animal = await pool.query("SELECT * FROM animals WHERE id=$1", [
    animal_id,
  ]);

  if (!animal.rows.length) return res.status(404).json({ error: "Not found" });
  if (animal.rows[0].status !== "available")
    return res.status(409).json({ error: "Already adopted" });

  await pool.query(
    "INSERT INTO adoptions (animal_id, applicant_name, applicant_email, message) VALUES ($1,$2,$3,$4)",
    [animal_id, applicant_name, applicant_email, message]
  );

  await pool.query("UPDATE animals SET status='adopted' WHERE id=$1", [
    animal_id,
  ]);

  res.json({ success: true });
});

app.listen(4000, () => console.log("Server B running on port 4000"));
