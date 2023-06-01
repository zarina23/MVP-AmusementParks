import React, { useState, useEffect } from "react";

const REACT_APP_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

//ADDED BY ZARINA

import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./Map.css";
const { VITE_GOOGLE_API_KEY } = import.meta.env;

//

export default function Map({ parks, selectedPark }) {
  //ADDED BY ZARINA

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  const markers = [
    { lat: 18.5204, lng: 73.8567 },
    { lat: 18.5314, lng: 73.8446 },
    { lat: 18.5642, lng: 73.7769 },
  ];

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  //

  const [error, setError] = useState("");

  const parkNames = parks.map((park) => park.name);

  useEffect(() => {
    setError("");
  }, [parkNames]);

  return (
    <div>
      {/* ADDED BY ZARINA */}

      <div className="App">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap mapContainerClassName="map-container" onLoad={onLoad}>
            {markers.map(({ lat, lng }, index) => (
              <MarkerF position={{ lat, lng }} key={index} />
            ))}
          </GoogleMap>
        )}
      </div>

      {/* END */}

      {parks.length > 0 ? (
        <iframe
          title="Google Map"
          width="100%"
          height="250"
          frameBorder="3"
          style={{ border: 3 }}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/search?key=${REACT_APP_GOOGLE_API_KEY}&q=${
            selectedPark ? selectedPark.name : parkNames
          }`}
          allowFullScreen
        ></iframe>
      ) : (
        <div>
          {error && <div className="error-message">{"No parks available"}</div>}
        </div>
      )}
    </div>
  );
}
