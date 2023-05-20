import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './Button.css';
import regression from 'regression';

const ScatterPlotButton = () => {
    const [twitterData, setTwitterData] = useState([]);
    const [sudoData, setSudoData] = useState([]);
    const [showTwitterPlot, setShowTwitterPlot] = useState(false);
    const [showSudoPlot, setShowSudoPlot] = useState(false);

    const clickButtonToGetData = (dataType) => {
        const twitterUrl = `http://172.26.129.195:5984/api/get_mapreduce_result_view/sudo_twitter/twitter_homeless/twitter_${dataType}/`;
        const sudoUrl = '';

        fetch(twitterUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const response = {
                    "homeless": data.twitter_homeless,
                    "income": data.twitter_income,
                    "mortgage": data.twitter_mortgage,
                    "rental": data.twitter_rental
                };
                setTwitterData({
                    x: response[dataType],
                    y: response["homeless"]
                });
                setShowTwitterPlot(true);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

        fetch(sudoUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const response = {
                    "Homeless": data.sudo_homeless,
                    "Income": data.sudo_income,
                    "Mortgage": data.sudo_mortgage,
                    "Rental": data.sudo_rental
                };
                setSudoData({
                    x: response[dataType],
                    y: response["Homeless"]
                });
                setShowSudoPlot(true);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    };

    const hidePlots = () => {
        setShowTwitterPlot(false);
        setShowSudoPlot(false);
    };

    const buttonNames = ["income", "mortgage", "rental"];

    let twitterGradient, twitterYIntercept, sudoGradient, sudoYIntercept;

    if (twitterData.x && twitterData.y) {
        const twitterResult = regression.linear(
            twitterData.x.map((val, idx) => [val, twitterData.y[idx]])
        );
        twitterGradient = twitterResult.equation[0];
        twitterYIntercept = twitterResult.equation[1];
    }

    if (sudoData.x && sudoData.y) {
        const sudoResult = regression.linear(
            sudoData.x.map((val, idx) => [val, sudoData.y[idx]])
        );
        sudoGradient = sudoResult.equation[0];
        sudoYIntercept = sudoResult.equation[1];
    }

    return (
        <div>
            {buttonNames.map((name, index) => (
                <button
                    key={index}
                    onClick={() => clickButtonToGetData(name)}
                    className='button'
                >
                    {name}
                </button>
            ))}
            {(showTwitterPlot || showSudoPlot) && (
                <div>
                                        {showTwitterPlot && twitterData.x && twitterData.y && (
                        <div>
                            <h2>Twitter Data</h2>
                            <Plot
                                data={[
                                    {
                                        x: twitterData.x,
                                        y: twitterData.y,
                                        mode: 'markers',
                                        type: 'scatter',
                                        name: 'Data',
                                    },
                                    {
                                        x: [
                                            Math.min(...twitterData.x),
                                            Math.max(...twitterData.x),
                                        ],
                                        y: [
                                            twitterGradient * Math.min(...twitterData.x) +
                                                twitterYIntercept,
                                            twitterGradient * Math.max(...twitterData.x) +
                                                twitterYIntercept,
                                        ],
                                        mode: 'lines',
                                        name: 'Linear Fit',
                                    },
                                ]}
                                layout={{
                                    autosize: true,
                                    title: 'Scatter plot with regression line (Twitter Data)',
                                }}
                            />
                        </div>
                    )}

                    {showSudoPlot && sudoData.x && sudoData.y && (
                        <div>
                            <h2>Sudo Data</h2>
                            <Plot
                                data={[
                                    {
                                        x: sudoData.x,
                                        y: sudoData.y,
                                        mode: 'markers',
                                        type: 'scatter',
                                        name: 'Data',
                                    },
                                    {
                                        x: [
                                            Math.min(...sudoData.x),
                                            Math.max(...sudoData.x),
                                        ],
                                        y: [
                                            sudoGradient * Math.min(...sudoData.x) +
                                                sudoYIntercept,
                                            sudoGradient * Math.max(...sudoData.x) +
                                                sudoYIntercept,
                                        ],
                                        mode: 'lines',
                                        name: 'Linear Fit',
                                    },
                                ]}
                                layout={{
                                    autosize: true,
                                    title: 'Scatter plot with regression line (Sudo Data)',
                                }}
                            />
                        </div>
                    )}

                    <button onClick={hidePlots} className='button'>
                        Back
                    </button>
                </div>
            )}
        </div>
    );
};

export default ScatterPlotButton;



