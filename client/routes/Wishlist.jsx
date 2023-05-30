//ISSUES:
// 1. I can save the same park multiple times
// Each item should be saved only once:
// by changing preferences in the mysql table?

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Map from "./Map";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    loadWishlist();
  }, []);

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

  const showParkOnMap = (park) => {
    setSelectedPark(park);
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
            {park.name}
            <div className=" align-items-start justify-content-between">
              <div onClick={() => showParkOnMap(park)}>
                <button className="btn btn-outline-success btn-sm">
                  <i className="fa-solid fa-location-dot"></i>
                </button>

                <a href={park.url} target="_blank">
                  <button className="btn btn-outline-info btn-sm">
                    <i className=" fa-solid fa-circle-info"></i>
                  </button>
                </a>
                <button
                  onClick={() => deleteItemFromWishlist(park.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        ))}

        <div>
          <Outlet />
        </div>
      </div>
      <Map parks={wishlist} selectedPark={selectedPark} />
    </div>
  );
}
