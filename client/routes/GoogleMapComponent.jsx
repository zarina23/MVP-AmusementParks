import React, { useState, useEffect } from "react";

// const REACT_APP_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

//ADDED BY ZARINA

import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useMemo } from "react";
import "./Map.css";
const { VITE_GOOGLE_API_KEY } = import.meta.env;

//

export default function GoogleMapComponent() {
  //ADDED BY ZARINA

  //MAP
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  // const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  const [markers, setMarkers] = useState([
    { lat: 18.5204, lng: 73.8567 },
    { lat: 18.5314, lng: 73.8446 },
    { lat: 18.5642, lng: 73.7769 },
  ]);

  const [input, setInput] = useState("");
  const [service, setService] = useState("");

  const handleChange = (event) => {
    setInput(`${event.target.value}`);
    console.log(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search();
  };

  const search = () => {
    service.textSearch({ query: input }, (suggestions) => {
      console.log(suggestions);
    });
  };

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);

    console.log(window.google.maps.places);

    const placesService = new window.google.maps.places.PlacesService(map);
    console.log(placesService);
    setService(placesService);
    console.log(service);
  };

  //

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-3 mb-3">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search for amusement parks"
        />
        <button>Search</button>
      </form>

      <div className="App">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap mapContainerClassName="map-container" onLoad={onLoad}>
            {markers?.map(({ lat, lng }, index) => (
              <MarkerF position={{ lat, lng }} key={index} />
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
