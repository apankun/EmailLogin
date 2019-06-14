var express = require('express');
var router = express.Router();
var matchStock=require('../middleware/matchStock.js')


/* 搜索股票 */
router.post('/searchStock', function(req) {
    let stock=matchStock(req.body.stock)
    console.log('stockNum:' + stock)

});


module.exports = router;