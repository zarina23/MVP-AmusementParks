import { useRef } from "react";
import {
  StandaloneSearchBox,
  LoadScript,
  useGoogleMap,
} from "@react-google-maps/api";

const PlaceComponent = () => {
  const inputRef = useRef();
//   const map = useGoogleMap();
  const { VITE_GOOGLE_API_KEY } = import.meta.env;

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  function initPlaces(ref) {
    inputRef.current = ref;
    // console.log(window.google.maps.places);
    // const placesService = window.google.maps.places.PlacesServices(map);
    // placesService.textSearch({ query: "barcelona" }, (suggestions) => {
    //   console.log(suggestions);
    // });
  }

  return (
    <LoadScript googleMapsApiKey={VITE_GOOGLE_API_KEY} libraries={["places"]}>
      <StandaloneSearchBox
        onLoad={(ref) => initPlaces(ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Enter Location"
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default PlaceComponent;
