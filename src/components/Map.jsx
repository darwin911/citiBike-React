import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const Map = ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    })

    const style = {
      height: '35vh',
      width: '100vw',
      minHeight: '200px'
    }

    const defaultMap = <Map
        className="map"
        center={this.props.defaultCenter}
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={style}></Map>

    const renderMap = <Map className="map"
        center={(this.props.destination) ? this.props.origin : this.props.defaultCenter}
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={style}>
        <Marker
          coordinates={(this.props.origin) ? this.props.origin : this.props.defaultCenter}>
          <img src="https://i.imgur.com/MK4NUzI.png" alt="Origin" />
        </Marker>

        {(this.props.destination &&
        <Marker 
          coordinates={this.props.destination}>
            <img src="https://i.imgur.com/MK4NUzI.png" alt="Destination" />
        </Marker> 
        )}
      </Map>
    // console.log(this.props.destination)
    return (
      (this.props.destination) ? renderMap : defaultMap
    )
  }
}


export default Map;







// class Map extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       viewport: {
//         width: 400,
//         height: 400,
//         latitude: 37,
//         longitude: -100,
//         zoom: 8
//       }
//     }
//   }

//   render() {

//     const { ...viewport } = this.state;
//     const KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

//     return (
//         <ReactMapGL
//           width={viewport.width}
//           height={viewport.height}
//           latitude={viewport.latitude}
//           longitude={viewport.longitude}
//           zoom={viewport.zoom}
//           mapStyle="mapbox://styles/mapbox/light-v9"
          
//           mapboxApiAccessToken={KEY}
//           onViewportChange={(viewport) =>
//              this.setState({
//                viewport
//                })} />
//       );
//     }
//   }

// export default Map;