import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const XAxis = ({ width, dataSet, xCallBack, ticks=4 }) => {

    const x = d3.scaleLinear()
        .domain(d3.extent(dataSet, xCallBack))
        .range([0, width]);

    const xAxis = d3.axisBottom(x)
        .ticks(dataSet.length)

    useEffect(() => {
        const container = d3.select('#x-axis');
        container.call(xAxis);
    })
    //todo: figure out if you really need to 'call' as per above
    return (
        <g id='x-axis'>
        </g>
    );
}

export default XAxis;