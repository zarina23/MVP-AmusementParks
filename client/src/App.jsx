import { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../routes/Home";
import Wishlist from "../routes/Wishlist";

function App() {
  return (
    <div>
      <nav>
        <div>
          <Link to="/home">Home</Link>
        </div>
        <div>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </nav>
    </div>
  );
}

export default App;
