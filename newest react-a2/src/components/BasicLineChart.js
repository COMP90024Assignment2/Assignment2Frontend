import { render } from '@testing-library/react';
import ReactEcharts from 'echarts-for-react';
import React, { Component } from 'react';
import { BasicLineChartButton } from './BasicLineChartButton';

export class BasicLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChart: false,
      currentData: null,
      data1: null,
      data2: null,
    };
  }

  getOption = () => ({});

  handleChartClose = () => {
    this.setState({
      showChart: false,
      currentData: null,
      data1: null,
      data2: null,
    });
  };

  handleDataFetched = (data1, data2) => {
    this.setState({
      data1,
      data2,
      showChart: true,
    });
  };

  handleChartClick = (data) => {
    this.setState({
      currentData: data,
    });
  };

  render() {
    const { data1, data2, showChart, currentData } = this.state;

    return (
      <div>
        {showChart && (
          <>
            <ReactEcharts
              option={{
                title: {
                  text: 'SUDO Data',
                },
                xAxis: {
                  data: Object.values(data1)[0],
                },
                yAxis: {},
                series: [
                  {
                    name: 'SUDO',
                    type: 'bar',
                    data: Object.values(Object.values(data1)[1]),
                  },
                ],
              }}
              style={{ height: '400px', width: '100%' }}
              className={'react_for_echarts'}
            />
            <ReactEcharts
              option={{
                title: {
                  text: 'Twitter Data',
                },
                xAxis: {
                  data: Object.values(data2)[0],
                },
                yAxis: {},
                series: [
                  {
                    name: 'Twitter',
                    type: 'bar',
                    data: Object.values(Object.values(data2)[1]),
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
