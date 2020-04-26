import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const YAxis = ({ scale, dataSet, offset=0 }) => {

    const yAxis = d3.axisRight(scale)
        .ticks(dataSet.length);

    useEffect(() => {
        const container = d3.select('#y-axis');
        container
            .classed('y axis', true)
            .attr('transform', `translate(${offset}, 0)`)
            .call(yAxis);
    })

    //todo: figure out how to generate a unique id per component
    return (
        <g id='y-axis' className='axis'>
        </g>
    );
}

export default YAxis;