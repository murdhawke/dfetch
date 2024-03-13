// Import required modules and functions
const { sq, DataTypes } = require('./db.js');
const dailyData = require('../modules/daily.js');
let converter = require('json-2-csv');
const fs = require('fs');
const moment =  require('moment');


async function writeDaily() {
  const data = await dailyData.saveData();
  const csv = converter.json2csv(data);
  const todayDate = new Date();
  const formattedDate = moment(todayDate).format('DD-MM-YYYY '); // use moment.js to format the date to dd-mm-yyyy.
  fs.writeFile('forex' + ' ' + formattedDate + '.csv', csv, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

//generate schema based of CSV


}

writeDaily();