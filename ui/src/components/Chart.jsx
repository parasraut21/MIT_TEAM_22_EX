

import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useContext} from 'react'
import { CurrencyContext } from "../context/CurrencyContext";


const Chart_ = (props) => {
  const {
   setMaxAmount,
    setMinAmount,
  } = useContext(CurrencyContext);
  const [matchedCurrency, setMatchedCurrency] = useState("U.S. dollar   (USD)");
  const [matchedbCurrency, setMatchedBCurrency] = useState("U.S. dollar   (USD)");
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [0, 0, 0, 0, 0, 0, 0, 0],
      },
    },
    series: [
      {
        name: "series-1",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/_2012/columns", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        const matchedCurrency = data.find((currency) =>
          currency.endsWith(`(${props.curr})`)
        );
        const matchedBCurrency = data.find((currency) =>
        currency.endsWith(`(${props.base})`)
      );

        console.log("Matched currency:", matchedCurrency);

        if (matchedCurrency) {
          // If the currency code matches, set the matched currency
          setMatchedCurrency(matchedCurrency);
        }else{
          alert("No data found")
        }

        if(matchedBCurrency){
          setMatchedBCurrency(matchedBCurrency);
        }else{
          alert("No data found")
        }


      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [props.curr]);
  
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    const dateObject = new Date(dateString);
    const day = dateObject.toLocaleDateString('en-GB', { day: 'numeric' });
    const month = dateObject.toLocaleDateString('en-GB', { month: 'short' });
    const year = dateObject.toLocaleDateString('en-GB', { year: '2-digit' });
  
    return `${day}-${month}-${year}`;
  };
  // Separate fetchData function for /currency API

  console.log("*****=++++++++++++++==",formatDate(props.s)) 
 

  // const fetchDataCurrency2 = async (matchedCurrency,matchedbCurrency) => {
  //   try {
  //     const response = await fetch("http://localhost:5000/exchangeRate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         baseCurrency: matchedbCurrency,  // Update with the desired base currency
  //         targetCurrency: matchedCurrency,
  //         startDate: props.s ? formatDate(props.s) : '3-Jan-12',
  //         endDate: props.e ? formatDate(props.e) : '25-Aug-22',
  //       }),
  //     });
  //     const data = await response.json();
    

  //     data.forEach(yearData => {
  //       console.log(`Year: ${yearData.year}`);
  //       console.log('Exchange Rate Data:', yearData.data);
  //       console.log('Max Rate Date:', yearData.maxRateDate);
  //       setMaxAmount(yearData.maxRateDate)
  //       console.log('Min Rate Date:', yearData.minRateDate);
  //       setMinAmount(yearData.minRateDate)
  //       console.log('-----------------------');
  //     });
  
  //     const allDates = data.reduce((dates, yearData) => {
  //       return dates.concat(yearData.data.map((entry) => entry.Date));
  //     }, []);
  
  //     setChartData((prevChartData) => ({
  //       ...prevChartData,
  //       options: {
  //         ...prevChartData.options,
  //         xaxis: {
  //           categories: allDates,
  //         },
  //       },
  //       series: data.map((yearData) => ({
  //         name: `series-${yearData.year}`,
  //         data: yearData.data.map((entry) => entry.ExchangeRate || 0),
  //       })),
  //     }));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const fetchDataCurrency2 = async (matchedCurrency, matchedbCurrency) => {
    try {
      const response = await fetch("http://localhost:5000/exchangeRate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baseCurrency: matchedbCurrency,  // Update with the desired base currency
          targetCurrency: matchedCurrency,
          startDate: props.s ? formatDate(props.s) : '3-Jan-12',
          endDate: props.e ? formatDate(props.e) : '25-Aug-22',
        }),
      });
  
      const data = await response.json();
  
      // Check if data is an array before using forEach
      if (!Array.isArray(data)) {
        console.error('Invalid data format:', data);
        return;
      }
  
      data.forEach(yearData => {
        console.log(`Year: ${yearData.year}`);
        console.log('Exchange Rate Data:', yearData.data);
        console.log('Max Rate Date:', yearData.maxRateDate);
        setMaxAmount(yearData.maxRateDate)
        console.log('Min Rate Date:', yearData.minRateDate);
        setMinAmount(yearData.minRateDate);
        console.log('-----------------------');
      });
  
      const allDates = data.reduce((dates, yearData) => {
        return dates.concat(yearData.data.map((entry) => entry.Date));
      }, []);
  
      setChartData((prevChartData) => ({
        ...prevChartData,
        options: {
          ...prevChartData.options,
          xaxis: {
            categories: allDates,
          },
        },
        series: data.map((yearData) => ({
          name: `series-${yearData.year}`,
          data: yearData.data.map((entry) => entry.ExchangeRate || 0),
        })),
      }));
    } catch (error) {
      console.error(error);
    }
  };
  
  
console.log("matchedCurrency",matchedCurrency,matchedbCurrency)
  useEffect(() => {
    // This useEffect runs when matchedCurrency changes
    // Call fetchDataCurrency here to ensure it runs with the updated matchedCurrency
    // fetchDataCurrency(matchedCurrency);
    fetchDataCurrency2(matchedCurrency,matchedbCurrency);
   
  }, [matchedCurrency,matchedbCurrency]);
  useEffect(() => {
    // Replace this with your actual API endpoint for fetching currency options
    fetch("http://localhost:5000/_2012/columns")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array of currency options
     
        // setCurrencyOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching currency options:", error);
      });

    
  }, [props.s,props.e]); // Empty dependency array ensures the effect runs only once on mount
  useEffect(() => {
    // This useEffect runs when matchedCurrency, props.s, or props.e changes
    // Call fetchDataCurrency here to ensure it runs with the updated values
    // fetchDataCurrency(matchedCurrency, props.s, props.e);
    fetchDataCurrency2(matchedCurrency, matchedbCurrency,props.s, props.e);
  }, [matchedCurrency, matchedbCurrency,props.s, props.e]);
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="800"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default Chart_;


