// import React, { useState ,useEffect} from "react";
// import Chart from "react-apexcharts";


// const Chart_ = (props) => {
//   const [matchedCurrency, setMatchedCurrency] = useState("USD");
//   const [chartData, setChartData] = useState({
//     options: {
//       chart: {
//         id: "basic-bar",
//       },
//       xaxis: {
//         categories: [0,0,0,0,0,0,0,0],
//       },
//     },
//     series: [
//       {
//         name: "series-1",
//         data: [0,0,0,0,0,0,0,0],
//       },
//     ],
//   });


 


//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('http://localhost:5000/_2012/columns', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await response.json();
  
//         const matchedCurrency = data.find((currency) =>
//           currency.endsWith(`(${props.curr})`)
//         );
  
//         console.log("Matched currency:", matchedCurrency);
  
//         if (matchedCurrency) {
//           // If the currency code matches, set the matched currency
//           setMatchedCurrency(matchedCurrency);
  
//           // Now that matchedCurrency is updated, call the second fetchData
//           fetchDataCurrency(matchedCurrency);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
  
//     fetchData();
//   }, [props.curr]);
  
//   // Separate fetchData function for /currency API
//   const fetchDataCurrency = async (matchedCurrency) => {
//     try {
//       const response = await fetch('http://localhost:5000/currency', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ currency: matchedCurrency, startDate: '3-Jan-12', endDate: '5-Jan-15' }),
//       });
//       const data = await response.json();
//       console.log("********",data)

//       const allDates = data.reduce((dates, yearData) => {
//         // Concatenate all dates from each year
//         return dates.concat(yearData.data.map(entry => entry.Date));
//       }, []);
      
//        setChartData({
//           options: {
//             chart: {
//               id: "basic-bar",
//             },
//             xaxis: {
//               categories: allDates,
//             },
//           },
//           series: data.map(yearData => ({
//             name: `series-${yearData.year}`,
//             data: yearData.data.map(entry => parseFloat(entry['Botswana pula   (BWP)']) || 0),
//           })),
//         });
  
//       // Rest of your code for processing the /currency response...
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   useEffect(() => {
//     // This useEffect runs when matchedCurrency changes
//     // Call fetchDataCurrency here to ensure it runs with the updated matchedCurrency
//     fetchDataCurrency(matchedCurrency);
//   }, [matchedCurrency]);
//   return (
//     <div className="app">
//       <div className="row">
//         <div className="mixed-chart">
//           <Chart
//             options={chartData.options}
//             series={chartData.series}
//             type="line"
//             width="500"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chart_;

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

  // Separate fetchData function for /currency API
  const fetchDataCurrency = async (matchedCurrency) => {
    try {
      const response = await fetch("http://localhost:5000/currency", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: matchedCurrency,
          startDate: "3-Jan-12",
          endDate: "5-Jan-15",
        }),
      });
      const data = await response.json();
      console.log("********", data);

      const allDates = data.reduce((dates, yearData) => {
        // Concatenate all dates from each year
        return dates.concat(yearData.data.map((entry) => entry.Date));
      }, []);

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


