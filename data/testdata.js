const { sq } = require('../middleware/db.js');
const path = require('path');

const filePath = path.join(__dirname, './data.csv');


async function copyQuery() {
  try {
    const writeQuery = await sq.query(`COPY dailyusd FROM '${filePath}' DELIMITER ',' CSV HEADER`  );
    console.log(writeQuery);
  } catch (error) {
    console.log('THE ERROR IS:', error);
  }
}

copyQuery();
