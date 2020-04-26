import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Axios from 'axios';

import YAxis from './YAxis';
import XAxis from './XAxis';

const XYLineChart = ({ width, height, xCallBack, yCallBack, padding }) => {
    const [yScale, setYScale] = useState(d3.scaleLinear());
    const [xScale, setXScale] = useState(d3.scaleTime());
    const [data, setData] = useState([]);

    const chartHeight = height - padding;
    const chartWidth = width - padding;

    const fetchData = async() => {
        await Axios.get(`https://api.covid19api.com/country/united-states?from=2020-03-19T00:00:00Z&to=2020-03-26T00:00:00Z`);
    }

    const updateScales = (newData) => {
        const newYScale = d3.scaleLinear()
            .domain(d3.extent(newData, yCallBack))
            .range([chartHeight, padding]);

        const newXScale = d3.scaleLinear()
            .domain(d3.extent(newData, xCallBack))
            .range([padding, chartWidth]);
        
        setYScale(newYScale);
        setXScale(newXScale);
    }

    const updateDataPoints = (newData) => {
        const entering = d3.select('#chart')
        .selectAll('circle')
        .data(newData);
    
        entering.enter()
            .append('circle')
            .attr('cx', d => xScale(xCallBack(d)))
            .attr('cy', d => yScale(yCallBack(d)))
            .attr('r', 5)
            .merge(entering);
        
        entering.exit().remove();
    }

    const updateData = (newData) => {
        updateScales(newData);
        updateDataPoints(newData);
    }

    if (!data.length) {
        return (
            <div>
                loading...
                <p>
                Click 'Load Data' to update the dataset
                </p>
                <button
                    onClick={() => fetchData()}
                >
                    Load Data
                </button>
            </div>
        )
    }

    return (
        <div>
            <svg id='chart' width={width} height={height}>
                <XAxis 
                    offset={chartHeight}
                    scale={xScale}
                />
                <YAxis
                    offset={padding}
                    scale={yScale}
                />
            </svg>
        </div>
    )
}

export default XYLineChart;