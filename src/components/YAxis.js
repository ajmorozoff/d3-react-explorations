import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const YAxis = ({ scale, offset=0 }) => {

    useEffect(() => {
        if (scale) {
            const yAxis = d3.axisRight(scale);
            const container = d3.select('#y-axis');
            container
                .attr('transform', `translate(${offset}, 0)`)
                .call(yAxis);
        }
    })

    return (
        <g id='y-axis' className='axis'>
        </g>
    );
}

export default YAxis;