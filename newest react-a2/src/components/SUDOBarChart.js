import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function SUDOBarChart() {
  const getOption = () => {
    return {
      title: {
        text: 'SUDO', // Add your desired title here
        textStyle: {
          fontWeight: 'normal',
          fontSize: 16,
        },
        left: 'center',
        top: '5%', // Adjust the top position as needed
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['1gsyd', '2gmel', '3gbri', '4gade', '5gper', '6ghob', '7gdar', '8acte', 'Nan']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Homeless',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [27877,63354,13714,13176,12315,3004,2648,2957,123363]

        },
        {
          name: 'Income',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [2374.0,2243.0,2175.0,1988.0,2259.0,1920.0,2485.0,2872.0,1740.625]
        },
        {
          name: 'Mortgage',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [2427.0,2000.0,1863.0,1562.0,1907.0,1517.0,2100.0,2080.0,1479.75]
        },
        {
          name: 'Rental',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [470.0,390.0,380.0,320.0,350.0,350.0,385.0,450.0,255.625]
        }
      ]
    };
  }

  return (
    <ReactEcharts option={getOption()} style={{ height: '600px', width: '100%' }} className='react_for_echarts' />
  );
}
