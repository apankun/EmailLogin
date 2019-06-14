var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var stockSchema = new Schema({
    stockNum: String,
    stockName: String
})


module.exports = mongoose.model('Stock', stockSchema)
