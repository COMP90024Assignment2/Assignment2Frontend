import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './Button.css';
import '../App.css';
import regression from 'regression';

const ScatterPlotButton = () => {
    const [twitterData, setTwitterData] = useState([]);
    const [sudoData, setSudoData] = useState([]);
    const [showTwitterPlot, setShowTwitterPlot] = useState(false);
    const [showSudoPlot, setShowSudoPlot] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [dataType, setDataType] = useState('');
    const [displayText, setDisplayText] = useState('');

    const clickButtonToGetData = (dataType) => {
        setActiveButton(dataType);
        setDataType(dataType);
        if(dataType === "income") {
            setDisplayText("The twitter plot illustrates a positive linear relationship between the counts of tweets mentioned income and counts of tweets on homeless people. This consistent upward trend suggests a strong correlation between the two variables, implying that an increase in the number of tweets on income might be linked to an escalation in homelessness. And the sudo plot also shows a negative linear relationship between the number of homeless people and the amount of family income, saying that with higher family income the number of homeless people is smaller in the certain area. However, it's important to remember that correlation does not imply causation. Other contributing factors could be present, and further investigation would be necessary to understand the complexity of this relationship");
        } else if(dataType === "mortgage") {
            setDisplayText("The twitter plot illustrates a positive linear relationship between the counts of tweets mentioned mortgages and counts of tweets on homeless people. This consistent upward trend suggests a strong correlation between the two variables, implying that an increase in the number of mortgages might be linked to an escalation in homelessness. However, the sudo plot also shows a negative linear relationship between the number of homeless people and the amount of mortgage payment, saying that with higher mortgage payment the number of homeless people is smaller in the certain area. However, it's important to remember that correlation does not imply causation. Other contributing factors could be present, and further investigation would be necessary to understand the complexity of this relationship");
        } else if(dataType === "rental") {
            setDisplayText("The twitter plot illustrates a positive linear relationship between the counts of tweets mentioned rental prices and counts of tweets on homeless people. This consistent upward trend suggests a strong correlation between the two variables, implying that an increase in the number of tweets on rental prices might be linked to an escalation in homelessness. And the sudo plot also shows a negative linear relationship between the number of homeless people and the amount of weekly rent, saying that with higher rental prices the number of homeless people is smaller in the certain area. However, it's important to remember that correlation does not imply causation. Other contributing factors could be present, and further investigation would be necessary to understand the complexity of this relationship");
        }
    
        
        const twitterUrl = `http://172.26.134.114:5984/api/get_mapreduce_result_view/sudo_twitter/twitter_homeless/twitter_${dataType}/`;
        const sudoUrl = `http://172.26.134.114:5984/api/get_mapreduce_result_view/sudo_twitter/sudo_homeless/sudo_${dataType}/`;
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
                    "homeless": data.sudo_homeless,
                    "income": data.sudo_income,
                    "mortgage": data.sudo_mortgage,
                    "rental": data.sudo_rental
                };
                setSudoData({
                    x: response[dataType],
                    y: response["homeless"]
                });
                setShowSudoPlot(true);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    };

    const hidePlots = () => {
        setActiveButton(false)
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
                    className={`button ${activeButton === name ? 'active' : ''}`}
                >
                    {name}
                </button>
            ))}
        
            {(showTwitterPlot || showSudoPlot) && (
            <div>
                <div className='plot-container'>
                    {showTwitterPlot && twitterData.x && twitterData.y && (
                        <div className='plot'>
                            <h3>Twitter Data</h3>
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
                                    title: 'Correlation of Tweet Count on Homelessness and ' + dataType,
                                    xaxis: { title: 'Twitter_'+dataType },
                                    yaxis: { title: 'Twitter_Homeless' },
                                }}
                                style={{width: '45vw'}} 
                            />
                        </div>
                    )}

                    {showSudoPlot && sudoData.x && sudoData.y && (
                        <div className='plot'>
                            <h3>SUDO Data</h3>
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
                                    title: 'Correlation of Homeless Count and ' + dataType,
                                    xaxis: { title: 'SUDO_'+dataType },
                                    yaxis: { title: 'SUDO_homeless' },
                                }}
                                style={{width: '45vw'}} 
                            />
                        
                        </div>
                    )}
                </div>
                <div id="content">
                <h4>{displayText}</h4> {}
                </div>
               
                <button onClick={hidePlots} className='button'>
                Back
                </button>
            </div>
            )}
        </div>
    );
};

export default ScatterPlotButton;



