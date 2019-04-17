import React, { Component } from 'react';
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

class Map extends Component {

  render() {

    const Map = ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
    })

    const style = {
      height: '50vmin',
      minHeight: '200px',
      width: 'auto',
    }

    const defaultMap =
      <Map className="map"
        bearing={this.props.bearing}
        center={this.props.center}
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={style}></Map>

    const renderMap =
      <Map className="map"
        bearing={this.props.bearing}
        center={(this.props.destination) ? this.props.origin : this.props.center}
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={style}>
        <Marker
          coordinates={(this.props.origin) ? this.props.origin : this.props.center}>
          <img src="https://i.imgur.com/MK4NUzI.png" alt="Origin" />
        </Marker>

        {(this.props.destination &&
          <Marker
            coordinates={this.props.destination}>
            <img src="https://i.imgur.com/MK4NUzI.png" alt="Destination" />
          </Marker>
        )}
      </Map>

    return (
      (this.props.destination) ? renderMap : defaultMap
    )
  }
}

export default Map;