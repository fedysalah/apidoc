import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export function init(config) {
    ReactDOM.render(
    <div>{'Hello Fedy '}</div>,
      document.getElementById('root')
    );
  }