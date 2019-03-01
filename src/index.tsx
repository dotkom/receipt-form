import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ReceiptData } from './contexts/ReceiptData';
import './index.css';
import * as serviceWorker from './serviceWorker';

const Contexts: FC = ({ children }) => {
  return <ReceiptData>{children}</ReceiptData>;
};

ReactDOM.render(
  <Contexts>
    <App />
  </Contexts>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
