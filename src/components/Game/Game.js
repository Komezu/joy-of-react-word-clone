import React from 'react';
import Form from '../Form';
import GuessRecord from '../GuessRecord';
import WonBanner from '../WonBanner';
import LostBanner from '../LostBanner';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

const answer = sample(WORDS);
console.info({ answer });

function Game() {
  const [gameStatus, setGameStatus] = React.useState('ongoing');
  const [guesses, setGuesses] = React.useState([]);

  function handleNewGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess];
    setGuesses(nextGuesses);

    const result = checkGuess(tentativeGuess, answer)
    const numOfCorrectLetters = result.filter(letter => letter.status === 'correct').length;

    if (numOfCorrectLetters === 5) {
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }

  return (
    <>
      <GuessRecord guesses={guesses} answer={answer} />
      <Form handleNewGuess={handleNewGuess} gameEnded={gameStatus !== 'ongoing'} />
      {gameStatus === 'won' && <WonBanner guessCount={guesses.length} />}
      {gameStatus === 'lost' && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;
