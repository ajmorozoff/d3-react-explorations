import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Axios from 'axios';
import XYChart from './XYChart';

const ChartRoot = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [country, setCountry] = useState('spain');

    const fetchData = async() => {
        const newData = (await Axios.get(`https://api.covid19api.com/total/dayone/country/${country}/status/confirmed`)).data; 
        setData(newData);
        console.log(newData);
        setLoading(false);
    }

    useEffect(() => {
        if (!data.length) {
            setLoading(true);
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
                        fY={(d) => d.Cases}
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
        </div>
    )
};

export default ChartRoot;