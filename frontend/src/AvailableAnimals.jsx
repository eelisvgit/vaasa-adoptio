import React, { useEffect, useState } from "react";

export default function AvailableAnimals() {
  const [animals, setAnimals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");

  const loadAnimals = async () => {
    const res = await fetch("http://localhost:3000/animals");
    const data = await res.json();
    const available = data.filter(a => a.status === "available");
    setAnimals(available);
  };

  useEffect(() => {
    loadAnimals();
  }, []);

  const filteredAnimals = animals.filter(a => {
    if (filter === "all") return true;
    return a.type.toLowerCase() === filter;
  });

  const sortedAnimals = [...filteredAnimals].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "age") return a.age - b.age;
    if (sort === "type") return a.type.localeCompare(b.type);
    return 0;
  });

  const adoptAnimal = async (id) => {
    await fetch(`http://localhost:3000/animals/${id}/adopt`, {
      method: "PUT"
    });
    await loadAnimals();
  };

  return (
    <div>
      <h1>Available Animals</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Filter by type: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Sort by: </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="type">Type</option>
        </select>
      </div>

      {sortedAnimals.map(a => (
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

          <button
            onClick={() => adoptAnimal(a.id)}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Adopt
          </button>
        </div>
      ))}
    </div>
  );
}
