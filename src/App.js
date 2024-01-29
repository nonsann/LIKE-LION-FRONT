import React from 'react';
import GameCanvas from './components/GameCanvas';

function App() {
  const appStyle = {
    background: 'black',
    minHeight: '100vh', // 최소 뷰포트 높이까지 채우도록 설정
  };

  return (
    <div className="App" style={appStyle}>
      <GameCanvas />
    </div>
  );
}

export default App;
