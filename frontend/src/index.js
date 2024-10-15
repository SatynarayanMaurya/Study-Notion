import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { store } from './Redux/reducers';
import {Provider} from "react-redux"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

        <Provider store = {store}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
        </Provider>

      <ToastContainer autoClose={1000}/>

  </BrowserRouter>
);
reportWebVitals();
