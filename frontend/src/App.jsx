import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AnimalList from "./AnimalList.jsx";
import AnimalPage from "./AnimalPage.jsx";
import ThankYou from "./ThankYou.jsx";
import AvailableAnimals from "./AvailableAnimals.jsx";

export default function App() {
  return (
    <Router>
      <header
        style={{
          background: "#333",
          padding: "1rem",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }}
      >
        <h1>Vaasa Adoptio</h1>

        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link to="/" style={{ color: "white" }}>Etusivu</Link>
          <Link to="/available" style={{ color: "white" }}>Available Animals</Link>
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<AnimalList />} />
          <Route path="/animals/:id" element={<AnimalPage />} />
          <Route path="/available" element={<AvailableAnimals />} />
          <Route path="/kiitos" element={<ThankYou />} />
        </Routes>
      </main>
    </Router>
  );
}
