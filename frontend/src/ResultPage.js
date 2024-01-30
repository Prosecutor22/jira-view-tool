import React from 'react';
import { Table } from 'antd';

const columnsJira = [
 {
    title: 'Key',
    dataIndex: 'key',
    key: 'key',
 },
 {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
 },
 {
    title: 'Assignee',
    dataIndex: 'assignee',
    key: 'assignee',
 },
 {
    title: 'Reporter',
    dataIndex: 'reporter',
    key: 'reporter',
 },
 {
    title: 'Link to Jira',
    dataIndex: 'link',
    key: 'link',
 },
];

const columnsConfluence = [
 // Define columns for Confluence here
];

function ResultPage({ searchTerm }) {
 // Fetch data from the backend based on searchTerm
 // For example: const data = await axios.get(`http://your-backend-url/results?term=${searchTerm}`);

 return (
    <div>
      <h1>Results for "{searchTerm}"</h1>
      <Table columns={columnsJira} dataSource={jiraData} />
      <Table columns={columnsConfluence} dataSource={confluenceData} />
    </div>
 );
}

export default ResultPage;