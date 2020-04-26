import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const XAxis = ({ scale, offset=0 }) => {

    const xAxis = d3.axisBottom(scale);

    useEffect(() => {
        const container = d3.select('#x-axis');
        container
            .classed('x axis', true)
            .attr('transform', `translate(0, ${offset})`)
            .call(xAxis);
    })
    //todo: figure out if you really need to 'call' as per above
    return (
        <g id='x-axis' className='axis'>
        </g>
    );
}

export default XAxis;