import axios from 'axios';

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
  return resp.data.results[0];
};

export { getStationData, formatAddress };

const mergeStationData = (infoData, statusData) => {
  let mergedStations = [];
  const length = infoData.length > statusData.length ? infoData.length : statusData.length;
  for (let i = 0; i < length; i++) {
    let info = infoData[i];
    let status = statusData[i];
    if (info.station_id === status.station_id) {
      mergedStations.push({ ...info, ...status });
    } else {
      console.log('Did not match', { ...info, ...status });
    }
  }
  return mergedStations;
};

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
