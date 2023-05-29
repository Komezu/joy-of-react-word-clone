import React from "react";

function Key({ status, children }) {
  return (
    <div className={`key ${status}`}>
      {children}
    </div>
  );
}

export default Key;
