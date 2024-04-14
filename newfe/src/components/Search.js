// src/components/Search.js

import React, { useState } from 'react';
import { Input, Button, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ConfluenceTable from './childTable/ConfluenceTable';
import JiraTable from './childTable/JiraTable';
import GithubTable from './childTable/GithubTable';
import axios from 'axios';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [jiraData, setJiraData] = useState(null);
    const [confluenceData, setConfluenceData] = useState(null);
    const [githubData, setGithubData] = useState(null);
    const [selectedPlatforms, setSelectedPlatforms] = useState(['Jira']);
  
    const handleSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/search?term=${searchTerm}`);
        setJiraData(response.data.jiraData);
        setConfluenceData(response.data.confluenceData);
        setGithubData(response.data.githubData);
      } catch (error) {
        console.error('Failed to fetch data: ', error);
      }
    };
  
    const handlePlatformChange = (selectedValues) => {
      setSelectedPlatforms(selectedValues);
    };
  
    return (
      <div>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
        />
        <Button type="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search
        </Button>
        <Select
          mode="multiple"
          placeholder="Select platforms"
          value={selectedPlatforms}
          onChange={handlePlatformChange}
          style={{ marginLeft: '10px' }}
        >
          <Select.Option key="Jira" value="Jira">
            Jira
          </Select.Option>
          <Select.Option key="Github" value="Github">
            Github
          </Select.Option>
          <Select.Option key="Confluence" value="Confluence">
            Docupedia
          </Select.Option>
        </Select>
  
        <Row gutter={16}>
          <Col span={24}>{selectedPlatforms.includes('Jira') && <JiraTable data={jiraData} />}</Col>
          <Col span={24}>{selectedPlatforms.includes('Github') && <GithubTable data={githubData} />}</Col>
          <Col span={24}>{selectedPlatforms.includes('Confluence') && <ConfluenceTable data={confluenceData} />}</Col>
        </Row>
      </div>
    );
  }
  
  export default Search;