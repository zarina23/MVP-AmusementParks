import React from "react";

const REACT_APP_GOOGLE_API_KEY = "AIzaSyBefviJmnnwQoqZnHlXG-895nGCkY46RYw";

// pass through props the newPark

export default function Map({ parks }) {
  const parkNames = parks.map((park) => park.name);

  return (
    <div>
      {parks.length > 0 ? (
        <iframe
          title="Google Map"
          width="100%"
          height="250"
          frameBorder="0"
          style={{ border: 3 }}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/search?key=${REACT_APP_GOOGLE_API_KEY}&q=${encodeURIComponent(
            parkNames
          )}`}
          allowFullScreen
        ></iframe>
      ) : (
        <p>No parks available</p>
      )}
    </div>
  );
}
