import React from 'react';
import { Input } from 'antd';

function SearchPage({ onSearch }) {
 const handleSearch = (event) => {
    onSearch(event.target.value);
 };

 return (
    <div>
      <h1>Search</h1>
      <Input placeholder="Enter search term" onChange={handleSearch} />
    </div>
 );
}

export default SearchPage;
