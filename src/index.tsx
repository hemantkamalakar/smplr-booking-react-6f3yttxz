import * as React from 'react';
import { FC } from 'react';
import { render } from 'react-dom';

import { SpaceViewer } from './SpaceViewer';

import './style.css';

const App: FC = () => {
  return (
    <div style={{ padding: '0 1rem' }}>
      <h1>Space booking - React</h1>
      <p>
        This example demonstrates the visualization of desk/room booking using
        smplr.js.
      </p>
      <p>
        <a href="https://docs.smplrspace.com" target="_blank">
          Learn more in the docs
        </a>
      </p>
      <SpaceViewer />
    </div>
  );
};

render(<App />, document.getElementById('root'));