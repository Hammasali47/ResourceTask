// pages/_app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import { TaskProvider } from '../contexts/TaskContent';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <TaskProvider>
      <Component {...pageProps} />
    </TaskProvider>
  );
};

export default MyApp;
