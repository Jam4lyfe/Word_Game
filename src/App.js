import React, { useState, useEffect } from 'react';
import { Button, Container, CssBaseline, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const emotions = [
  "Happy", "Sad", "Angry", "Surprised", "Excited", "Fearful", "Relaxed", "Confused"
];

const theme = createTheme();

const App = () => {
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [options, setOptions] = useState([]);

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
    if (selectedEmotion === currentEmotion) {
      alert("Correct! Let's try another one.");
      startGame();
    } else {
      alert("Incorrect. Try again!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <div className="paper">
          <Typography component="h1" variant="h5" id="game-title">
            Word Game
          </Typography>
          <Typography component="h2" variant="h6" id="emotion-word">
            {currentEmotion}
          </Typography>
          <div id="options">
            {options.map((option, index) => (
              <Button
                key={index}
                variant="contained"
                color="success" // Green color
                onClick={() => checkAnswer(option)}
                fullWidth
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default App;
