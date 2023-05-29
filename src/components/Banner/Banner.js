import React from 'react';

function Banner({ status, buttonAction, buttonText, children }) {
  return (
    <div className={`banner ${status}`}>
      {children}
      {buttonAction && <button className={`action ${status}`} onClick={buttonAction}>{buttonText}</button>}
    </div>
  );
}

export default Banner;
