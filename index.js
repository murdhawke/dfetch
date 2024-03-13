//const express =  require('express');
const express =  require('express');
const { Pool } = require('pg');
const Test = require('./middleware/db.js');

//Initialize express server on custom port
const app = express();
const port = 5051;



  
// Start the Express server
app.listen(port, () => {
  
});

