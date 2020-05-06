import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Axios from 'axios';
import XYChart from './XYChart';
import XYChartAnimated from './XYChartAnimated';

const ChartRoot = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [country, setCountry] = useState('italy');
    const [color, setColor] = useState('orrd');
    const [fillKey, setFillKey] = useState('Deaths');

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
                    <div>
                        {/* <XYChart
                            data={data}
                            fX={(d) => new Date(d.Date)}
                            fY={(d) => d.Confirmed}
                            fFill={(d) => d.Deaths}
                            fillCode={color}
                        /> */}
                        <XYChartAnimated
                            data={data}
                            fX={(d) => new Date(d.Date)}
                            fMax={(d) => d.Confirmed}
                            fY={(d) => d[fillKey]}
                            fFill={(d) => d.Confirmed}
                            fillCode={color}
                        />
                    </div>
                : 
                    <div>
                        Loading...
                    </div>
            }
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    margin: '1rem',
                }}
            >
                <div>
                    <label htmlFor='color-legend'>
                        Palette 
                    </label>
                    <select id='color-legend' name='color-legend' onChange={(e) => setColor(e.target.value)}>
                        <option key={1} value={'orrd'}>
                            Orange-Red
                        </option>
                        <option key={2} value={'plasma'}>
                            Plasma
                        </option>
                        <option key={3} value={'rainbow'}>
                            Rainbow
                        </option>
                        <option key={4} value={'spectral'}>
                            Spectral
                        </option>
                    </select>
                </div>
                <div>
                    <label htmlFor='color-legend'>
                        Filter By 
                    </label>
                    <select id='fill-legend' name='fill-legend' onChange={(e) => setFillKey(e.target.value)}>
                        <option key={1} value={'Deaths'}>
                            Deaths
                        </option>
                        <option key={2} value={'Recovered'}>
                            Recovered
                        </option>
                        <option key={3} value={'Active'}>
                            Active
                        </option>
                        <option key={4} value={'Confirmed'}>
                            Confirmed Cases
                        </option>
                    </select>
                </div>
                <button
                    onClick={fetchData}
                >
                    Refresh
                </button>
            </div>
        </div>
    )
};

export default ChartRoot;