
 const express = require('express');
 const bodyParser = require('body-parser');


   const cors = require('cors');
   const app = express();
   app.use(bodyParser.json());
  app.use(cors());



const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'main',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(connection => {
    console.log('*****************Successfully connected to the database!************8');
    connection.release();
  })
  .catch(error => {
    console.error('********************Error connecting to the database: ************', error);
  });



  app.get('/_2012', async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.execute('SELECT * FROM _2012');
      connection.release();
      console.log(rows); // Logging the result to the console
      res.json(rows); // Sending the result as JSON in the response
    } catch (error) {
      console.error('Error executing the query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/_2012/columns', async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [columns] = await connection.execute(`SHOW COLUMNS FROM _2012`);
      connection.release();
  
      // Extract column names from the result excluding the first column
      const columnNames = columns.slice(1).map((column) => column.Field);
  
      console.log(columnNames); // Logging the column names to the console
      res.json(columnNames); // Sending the column names as JSON in the response
    } catch (error) {
      console.error('Error executing the query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  app.post('/currency', async (req, res) => {
    const requestedCurrency = req.body['currency'];
    const startDate = req.body['startDate'];
    const endDate = req.body['endDate'];
  
    if (!requestedCurrency) {
      return res.status(400).json({ error: 'Currency header is missing' });
    }
  
    try {
      const connection = await pool.getConnection();
  
      // Fetch data for all years
      const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
    
      const currencyData = [];
  
      for (const year of years) {
        const [rows, fields] = await connection.execute(`
          SELECT * FROM _${year}
          WHERE STR_TO_DATE(Date, '%d-%b-%y') BETWEEN STR_TO_DATE(?, '%d-%b-%y') AND STR_TO_DATE(?, '%d-%b-%y')
        `, [startDate, endDate]);
  
        if (rows.length > 0) {
          currencyData.push({
            year,
            data: rows.map(row => ({
              Date: row.Date,
              [requestedCurrency]: row[requestedCurrency],
            })),
          });
        }
      }
  
      connection.release();
  
      if (currencyData.length === 0) {
        return res.status(404).json({ error: 'Currency not found for any year' });
      }
  
      console.log(currencyData); // Logging the result to the console
      res.json(currencyData); // Sending the result as JSON in the response
    } catch (error) {
      console.error('Error executing the query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  
  
  
  
  // app.get('/currency', async (req, res) => {
  //   const requestedCurrency = req.body['currency'];
  
  //   if (!requestedCurrency) {
  //     return res.status(400).json({ error: 'Currency header is missing' });
  //   }
  
  //   try {
  //     const connection = await pool.getConnection();
  
  //     // Fetch data for all years
  //     const years = [2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022]; 
  //     const currencyData = [];
  
  //     for (const year of years) {
  //       // const [rows, fields] = await connection.execute(`SELECT * FROM _${year} WHERE \`${requestedCurrency}\` IS NOT NULL`);
  //       const [rows, fields] = await connection.execute ( `SELECT * FROM _${year}
  //       WHERE Date BETWEEN '2012-01-03' AND '5-Jan-15'`)
  
  //       if (rows.length > 0) {
  //         currencyData.push({
  //           year,
  //           data: rows.map(row => ({
  //             Date: row.Date,
  //             [requestedCurrency]: row[requestedCurrency],
  //           })),
  //         });
  //       }
  //     }
  
  //     connection.release();
  
  //     if (currencyData.length === 0) {
  //       return res.status(404).json({ error: 'Currency not found for any year' });
  //     }
  
  //     console.log(currencyData); // Logging the result to the console
  //     res.json(currencyData); // Sending the result as JSON in the response
  //   } catch (error) {
  //     console.error('Error executing the query:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });


 



app.listen(5000, () => {
    console.log('Server started on port 5000');
  });