import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './view/Game';
import Settings from './view/Settings';
import Layout from './view/Layout';
import { useData } from './context';

const telegram = window.Telegram.WebApp;

const App = () => {
  const { setValues } = useData();

  useEffect(() => {
    telegram.ready();
    setValues({ initData: telegram.initData, initDataUnsafe: telegram.initDataUnsafe });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Game />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>

  );
};

export default App;
