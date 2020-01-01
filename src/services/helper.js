import axios from 'axios';

const KEY = process.env.REACT_APP_API_KEY;
const URL =
  'https://cors-anywhere.herokuapp.com/https://feeds.citibikenyc.com/stations/stations.json';

const getStationData = async () => {
  const resp = await axios(`${URL}`);
  return resp.data.stationBeanList.filter(
    station => station.statusValue === 'In Service'
  );
};

const formatAddress = async location => {
  const resp = await axios(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&components=country:US&key=${KEY}`
  );
  return resp.data.results[0];
};

export { getStationData, formatAddress };

// TODO
// http://gbfs.citibikenyc.com/gbfs/gbfs.json
// "feeds": [
// {
//   "name": "station_status",
//   "url": "https://gbfs.citibikenyc.com/gbfs/en/station_status.json"
//   },
//   {
//   "name": "system_information",
//   "url": "https://gbfs.citibikenyc.com/gbfs/en/system_information.json"
//   },
//   {
//   "name": "system_alerts",
//   "url": "https://gbfs.citibikenyc.com/gbfs/en/system_alerts.json"
//   },
//   {
//   "name": "system_regions",
//   "url": "https://gbfs.citibikenyc.com/gbfs/en/system_regions.json"
//   },
//   {
//   "name": "station_information",
//   "url": "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
//   }
//   ]
