import React from 'react';

import './Square.css';

export default props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};
