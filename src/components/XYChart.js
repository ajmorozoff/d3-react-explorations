import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HEIGHT = 600;
const WIDTH = 850;
const MARGIN = { top: 20, right: 10, left: 10, bottom: 20}

const XYChart = ({ data, fX, fY }) => {
    const [chartShapes, setChartShapes] = useState([]);
    const [yAxis, setYAxis] = useState(() => {});
    const [xAxis, setXAxis] = useState(() => {});
    const xAxisSelect = useRef(null);

    useEffect(() => {
        if (data.length) {
            const xScale = d3.scaleTime()
                .domain(d3.extent(data, fX))
                .range([0, WIDTH]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, fY)])
                .range([HEIGHT, 0]);

            const nextShapes = data.map(d => {
                return {
                    x: xScale(fX(d)),
                    y: yScale(fY(d)),
                    height: HEIGHT - yScale(fY(d)),
                    width: (WIDTH / data.length)
                }
            });

            setChartShapes(nextShapes);
        }
    }, [data])

    return (
        <svg width={WIDTH} height={HEIGHT}>
            {
                chartShapes.map((d, i) => 
                    <rect key={i} height={d.height} width={d.width} x={d.x} y={d.y} /> 
                )
            }
        </svg>
    )
};

export default XYChart;