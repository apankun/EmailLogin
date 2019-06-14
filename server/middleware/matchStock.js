var fs = require('fs');  //fs是读取文件的模板工具
module.exports = function(param) {
    let stock=param.toLowerCase();
    var jsonObj=JSON.parse(fs.readFileSync('../stockData/data.json'));
   // console.log(jsonObj);
   // var jsonObj = JSON.parse(data);//获取json文件对象

    for (var i = 0; i < jsonObj.length; i++) {
        var val="";
        var record = jsonObj[i];
        var stockNum = record['stockNum'];
        var stockName = record['stockName'];
        var stockMarket = record['stockMarket'];
        var stockAbbr = record['stockAbbr'];
        var stockForecast = record['stockForecast'];
        var stockRate=record['stockRate'];
        console.log(val);

        if (stock==stockNum||stock==stockName||stock==stockAbbr)//req.stock是编号或名称或缩写
        {
            console.log(record);
        //    val="stockNum:"+stockNum+";sotckName:"+stockName+";stockMarket:"+stockMarket+";stockAbbr:"+stockAbbr+";stockForecast:"+stockForecast+";";
           // console.log(val);
            val=record;

        }
        return val;
    }

}
