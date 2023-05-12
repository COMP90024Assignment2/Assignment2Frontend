import { render } from '@testing-library/react';
import ReactEcharts from 'echarts-for-react';
import React, { Component } from 'react';
import { BasicLineChartButton } from './BasicLineChartButton';

export class BasicLineChart extends Component {
    constructor(props) {
        super(props);
        this.state = ({fetchedData: null});
    }

    setFetchedData = (fetchedData) => {
        this.setState({fetchedData: fetchedData});
        let keys = Object.values(Object.values(fetchedData)[0]);
        alert(keys);
    }

    getOption = () => {

        return {
            title: {
                text: 'ECharts'
            },
            tooltip: {},
            legend: {
                data:["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            xAxis: {
                data: this.props.xAxisData
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20, 30]
            }]
        };
    }

    

    render() {
        return (
            <div>
                <ReactEcharts
                    option={this.getOption()}
                    style={{height: '400px', width: '100%'}}
                    className={'react_for_echarts'}
                />
                <BasicLineChartButton onDataFetched={this.setFetchedData} />
            </div>
        );
    }
}


