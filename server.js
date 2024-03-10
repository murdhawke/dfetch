//const express =  require('express');
const axios = require("axios");
const express =  require('express');
const { Pool } = require('pg');


const app = express();
const port = 5051;
const jsonData = {};

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
  return response.data;
}

//Transform the rates{} object into an array and create a clean json object
async function tranformRates(){
  const data = await fetchDaily();
  const rates = Object.entries(data.rates);
  const cleanRates = {};
  for (const [key, value] of rates) {
    cleanRates[key] = value; // create a new json object with the rates lalbels and the values
  }
  const timestamp = data.timestamp;
  const date = data.date;
  const base = data.base;
  const terms = data.terms;
  const privacy = data.privacy;
  const cleanInfo = {
    "date": date,
    "base": base,
    "timestamp": timestamp,
    "terms": terms,
    "privacy": privacy,
    
  }
// Merge the two json objects
  const jsonData = ({...cleanInfo, ...cleanRates});
  return(jsonData);
}


//Function to save data to PostgreSQL database
// Function to create table based on JSON data labels
async function saveData() {
  const dataJSON = await tranformRates();
  console.log(JSON.stringify(dataJSON))
}


  
// Start the Express server
app.listen(port, () => {
  fetchDaily();
  tranformRates();
  saveData();
});


