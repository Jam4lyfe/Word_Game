import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [options, setOptions] = useState([]);

  const emotions = ['Happy', 'Sad', 'Excited', 'Angry', 'Surprised', 'Calm']; // List of emotions

  useEffect(() => {
    startGame();
  }, []); // Run only once on component mount

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * emotions.length);
    const selectedEmotion = emotions[randomIndex];

    setCurrentEmotion(selectedEmotion);

    const randomOptions = emotions
      .filter(emotion => emotion !== selectedEmotion)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    randomOptions.push(selectedEmotion);
    randomOptions.sort(() => Math.random() - 0.5);

    setOptions(randomOptions);
  };

  const checkAnswer = (selectedOption) => {
    if (selectedOption === currentEmotion) {
      alert('Correct!');
    } else {
      alert('Incorrect. Try again!');
    }

    startGame();
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <div className="card-body">
            <h1 className="card-title text-center mb-4 display-4">Emotion Game</h1>
            <h2 className="card-subtitle text-center mb-4">Select the synonym for:</h2>
            <h3 className="card-title text-center mb-4 display-3">{currentEmotion}</h3>
            <div className="d-flex justify-content-center">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="btn btn-outline-primary btn-lg m-2"
                  onClick={() => checkAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
