import React, { useEffect, useState } from "react";

export default function AvailableAnimals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/animals")
      .then(res => res.json())
      .then(data => {
        const available = data.filter(a => a.status === "available");
        setAnimals(available);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>Available Animals</h1>

      {animals.length === 0 && (
        <p>No animals are currently available for adoption.</p>
      )}

      {animals.map(a => (
        <div
          key={a.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            background: "#f9f9f9"
          }}
        >
          <h2>{a.name}</h2>
          <p><strong>Type:</strong> {a.type}</p>
          <p><strong>Age:</strong> {a.age} years</p>
          <p><strong>Description:</strong> {a.description}</p>
          <p><strong>Status:</strong> {a.status}</p>
        </div>
      ))}
    </div>
  );
}
