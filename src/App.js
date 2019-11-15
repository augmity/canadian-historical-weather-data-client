import React, { useState } from 'react';

import WeatherStationSelector from './components/weather-station-selector';
import YearSelector from './components/year-selector';

import 'bulma/css/bulma.css'
import './App.css';


function App() {

  const [selectedWeatherStation, setSelectedWeatherStation] = useState(null);
  const [yearsRange, setYearsRange] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const weatherStationChange = (selectedItem) => {
    setSelectedWeatherStation(selectedItem);
    setYearsRange({
      from: selectedItem.firstYear,
      to: selectedItem.lastYear,
    });
    setSelectedYear(null);
  }

  const yearChange = (year) => {
    setSelectedYear(year);
  }

  return (
    <>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h1 className="is-size-5 has-text-weight-semibold">Canadian Historical Weather Data (client)</h1>
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

          <div className="field">
            <label className="label">Year</label>
            <div className="control">
              <YearSelector range={yearsRange} onChange={yearChange} />
            </div>
          </div> 

        </div>
      </section>

      <section className="section">
        <div className="container">

          graph

          <p>
            {JSON.stringify(selectedWeatherStation, null, 2)}
          </p>
          <p>
            {selectedYear}
          </p>


        </div>
      </section>
    </>
  );
}

export default App;
