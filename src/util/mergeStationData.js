export const mergeStationData = (infoData, statusData) => {
  console.time();
  let mergedStations = [];
  const length =
    infoData.length > statusData.length ? infoData.length : statusData.length;
  console.log('merging', infoData.length + statusData.length);
  for (let i = 0; i < length; i++) {
    let info = infoData[i];
    let status = statusData[i];
    if (info.station_id === status.station_id) {
      mergedStations.push({ ...info, ...status });
    } else {
      console.log('Did not match', { ...info, ...status });
    }
  }
  console.timeEnd();
  console.log(mergedStations.length);
  return mergedStations;
};
