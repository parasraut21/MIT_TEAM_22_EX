import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import CurrencyProvider from './context/CurrencyContext';
import Header from './components/Navbar';
import Footer from './components/Footer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrencyProvider>
<Header/>
      <App />
<Footer/>
    </CurrencyProvider>
  </React.StrictMode>,
)
