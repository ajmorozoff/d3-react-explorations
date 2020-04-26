import React from 'react';
import './App.css';
import { staticTimeSeries } from '../data/sampleTimeSeries';

import Chart from './Chart';
import XYLineChart from './XYLineChart';

function App() {
  return (
    <div className="App">
      <XYLineChart
        width={400}
        height={400}
        dataSet={staticTimeSeries}
        xCallBack={d => d.date}
        yCallBack={d => d.price}
      />
    </div>
  );
}

export default App;
