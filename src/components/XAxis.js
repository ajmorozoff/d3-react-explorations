import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const XAxis = ({ scale, offset=0 }) => {

    useEffect(() => {
        if (scale) {
            const xAxis = d3.axisBottom(scale);
            const container = d3.select('#x-axis');
            container
                .attr('transform', `translate(0, ${offset})`)
                .call(xAxis);
        }
    })
    return (
        <g id='x-axis' className='axis'>
        </g>
    );
}

export default XAxis;