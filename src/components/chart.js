import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


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
 * Chart
 */
const Chart = ({ queryParams }) => {

  console.log('queryParams', queryParams);
  const { loading, error, data } = useQuery(WEATHER_STATION_DATA_QUERY, {
    variables: queryParams
  });
  
  // on Error
  if (error) return <p>Error :(</p>;

  // on Loading
  if (loading) return <p>Loading items..</p>;

  
  // on Data Available
  return <div>
{queryParams && <p>stationId: {queryParams.stationId}</p>}
{queryParams && <p>year: {queryParams.year}</p>}


    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>

  </div>
}

export default Chart;
