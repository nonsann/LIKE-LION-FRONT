import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameCanvas from './components/GameCanvas';
import Login from './components/Login';
import Signup from './components/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './index.css';

function App() {
  const appStyle = {
    background: 'black',
    minHeight: '100vh',
  };

  return (
    <Router>
      <div className="App" style={appStyle}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/game" element={<GameCanvas />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;