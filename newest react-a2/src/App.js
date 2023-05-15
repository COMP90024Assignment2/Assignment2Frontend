import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BasicLineChart } from './components/BasicLineChart';
import { BasicLineChartButton } from './components/BasicLineChartButton';
import HandwriteTitle from './components/HandwrittenTitle';
import mapImage from './Map.png';






function App() {
  return (
    <div className="App">
      <HandwriteTitle text="Group25" />
      <div className='Map'>
        <img src={mapImage} alt="Map"/></div>
      <BasicLineChart  />
   

      
    </div>

  );
}

export default App;
