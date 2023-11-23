# Currency Data Application with ChatGPT

This project is a full-stack web application built with React for the frontend, Node.js for the backend, and MySQL for data storage. The application focuses on currency data management and includes integration with ChatGPT for additional features.

## Features

- Display and manage currency data.
- Clean up extra spaces in currency names.
- Integration with ChatGPT for natural language interaction.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [React](https://reactjs.org/)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/currency-data-app.git
   ```

Set up the MySQL database:

Create a database and import the provided SQL schema file.

2. Install dependencies for the Node.js server:
   cd currency-data-app/server
   npm install

3. Install dependencies for the React app:
   cd ../ui
   npm install

4. Configure the database connection:
   Update the MySQL connection details in the server's .env file.

5. Start the Node.js server:
   cd ../server
   npm start

6. Start the React app:
   cd ../ui
   npm start

Project Structure
currency-data-app/
│
├── ui/              # React App
│   ├── public/
│   └── src/
│
└── server/              # Node.js Server
    ├── models/          # Database Models (e.g., Currency)
    ├── routes/          # Express Routes (e.g., cleanUpRoute)
    └── index.js         # Main Server File


Configuration
MySQL Connection: Update the MySQL connection details in the server's .env file.
Port Configuration: The server runs on port 3001 by default. You can change this in the server's index.js file.


# Your Project Name

![Project Logo](https://postimg.cc/Cdh5XyBV)
