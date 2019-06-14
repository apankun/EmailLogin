# 说明
可能需要一些调整，有些前端请求修改了后node没有改。

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
=======
# EmailLogin
仿他人的邮箱验证登录注册功能，用express搭建后端(nodejs)，vue写前端。
>>>>>>> 432fe54d59092ba411d5418d180d905314e38092
