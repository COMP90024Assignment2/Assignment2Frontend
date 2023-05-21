import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function TwitterBarChart() {
  const getOption = () => {
    return {
      title: {
        text: 'Twitter', // Add your desired title here
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
          data: [114, 98, 40, 18, 24, 8, 3, 14, 136]
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
          data: [664, 652, 270, 137, 233, 34, 49, 63, 839]
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
          data: [619, 284, 156, 123, 74, 14, 6, 29, 635]
        },
        {
          name: 'Rent',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [5729,5399,2671,1148,1702,346,218,598,6909]
        }
      ]
    };
  }

  return (
    <ReactEcharts option={getOption()} style={{ height: '600px', width: '100%' }} className='react_for_echarts' />
  );
}
