import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { CalendarChart } from './calendar-chart';


const WEATHER_STATION_DATA_QUERY = gql`
  query WeatherStationData($stationId: Int!, $year: Int!) {
    weatherStationData(stationId: $stationId, year: $year) {
      dateTime
      meanTemp
      totalRain
    }
  }
`;

/*
 * WeatherStationChart
 */
export const WeatherStationChart = ({ queryParams }) => {

  const { loading, error, data } = useQuery(WEATHER_STATION_DATA_QUERY, {
    variables: queryParams
  });

  // on Error
  if (error) return <p>Error :(</p>;

  // on Loading
  if (loading) return <p>Loading chart..</p>;

  // on Data Loaded
  return <div>
    <p className="is-size-6" style={{ marginBottom: '8px'}}>Rain</p>
    <CalendarChart data={data.weatherStationData} dataType="rain" />
    <p className="is-size-6" style={{ marginBottom: '8px', marginTop: '16px' }}>Temperature</p>
    <CalendarChart data={data.weatherStationData} dataType="temperature" />
  </div>
}
