import React from 'react';
import logo from './logo.svg';
import './App.css';
import Results from './components/results';
import Drivers from './components/drivers';
import Circuits from './components/circuits';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Formula 1 Data</h1>
      </header>
    <div className='load-data-container'>
      <div className='results-container'>
      <Results />
      </div>
      <div className='drivers-container'>
      <Drivers />
      </div>
      <div className='circuits-container'>
      <Circuits />
      </div>
    </div>
    </div>
  );
}

export default App;