import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      center: [-122.418701, 37.769047],
      bearing: [0]
    };
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) =>
          this.setState({ center: [longitude, latitude] }),
        error => console.error(error)
      );
    } else {
      /* geolocation IS NOT available */
      this.setState({ center: [-122.418701, 37.769047] });
    }
  }

  render() {
    const { center, bearing } = this.state;
    const { origin, destination } = this.props;

    const Map = new ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      logoPosition: "top-left",
      minZoom: 11,
      maxZoom: 15
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
        center={origin[0] ? origin : center}
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v10?optimize=true"
        containerStyle={style}
      >
        {origin[0] && (
          <>
            <Marker coordinates={origin}>
              <img
                src="https://i.imgur.com/MK4NUzI.png"
                width="20px"
                alt="Origin"
              />
            </Marker>
            <Marker coordinates={destination}>
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
