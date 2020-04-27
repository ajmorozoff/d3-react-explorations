import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';

import XYLineChart from './XYLineChart';

const App = () => {
  const [data, setData] = useState([]);

  const fetchData = async() => {
    const newData = (await Axios.get(`https://api.covid19api.com/total/country/united-states/status/confirmed?from=2020-04-19T00:00:00Z&to=2020-04-26T00:00:00Z`)).data; 
    setData(newData);
  }

  return (
    <div className="App">
      <XYLineChart
        width={800}
        height={400}
        fX={d => new Date(d.Date)}
        fY={d => d.Cases}
        data={data}
        padding={24}
      />
      <button
        onClick={fetchData}
      >
        Fetch Data
      </button>
    </div>
  );
}

export default App;
