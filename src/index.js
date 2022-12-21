import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TestModeContextProvider } from './Context/TestModeContext';
import { ThemeContextProvider } from './Context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { AlertContextProvider } from './Context/AlertContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertContextProvider>
      <ThemeContextProvider>
        <TestModeContextProvider>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </TestModeContextProvider>
      </ThemeContextProvider>
    </AlertContextProvider>
    
  </React.StrictMode>
);

