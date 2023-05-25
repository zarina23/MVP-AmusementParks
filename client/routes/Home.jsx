import { useEffect, useState } from "react";

export default function Home() {
  const [parks, setParks] = useState([]);
  const [newPark, setNewPark] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [newPark]);

  //GET the parks I'm searching
  const getParks = async () => {
    try {
      const response = await fetch(`/api/search/${newPark}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setParks(data.businesses);
    } catch (err) {
      setError("Oops! Looks like this park doesn't exist.");
    }
  };
  const handleChange = (event) => {
    setNewPark(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getParks();
  };

  //ADD the park to my wishlist
  async function addToWishlist(e, park) {
    const body = {
      id: park.id,
      name: park.name,
      image_url: park.image_url,
      url: park.url,
      latitude: park.coordinates.latitude,
      longitude: park.coordinates.longitude,
    };

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
      console.log(data.message);

      if (!response.ok) {
        console.log("Response was not ok");
        throw new Error(data.message);
      }
      getParks();
    } catch (err) {
      console.log("Error adding park to wishlist: " + err);
    }
  }

  //DISABLE button when clicked
  const disableButton = (event) => {
    event.currentTarget.disabled = true;
  };

  // THE INPUT
  return (
    <div className="container">
      <h3 className="text-center">THEME PARK SEARCH</h3>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            placeholder="What park are you looking for?"
            type="text"
            value={newPark}
            onChange={handleChange}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}

      <div className="list-group mt-4">
        {parks.map((park) => (
          <div
            key={park.id}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <a href={park.url} target="_blank">
              {park.name}
            </a>
            {/* ONCLICK SEND ME TO THE YELP PAGE */}
            <button
              className="btn btn-outline-primary btn-sm"
              type="submit"
              onClick={(e) => {
                addToWishlist(e, park);
                disableButton(e);
              }}
            >
              <i className="fa-sharp fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
