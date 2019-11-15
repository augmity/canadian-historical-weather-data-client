import React from 'react';

import 'bulma/css/bulma.css'
import './App.css';

function App() {
  return (
    <>
      <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <h1 class="is-size-5 has-text-weight-semibold">Canadian Historical Weather Data (client)</h1>
        </div>
      </nav>

      <section class="section">
        <div class="container selects">

          <div class="field">
            <label class="label">Station</label>
            <div class="control">
              <div class="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div>


          <div class="field">
            <label class="label">Year</label>
            <div class="control">
              <div class="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div> 

        </div>
      </section>

      <section class="section">
        <div class="container">

          graph

        </div>
      </section>
    </>
  );
}

export default App;
