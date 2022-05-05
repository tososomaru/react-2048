import React from 'react';
import './Cell.css';

const Cell = ({ number, additional }) => (
  <div className={`cell cell-${number} ${additional ? 'additional' : ''}`}>
    {number}
  </div>
);

export default Cell;
