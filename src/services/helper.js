import axios from "axios";

const KEY = process.env.REACT_APP_API_KEY;
const URL =
  "https://cors-anywhere.herokuapp.com/https://feeds.citibikenyc.com/stations/stations.json";

const getStationData = async () => {
  const resp = await axios(`${URL}`);
  return resp.data.stationBeanList.filter(
    station => station.statusValue === "In Service"
  );
};

const formatAddress = async location => {
  const resp = await axios(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&components=country:US&key=${KEY}`
  );
  return resp.data.results[0];
};

export { getStationData, formatAddress };
