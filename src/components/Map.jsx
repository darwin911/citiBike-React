import React, { Component } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

class Map extends Component {
  mapEvent(e) {
    console.log("loading");
  }

  render() {
    const { center, originLatLng, destinationLatLng } = this.props;
    const Map = ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      logoPosition: "top-left"
    });

    const style = {
      height: "50vmin",
      minHeight: "200px",
      width: "auto"
    };

    const defaultMap = (
      <Map
        className="map"
        bearing={[30]}
        center={center}
        onRender={e => this.mapEvent(e)}
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={style}
      />
    );

    const renderMap = (
      <Map
        className="map"
        bearing={[30]}
        center={destinationLatLng ? originLatLng : center}
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={style}
      >
        <Marker coordinates={originLatLng ? originLatLng : center}>
          <img src="https://i.imgur.com/MK4NUzI.png" alt="Origin" />
        </Marker>

        {destinationLatLng && (
          <Marker coordinates={destinationLatLng}>
            <img src="https://i.imgur.com/MK4NUzI.png" alt="Destination" />
          </Marker>
        )}
      </Map>
    );

    return destinationLatLng ? renderMap : defaultMap;
  }
}

export default Map;
