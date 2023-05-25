import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Button.css';

const LineChartComponent = () => {
  const [data, setData] = useState([]);
  const [showPlot, setShowPlot] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const urls = [
    "http://172.26.134.114:5984/api/get_mastodon_mapreduce_result_view/mastodon/mastodon_homeless_data/",
    "http://172.26.134.114:5984/api/get_mastodon_mapreduce_result_view/mastodon/mastodon_income_data/",
    "http://172.26.134.114:5984/api/get_mastodon_mapreduce_result_view/mastodon/mastodon_mortgage_data/",
    "http://172.26.134.114:5984/api/get_mastodon_mapreduce_result_view/mastodon/mastodon_rent_data/"
  ];

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  const handleClick = () => {
    setIsActive(true);
    const fetchDataForAllUrls = async () => {
      const fetchedData = await Promise.all(urls.map(url => fetchData(url)));
      const transformedData = fetchedData.reduce((result, currentData, index) => {
        const dataKey = urls[index].split('/').slice(-2, -1)[0];
        currentData.forEach(item => {
          const existingItemIndex = result.findIndex(
            transformedItem => transformedItem.date === item.date
          );
          if (existingItemIndex !== -1) {
            result[existingItemIndex][dataKey] = item.amount;
          } else {
            result.push({
              date: item.date,
              [dataKey]: item.amount
            });
          }
        });
        return result;
      }, []);

      transformedData.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Filter the data to show only the dates after 2020-05-19
      const filteredData = transformedData.filter(
        item => new Date(item.date) > new Date("2023-05-19")
      );

      setData(filteredData);
      setShowPlot(true);
    };

    fetchDataForAllUrls();
};



  const hidePlot = () => {
    setIsActive(false);
    setShowPlot(false);
    setData([]);
  };

  return (
    <div>
      <button onClick={handleClick} className={`button ${isActive ? 'active' : ''}`}>
        Mastodon
      </button>
      {showPlot && (
        <div>
        <div className='Chart'>
          
          <LineChart
            width={900}
            height={500}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickCount={12} />
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
              );
            })}
          </LineChart>
          
        </div>
        <button onClick={hidePlot} className='button'>
            Back
        </button>
        </div>
      )}
    </div>
    
  );
};

export default LineChartComponent;


