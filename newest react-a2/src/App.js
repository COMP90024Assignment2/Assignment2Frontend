import './App.css';
import React from 'react';
import HandwriteTitle from './components/HandwrittenTitle';
import mapImage from './Map.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TwitterBarChart from './components/TwitterBarChart';
import SUDOBarChart from './components/SUDOBarChart';
import  ScatterPlotButton  from './components/ScatterPlotButton';
import LineChartComponent from './components/LineChartComponent';


function App() {
  
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chart">Chart</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {

  return (
    <>
      <HandwriteTitle text="Group25 Exploring Economics Influences on Homelessness – Rental Prices, Mortgage Payment and Family Income" />
      <div className="Map">
        <img src={mapImage} alt="Map" />
      </div>
      <div id="content">
         <h4>The complexity of homelessness is deeply intertwined with economic factors such as housing affordability - including rental prices and mortgage payments - and family income. It is important to unveil the correlation and shed light on their interplay in the homelessness issue. And Twitter offers a wealth of diverse perspectives from individuals, organizations, and institutions, making it an invaluable resource for research. So this study aims to decipher these relationships from the twitter data within different areas in Australia and also compare the results to other official data.</h4>
      </div>
    </>
  );
}

function Chart() {
  return(
  <>   
      <div className='Chart'>
      <TwitterBarChart/>
      <SUDOBarChart/>
      </div>

      <ScatterPlotButton />
      <LineChartComponent />
    </>
  );
}

export default App;
