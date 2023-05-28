import React from 'react';
import Banner from '../Banner';

function WonBanner({ guessCount }) {
  return (
    <Banner status="happy">
      <p>
        <strong>Congratulations!</strong>{' '}
        Got it in <strong>{guessCount} {guessCount === 1 ? 'guess' : 'guesses'}</strong>.
      </p>
    </Banner>
  );
}

export default WonBanner;
