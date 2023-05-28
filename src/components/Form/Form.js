import React from 'react';

function Form({ handleNewGuess, gameEnded }) {
  const [tentativeGuess, setTentativeGuess] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log({ tentativeGuess });
    handleNewGuess(tentativeGuess);
    setTentativeGuess('');
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">
        Enter guess:
      </label>
      <input
        disabled={gameEnded}
        type="text"
        id="guess-input"
        required
        pattern="[A-Za-z]{5}"
        title="5 letters required"
        minLength={5}
        maxLength={5}
        value={tentativeGuess}
        onChange={event => setTentativeGuess(event.target.value.toUpperCase())}
      />
    </form>
  );
}

export default Form;
