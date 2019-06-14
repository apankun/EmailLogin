## 前后端请求
| 功能 | 请求URL | req参数 | req参数备注 | res参数 | res参数备注 |
| :----: | :----: | :----: | :----: | :----: | :----: |
| 登录 | /users/login | email;password |  |status;message;content|  |
| 注册 | /users/register | email;password;recheck |  |status;message;content|  |
| 修改密码 | /users/resetpwd | email;old_pwd;new_pwd |  |status;message;content|  |
| 给我留言 | /users/bbs | email;title;message | title为留言标题;message为留言内容 |status;message;content|  |
| 搜索股票 | /stockPredicts/getByStockId | stockId;pickdate |pickdate为自定义预测时间  |status;message;content|  |
| 显示所有股票 | /stockPredicts/stockPredicts |  |  |status;message;content|  |
| 显示用户收藏的股票 | /stocks/stockFavorite | email |  |status;message;content| 注意返回来的content中股票信息要有stockId和stockName两个字段 |
| 在收藏夹里新增一条股票 | /stocks/addFavorite | stockNum;email |  |status;message;content|  |
| 在收藏夹里删除一条股票 | /stocks/delFavorite | stockNum;email |  |status;message;content|  |
|显示排行榜|/stocks/getRank||不需要参数|status;message;content|content包括预测准确度前50名的用户email+其准确率predictRate

## 项目功能点
| 功能 | 页面 | 备注 | 相关 |
| :----: | :----: | :----: | :----: |
|注册|register|邮箱注册,发送验证邮件,点击激活账号||
|登录|login|邮箱登录||
|搜索股票|index|股票搜索框可用代码\缩写\全拼搜索,登录用户可享有收藏夹,留言,修改密码功能||
|显示股票|showstock|显示股票涨跌情况,股票信息,可收藏或取消收藏该支股票,可返回上一页,可显示所有收藏股票||
|收藏夹模块|showstock|从个人中心点进去的收藏夹可在里面添加\删除任何股票,从显示股票面板点进去收藏夹可link到某只收藏股票的预测||
|个人中心|showstock,index|修改密码\留言\收藏夹增加删除||
|滚动排行榜|index|滚动显示准确度前50名的用户||

## 商业模式
当前是在右上角有支付宝打赏，后期要改成如何待定。


## 开发
```
#如果你要在localhost上测试：
1.删除/dist和/node_modules(非必选)
2.把vue.config.js先备份到其他地方(防止加载打包配置)
3.修改根目录文件夹下router.js里面的baseURL（平时自测时使用base: process.env.BASE_URL,
                                             打包到226tomcat使用base:'/guess/',)
4.删除package.json里面的--host 0.0.0.0
要打包的时候再改回来即可

# 安装依赖
npm install

# 启动服务
npm run serve

# 打包
npm run build

# 服务端启动
如果你要在localhost上部署服务端则在src/api/url.js文件中将服务器IP改为localhost
然后
node server/bin/www
如果不这样则直接使用我部署在服务器上的服务端

```



## 适配分辨率
```
1920x1080
1680x1050
1600x900
1440x1050
1440x900
1360x768
1366x768
1280x1024
1280x800
1280x768
1280x720
1024x768
```
