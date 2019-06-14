var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Stock = require('../models/stock.js');
var LikedStock=require('../models/likedstock.js')
const createToken = require('../middleware/createToken.js')
//const checkToken = require('../middleware/checkToken.js')
const sendMail = require('../middleware/sendMail.js')
var matchStock=require('../middleware/matchStock.js')
const sha1 = require('sha1')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')


/* 注册 */
router.post('/register', function(req, res, next) {
    let userRegister = new User({
            email: req.body.email,
            password: sha1(req.body.password),
            islive: false
        })
        // 将 objectid 转换为 用户创建时间
    userRegister.create_time = moment(objectIdToTimestamp(userRegister._id))
        .format('YYYY-MM-DD HH:mm:ss');
    User.findOne({
        email: (userRegister.email).toLowerCase()
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '查询失败',
                result: ''
            })
        } else if (doc) {
            res.json({
                status: '1',
                msg: '用户名已经存在',
                result: doc
            })
        } else {
            userRegister.save((err, doc) => {
                if (err) {
                    console.log(err)
                }
                sendMail(doc.email, doc._id)
                res.json({
                    status: '0',
                    msg: '加入成功',
                    result: doc
                })

            })
        }
    })
});

/* 登录 */
router.post('/login', function(req, res, next) {
    let userLogin = new User({
        email: req.body.email,
        password: sha1(req.body.password),
        token: createToken(this.email)
    })
    console.log('userLogin:' + userLogin)

    User.findOne({
        email: (userLogin.email).toLowerCase()
    }, (err, doc) => {
        console.log('doc:' + doc)
        if (err) {
            res.json({
                status: '1',
                msg: '查询失败',
                result: err
            })
        } else if (!doc) {
            res.json({
                status: '1',
                msg: '账号不存在',
                result: doc
            })
        } else if (!doc.islive) {
            res.json({
                status: '1',
                msg: '账号未激活',
                result: ''
            })
        } else {
            if (userLogin.password == doc.password) {
                res.json({
                    status: '0',
                    msg: '登录成功',
                    result: userLogin
                })
            } else {
                res.json({
                    status: '1',
                    msg: '密码错误',
                    result: doc
                })
            }
        }
    })
});
/* 搜索股票 */
router.post('/searchStock', function(req,res) {
    let stock=matchStock(req.body.stock)
    console.log('stockInfo:' + stock)
    if(stock!="undefined"&&stock!="")
    {
        res.json({
            status: '0',
            msg: stock,
            result: stock
        })
    }else{
        res.json({
            status: '1',
            msg: '搜索失败',
            result: ''
        })
    }

});
/* 打印所有股票 */
router.post('/allStocks', function(req, res, next) {
    Stock.find({}, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '加载所有股票失败',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '加载所有股票成功',
                result: doc
            })
        }
    })
});
/*在收藏夹新增一条股票addLikedStock*/
router.post('/addLikedStock', function(req, res, next) {
    if(req.body.stockNum.indexOf(",")>=0)
    {let stockMaps = req.body.stockNum.split(",");
    for (let i = 0; i < stockMaps.length; i++) {
        console.log(stockMaps[i])
        let _likedstock = new LikedStock({
            email: req.body.email,
            stockNum: stockMaps[i]
        })
        _likedstock.save((err, doc) => {
            if (err) {
                console.log(err)
            }
            res.json({
                status: '0',
                msg: '加入成功',
                result: doc
            })

        })

    }}else{
        let _likedstock = new LikedStock({
            email: req.body.email,
            stockNum: req.body.stockNum
        })
        _likedstock.save((err, doc) => {
            if (err) {
                console.log(err)
            }
            res.json({
                status: '0',
                msg: '加入成功',
                result: doc
            })

        })
    }
});

/*在收藏夹删除一条股票addLikedStock*/
router.post('/delLikedStock', function(req, res, next){
    LikedStock.findOneAndRemove({ email: req.body.email,stockNum:req.body.stockNum }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '删除失败',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '删除成功',
                result: ''
            })
        }
    })

});
/* 打印所有用户 */
router.post('/all', function(req, res, next) {
    User.find({}, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '查询失败',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '查询成功',
                result: doc
            })
        }
    })
});

/* 删除用户 */
router.post('/delUser', function(req, res, next) {
    User.findOneAndRemove({ _id: req.body.id }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '删除失败',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '删除成功',
                result: ''
            })
        }
    })
});


/* 验证用户 */
router.get('/checkCode', function(req, res, next) {
    var email = req.query.email;
    var code = req.query.code;

    User.findOne({ email: email }, function(err, user) {
        if (user._id == code) {
            User.update({ email: email }, { islive: true }, function(err, doc) {
                if (err) {
                    res.json({
                        status: '1',
                        msg: '激活失败',
                        result: ''
                    })
                } else {
                    res.redirect("http://localhost:8080/login")
                        // res.json({
                        //     status: '1',
                        //     msg: '激活成功',
                        //     result: ''
                        // })
                }
            });
        }
    });
});


module.exports = router;
