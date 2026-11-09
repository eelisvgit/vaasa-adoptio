import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AnimalList() {
  const [animals, setAnimals] = useState([]);

  const loadAnimals = async () => {
    const res = await fetch("http://localhost:3000/animals");
    const data = await res.json();
    setAnimals(data);
  };

  useEffect(() => {
    loadAnimals();
  }, []);

  return (
    <div>
      <h1>All Animals</h1>
      {animals.map(a => (
        <div key={a.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h2>{a.name}</h2>
          <p><strong>Type:</strong> {a.type}</p>
          <p><strong>Age:</strong> {a.age} years</p>
          <p><strong>Status:</strong> {a.status}</p>
          <Link to={`/animals/${a.id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
}
