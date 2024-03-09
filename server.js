//const express =  require('express');
const axios = require("axios");
const express =  require('express');
const { Pool } = require('pg');
const fs = require('fs');


const app = express();
const port = 5051;


// PostgreSQL database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dfetch',
  password: 'amos1023',
  port: 5432,
});

//Daily fetch function
async function fetchDaily() {
  const response = await axios.get('https://api.fxratesapi.com/latest?api_key=fxr_live_4460a5a34e870ea527614148ceb1a3676ae3');
  fs.writeFile(__dirname + '/output.json', JSON.stringify(response.data), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data written to file successfully');
    }
  })
}
    
/*
// Function to save data to PostgreSQL database
async function saveToDatabase(data) {
  try {
    const columns = Object.keys(data);
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(',');
    const values = Object.values(data);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS daily (
        id SERIAL PRIMARY KEY,
        ${columns.map((column, index) => `${column} VARCHAR`).join(',')}
      );
    `;

    await pool.query(createTableQuery);

    const insertDataQuery = `
      INSERT INTO daily (${columns.join(',')})
      VALUES (${placeholders})
    `;

    await pool.query(insertDataQuery, values);
    console.log('Data saved to database successfully');
  } catch (error) {
    console.error('Error saving data to database:', error);
    throw error;
  }
}


// Fetch data from API and save to database every 24 hours
async function fetchDataAndSaveToDatabase() {
  try {
    const data = await fetchData();
    await saveToDatabase(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

*/
// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  fetchDaily();
});


/*const options = {
	"method": "GET",
	"url": "https://api.fxratesapi.com/latest?api_key=fxr_live_4460a5a34e870ea527614148ceb1a3676ae3"
};

axios.request(options).then(function (response) {
  
}).catch(function (error) {
  console.error(error);
});
*/

