import moment from 'moment';

const searchData = [
    { "type": "jira", "num": 12, "date": "2024-04-13" },
    { "type": "github", "num": 8, "date": "2024-04-13" },
    { "type": "confluence", "num": 10, "date": "2024-04-13" },
    { "type": "google", "num": 15, "date": "2024-04-13" },
    { "type": "bcr", "num": 5, "date": "2024-04-13" },
    { "type": "jira", "num": 15, "date": "2024-04-14" },
    { "type": "github", "num": 10, "date": "2024-04-14" },
    { "type": "confluence", "num": 12, "date": "2024-04-14" },
    { "type": "google", "num": 20, "date": "2024-04-14" },
    { "type": "bcr", "num": 6, "date": "2024-04-14" },
    { "type": "jira", "num": 18, "date": "2024-04-15" },
    { "type": "github", "num": 12, "date": "2024-04-15" },
    { "type": "confluence", "num": 14, "date": "2024-04-15" },
    { "type": "google", "num": 25, "date": "2024-04-15" },
    { "type": "bcr", "num": 7, "date": "2024-04-15" },
    { "type": "jira", "num": 22, "date": "2024-04-16" },
    { "type": "github", "num": 15, "date": "2024-04-16" },
    { "type": "confluence", "num": 18, "date": "2024-04-16" },
    { "type": "google", "num": 30, "date": "2024-04-16" },
    { "type": "bcr", "num": 8, "date": "2024-04-16" },
    { "type": "jira", "num": 25, "date": "2024-04-17" },
    { "type": "github", "num": 18, "date": "2024-04-17" },
    { "type": "confluence", "num": 20, "date": "2024-04-17" },
    { "type": "google", "num": 35, "date": "2024-04-17" },
    { "type": "bcr", "num": 9, "date": "2024-04-17" },
    { "type": "jira", "num": 28, "date": "2024-04-18" },
    { "type": "github", "num": 20, "date": "2024-04-18" },
    { "type": "confluence", "num": 22, "date": "2024-04-18" },
    { "type": "google", "num": 40, "date": "2024-04-18" },
    { "type": "bcr", "num": 10, "date": "2024-04-18" },
    { "type": "jira", "num": 31, "date": "2024-04-19" },
    { "type": "github", "num": 22, "date": "2024-04-19" },
    { "type": "confluence", "num": 24, "date": "2024-04-19" },
    { "type": "google", "num": 45, "date": "2024-04-19" },
    { "type": "bcr", "num": 11, "date": "2024-04-19" },
    { "type": "jira", "num": 34, "date": "2024-04-20" },
    { "type": "github", "num": 24, "date": "2024-04-20" },
    { "type": "confluence", "num": 26, "date": "2024-04-20" },
    { "type": "google", "num": 50, "date": "2024-04-20" },
    { "type": "bcr", "num": 12, "date": "2024-04-20" },
    { "type": "jira", "num": 37, "date": "2024-04-21" },
    { "type": "github", "num": 26, "date": "2024-04-21" },
    { "type": "confluence", "num": 28, "date": "2024-04-21" },
    { "type": "bcr", "num": 13, "date": "2024-04-21" },
    { "type": "jira", "num": 40, "date": "2024-04-22" },
    { "type": "github", "num": 28, "date": "2024-04-22" },
    { "type": "confluence", "num": 30, "date": "2024-04-22" },
    { "type": "google", "num": 60, "date": "2024-04-22" },
    { "type": "bcr", "num": 14, "date": "2024-04-22" }
   ];

export const lineChart = {
  series: [
    {
      name: 'Jira',
      data: searchData.filter(item => item.type === 'jira').map((item) => ({
        x: moment(item.date).toDate(),
        y: item.num,
      })),
      offsetY: 0,
    },
    {
      name: 'Github',
      data: searchData.filter(item => item.type === 'github').map((item) => ({
        x: moment(item.date).toDate(),
        y: item.num,
      })),
      offsetY: 0,
    },
    {
      name: 'Confluence',
      data: searchData.filter(item => item.type === 'confluence').map((item) => ({
        x: moment(item.date).toDate(),
        y: item.num,
      })),
      offsetY: 0,
    },
    {
      name: 'Google',
      data: searchData.filter(item => item.type === 'google').map((item) => ({
        x: moment(item.date).toDate(),
        y: item.num,
      })),
      offsetY: 0,
    },
    {
        name: 'BCR',
        data: searchData.filter(item => item.type === 'bcr').map((item) => ({
          x: moment(item.date).toDate(),
          y: item.num,
        })),
        offsetY: 0,
      },
  ],

  options: {
    chart: {
      width: '100%',
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      labels: {
        usePointStyle: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: ['#8c8c8c'],
        },
      },
      beginAtZero: true,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value) {
          return moment(value).format('YYYY-MM-DD');
        },
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: ['#8c8c8c'],
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => val,
      },
    },
  },
};
