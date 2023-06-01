import React, { useState, useEffect } from "react";

const REACT_APP_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

//ADDED BY ZARINA

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
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
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10}
          >
            <Marker
              position={{ lat: 18.52043, lng: 73.856743 }}
              icon={"http://maps.google.com/mapfiles/ms/icons/purple-dot.png"}
            />
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
