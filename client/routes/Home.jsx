import React, { useState, useEffect } from "react";
import Map from "./Map";
import GoogleMapComponent from "./GoogleMapComponent";

export default function Home() {
  const [parks, setParks] = useState([]);
  const [newPark, setNewPark] = useState("");
  const [error, setError] = useState("");
  const [selectedPark, setSelectedPark] = useState(null);
  const [searchResultsList, setSearchResultsList] = useState([]); //this is the main state used for the logic of the app
  const [highlightedPark, setHighlightedPark] = useState({})

  const changeSearchResultsList = (newSearchResultsList) => {
    setSearchResultsList(newSearchResultsList);
  };

  useEffect(() => {
    setError("");
  }, [newPark]);

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
      id: park.place_id,
      name: park.name,
      rating: park.rating,
      address: park.formatted_address,
      image_url: park.photos[0].getUrl(),
      // url: park.url,
      latitude: park.geometry.location.lat(),
      longitude: park.geometry.location.lng(),
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
      // getParks();
    } catch (err) {
      console.log("Error adding park to wishlist: " + err);
    }
  }

  //DISABLE button when clicked
  const disableButton = (event) => {
    event.currentTarget.disabled = true;
  };

  const showParkOnMap = (park) => {
    setSelectedPark(park);
  };

  const changeHighlightedPark = (locationDetails) => {
    console.log(locationDetails);
    setHighlightedPark(locationDetails);
  }

  return (
    <div className="container">
      <h3 className="text-center">My Theme Park Database</h3>

      {error && <div className="error-message">{error}</div>}

      <GoogleMapComponent
        changeSearchResultsList={changeSearchResultsList}
        searchResultsList={searchResultsList}
      />

      <div className="list-group mt-3 ">
        {searchResultsList?.map((locationDetails) => (
          <div
            key={locationDetails.place_id}
            className=" list-group-item d-flex align-items-start justify-content-between"
          >
            <p onClick={()=> changeHighlightedPark(locationDetails)}>
              {locationDetails.name} {locationDetails.rating}
            </p>
            <div className=" align-items-start justify-content-between">
              {/* <div onClick={() => showParkOnMap(park)}> */}
              <div>
                <button className=" btn btn-outline-success btn-sm">
                  <i className=" fa-solid fa-location-dot"></i>
                </button>

                {/* <a href={park.url} target="_blank">
                  <button className=" btn btn-outline-info btn-sm">
                    <i className="  fa-solid fa-circle-info"></i>
                  </button>
                </a> */}
                <button
                  className=" btn btn-outline-warning btn-sm"
                  type="submit"
                  onClick={(e) => {
                    addToWishlist(e, locationDetails);
                    disableButton(e);
                  }}
                >
                  <i className="  fa-solid fa-star"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
