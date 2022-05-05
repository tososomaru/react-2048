import React from 'react';
import './Cell.css';

const Cell = ({ number }) => (
  <div className={`cell cell-${number}`}>{number}</div>
);

export default Cell;
