import React from 'react';
import './App.css';
import Login from './Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import Course from './Dashboard/Course.js';
import Marksheet from './Dashboard/Marksheet.js';
import ResultUpload from './Dashboard/ResultUpload.js';

function App() {
  return (
    <>
      <Dashboard/>
      <Login/> 
     <Course/>
     <Marksheet/>
     <ResultUpload/>
    </>
  );
}

export default App;
