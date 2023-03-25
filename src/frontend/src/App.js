import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Service from './components/pages/Service';
import Videos from './components/pages/Videos';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/service' element={<Service/>} />
          <Route path='/videos' element={<Videos/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
