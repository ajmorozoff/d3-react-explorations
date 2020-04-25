import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import { generateData } from '../data/datagen';

const dataSet = generateData();
const endYear = d3.max(dataSet, function(d, i) { return d.year });
const startYear = d3.min(dataSet, function(d, i) { return d.year });
const width = 670;
const height = 670;

//y axis; by year
const y = d3.scaleLinear()
    .domain([endYear+1, startYear-1])
    .range([height, 0]);

//x axis; by month
const x = d3.scaleLinear()
    .domain([-1, 12])
    .range([0, width]);

const Chart = () => {

    useEffect(() => {
        const container = d3.select('svg');
        const dataPlot = container.selectAll('circle').data(dataSet)
        dataPlot.enter()
            .append('circle')
            .attr('cx', (d, i) => (x(d.month) + 1))
            .attr('cy', (d, i) => (y(d.year) + 1))
            .attr('r', 5)
            .attr('fill', (d, i) => d.status === 'staged' ? 'red' : 'black')
    }, []);

    return (
        <div id="chart">
            <svg width={width} height={height}>

            </svg>
        </div>
    )
};

export default Chart;