import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import YAxis from './YAxis';
import XAxis from './XAxis';


const XYLineChart = ({ width, height, fX, fY, data, padding }) => {
    const chartHeight = height - padding;
    const chartWidth = width - padding;

    const [yScale, setYScale] = useState(() => d3.scaleLinear().range([chartHeight, padding]));
    const [xScale, setXScale] = useState(() => d3.scaleTime().range([padding, chartWidth]));

    useEffect(() => {
        if (data.length) {
            //todo: move all this into a hook
            const newYScale = d3.scaleLinear()
                .domain(d3.extent(data, fY))
                .range([chartHeight, padding]);

            const newXScale = d3.scaleTime()
                .domain(d3.extent(data, fX))
                .range([padding, chartWidth]);
            
            setYScale(() => newYScale);
            setXScale(() => newXScale);
            updateDataPoints();
        }
        
    }, [data]);

    const updateDataPoints = () => {
        const entering = d3.select('#chart')
        .selectAll('circle')
        .data(data);
    
        entering.enter()
            .append('circle')
            .attr('cx', d => xScale(fX(d)))
            .attr('cy', d => yScale(fY(d)))
            .attr('r', 5)
            .merge(entering);
        
        entering.exit().remove();
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