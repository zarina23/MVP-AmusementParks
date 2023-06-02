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

export default function GoogleMapComponent({ parks, selectedPark }) {
  //ADDED BY ZARINA

  //MAP
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  // const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  const markers = [
    { lat: 18.5204, lng: 73.8567 },
    { lat: 18.5314, lng: 73.8446 },
    { lat: 18.5642, lng: 73.7769 },
  ];

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);

    console.log(window.google.maps.places);

    const placesService = new window.google.maps.places.PlacesService(map);
    console.log(placesService);
    placesService.textSearch({ query: "barcelona" }, (suggestions) => {
      console.log(suggestions);
    });
  };

  //

  return (
    <div>
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
