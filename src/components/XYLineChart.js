import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import YAxis from './YAxis';
import XAxis from './XAxis';

const XYLineChart = ({ width, height, dataSet, xCallBack, yCallBack, padding }) => {
    const chartHeight = height - padding;
    const chartWidth = width - padding;

    let yScale = d3.scaleLinear()
    .domain(d3.extent(dataSet, yCallBack))
    .range([chartHeight, padding]);

    let xScale = d3.scaleLinear()
    .domain(d3.extent(dataSet, xCallBack))
    .range([padding, chartWidth]);


    const updateScales = (newData) => {
        yScale = d3.scaleLinear()
            .domain(d3.extent(newData, yCallBack))
            .range([chartHeight, padding]);

        xScale = d3.scaleLinear()
            .domain(d3.extent(newData, xCallBack))
            .range([padding, chartWidth]);
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

    return (
        <div>
            <svg id='chart' width={width} height={height}>
                <XAxis 
                    offset={chartHeight}
                    scale={xScale}
                    dataSet={dataSet}
                />
                <YAxis
                    offset={padding}
                    scale={yScale}
                    dataSet={dataSet}
                />
            </svg>
            <p>
                Click 'Load Data' to update the dataset
            </p>
            <button
                onClick={() => updateData(dataSet)}
            >
                Load Data
            </button>
        </div>
    )
}

export default XYLineChart;