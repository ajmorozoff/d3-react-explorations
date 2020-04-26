import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import YAxis from './YAxis';
import XAxis from './XAxis';

const XYLineChart = ({ width, height, dataSet, xCallBack, yCallBack }) => {

    return (
        <svg width={width} height={height}>
            <XAxis 
                width={width}
                dataSet={dataSet}
                xCallBack={xCallBack}
            />
            <YAxis
                height={height}
                dataSet={dataSet}
                yCallBack={yCallBack}
            />
        </svg>
    )
}

export default XYLineChart;