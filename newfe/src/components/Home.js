import React from 'react';
import logo from './../logo.png'

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page</p>
      <footer>
        <img src={logo} alt="Logo" className="app-logo" /> 
        <p style={{ color: 'black', fontSize: '16px', marginLeft: '35px' }}>Support by Cx Team MS/EDS31-XC</p>
      </footer>
    </div>
    
  );
}

export default Home;
