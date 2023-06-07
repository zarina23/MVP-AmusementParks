import React, { useState, useEffect } from "react";
import Map from "./Map";
import GoogleMapComponent from "./GoogleMapComponent";

export default function Home() {
  const [parks, setParks] = useState([]);
  const [newPark, setNewPark] = useState("");
  const [error, setError] = useState("");
  const [selectedPark, setSelectedPark] = useState(null);

  const [searchResultsList, setSearchResultsList] = useState([]); //this is the main state used for the logic of the app
  const [highlightedPark, setHighlightedPark] = useState("");

  const [
    selectedToShowPhotoAndOpeningHours,
    setSelectedToShowPhotoAndOpeningHours,
  ] = useState();

  const changeSearchResultsList = (newSearchResultsList) => {
    setSearchResultsList(newSearchResultsList);
  };

  //ADD the park to my wishlist
  async function addToWishlist(e, park) {
    const body = {
      id: park.place_id,
      name: park.name,
      rating: park.rating,
      address: park.formatted_address,
      image_url: park.photos[0].getUrl(),
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
      } else {
        alert(`${park.name} has been added to your wishlist!`);
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

  const changeHighlightedPark = (locationDetails) => {
    console.log(locationDetails);
    setHighlightedPark(locationDetails);
  };

  const showPhotoAndOpeningHours = (id) => {
    console.log(id);
    !selectedToShowPhotoAndOpeningHours?.[id]
      ? setSelectedToShowPhotoAndOpeningHours({
          [id]: true,
        })
      : setSelectedToShowPhotoAndOpeningHours({
          [id]: false,
        });
  };

  return (
    <div className="container">
      <h3 className="text-center">My Theme Park Database</h3>

      {error && <div className="error-message">{error}</div>}

      <GoogleMapComponent
        changeSearchResultsList={changeSearchResultsList}
        searchResultsList={searchResultsList}
        highlightedPark={highlightedPark}
        setHighlightedPark={setHighlightedPark}
      />

      <div className="list-group m-5">
        {searchResultsList && (
          <>
            <h4 className="text-center mb-3">
              Check out these parks based on your search
            </h4>
            {searchResultsList?.map((locationDetails) => (
              <div key={locationDetails.place_id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <p
                    onClick={() => changeHighlightedPark(locationDetails)}
                    className={
                      selectedToShowPhotoAndOpeningHours ? "fw-bold" : ""
                    }
                  >
                    {locationDetails.name}
                  </p>

                  <div>
                    <div className="btn btn-dark btn-sm rating">
                      Rating {locationDetails.rating}
                    </div>

                    <button
                      className=" btn btn-outline-success btn-sm"
                      onClick={() => changeHighlightedPark(locationDetails)}
                    >
                      <i className=" fa-solid fa-location-dot"></i>
                    </button>

                    <button
                      className=" btn btn-outline-info btn-sm"
                      onClick={() =>
                        showPhotoAndOpeningHours(locationDetails.place_id)
                      }
                    >
                      <i className="  fa-solid fa-circle-info"></i>
                    </button>
                    <button
                      className=" btn btn-outline-warning btn-sm"
                      type="submit"
                      onClick={(e) => {
                        addToWishlist(e, locationDetails);
                        disableButton(e);
                      }}
                    >
                      <i className="fa-solid fa-star"></i>
                    </button>
                  </div>
                </div>

                <div>
                  {selectedToShowPhotoAndOpeningHours?.[
                    locationDetails.place_id
                  ] &&
                    locationDetails?.photos && (
                      <div className="d-flex justify-content-end mt-2 mb-2">
                        <img
                          src={locationDetails?.photos?.[0]?.getUrl()}
                          alt=""
                          height="250px"
                        />
                      </div>
                    )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
