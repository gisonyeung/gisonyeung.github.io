import React from 'react';
import { render } from 'react-dom';
import StageController from './components/StageController';

require('./src/sass/main.scss');


render(
  <StageController />
  ,
  document.querySelector('#container')
);