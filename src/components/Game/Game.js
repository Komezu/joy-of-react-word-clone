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

function Game() {
  const [answer, setAnswer] = React.useState(() => {
    const firstAnswer = sample(WORDS);
    console.log({ answer: firstAnswer });
    return firstAnswer;
  });
  const [gameStatus, setGameStatus] = React.useState('ongoing');
  const [guesses, setGuesses] = React.useState([]);
  const [keyboardStatus, setKeyboardStatus] = React.useState(Array(26).fill('unused'));

  function handleNewGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess];
    setGuesses(nextGuesses);

    const result = checkGuess(tentativeGuess, answer);
    updateKeyboard(result);

    if (tentativeGuess === answer) {
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }

  function updateKeyboard(result) {
    const nextKeyboardStatus = [...keyboardStatus];

    result.forEach(({ letter, status }) => {
      const index = KEYBOARD_ORDERED_ALPHABET.findIndex((key) => key === letter);
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

  function resetGame() {
    const nextAnswer = sample(WORDS);
    setAnswer(nextAnswer);
    console.log({ answer: nextAnswer });

    setGameStatus('ongoing');
    setGuesses([]);
    setKeyboardStatus(Array(26).fill('unused'));
  }

  return (
    <>
      <GuessRecord guesses={guesses} answer={answer} />
      <Form handleNewGuess={handleNewGuess} gameEnded={gameStatus !== 'ongoing'} />
      <Keyboard keyboardStatus={keyboardStatus} />
      {gameStatus === 'won' && <WonBanner guessCount={guesses.length} action={resetGame} />}
      {gameStatus === 'lost' && <LostBanner answer={answer} action={resetGame} />}
    </>
  );
}

export default Game;
