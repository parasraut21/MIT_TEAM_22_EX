

import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Chart_ = (props) => {
  const [matchedCurrency, setMatchedCurrency] = useState("USD");
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

        console.log("Matched currency:", matchedCurrency);

        if (matchedCurrency) {
          // If the currency code matches, set the matched currency
          setMatchedCurrency(matchedCurrency);
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
  const fetchDataCurrency = async (matchedCurrency) => {
    try {
      const response = await fetch("http://localhost:5000/currency", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: matchedCurrency,
          startDate: props.s? formatDate(props.s):'3-Jan-12',
          endDate: props.e?formatDate(props.e):'25-Aug-22',
        }),
      });
      const data = await response.json();
  

      const allDates = data.reduce((dates, yearData) => {
        // Concatenate all dates from each year
        return dates.concat(yearData.data.map((entry) => entry.Date));
      }, [props.s,props.e ]);

      // Update the state in a callback to ensure it's based on the latest state
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
          data: yearData.data.map((entry) =>
            parseFloat(entry[matchedCurrency]) || 0
          ),
        })),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // This useEffect runs when matchedCurrency changes
    // Call fetchDataCurrency here to ensure it runs with the updated matchedCurrency
    fetchDataCurrency(matchedCurrency);
  }, [matchedCurrency]);
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
    fetchDataCurrency(matchedCurrency, props.s, props.e);
  }, [matchedCurrency, props.s, props.e]);
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default Chart_;


