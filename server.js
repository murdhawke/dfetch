// Import required modules
const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5051;

// Route to fetch data from the REST API and store it in PostgreSQL
app.get('/', async (req, res) => {
    // Constructing the API URL with parameters
    //Declare important variables
    const api_key = 'E8MJ3PRaJzDYLrXtXC2uYNXF5N2MGR';
    const from = 'USD';
    const to = 'KES'; 
    const amount = '100'; 
    const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@?api_key=${$api_key}&from=${from}&to=${to}&amount=${amount}`;
    
    // Fetch data from the REST API
    const response = await axios.get(apiUrl);
    const apiData = response.data;
    console.log(apiData);

  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

