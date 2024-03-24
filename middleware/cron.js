const dailyWriter = require('./dailyWriter.js');
const cron = require('node-cron');




//Schedule daily writer
async function scheduleDaily() {

    await dailyWriter.writeDaily();
    console.log('Daily writer run at:', new Date().toLocaleTimeString());
}

cron.schedule('* * * * *', () => {
    scheduleDaily();
})

module.exports = {
    scheduleDaily
}