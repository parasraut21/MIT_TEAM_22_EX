import { Box, Container, Grid, Link, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmout from './components/InputAmout'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'
import Chart_ from './components/Chart'
import DateRangePicker from './components/design'
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
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{ marginBottom: "2rem"}}>Rate XE</Typography>
      <Grid container spacing={2}>
        <InputAmout />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
          <Typography>{firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{resultCurrency*firstAmount} {toCurrency}</Typography>
        </Box>
      ) : ""}
      <Typography fontSize="10px" sx={{ marginTop: "3rem"}}>
      <label>
        Select Currency:
        <select className="currency-dropdown">
  {currencyOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>
      </label>

      <label>
        Start Date :
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="date-input"
        />
      </label>
      <label>
        End Date :
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="date-input"
        />
      </label>
      </Typography>
      <Typography fontSize="10px" sx={{ marginTop: "4rem"}}>
      <Chart_  base={base} curr={currencyCodeFromToCurrency} s={startDate} e={endDate} />
      </Typography>
     
  <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
    <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{fromCurrency}  -  {toCurrency}</Typography>
    <Typography variant='body2' sx={{ marginTop: "5px" }}>
      Max Amount: {maxAmount}
    </Typography>
    <Typography variant='body2' sx={{ marginTop: "5px" }}>
      Min Amount: {minAmount}  
    </Typography>
  </Box>

    </Container>
  )
}

export default App
