// Import required modules and functions
const { sq, DataTypes } = require('./db.js');
const dailyData = require('../modules/daily.js');
let converter = require('json-2-csv');
const fs = require('fs');
const moment =  require('moment');
const { Client } = require('pg');
    through = require('through'),
    split = require('split');


const todayDate = new Date();
const formattedDate = moment(todayDate).format('DD-MM-YYYY '); // use moment.js to format the date to dd-mm-yyyy.


async function writeDaily() {
  const data = await dailyData.saveData();
  const csv = converter.json2csv(data);
  fs.writeFile(__dirname + '/../data/daily' + ' ' + formattedDate + '.csv', csv, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
const inFile = fs.createReadStream('../data/daily' + ' ' + formattedDate + '.csv');
    outFile = fs.createWriteStream('./out');
let headers;

const th = through(function (data) { 
  if (typeof headers === "undefined") {
    headers = data; // check for headers in the csv file.
    th.pause();
    setTimeout(function () { th.resume(); }, 5000);
  } else {
    this.queue(data + "\n");
  }
});

inFile.pipe(split())
  .pipe(th)
  .pipe(outFile)
  .on("close", function () {
    console.log("had headers: " + headers); // show headers
  });
}

async function copyQuery(){

    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'amos1023',
      database: 'forex',
    });
    await client.connect();
    const query = "COPY rates FROM '/home/amos/forex/data/daily" + ' ' + formattedDate + ".csv' DELIMITER ',' CSV HEADER";
    console.log('Connected to PostgreSQL database');
    return client;
}
// writeDaily(); // run the primary function
copyQuery()


module.exports = {
    writeDaily,
    copyQuery
};