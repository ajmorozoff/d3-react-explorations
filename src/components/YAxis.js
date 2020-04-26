import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const YAxis = ({ height, dataSet, yCallBack }) => {

    let range = d3.extent(dataSet, yCallBack);

    const y = d3.scaleLinear()
    //flip the range because y is top-down
    .domain(range[1], range[0])
    .range([height, 0]);

    const yAxis = d3.axisLeft(y)
        .ticks(dataSet.length)

    useEffect(() => {
        const container = d3.select('#y-axis');
        container.call(yAxis);
    })

    //todo: figure out if you really need to 'call' as per above
    return (
        <g id='y-axis'>
        </g>
    );
}

export default YAxis;