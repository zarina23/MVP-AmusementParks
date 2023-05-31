import React, { useState, useEffect } from "react";

const REACT_APP_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export default function Map({ parks, selectedPark }) {
  const [error, setError] = useState("");

  const parkNames = parks.map((park) => park.name);

  useEffect(() => {
    setError("");
  }, [parkNames]);

  return (
    <div>
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
