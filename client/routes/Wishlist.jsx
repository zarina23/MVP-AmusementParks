import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  // async function loadWishlist() {
  //   const res = await fetch("/api/wishlist");
  //   const data = await res.json();
  //   setWishlist(data);
  // }

  const loadWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist");
      const data = await response.json();
      if (!response.ok) throw newError(data.message);
      setWishlist(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItemFromWishlist = async (id) => {
    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      loadWishlist();
      console.log(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h3 className="text-center">Wishlist</h3>
      <div className="list-group mt-4">
        {wishlist.map((park) => (
          <div
            key={park.id}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <a href={park.url} target="_blank">
              {park.name}
            </a>
            <button
              onClick={() => deleteItemFromWishlist(park.id)}
              className="btn btn-outline-danger btn-sm"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        ))}

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
