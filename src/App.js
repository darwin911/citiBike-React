import React, { Component } from 'react';
import './App.css';
import getStationData from './services/getStationData';
import BikeMap from './components/BikeMap';
import StationList from './components/StationList.jsx';

class App extends Component {
  constructor() {
    super()
    this.state = {
      stations: []
    }
    this.handleChange = this.handleChange.bind(this.handleChange)
  }

  async componentDidMount() {
    const stations = await getStationData()
    this.setState({
      stations, 
      isMarkerShown: false
    })
  }

  handleChange() {

  }

  render() {
    const KEY = process.env.REACT_APP_API_KEY
    return (
      <div className="App">
        <header>
          <h1 className="title">Citi<span>Bike</span></h1>
        </header>
        <BikeMap
          onChange={this.handleChange}
          isMarkerShown={this.state.isMarkerShown}
          googleMapURL={
            `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`
          } loadingElement={
            <div className="loading-element"/>
          } containerElement={
            <div className="container-element"/>
          } mapElement={
            <div className="map-element" />
          }
        />
          <StationList stationList={this.state.stations}/>
      </div>
    );
  }
}

export default App;
