import React, { useState } from 'react';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'

import WeatherStationSelector from './components/weather-station-selector';
import YearSelector from './components/year-selector';
import Chart from './components/chart';

import 'bulma/css/bulma.css'
import './App.css';


function App() {

  const [selectedWeatherStation, setSelectedWeatherStation] = useState(null);
  const [yearsRange, setYearsRange] = useState(null);
  const [chartParams, setChartParams] = useState(null);
  const [position, setPosition] = useState([49.853959,-97.292307]);
  const [marker, setMarker] = useState(null);


  const weatherStationChange = (selectedItem) => {
    setSelectedWeatherStation(selectedItem);
    setYearsRange({
      from: selectedItem.firstYear,
      to: selectedItem.lastYear,
    });
    setChartParams(null);

    // Map stuff
    const weatherStationPosition = [selectedItem.latitude / 10000000, selectedItem.longitude / 10000000];
    setMarker({
      text: selectedItem.name,
      position: weatherStationPosition
    });
    setPosition(weatherStationPosition);
  }

  const yearChange = (year) => {
    setChartParams({
      stationId: selectedWeatherStation.stationId,
      year: year
    });
  }

  return (
    <>
      <LeafletMap center={position} zoom={5}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {marker && <Marker position={marker.position}>
          <Popup>{marker.text}</Popup>
        </Marker>}
      </LeafletMap>


      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand container">
          <h1 className="is-size-5 has-text-weight-semibold">Canadian Historical Weather Data</h1>
        </div>
      </nav>

      <section className="section">
        <div className="container selects">

          <div className="field">
            <label className="label">Weather Station</label>
            <div className="control">              
              <WeatherStationSelector onChange={weatherStationChange} />
            </div>
            {yearsRange &&
              <p className="help">Data available for years {yearsRange.from} - {yearsRange.to}</p>
            }
          </div>

          {yearsRange && 
            <div className="field">
              <label className="label">Year</label>
              <div className="control">
                <YearSelector range={yearsRange} onChange={yearChange} />
              </div>
            </div>
          }

        </div>
      </section>

      <section className="section">
        <div className="container">

          <p>
            {JSON.stringify(selectedWeatherStation, null, 2)}
          </p>

          {chartParams && <Chart queryParams={chartParams} />}
        </div>
      </section>
    </>
  );
}

export default App;
