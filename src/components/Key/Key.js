import React from "react";

function Key({ status, children }) {
  return (
    <div className={`${status} key`}>
      {children}
    </div>
  );
}

export default Key;
