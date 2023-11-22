import React, { useState, useEffect } from "react";
import "./DateRangePicker.css"; // Import your CSS file

const DateRangePicker = () => {
  // State for currency options
  const [currencyOptions, setCurrencyOptions] = useState([]);

  // State for start and end dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch currency options on component mount
  useEffect(() => {
    // Replace this with your actual API endpoint for fetching currency options
    fetch("http://localhost:5000/_2012/columns")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array of currency options
        console.log("********",data)
        setCurrencyOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching currency options:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="date-range-picker-container">
      {/* Dropdown for currency options */}
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

      {/* Input field for start date */}
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="date-input"
        />
      </label>

      {/* Input field for end date */}
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="date-input"
        />
      </label>
    </div>
  );
};

export default DateRangePicker;