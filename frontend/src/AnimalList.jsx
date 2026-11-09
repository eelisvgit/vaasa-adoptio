import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AnimalList() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/animals")
      .then(r => r.json())
      .then(setAnimals)
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>Eläimet</h1>
      {animals.map(a => (
        <div key={a.id} style={{ marginBottom: "1rem" }}>
          <h2>{a.name}</h2>
          <p>{a.type} – {a.age}v</p>
          <p>Status: {a.status}</p>
          <Link to={`/animals/${a.id}`}>Katso tarkemmin</Link>
        </div>
      ))}
    </div>
  );
}
