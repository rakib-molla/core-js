
const mongoose  = require('mongoose');
const Schema  = require('mongoose');

const HistorySchema = mongoose.Schema({
   icon: String,
   name: String,
   country: String,
   main: String,
   description: String,
   temp: String,
   pressure: String,
   humidity: String,
})

const History = mongoose.model('History', HistorySchema);

module.exports = History;