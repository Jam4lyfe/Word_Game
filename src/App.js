import React, { useState, useEffect } from 'react';
import { Button, Container, CssBaseline, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import row from 'react';
import { Box } from '@mui/system';

const emotions = [
  "Happy", "Sad", "Angry", "Surprised", "Excited", "Fearful", "Relaxed", "Confused"
];

const theme = createTheme();

const App = () => {
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    startGame();
  }, []); // Run once on component mount

  const startGame = () => {
    // Choose a random emotion
    const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentEmotion(newEmotion);

    // Generate two random emotions for options
    const newOptions = generateRandomOptions(newEmotion);
    setOptions(newOptions);
  };

  const generateRandomOptions = (correctEmotion) => {
    const newOptions = [];
    
    while (newOptions.length < 2) {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      if (randomEmotion !== correctEmotion && !newOptions.includes(randomEmotion)) {
        newOptions.push(randomEmotion);
      }
    }

    newOptions.push(correctEmotion); // Add the correct emotion to options
    return shuffleArray(newOptions);
  };

  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkAnswer = (selectedEmotion) => {
    const emotionWordElement = document.getElementById('emotion-word');
  
    if (selectedEmotion === currentEmotion) {
      emotionWordElement.classList.add('correct');
  
      setTimeout(() => {
        emotionWordElement.classList.remove('correct');
        startGame();
        setScore(score + 1); // Increment score for a correct answer
        // Check and update high score
        if (score + 1 > highScore) {
          setHighScore(score + 1);
        }
      }, 500);
    } else {
      const randomRotation = Math.random() < 0.5 ? -10 : 10;
      
      emotionWordElement.style.transform = `rotate(${randomRotation}deg)`;
  
      emotionWordElement.classList.add('incorrect');
  
      setTimeout(() => {
        emotionWordElement.classList.remove('incorrect');
        emotionWordElement.style.transform = '';
        resetGame();
      }, 500);
    }
  };
  
  const resetGame = () => {
    setScore(0); // Reset score for an incorrect answer
    startGame();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="game-container">
        <Typography component="h1" variant="h5" id="score">
          Score: {score}
        </Typography>
        <Typography component="h1" variant="h5" id="high-score">
          High Score: {highScore}
        </Typography>
        <div className="paper">
          <Typography component="h2" variant="h6" id="game-title">
            Word Game
          </Typography>
          <Typography component="h3" variant="h6" id="emotion-word">
            {currentEmotion}
          </Typography>
          <div id="options">
            {options.map((option, index) => (
              <Button
                key={index}
                variant="contained"
                color="success"
                onClick={() => checkAnswer(option)}
                fullWidth
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
