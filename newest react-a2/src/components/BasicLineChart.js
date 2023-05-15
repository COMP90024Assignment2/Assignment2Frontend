import { render } from '@testing-library/react';
import ReactEcharts from 'echarts-for-react';
import React, { Component } from 'react';
import { BasicLineChartButton } from './BasicLineChartButton';

const data1 = {
  labels: ["A", "B", "C", "D", "E"],
  values1: [20, 30, 40, 50, 60],

};

const data2= {
  labels: ["A", "B", "C", "D", "E"],
  values1: [20, 30, 40, 50, 60],
  
};

const data3 = {
  labels: ["A", "B", "C", "D", "E"],
  values1: [20, 30, 40, 50, 60],
  
};


export class BasicLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChart: false,
      currentData: null,
      data1: null,
      data2: null,
      data3: null
    };
  }

  getOption = () => ({});

  handleChartClose = () => {
    this.setState({
      showChart: false,
      currentData: null,
      data1: null,
      data2: null,
      data3: null
    });
  };

  handleDataFetched = (data1, data2, data3) => {
    this.setState({
      data1: data1,
      data2: data2,
      data3: data3,
      showChart: true,
    });
  };

  handleDataFetched = (data1, data2, data3) => {
    this.setState({
      data1,
      data2,
      data3,
      showChart: true,
    });
  };

  handleChartClick = (data) => {
    this.setState({
      currentData: data,
    });
  };


  render() {
    const { data1, data2,data3, showChart, currentData } = this.state;

    return (
      <div>
        {showChart && (
          <>
            <ReactEcharts
              option={{
                title: {
                  text: 'Unemployed',
                },
                xAxis: {
                  data: Object.values(data1)[0],
                },
                yAxis: {},
                series: [
                  {
                    name: Object.keys(data1)[0],
                    type: 'bar',
                    data: Object.values(Object.values(data1)[1]),
                  },
                  {
                    name: Object.keys(data1)[1],
                    type: 'bar',
                    data: Object.values(Object.values(data1)[2]),
                  },
                ],
              }}
              style={{ height: '400px', width: '100%' }}
              className={'react_for_echarts'}
            />
            <ReactEcharts
              option={{
                title: {
                  text: 'Income',
                },
                xAxis: {
                  data: Object.values(data2)[0],
                },
                yAxis: {},
                series: [
                  {
                    name: Object.keys(data2)[0],
                    type: 'bar',
                    data: Object.values(Object.values(data2)[1]),
                  },
                  {
                    name: Object.keys(data2)[1],
                    type: 'bar',
                    data: Object.values(Object.values(data2)[2]),
                  },
                ],
              }}
              style={{ height: '400px', width: '100%' }}
              className={'react_for_echarts'}
              
            />
            <ReactEcharts
              option={{
                title: {
                  text: 'Criminal',
                },
                xAxis: {
                  data: Object.values(data3)[0],
                },
                yAxis: {},
                series: [
                  {
                    name: Object.keys(data3)[0],
                    type: 'bar',
                    data: Object.values(Object.values(data3)[1]),
                  },
                  {
                    name: Object.keys(data3)[1],
                    type: 'bar',
                    data: Object.values(Object.values(data3)[2]),
                  },
                ],
              }}
              style={{ height: '400px', width: '100%' }}
              className={'react_for_echarts'}

            />
  
            <button onClick={this.handleChartClose}>Close</button>
          </>
        )}
        {!showChart && (
          <BasicLineChartButton
            onDataFetched={this.handleDataFetched}
          />
        )}
      </div>
    );
  }
}
