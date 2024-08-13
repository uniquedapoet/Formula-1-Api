import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DataLoader } from './components/load_data';

function App() {
  return (
    <div className="App">
      <div id='search-container'>
      <DataLoader />
      </div>
    </div>
  );
}

export default App;