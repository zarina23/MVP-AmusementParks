import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../routes/Home";
import Wishlist from "../routes/Wishlist";

function App() {
  return (
    <div>
      <ul className="nav justify-content-end container-sm grid gap-3">
        <li>
          <Link to="/home">
            <i
              className="fa-solid fa-house"
              style={{ color: "rgb(76, 10, 137)", padding: 20 }}
            ></i>
          </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <i
              className="fa-solid fa-star"
              style={{ color: "rgb(76, 10, 137)", padding: 20 }}
            ></i>
          </Link>
        </li>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </ul>
    </div>
  );
}

export default App;
