import React, { useState, useEffect } from "react";

import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindowF,
} from "@react-google-maps/api";

import "./GoogleMapComponent.css";
const { VITE_GOOGLE_API_KEY } = import.meta.env;

//searchResultsList is the main state that hold the logic, it is passed as a prop from the Home page
export default function GoogleMapComponent({
  changeSearchResultsList,
  searchResultsList,
}) {
  //MAP
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  //these markers are used for the boundaries of the map on initial load of the page, see onLoad function
  const [markers, setMarkers] = useState([
    { lat: 41.3874, lng: 2.1686 }, //Barcelona
    { lat: 41.3574, lng: 2.0707 },
    { lat: 41.363, lng: 2.1651 },
    { lat: 41.447, lng: 2.245 },
  ]);

  //these states are used for onClick event on markers
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

  //other states that are needed
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
    service.textSearch({ query: `amusement parks ${input}` }, (suggestions) => {
      console.log(suggestions);
      const filteredSuggestions = suggestions.filter((el) =>
        //Google Places API has a property "type"
        el.types.includes("amusement_park")
      );

      console.log(filteredSuggestions);

      //this is setting searchResultsList state passed as a prop from Home page (will use this state for markers on the map, as well as for rendering the list of found parks on the page)
      changeSearchResultsList(filteredSuggestions);
    });
  };

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);

    const placesService = new window.google.maps.places.PlacesService(map);
    console.log(placesService);

    setService(placesService);
  };

  const handleMarkerClick = (id, name, lat, lng, address) => {
    // mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address, name });
    setIsOpen(true);
  };

  //

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-3 mb-3 input-group">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search by location or park name"
          className="form-control"
        />
        <button className="search-button">Search</button>
      </form>

      <div className="map-container-wrap">
        <div className="App">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="map-container"
              onLoad={onLoad}
              center={{
                lat: searchResultsList[0]?.geometry.location.lat(),
                lng: searchResultsList[0]?.geometry.location.lng(),
              }}
            >
              {searchResultsList?.map((locationDetails) => (
                <MarkerF
                  position={{
                    lat: locationDetails.geometry.location.lat(),
                    lng: locationDetails.geometry.location.lng(),
                  }}
                  onClick={() => {
                    handleMarkerClick(
                      locationDetails.place_id,
                      locationDetails.name,
                      locationDetails.geometry.location.lat(),
                      locationDetails.geometry.location.lng(),
                      locationDetails.formatted_address
                    );
                  }}
                  key={locationDetails.place_id}
                  icon={"http://maps.google.com/mapfiles/ms/icons/pink-dot.png"}
                >
                  {isOpen &&
                    infoWindowData?.id === locationDetails.place_id && (
                      <InfoWindowF
                        onCloseClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        <div>
                          <p className="infoWindowTitle">
                            {infoWindowData.name}
                          </p>
                          <p className="infoWindowData">
                            {infoWindowData.name} {infoWindowData.address}
                          </p>
                        </div>
                      </InfoWindowF>
                    )}
                </MarkerF>
              ))}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
}
