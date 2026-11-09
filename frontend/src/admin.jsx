import React, { useEffect, useState } from "react";

export default function Admin() {
  const [animals, setAnimals] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    age: "",
    description: ""
  });

  const loadAnimals = async () => {
    const res = await fetch("http://localhost:3000/animals");
    const data = await res.json();
    setAnimals(data);
  };

  useEffect(() => {
    loadAnimals();
  }, []);

  const addAnimal = async () => {
    await fetch("http://localhost:3000/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ name: "", type: "", age: "", description: "" });
    await loadAnimals();
  };

  const deleteAnimal = async (id) => {
    await fetch(`http://localhost:3000/animals/${id}`, {
      method: "DELETE"
    });
    await loadAnimals();
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <h2>Add New Animal</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "300px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Type (dog/cat)"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button onClick={addAnimal}>Add Animal</button>
      </div>

      <h2>All Animals</h2>
      {animals.map(a => (
        <div key={a.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h3>{a.name}</h3>
          <p>{a.type}</p>
          <p>{a.age} years</p>
          <p>{a.description}</p>
          <p>Status: {a.status}</p>

          <button
            onClick={() => deleteAnimal(a.id)}
            style={{ background: "red", color: "white", padding: "0.5rem", border: "none" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
