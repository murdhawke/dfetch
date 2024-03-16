const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config.js");

// Create a Sequelize instance and connect to the PostgreSQL database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false // Disable logging for cleaner output (optional)
});

const testDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}



module.exports = {
    sq: sequelize,
    testDB,
} 