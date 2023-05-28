import React from 'react';
import Form from '../Form';
import GuessRecord from '../GuessRecord';
import Keyboard from '../Keyboard';
import WonBanner from '../WonBanner';
import LostBanner from '../LostBanner';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { KEYBOARD_ORDERED_ALPHABET } from '../../constants';

const answer = sample(WORDS);
console.info({ answer });

const startingKeyboardStatus = Array(26).fill('unused');

function Game() {
  const [gameStatus, setGameStatus] = React.useState('ongoing');
  const [guesses, setGuesses] = React.useState([]);
  const [keyboardStatus, setKeyboardStatus] = React.useState(startingKeyboardStatus);

  function handleNewGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess];
    setGuesses(nextGuesses);

    const result = checkGuess(tentativeGuess, answer);
    updateKeyboard(result);

    const numOfCorrectLetters = result.filter(letter => letter.status === 'correct').length;

    if (numOfCorrectLetters === 5) {
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }

  function updateKeyboard(result) {
    const nextKeyboardStatus = [...keyboardStatus];

    result.forEach(({ letter, status }) => {
      const index = KEYBOARD_ORDERED_ALPHABET.findIndex(key => key === letter);
      const currentKeyStatus = nextKeyboardStatus[index];

      if (currentKeyStatus === 'correct') {
        return;
      } else if (currentKeyStatus === 'misplaced' && status === 'correct') {
        nextKeyboardStatus[index] = 'correct';
      } else if ((currentKeyStatus === 'incorrect' && status !== 'incorrect') || currentKeyStatus === 'unused') {
        nextKeyboardStatus[index] = status;
      }
    })

    setKeyboardStatus(nextKeyboardStatus);
  }

  return (
    <>
      <GuessRecord guesses={guesses} answer={answer} />
      <Form handleNewGuess={handleNewGuess} gameEnded={gameStatus !== 'ongoing'} />
      <Keyboard keyboardStatus={keyboardStatus} />
      {gameStatus === 'won' && <WonBanner guessCount={guesses.length} />}
      {gameStatus === 'lost' && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;
