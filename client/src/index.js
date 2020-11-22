import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export function init(config) {
    ReactDOM.render(
    <div className="card">
       <h1>Welcome to our api documentation 
         <br/>Please click on one of the links below
       </h1>
       <ul>
       <li><a href="/redoc" target="_blank">Redoc</a></li>
       <li><a href="/rapidoc" target="_blank">Rapidoc</a></li>
       <li><a href="/swagger" target="_blank">Swagger</a></li>
       </ul>
    </div>,
      document.getElementById('root')
    );
  }