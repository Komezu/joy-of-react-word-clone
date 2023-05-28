import React from 'react';
import Key from '../Key';

import { range } from '../../utils';
import { KEYBOARD_ORDERED_ALPHABET } from '../../constants';

function Keyboard({ keyboardStatus }) {
  return (
    <div className="keyboard-wrapper">
      <div className="keyboard-row">
        {range(10).map((index) => (
          <Key key={index} status={keyboardStatus[index]}>{KEYBOARD_ORDERED_ALPHABET[index]}</Key>
        ))}
      </div>
      <div className="keyboard-row">
        {range(10, 19).map((index) => (
          <Key key={index} status={keyboardStatus[index]}>{KEYBOARD_ORDERED_ALPHABET[index]}</Key>
        ))}
      </div>
      <div className="keyboard-row">
        {range(19, 26).map((index) => (
          <Key key={index} status={keyboardStatus[index]}>{KEYBOARD_ORDERED_ALPHABET[index]}</Key>
        ))}
      </div>
    </div>
  );
}

export default Keyboard;
