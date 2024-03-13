const axios = require("axios");


const jsonData = {};

//Daily fetch function
/*
async function fetchDaily() {
    const response = await axios.get('https://api.fxratesapi.com/latest?api_key=fxr_live_4460a5a34e870ea527614148ceb1a3676ae3');
    return response.data;
  }
*/
function fetchDaily() {
    return axios.get('https://api.fxratesapi.com/latest?api_key=fxr_live_4460a5a34e870ea527614148ceb1a3676ae3')
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error; // Re-throwing the error for error handling at the caller level
      });
  }
  
//Transform the rates{} object into an array and create a clean json object
// async function tranformRates() {
//     const data = await fetchDaily();
//     const rates = Object.entries(data.rates);
//     const cleanRates = {};
//     for (const [key, value] of rates) {
//         cleanRates[key] = value; // create a new json object with the rates lalbels and the values
//     }
//     const timestamp = data.timestamp;
//     const date = data.date;
//     const base = data.base;
//     const terms = data.terms;
//     const privacy = data.privacy;
//     const cleanInfo = {
//         "date": date,
//         "base": base,
//         "timestamp": timestamp,
//         "terms": terms,
//         "privacy": privacy,

//     }
//     // Merge the two json objects
//     const jsonData = ({ ...cleanInfo, ...cleanRates });
//     return (jsonData);
// }
function tranformRates() {
    return fetchDaily()
      .then(data => {
        const rates = Object.entries(data.rates);
        const cleanRates = {};
        for (const [key, value] of rates) {
          cleanRates[key] = value; // create a new JSON object with the rates labels and the values
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
        };
        // Merge the two JSON objects
        const jsonData = { ...cleanInfo, ...cleanRates };
        return jsonData;
      })
      .catch(error => {
        throw error; // Re-throwing the error for error handling at the caller level
      });
  }
  
  
  //Function to save data to PostgreSQL database
  // Function to create table based on JSON data labels
//   async function saveData() {
//     const dataJSON = await tranformRates();
//     console.log(JSON.stringify(dataJSON));
//     return dataJSON;

//   }

function saveData() {
    return tranformRates()
      .then(dataJSON => {
        return dataJSON;
      })
      .catch(error => {
        throw error; // Re-throwing the error for error handling at the caller level
      });
  }


module.exports = {
    saveData,
}




  