import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AnimalList from "./AnimalList.jsx";
import AnimalPage from "./AnimalPage.jsx";
import ThankYou from "./ThankYou.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <header
        style={{
          background: "#0050a0",
          color: "white",
          padding: "1rem 2rem",
          fontSize: "1.4rem",
          fontWeight: "600",
          marginBottom: "1rem",
        }}
      >
        Vaasa Adoptio – AMK Edition

        <nav style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
          <Link to="/" style={{ color: "white" }}>Etusivu</Link>
        </nav>
      </header>

      <div className="container" style={{ padding: "1rem 2rem" }}>
        <Routes>
          <Route path="/" element={<AnimalList />} />
          <Route path="/animals/:id" element={<AnimalPage />} />
          <Route path="/kiitos" element={<ThankYou />} />
        </Routes>
      </div>

      <footer
        style={{
          marginTop: "3rem",
          padding: "1rem",
          background: "#003366",
          color: "white",
          textAlign: "center"
        }}
      >
        <p>Vaasa Adoptio – Kuvitteellinen osoite</p>
        <p>Koirakatu 12, 65100 Vaasa</p>
      </footer>
    </BrowserRouter>
  );
}
