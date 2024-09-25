import React, { useState, useEffect } from 'react';
import './App.css';

const colors = ['xanh', 'đỏ', 'vàng'];

function App() {
  const [currentColor, setCurrentColor] = useState('');
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false); 

  const getRandomColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setHistory(prevHistory => [...prevHistory, randomColor]);
    setCurrentColor(randomColor);
  };

  const deleteCurrentColor = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1); 
      setHistory(newHistory);
      setCurrentColor(newHistory[newHistory.length - 1]); // Quay về màu trước đó
    } else if (history.length === 1) {
      setHistory([]);
      setCurrentColor(''); 
    }
  };


  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        getRandomColor();
      }, 1000);
    }

    return () => {
      clearInterval(interval); 
    };
  }, [isRunning]);

  const backgroundColor = currentColor === 'xanh' ? 'blue' : 
                          currentColor === 'đỏ' ? 'red' : 
                          currentColor === 'vàng' ? 'yellow' : 'white';

  return (
    <div className="App" style={{ padding: '20px', backgroundColor: backgroundColor }}>
      <h1>Màu hiện tại: {currentColor || 'Chưa có màu nào'}</h1>
      <button onClick={getRandomColor} style={{ marginRight: '10px' }}>
        Chọn màu ngẫu nhiên
      </button>
      <button onClick={deleteCurrentColor} style={{ marginRight: '10px' }}>
        Xóa màu hiện tại
      </button>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Dừng đổi màu' : 'Bắt đầu đổi màu'}
      </button>
      <h2>Lịch sử màu:</h2>
      <ul>
        {history.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
