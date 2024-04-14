// src/components/AboutUs.js

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import searchData from './searchData';
import { Chart, CategoryScale, LineElement, PointElement, LinearScale, TimeScale } from 'chart.js';
import moment from 'moment';
import 'chartjs-adapter-moment';

// Registering Chart.js scales
Chart.register(CategoryScale, LineElement, PointElement, LinearScale, TimeScale);

function AboutUs() {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jiraData = searchData.filter(item => item.type === 'jira').map((item) => ({
      x: moment(item.date, 'YYYY-MM-DD').toDate(),
      y: item.num,
    }));

    const githubData = searchData.filter(item => item.type === 'github').map((item) => ({
      x: moment(item.date, 'YYYY-MM-DD').toDate(),
      y: item.num,
    }));

    const confluenceData = searchData.filter(item => item.type === 'confluence').map((item) => ({
      x: moment(item.date, 'YYYY-MM-DD').toDate(),
      y: item.num,
    }));

    const googleData = searchData.filter(item => item.type === 'google').map((item) => ({
      x: moment(item.date, 'YYYY-MM-DD').toDate(),
      y: item.num,
    }));

    const bcrData = searchData.filter(item => item.type === 'bcr').map((item) => ({
      x: moment(item.date, 'YYYY-MM-DD').toDate(),
      y: item.num,
    }));

    const chartData = {
      labels: searchData.map((item) => moment(item.date, 'YYYY-MM-DD').format('MM/DD/YYYY')),
      datasets: [
        {
          label: 'Jira',
          data: jiraData,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        },
        {
          label: 'Github',
          data: githubData,
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
        },
        {
          label: 'Confluence',
          data: confluenceData,
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: false,
        },
        {
          label: 'Google',
          data: googleData,
          borderColor: 'rgba(255, 205, 86, 1)',
          fill: false,
        },
        {
          label: 'BCR',
          data: bcrData,
          borderColor: 'rgba(153, 102, 255, 1)',
          fill: false,
        },
      ],
    };

    setChartData(chartData);
    setLoading(false);
  }, []);

  return (
    <div>
      <h2>Number of Searches</h2>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Line
            data={chartData}
            options={{
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day',
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
              maintainAspectRatio: true,
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "right",
                  align: "start",
                  labels: {
                    usePointStyle: true,
                  },
                },
              },
              layout: {
                padding: {
                  left: 100,
                  right: 100,
                  top: 0,
                  bottom: 0,
                },
              },
            }}
            height={'60vh'} // Adjust the height as needed
            // width={'70%'} // Set width to 70% of the screen
          />
        )}
      </div>
    </div>
  );
}

export default AboutUs;
