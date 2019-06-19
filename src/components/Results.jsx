import React from "react";
import InfoBox from "./InfoBox";
import StationList from "./StationList";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originStations: [],
      destinationStations: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.origin.lnglat[0] !== prevProps.origin.lnglat[0]) {
      const { origin, destination, radius, stationList } = this.props;
      this.setState({
        originStations: stationList.filter(
          stn =>
            Math.abs(stn.latitude - origin.lnglat[1]) <= radius &&
            Math.abs(stn.longitude - origin.lnglat[0]) <= radius
        ),
        destinationStations: stationList.filter(
          stn =>
            Math.abs(stn.latitude - destination.lnglat[1]) <= radius &&
            Math.abs(stn.longitude - destination.lnglat[0]) <= radius
        )
      });
    }
  }

  render() {
    const { origin, destination } = this.props;

    return (
      <section className="results">
        <InfoBox origin={origin.address} destination={destination.address} />

        {origin.lnglat[0] && (
          <section className="stations">
            <StationList
              type="origin"
              stationList={this.state.originStations}
            />
            <StationList
              type="destination"
              stationList={this.state.destinationStations}
            />
          </section>
        )}
      </section>
    );
  }
}

export default Results;
