import { Box, Container, Grid, Link, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmout from './InputAmout'
import SelectCountry from './SelectCountry'
import SwitchCurrency from './SwitchCurrency'
import { CurrencyContext } from '../context/CurrencyContext'
import Chart_ from './Chart'

function Amount() {
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
const fromcurren1 ="🇺🇸 USD - United States"
setFromCurrency(fromcurren1)
const commonInputStyles = {
  /* Extract common input styles from boxStyles or define new ones */
  border: "1px solid #ccc",
  padding: "0.5rem",
  borderRadius: "4px",
  /* Add more common styles as needed */
};

const commonSelectStyles = {
  /* Extract common select styles from boxStyles or define new ones */
  border: "1px solid #ccc",
  padding: "0.5rem",
  borderRadius: "4px",
  /* Add more common styles as needed */
};

  return (
    <Container maxWidth="md" sx={boxStyles} style={{marginTop:"10px"}} >
      <Typography variant='h5' sx={{ marginBottom: "2rem" ,marginTop:"-39px"}}>Rate XE</Typography>
      <Grid container spacing={2}>
        <InputAmout />
        {/* <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" /> */}
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
          <Typography style={{color:"black"}} >{firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{resultCurrency*firstAmount} {toCurrency}</Typography>
        </Box>
      ) : ""}
      <Typography fontSize="10px" sx={{ marginTop: "3rem" }}>
  {/* <label>
   <b>Select Currency : </b> 
    <select className="currency-dropdown" style={commonSelectStyles}>
      {currencyOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label> */}

  <label style={{marginLeft:"20px"}}>
    <b> Start Date : </b>
   
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="date-input"
      style={commonInputStyles}
    />
  </label>
  <label style={{marginLeft:"20px"}} >
    <b>
    End Date : 
    </b>
    
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="date-input"
      style={commonInputStyles}
    />
  </label>
</Typography>
      <Typography fontSize="10px" sx={{ marginTop: "4rem"}}>
      <Chart_  base="U.S. dollar   (USD)" curr={currencyCodeFromToCurrency} s={startDate} e={endDate} />
      </Typography>
     
  <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
    <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{fromCurrency}  -  {toCurrency}</Typography>
    <Typography variant='body2' sx={{ marginTop: "5px" }}>
      <h2 style={{color:"black"}}>
      <b> Max Amount Date : {maxAmount}</b>
      </h2>
     
     
    </Typography>
    <Typography variant='body2' sx={{ marginTop: "5px" }}>
      <h2 style={{color:"black"}} >
      <b>
      Min Amount Date : {minAmount}  
      </b>
      </h2>
     
      
    </Typography>
  </Box>

    </Container>
  )
}

export default Amount
