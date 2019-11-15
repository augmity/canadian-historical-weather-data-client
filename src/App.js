import React, { useState } from 'react';

import WeatherStationSelector from './components/weather-station-selector';

import 'bulma/css/bulma.css'
import './App.css';


function App() {

  const [selectedWeatherStation, setSelectedWeatherStation] = useState(null);

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
              <WeatherStationSelector onChange={(selectedItem) => setSelectedWeatherStation(selectedItem)} />
            </div>
          </div>


          <div className="field">
            <label className="label">Year</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
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


        </div>
      </section>
    </>
  );
}

export default App;
