import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import trTR from 'antd/locale/tr_TR';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ConfigProvider locale={trTR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
); 