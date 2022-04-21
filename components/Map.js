import { LocationMarkerIcon } from "@heroicons/react/solid";
import { getCenter } from "geolib";
import React, { useState } from "react";
import ReactMapGL, { Marker, Popup, WebMercatorViewport } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ hotelMap, hotelName }) => {
  const lat = hotelMap.ne_lat;
  const long = hotelMap.ne_long;

  // const center = getCenter([lat, long]);
  //   console.log(center);

  const [selectedPin, setSelectedPin] = useState({});
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: long,
    zoom: 8,
  });

  return (
    <ReactMapGL
      className="rounded-lg"
      {...viewport}
      width={1200}
      height={550}
      mapStyle="mapbox://styles/sourab054/ckybkezeo8cad14nu4kwyoruv"
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <div>
        {/* {hotelName} */}
        <Marker longitude={long} latitude={lat}>
          <LocationMarkerIcon
            // onMouseOver={() => setSelectedPin(result)}
            className="h-8 text-primary animate-bounce"
          />
        </Marker>

        <Popup
          // onClose={() => setSelectedPin({})}
          closeOnClick={true}
          latitude={lat}
          longitude={long}
          className="text-dark"
        >
          {hotelName}
        </Popup>
      </div>
    </ReactMapGL>
  );
};

export default Map;
