// CALL THE GET FUNCTION FROM THE BACKEND
// CREATE ANOTHER COMPONENT FOR THE DATABASE ("WISHLIST")
// IT WILL FETCH FROM THE BACKEND: ID, ALIAS,COORDINATES, IMAGE, URL

import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [parks, setParks] = useState([]);
  const [newPark, setNewPark] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   getParks();
  // }, []);

  const getParks = async () => {
    try {
      const response = await fetch(`/api/search/${newPark}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setParks(data.businesses);
    } catch (err) {
      setError("The park doesn't exist");
    }
  };
  const handleChange = (event) => {
    setNewPark(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getParks();
  };

  async function addToWishlist(e, park) {
    const body = {
      id: park.id,
      name: park.name,
      image_url: park.image_url,
      url: park.url,
      latitude: park.coordinates.latitude,
      longitude: park.coordinates.longitude,
    };
    console.log(JSON.stringify(body));

    e.preventDefault();
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log("Response was not ok");
        throw new Error(data.message);
      }
      getParks();
      console.log("Added to Wishlist");
    } catch (err) {
      console.log("Error adding park to wishlist: " + err);
    }
  }

  // THE INPUT
  return (
    <div className="container">
      <h3 className="text-center">THEME PARK SEARCH</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            placeholder="Disneyland, Phantasialand..."
            type="text"
            value={newPark}
            onChange={handleChange}
            className="form-control"
          />
          <button type="submit" className="btn btn-warning">
            Search
          </button>
        </div>
      </form>
      {/* {error && <div>{error}</div>} THE ERROR MESSAGE DOESN'T GO AWAY */}

      <div className="list-group mt-4">
        {parks.map((park) => (
          <div
            key={park.id}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            {park.name}
            {/* ONCLICK SEND ME TO THE YELP PAGE */}
            <button
              onClick={(e) => addToWishlist(e, park)}
              className="btn btn-primary"
              type="submit"
            >
              SAVE
            </button>
            {/* ONCLICK SENDS THE INFO TO THE WISHLIST COMPONENT */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
