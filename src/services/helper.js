import axios from 'axios';
import { mergeStationData } from '../util/mergeStationData';

const GBFS = {
  STATION_INFO: 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json',
  STATION_STATUS: 'https://gbfs.citibikenyc.com/gbfs/en/station_status.json',
};

const getStationData = async () => {
  try {
    const stationInfo = await axios.get(GBFS.STATION_INFO);
    const stationStatus = await axios.get(GBFS.STATION_STATUS);
    const mergedStationData = mergeStationData(
      stationInfo.data.data.stations,
      stationStatus.data.data.stations
    );
    return mergedStationData;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const formatAddress = async (location) => {
  const resp = await axios(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&components=country:US&key=${process.env.REACT_APP_API_KEY}`
  );
  console.log(resp.data);
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
