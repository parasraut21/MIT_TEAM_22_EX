import { Box, Container, Grid, Link, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmout from './components/InputAmout'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'
import Chart_ from './components/Chart'
import DateRangePicker from './components/design'
import Amount from './components/Amount'
import Footer from './components/Footer'
import Header from './components/Navbar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ContactForm from './components/Contact'
import Bothex from './components/Bothex'
function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    minAmount,
    maxAmount,
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  useEffect(() => {
    if(firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: import.meta.env.VITE_API_KEY,
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10%",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }
const currencyCodeFromToCurrency = toCurrency.match(/[A-Z]{3}/)?.[0];
const base = fromCurrency.match(/[A-Z]{3}/)?.[0];



const [currencyOptions, setCurrencyOptions] = useState([]);
  // Fetch currency options on component mount
  useEffect(() => {
    // Replace this with your actual API endpoint for fetching currency options
    fetch("http://localhost:5000/_2012/columns")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array of currency options
     
        setCurrencyOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching currency options:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount


// State for start and end dates
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");


  return (
    <>
       <Header/>
       <Router>
              <Routes>
              <Route exact path='/' element={<Amount/>} />
              <Route exact path='/bothex' element={<Bothex/>} />
              <Route exact path='/Contact' element={<ContactForm/>} />
       
       </Routes>
            </Router>
       <Footer/>
    </>
   
  )
}

export default App
