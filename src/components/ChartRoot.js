import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Axios from 'axios';
import XYChart from './XYChart';

const ChartRoot = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [country, setCountry] = useState('italy');
    const [color, setColor] = useState('orrd');

    const fetchData = async() => {
        setLoading(true);
        const newData = (await Axios.get(`https://api.covid19api.com/country/${country}?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`)).data; 
        setData(newData);
        console.log(newData);
        setLoading(false);
    }

    useEffect(() => {
        if (!data.length) {
            fetchData();
        }
    }, [])

    return (
        <div>
            {
                !isLoading && data.length
                ?
                    <XYChart
                        data={data}
                        fX={(d) => new Date(d.Date)}
                        fY={(d) => d.Confirmed}
                        fFill={(d) => d.Deaths}
                        fillCode={color}
                    />
                : 
                    <div>
                        Loading...
                    </div>
            }
            <button
                onClick={fetchData}
            >
                Refresh Data
            </button>
            <select name='legend' onChange={(e) => setColor(e.target.value)}>
                <option key={1} value={'orrd'}>
                    Orange-Red
                </option>
                <option key={2} value={'plasma'}>
                    Plasma
                </option>
            </select>
        </div>
    )
};

export default ChartRoot;