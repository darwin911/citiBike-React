import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";



class Map extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const Map = ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    })
    console.log(this.props.defaultCenter)
    return (
      <Map
      zoom={this.props.zoom}
      center={this.props.defaultCenter}
      style="mapbox://styles/mapbox/streets-v10"
      containerStyle={{
        height: "50vh",
        width: "100vw"
      }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
      </Map>
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