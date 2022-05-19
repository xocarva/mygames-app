import React from 'react';
import { createRoot }  from 'react-dom/client';
import App from './App';
import './index.css';
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from './reducer/reducer';


const localStorageMiddleware = store => next => action => {
  let result = next( action );
  localStorage.setItem( 'session', JSON.stringify( store.getState().user ));
  return result;
};

const saved = localStorage.getItem( 'session' );
const initialStore = { user: saved ? JSON.parse( saved ) : undefined };
const store = createStore( rootReducer, initialStore, applyMiddleware( localStorageMiddleware ));


const container = document.getElementById('app');
const root = createRoot( container );

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>
);
