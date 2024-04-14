// src/App.js

import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import { Menu } from 'antd';
import Home from './components/Home';
import Search from './components/Search';
import AboutUs from './components/AboutUs';
import logo from './logo.png'

function App() {
  return (
    <Router>
      <div className="App">
        <header>
        <h1 className="app-title">Cross-Platform Searching Tool</h1> 
        </header>

        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="search">
            <Link to="/search">Search</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">Statistics</Link>
          </Menu.Item>
        </Menu>

        <Routes>
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/about' element={<AboutUs />} />
        </Routes>

        {/* <footer>
        <img src={logo} alt="Logo" className="app-logo" /> 
        <p style={{ color: 'black', fontSize: '16px'}}>Support by Cx Team MS/EDS31-XC</p>
        </footer> */}
      </div>
    </Router>
  );
}

export default App;
