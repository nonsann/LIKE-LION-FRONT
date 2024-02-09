import React from 'react';
import GameCanvas from './components/GameCanvas';

function App() {
  const appStyle = {
    background: 'black',
    minHeight: '100vh',
  };

  return (
    <div className="App" style={appStyle}>
      <GameCanvas />
    </div>
  );
}

export default App;
