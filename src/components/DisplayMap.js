import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from "react";
import { Container, Paper, Box } from "@mui/material";
import { InfoWindow } from "@react-google-maps/api";

function DisplayMap(location) {
  // console.log(location.location.length);
  let center;
  // const [center, setCenter] = useState({ lat: 3.139003, lng: 101.686855 });
  const zoom = 10;
  let a = false;
  if (location.location.length == 1) {
    center = location.location[0];
  } else center = { lat: 3.139003, lng: 101.686855 };
  // setCenter({ lat: location.location.lat, lng: location.location.lng });
  const [positions, setPositions] = useState(location.location);
  console.log(
    "location: " + location.location.lat + " " + location.location.lng
  );
  console.log(location);
  // setPositions(location);
  const render = (status) => {
    switch (status) {
      case "LOADING":
        return <h1>LOADING</h1>;
      case "FAILURE":
        return <h1>ERROR</h1>;
      default:
        return null;
    }
  };

  // const center = { lat: 3.139003, lng: 101.686855 };

  // const positions = [
  //   // center,
  //   { lat: 3.320312, lng: 101.544945 },
  //   { lat: 3.0941, lng: 101.5475 },
  // ];

  // const infoWindow = new google.maps.InfoWindow({});

  function Marker({ position, map }) {
    // setCenter({ lat: position.lat, lng: position.lng });
    // if (a) setCenter({ lat: position.lat, lng: position.lng });
    // console.log(center);
    const [marker, setMarker] = useState(null);
    useEffect(() => {
      setMarker(new window.google.maps.Marker({}));
    }, []);
    if (marker) {
      marker.setMap(map);
      console.log(position);
      marker.setPosition(position);
      marker.addListener("mouseover", () => {});
      marker.addListener("mouseout", () => {});
    }
    return null;
  }

  function Map({ center, zoom, children }) {
    console.log(center);
    const [map, setMap] = useState(null);
    const ref = useRef(null);
    const style = { height: 600 };
    useEffect(() => {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
        })
      );
    }, [ref]);
    return (
      <div ref={ref} id="map" style={style}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { map })
        )}
      </div>
    );
  }

  return (
    <Box pl={2} width={1100}>
      <Paper elevation={10}>
        <Wrapper
          apiKey={"AIzaSyBy9w5e82ZI3LKIJS8mr2tQcgdQt4jMjJ4"}
          render={render}
        >
          <Map center={center} zoom={zoom}>
            {location.location.map((pos, i) => (
              <Marker position={pos} key={i} />
            ))}
          </Map>
        </Wrapper>
      </Paper>
    </Box>
  );
}

export default DisplayMap;
