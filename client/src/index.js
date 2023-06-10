import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import TrainerStore from './store/TrainerStrore';
import NewsStore from './store/NewsStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    trainer: new TrainerStore(),
    news: new NewsStore()
  }}>
    <App />
  </Context.Provider>
);