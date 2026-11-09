import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AnimalPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    fetch(`http://localhost:3000/animals/${id}`)
      .then(r => r.json())
      .then(setAnimal)
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  const submit = async () => {
    await fetch(`http://localhost:3000/animals/${id}/adopt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    nav("/kiitos");
  };

  if (!animal) return <p>Ladataan...</p>;

  return (
    <div>
      <h1>{animal.name}</h1>
      <p>{animal.description}</p>

      <input
        placeholder="Nimi"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        placeholder="Viesti"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button onClick={submit}>Adoptoi</button>
    </div>
  );
}
