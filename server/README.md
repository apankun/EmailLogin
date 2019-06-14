# v-login
vue+express+axios实现注册登录
路由：
/index发送stock和userid（还没弄）参数到/showstock/:stock 页面

搜索股票返回json数据格式：

        
        ({
                    status: '0',
                    msg: [  
                         {"stockNum":"000001","stockName":"测试股票","stockMarket":"sz","stockAbbr":"csgp","stockForecast":"111"}
                         ],
                    result: stock
                })
status表示状态，目前只设定0(搜索成功),1(搜索失败)。
msg若成功则返回stock信息。
