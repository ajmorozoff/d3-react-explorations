import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HEIGHT = 600;
const WIDTH = 850;
const MARGIN = { top: 16, right: 48, left: 48, bottom: 16};



const XYChartAnimated = ({ data, fX, fY, fMax, fFill, fillCode }) => {
    const chartTop = HEIGHT - MARGIN.bottom;
    const chartBottom = MARGIN.top;
    const chartRight = WIDTH - MARGIN.right;
    const chartLeft = MARGIN.left;
    const chartWidth = chartRight - chartLeft;

    const [chartShapes, setChartShapes] = useState([]);
    const [yAxis, setYAxis] = useState(() => {});
    const [xAxis, setXAxis] = useState(() => {});
    const xAxisRef = useRef(null);
    const yAxisRef = useRef(null);
    const shapesRef = useRef(null);

    const updateData = () => {

        console.log(fFill);

        const xScale = d3.scaleTime()
            .domain(d3.extent(data, fX))
            .range([chartLeft, chartRight]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, fMax)])
            .range([chartTop, chartBottom]);

        const colorScale = d3.scaleSequential()
            .domain([0, d3.max(data, fFill)]);
        
        switch (fillCode) {
            case 'orrd':
                colorScale.interpolator(d3.interpolateYlOrBr);
                break;
            case 'plasma':
                colorScale.interpolator(d3.interpolatePlasma);
                break;
            case 'rainbow':
                colorScale.interpolator(d3.interpolateRainbow);
                break;
            case 'spectral':
                colorScale.interpolator(d3.interpolateGnBu);
                break;
            default:
                colorScale.interpolator(d3.interpolatePlasma);
                break;
        };    
            
        const nextShapes = data.map(d => {
            return {
                x: xScale(fX(d)),
                y: yScale(fY(d)),
                height: chartTop - yScale(fY(d)),
                width: (chartWidth / data.length),
                fill: colorScale(fY(d))
            }
        });

        setXAxis(() => 
            d3.axisBottom()
                .scale(xScale)
        );
        setYAxis(() => {
            d3.axisLeft()
                .scale(yScale)
        });

        setChartShapes(nextShapes);
        console.log(nextShapes);

    };

    useEffect(() => {
        if (data.length) {
            updateData();
        }
    }, [data, fX, fY, fFill, fillCode]);

    useEffect(() => {
        if (chartShapes.length) {
            const entering = d3.select(shapesRef.current)
                .selectAll('rect')
                .data(chartShapes);
            
            entering.enter()
                .append('rect')
                .merge(entering)
                .attr('width', d => d.width)
                .attr('x', d => d.x)
                .transition()
                .attr('y', d => d.y)
                .attr('height', d => d.height)
                .attr('fill', d => d.fill)
                .duration(2000)
                ;
            
            entering.exit().remove();
        }
    }, [chartShapes])

    useEffect(() => {
        if (xAxis) {
            d3.select(xAxisRef.current)
                .call(xAxis);
        }
    }, [xAxis])

    useEffect(() => {
        if (yAxis) {
            d3.select(yAxisRef.current)
                .call(yAxis);
        }
    }, [yAxis])

    return (
        <svg width={WIDTH} height={HEIGHT}>
            <g ref={shapesRef}>
            </g>
            <g ref={xAxisRef} transform={`translate(0, ${HEIGHT - MARGIN.bottom})`}/>
            <g ref={yAxisRef} />
        </svg>
    )
};

export default XYChartAnimated;