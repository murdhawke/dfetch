const { raw } = require("mysql2");
const dbConfig = require("../config/db.config.js");
const seq  = require("../middleware/db.js");
const Sequelize = seq.sq;
const dailyData = require("../modules/daily.js");


async function getRawData () {
    const rawData = await dailyData.saveData();
    return rawData;
}



module.exports = {

};