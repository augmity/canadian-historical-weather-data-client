import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const WEATHER_STATIONS_QUERY = gql`
  {
    weatherStations {
      stationId
      name
      firstYear
      lastYear
    }
  }
`;


/*
 * WeatherStationSelector
 */
const WeatherStationSelector = ({ onChange }) => {
  const { loading, error, data } = useQuery(WEATHER_STATIONS_QUERY);
  
  // on Error
  if (error) return <p>Error :(</p>;

  // on Loading
  if (loading) return <div className="select is-loading">
    <select disabled>
      <option>Loading items..</option>
    </select>
  </div>;

  
  // on Data Available
  const change = (event) => {
    if (onChange) {
      const selectedStationId = parseInt(event.target.value);
      const selectedItem = data.weatherStations.find(item => item.stationId === selectedStationId);
      onChange(selectedItem);
    }
  };

  return <div className="select">
    <select onChange={change}>
      <option value="-1">(Select Weather Station)</option>
      {data.weatherStations.map(({ stationId, name }) => (
        <option key={stationId} value={stationId}>{name}</option>
      ))}
    </select>
  </div>;
}

export default WeatherStationSelector;
