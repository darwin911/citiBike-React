import React from 'react';
import InfoBox from './InfoBox';
import { OriginStations, DestinationStations } from './StationList'

const Results = (props) => {

  return (
    <div>
      {props.origin && <InfoBox 
        origin={props.origin}
        destination={props.destination} />}
      
      {props.originLatLng &&
      <section className="stations">
      <OriginStations
      originLatLng={props.originLatLng}
      stationList={props.stationList}/>
      <DestinationStations
      destinationLatLng={props.destinationLatLng}
      stationList={props.stationList}/>
      </section>}
    </div>
  )
}

export default Results;


