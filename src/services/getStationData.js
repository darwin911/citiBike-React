import axios from 'axios';

const URL = 'https://cors.io/?http://feeds.citibikenyc.com/stations/stations.json';

const getStationData = async () => {
  const resp = await axios(`${URL}`);
  return resp.data.stationBeanList
}

export default getStationData;