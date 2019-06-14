var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var likedstockSchema = new Schema({
    email:String,
    stockNum: String
})


module.exports = mongoose.model('LikedStock', likedstockSchema)
