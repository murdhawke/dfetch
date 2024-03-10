const {Client} = require('pg');
const saveData = require('../modules/daily.js');
require('dotenv').config();


module.exports.getClient = async () => {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'amos1023',
      database: 'forex',
    });
    await client.connect();
    console.log('Connected to PostgreSQL database');
    return client;
  };


