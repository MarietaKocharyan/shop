import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider} from 'react-query';

const clinet = new QueryClient;

ReactDOM.render(
  <QueryClientProvider client={clinet}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
