// Import required modules and functions
const { sq } = require('./db.js');
const dailyData = require('../modules/daily.js');
const converter = require('json-2-csv');
const fs = require('fs');
const moment = require('moment');
const through = require('through');
const split = require('split');
const dbLauncher = require('./db.js');

const todayDate = new Date();
const formattedDate = moment(todayDate).format('DD-MM-YYYY'); // use moment.js to format the date to dd-mm-yyyy.

async function writeDaily() {
  const data = await dailyData.saveData();
  const csv = converter.json2csv(data);
  fs.writeFile(__dirname + '/../data/daily' + ' ' + formattedDate + '.csv', csv, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  const inFile = fs.createReadStream(__dirname + '/../data/daily' + ' ' + formattedDate + '.csv');
  const outFile = fs.createWriteStream(__dirname + '/out.csv');

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

async function copyQuery() {
  try {
    const writeQuery = await sq.query('SELECT * FROM public.test');
    console.log(writeQuery);
  } catch (error) {
    console.log(error);
  }
}


// writeDaily(); // run the primary function
copyQuery();

module.exports = {
  // writeDaily,
  copyQuery
};
