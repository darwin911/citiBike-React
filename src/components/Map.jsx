import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      center: [-73.989885, 40.73997],
      bearing: [30]
    };
  }

  render() {
    const { center, bearing } = this.state;
    const { originLatLng, destinationLatLng } = this.props;

    const Map = ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      logoPosition: "top-left"
    });

    const style = {
      height: "50vmin",
      minHeight: "200px",
      width: "auto"
    };

    return (
      <Map
        className={"map"}
        bearing={bearing}
        center={destinationLatLng ? originLatLng : center}
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={style}
      >
        {originLatLng && (
          <>
            <Marker coordinates={originLatLng}>
              <img
                src="https://i.imgur.com/MK4NUzI.png"
                width="20px"
                alt="Origin"
              />
            </Marker>
            <Marker coordinates={destinationLatLng}>
              <img
                src="https://i.imgur.com/MK4NUzI.png"
                width="20px"
                alt="Destination"
              />
            </Marker>
          </>
        )}
      </Map>
    );
  }
}

export default Map;
