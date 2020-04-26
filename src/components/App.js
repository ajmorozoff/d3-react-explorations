import React from 'react';
import './App.css';
import { staticTimeSeries } from '../data/sampleTimeSeries';

import Chart from './Chart';
import XYLineChart from './XYLineChart';

function App() {
  return (
    <div className="App">
      <XYLineChart
        width={800}
        height={400}
        xCallBack={d => d.date.getDate()}
        yCallBack={d => d.price}
        padding={24}
      />
    </div>
  );
}

export default App;
