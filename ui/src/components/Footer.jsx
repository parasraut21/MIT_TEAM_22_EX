import React, { useState, useEffect } from 'react';
import './Footer.css'; // Make sure to create this CSS file

const Footer = () => {
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <footer>
      <div className="exchange-rates">
        <h3>Live Exchange Rates</h3>
        <ul>
          {Object.keys(exchangeRates).slice(0, 10).map((currency) => (
            <li key={currency}>
              <span>USD to {currency}:</span> {exchangeRates[currency]}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;