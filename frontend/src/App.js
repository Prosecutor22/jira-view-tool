import React, { useState } from "react";
import { Input, Button, Row, Col, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import JiraTable from './components/JiraTable';
import ConfluenceTable from './components/ConfluenceTable';
import GithubTable from './components/GithubTable';
import logo from './logo.png';
import axios from 'axios';

function App() {
 const [searchTerm, setSearchTerm] = useState('');
 const [jiraData, setJiraData] = useState(null);
 const [confluenceData, setConfluenceData] = useState(null);
 const [githubData, setGithubData] = useState(null);
 const [selectedPlatforms, setSelectedPlatforms] = useState(['Jira']);

 const handleSearch = async () => {
    try {
      const response = await axios.get(`http://backend:3001/search?term=${searchTerm}`);
      console.log(response.data)
      setJiraData(response.data.jiraData);
      setConfluenceData(response.data.confluenceData);
      setGithubData(response.data.githubData);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
 };

 const handlePlatformChange = (selectedValues) => {
    setSelectedPlatforms(selectedValues);
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
      <Select mode="multiple" placeholder="Select platforms" value={selectedPlatforms} onChange={handlePlatformChange}>
        <Select.Option key="Jira" value="Jira">Jira</Select.Option>
        <Select.Option key="Github" value="Github">Github</Select.Option>
        <Select.Option key="Confluence" value="Confluence">Confluence</Select.Option>
      </Select>
      <Row gutter={16}>
        <Col span={24}>
          {selectedPlatforms.includes('Jira') && <JiraTable data={jiraData} />}
        </Col>
        <Col span={24}>
          {selectedPlatforms.includes('Github') && <GithubTable data={githubData} />}
        </Col>
        <Col span={24}>
          {selectedPlatforms.includes('Confluence') && <ConfluenceTable data={confluenceData} />}
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