import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Button.css';

const LineChartComponent = () => {
    const [data, setData] = useState([]);
    const [showPlot, setShowPlot] = useState(false);

    const urls = [
        "http://localhost:5984/api/get_mapreduce_result_view/homeless/",
        "http://localhost:5984/api/get_mapreduce_result_view/income/",
        "http://localhost:5984/api/get_mapreduce_result_view/mortgage/",
        "http://localhost:5984/api/get_mapreduce_result_view/rental/",
    ];

    const handleClick = () => {
        Promise.all(urls.map(url =>
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    let transformedData = data.time.map((time, index) => ({
                        time: time,
                        value: data[url.split('/').slice(-2, -1)[0]][index]
                    }));
                    setData(prevData => [...prevData, ...transformedData]);
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                })
        )).then(() => setShowPlot(true));
    };

    const hidePlot = () => {
        setShowPlot(false);
        setData([]);
    };

    return (
        <div>
            <button
                onClick={handleClick} className='button'
            >
                Mastodon
            </button>
            {showPlot && (
                <div >

                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {urls.map((url, index) => {
                            const dataKey = url.split('/').slice(-2, -1)[0];
                            return (
                                <Line
                                    key={dataKey}
                                    type="monotone"
                                    dataKey={dataKey}
                                    stroke={["#8884d8", "#3CB371", "#DAA520", "#F08080"][index]}
                                />
                            )
                        })}
                    </LineChart>
                    <button onClick={hidePlot} className='button'>
                        Back
                    </button>
                </div>
            )}
        </div>
    );
};

export default LineChartComponent;

