import React from 'react';

import { range } from '../../utils';
import { checkGuess } from '../../game-helpers';

function Guess({ guess, answer }) {
  const result = checkGuess(guess, answer);

  function getClassFromStatus(index) {
    return result ? `cell ${result[index].status}` : 'cell'
  }

  return (
    <p className="guess">
      {range(5).map((index) => (
        <span className={getClassFromStatus(index)} key={index}>
          {result ? result[index].letter : undefined}
        </span>
      ))}
    </p>
  );
}

export default Guess;
