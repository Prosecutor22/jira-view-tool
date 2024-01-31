import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import JiraTable from './components/JiraTable';
import ConfluenceTable from './components/ConfluenceTable';
import logo from './logo.png'; // Import your logo
import axios from 'axios';

function App() {
 const [searchTerm, setSearchTerm] = useState('');
 const [jiraData, setJiraData] = useState(null);
 const [confluenceData, setConfluenceData] = useState(null);

 const handleSearch = async () => {
  try {
     // Send a GET request to the backend with the search term
     const response = await axios.get(`http://backend:3001/search?term=${searchTerm}`);
     console.log(response.data)
 
     // Update the state with the received data
     setJiraData(response.data.jiraData);
     setConfluenceData(response.data.confluenceData);
  } catch (error) {
     console.error("Failed to fetch data: ", error);
  }
 };

 return (
    <div className="app">
      <header>
        <h1 className="app-title">Cross-Platform Searching Tool</h1> 
      </header>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onPressEnter={handleSearch}
      />
      <Button type="primary" onClick={handleSearch}>Search</Button>
      <Row gutter={16}>
        <Col span={24}>
          <JiraTable data={jiraData} />
        </Col>
        <Col span={24}>
          <ConfluenceTable data={confluenceData} />
        </Col>
      </Row>
      <footer>
        <img src={logo} alt="Logo" className="app-logo" /> 
        <p style={{ color: 'black', fontSize: '16px', marginLeft: '35px' }}>Support by Cx Team MS/EDS31-XC</p>
      </footer>
    </div>
 );
}

export default App;