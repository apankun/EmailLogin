<template>
    <div class="search">

        <div class="donate" circle>
            <el-button type="warning"  @mouseover.native="donateVisible=true"
                        circle>赏</el-button>
        </div>
        <div class="header-in">
            <!--  <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>-->
            <router-link :to="{ path: '/login'}"  v-if="username==null" replace>登录</router-link>
            <el-divider direction="vertical" v-if="username==null" ></el-divider>
            <router-link :to="{ path: '/register'}"  v-if="username==null" replace>注册</router-link>
           <el-dropdown v-else>
               <span >您好,{{username}}</span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native ="dialogVisible=true">收藏夹</el-dropdown-item>
                  <el-dropdown-item @click.native ="bbsVisible = true">给我留言</el-dropdown-item>
                  <el-dropdown-item @click.native ="resestpwdVisible = true">修改密码</el-dropdown-item>
                  <el-dropdown-item @click.native = "logout">登出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="logo">
            <img src="../common/img/logo.png" alt="">
            <!-- <span>V-login</span>-->
        </div>
        <el-dialog class="dialog"
                title="打赏"
                :visible.sync="donateVisible"
                width="30%">
            <donote></donote>
        </el-dialog>
        <el-dialog class="likedDialog"
                   width="50%"
                title="个人收藏夹"
                   v-if="dialogVisible==true"
                   :visible.sync="dialogVisible"
                >
            <liked  v-bind:maps="maps"></liked>
        </el-dialog>
        <el-dialog class="dialog"
                title="修改密码"
                :visible.sync="resestpwdVisible"
                width="30%"
        >
            <resetpwd></resetpwd>
        </el-dialog>
        <el-dialog class="dialog"
                title="给我留言"
                :visible.sync="bbsVisible"
                width="30%"
        >
            <bbs></bbs>
        </el-dialog>
        <div class="search-input">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm" @submit.native.prevent>
                <el-form-item label="" prop="stock">
                    <!--<el-input v-model="ruleForm.stock" clearable placeholder="请输入股票代码/名称/拼音缩写"  @keyup.enter.native="submitForm('ruleForm')"  ></el-input>-->
                    <el-autocomplete class="el-input"
                            v-model="ruleForm.stock"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入股票代码/名称/拼音缩写"
                            :trigger-on-focus="false"
                            @keyup.enter.native="submitForm('ruleForm')"
                            @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
              <!--  <el-form-item>
                    <el-button type="warning" icon="el-icon-edit" @click="clickDate()" circle>{{Say}}</el-button>
                </el-form-item>-->
                <el-form-item>
                <el-date-picker v-if="showpickdate==1" class="pickdate-class"
                            v-model="chooseday"
                            align="right"
                            type="date"
                                @change="formatTime"
                                value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    <!--<el-icon-d-arrow-left></el-icon-d-arrow-left>-->
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button-left" type="primary" @click="submitForm('ruleForm')">
                        <loading v-if="load"></loading>
                        <span v-else>Go!</span>
                    </el-button>
                    <el-tooltip placement="top">
                        <div slot="content">{{Say}}</div>
                        <el-button class="el-button-right" type="warning" icon="el-icon-time" @click="clickDate()" circle></el-button>
                    </el-tooltip>
                    <!--<p class='register' @click="logout()">登出</p>-->
                </el-form-item>
            </el-form>
        </div>
        <div class="rank"><h1 class="rankfont">排行榜</h1></div>
        <rank></rank>
    </div>
</template>

<script>

    import { setTimeout } from 'timers';
    import loading from '../components/loading'
    import liked from "../components/liked";
    import resetpwd from "../components/resetpwd";
    import bbs from "../components/bbs"
    import donote from "../components/donote"
    import rank from "../components/rank"

    const crypto = require("crypto");
    export default {
        components:{liked,loading,resetpwd,bbs,donote,rank},
        data(){

            var checkStock = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                setTimeout(() => {
                        callback();
                }, 1000);
            };
            return{
                Say:"自定义预测时间",
                showpickdate:0,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                chooseday:  new Date(),
                ruleForm: {
                    stock: ''
                },
                rules: {
                    stock: [
                        { validator: checkStock, trigger: 'blur' }
                    ]
                },
             //   email:null,
                username:null,
                load:false,
                dialogVisible: false,
                resestpwdVisible:false,
                bbsVisible:false,
                donateVisible:false,
                active: '',
                maps:[],
                mapsId:[]
            }
        },
        mounted:function(){
            this.username=sessionStorage.getItem('username');
            console.log(sessionStorage.getItem('username'));
            this.$nextTick(()=>{
                this.chooseday=this.formatDate(this.chooseday),
                   this.getAllStocks()

            })
        },

        methods: {

            querySearch(queryString, cb) {
                let maps = this.maps;
                let mapsId=this.mapsId;
                let numReg = /^[0-9]+$/
                let results;
                let numRe = new RegExp(numReg)
                if (!numRe.test(this.ruleForm.stock))
                {
                   // this.$alert("query by name!")
                    results = queryString ? maps.filter(this.createFilter(queryString)) : maps;
                }
                else
                {
                    results=queryString ? mapsId.filter(this.createFilterId(queryString)) : mapsId;
                }
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (map) => {
                    return (map.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            createFilterId(queryString) {
                return (map) => {
                    return (map.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            },
            getAllStocks(){
                this.$api.stock.getAll({}).then(({data})=>{
                    if(data.status=='0'){
                        let jsonObj=JSON.parse(data.content);
                        for (let i = 0; i < jsonObj.length; i++) {
                            let record = jsonObj[i];
                            let stockId = record['stockId'];
                            let stockName = record['stockName'];
                            this.maps.push({
                                value:stockName,
                                label: stockName,
                                key: stockId,
                            });
                            this.mapsId.push({
                                value:stockId
                            })

                        }

                    }else {
                        this.$message.error(data.message);
                    }
                })
            },
            formatDate(date) {
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            formatTime(time) {
                this.chooseday=time;   //date是绑定的值
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            clickDate(){
                if( this.showpickdate==0)
                {
                    this.showpickdate=1;
                this.Say="使用默认时间";}
                else{
                    this.showpickdate=0;
                    this.Say="自定义预测时间";
                }
            },
            submitForm(formName) {
                //this.$alert(this.chooseday);
                // this.load=true
                let md5 = crypto.createHash("md5");
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.load=true
                        console.log(this.ruleForm)
                        console.log(this.chooseday)

                        this.$api.stockPredict.getByStockId({//post请求发送到searchStock
                            stockId:this.ruleForm.stock,
                          // stock:md5.update(this.ruleForm.stock).digest("hex"),
                            // stock:this.$getCode(this.ruleForm.stock),
                            pickdate:this.chooseday
                        }).then((res)=>{
                            console.log(res)
                            this.load=false
                            if(res.data.status=='0'){
                                let stock=JSON.parse(res.data.content);
                               // this.$alert(res.data.content);
                                this.$message.success("搜索成功");
                                let stockId=stock.stockId;
                                let stockName=stock.stockName;
                                let isUp=stock.isUp;
                                let isUpStop=stock.isUpStop;
                                let stockMarket=stock.stockMarket;
                               // let stockForecast=stock.stockForecast;
                                let percentage=stock.percentage;
                                this.$router.push({ name:'showstock',query: { stockId: stockId,stockName:stockName,stockMarket:stockMarket,isUp:isUp,isUpStop:isUpStop,percentage:percentage }});

                            }else {
                                this.$message.error(res.data.message);
                            }

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

                logout(){
        this.$store.dispatch('UserLogout')
        if(! this.$store.state.token){

            this.$router.go(0)
        }else{
            this.$message.error('退出失败');
        }

    }
        }
    }
</script>

<style lang='scss'>
    @media (max-width: 2000px) {

    .search{
        position:relative;
        width: 100%;
        height: 100%;
      //  background-image: url(../common/img/background.jpg);
        background-size:100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        .rank{
            background-color:#f56c6c;
            color:#ffffff;
            height:7%;
            width:31%;
            text-align:center;
            border-radius: 30px;
            margin-bottom:10px;
            .rankfont{
                font-size:2rem;
                line-height:4rem
            }

        }
        .likedDialog{
            overflow: auto;
            .el-dialog__body {
                margin-left:50%;
                transform: translateX(-50%);
                overflow: auto;
                width:600px;
            }

        }
        .logo{
            //margin-left:15%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img{
                width: 60%;
            }
        }
        .blank{
           // align-text:center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            line-height:5rem;
        }
        .header-out{
            position:absolute;
            right:10px;
            top:5px;
        }
        .header-in{
            position:absolute;
            right:10px;
            top:5px;
        }
        .donate{
            position:absolute;
            right:20px;
            top:20px;



        }
        .search-input{
            width:20%;
            padding: 10px;
            margin-top: 10px;
 //           margin-left:50%;

          .pickdate-class{
              //  margin-left:20%;
              width:100%;
            margin:0 auto;
            }
            .el-input{
                // margin-bottom: 20px;
                .el-input__inner{
                    border-radius: 30px!important;
                    text-align: center;
                }
            }
            .el-button-left{
                border-radius: 30px!important;
                width: 40%;
                //background: rgb(243, 164, 7);
                background:#f56c6c;
                color: #fff;
                border: 0;
            }
            .el-button-right{
              //  display:inline;
                border-radius: 30px!important;
                width: 40%;
                margin-left:20%;
              //  background: rgb(243, 164, 7);
                background:#f56c6c;
                color: #fff;
                border: 0;
            }
            .register{
                display:inline;
               // text-align: right;
               margin-left:50px;
             //   color:#f3a407;
                background:#f56c6c;
            }

        }
    }
    }
    @media (max-width: 1700px) {//1680x1050 1400x1050

        .search{
            position:relative;
            width: 100%;
            height: 100%;
//            background-image: url(../common/img/background.jpg);
            background-size:100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            .logo{
               // margin-left: 30%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img{
                    width: 60%;
                }
            }

            .rank{
                background-color:#f56c6c;
                color:#ffffff;
                height:7%;
                width:31%;
                text-align:center;
                border-radius: 30px;
                margin-bottom:10px;
                .rankfont{
                    font-size:2rem;
                    line-height:4rem;
                }

            }
            .likedDialog{
                overflow: auto;
                .el-dialog__body {
                  //  position: absolute;
                  //  height:auto;
                  //  width:auto;
                    width:600px;
                    overflow: auto;
                }

            }
            .header-out{
                position:absolute;
                right:10px;
                top:5px;
            }
            .header-in{
                position:absolute;
                right:10px;
                top:5px;
            }
            .donate{
                position:absolute;
                right:20px;
                top:20px;

            }
            .search-input{
                width:20%;
                padding: 10px;
                margin-top: 10px;
//                margin-left:50%;

                .pickdate-class{
                    //  margin-left:20%;
                    width:100%;
                    margin:0 auto;
                }
                .el-input{
                    // margin-bottom: 20px;
                    .el-input__inner{
                        border-radius: 30px!important;
                        text-align: center;
                    }
                }


                .el-button-left{
                    border-radius: 30px!important;
                    width: 40%;
                   // background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }
                .el-button-right{
                    //  display:inline;
                    font-size:1em;
                    border-radius: 30px!important;
                    width: 40%;
                    margin-left:20%;
                   // background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }
                .register{
                    display:inline;
                    // text-align: right;
                    margin-left:50px;
                   // color:#f3a407;
                   color: #f56c6c;
                }

            }
        }
    }
    @media (max-width: 1700px) and (max-height:1000px) {//1600x900 1440x900

        .search{
            position:relative;
            width: 100%;
            height: 100%;
            //            background-image: url(../common/img/background.jpg);
            background-size:100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            .logo{
                // margin-left: 30%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img{
                    width: 60%;
                }
            }

            .rank{
                background-color:#f56c6c;
                color:#ffffff;
                height:9%;
                width:31%;
                text-align:center;
                border-radius: 30px;
                margin-bottom:10px;
                .rankfont{
                    font-size:2rem;
                    line-height:4rem;
                }

            }
            .likedDialog{
                overflow: auto;
                .el-dialog__body {
                    //  position: absolute;
                    //  height:auto;
                    //  width:auto;
                    width:600px;
                    overflow: auto;
                }

            }
            .header-out{
                position:absolute;
                right:10px;
                top:5px;
            }
            .header-in{
                position:absolute;
                right:10px;
                top:5px;
            }
            .donate{
                position:absolute;
                right:20px;
                top:20px;

            }
            .search-input{
                width:20%;
                padding: 10px;
                margin-top: 10px;
                //                margin-left:50%;

                .pickdate-class{
                    //  margin-left:20%;
                    width:100%;
                    margin:0 auto;
                }
                .el-input{
                    // margin-bottom: 20px;
                    .el-input__inner{
                        border-radius: 30px!important;
                        text-align: center;
                    }
                }


                .el-button-left{
                    border-radius: 30px!important;
                    width: 40%;
                    // background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }
                .el-button-right{
                    //  display:inline;
                    font-size:1em;
                    border-radius: 30px!important;
                    width: 40%;
                    margin-left:20%;
                    // background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }
                .register{
                    display:inline;
                    // text-align: right;
                    margin-left:50px;
                    // color:#f3a407;
                    color: #f56c6c;
                }

            }
        }
    }
    @media (max-width: 1281px) and (max-height:900px) {//1280x800以下

        .search{
            position:relative;
            width: 100%;
            height: 100%;
            //            background-image: url(../common/img/background.jpg);
            background-size:100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            .logo{
                // margin-left: 30%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img{
                    width: 60%;
                }
            }

            .rank{
                background-color:#f56c6c;
                color:#ffffff;
                height:9%;
                width:51%;
                text-align:center;
                border-radius: 30px;
                margin-bottom:10px;
                .rankfont{
                    font-size:2rem;
                    line-height:4rem;
                }

            }
            .likedDialog{
                overflow: auto;
                .el-dialog__body {
                    //  position: absolute;
                    //  height:auto;
                    //  width:auto;
                    width:600px;
                    overflow: auto;
                }

            }
            .header-out{
                position:absolute;
                right:10px;
                top:5px;
            }
            .header-in{
                position:absolute;
                right:10px;
                top:5px;
            }
            .donate{
                position:absolute;
                right:20px;
                top:20px;

            }
            .search-input{
                width:20%;
                padding: 10px;
                margin-top: 10px;
                //                margin-left:50%;

                .pickdate-class{
                    //  margin-left:20%;
                    width:100%;
                    margin:0 auto;
                }
                .el-input{
                    // margin-bottom: 20px;
                    .el-input__inner{
                        border-radius: 30px!important;
                        text-align: center;
                    }
                }


                .el-button-left{
                    border-radius: 30px!important;
                    width: 40%;
                    // background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }
                .el-button-right{
                    //  display:inline;
                    font-size:1em;
                    border-radius: 30px!important;
                    width: 40%;
                    margin-left:20%;
                    // background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }
                .register{
                    display:inline;
                    // text-align: right;
                    margin-left:50px;
                    // color:#f3a407;
                    color: #f56c6c;
                }

            }
        }
    }
    @media (max-width: 1020px) {

        .search{
            position:relative;
            width: 100%;
            height: 100%;
            //            background-image: url(../common/img/background.jpg);
            background-size:100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            .logo{
                // margin-left: 30%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img{
                    width: 60%;
                }
            }
            .rank{
                background-color:#f56c6c;
                color:#ffffff;
                height:5%;
                width:70%;
                text-align:center;
                border-radius: 30px;
                margin-bottom:10px;
                .rankfont{
                    font-size:2rem
                }

            }
            .likedDialog{
                width:100%;
                overflow: auto;
                .el-dialog__body {
                    //  position: absolute;
                    //  height:auto;
                    //  width:auto;
                    margin-left:50%;
                    transform: translateX(-50%);
                    padding: 6px 5px;
                    overflow: auto;
                    width:400px;
                }

            }
            .header-out{
                position:absolute;
                right:10px;
                top:5px;
            }
            .header-in{
                position:absolute;
                right:10px;
                top:5px;
            }
            .donate{
                position:absolute;
                right:20px;
                top:20px;

            }
            .search-input{
                width:70%;
                padding: 10px;
                margin-top: 10px;
                //                margin-left:50%;

                .pickdate-class{
                    //  margin-left:20%;
                    width:100%;
                    margin:0 auto;
                }
                .el-input{
                    // margin-bottom: 20px;
                    .el-input__inner{
                        border-radius: 30px!important;
                        text-align: center;
                    }
                }


                .el-button-left{
                    border-radius: 30px!important;
                    width: 40%;
                    // background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }
                .el-button-right{
                    //  display:inline;
                    font-size:1em;
                    border-radius: 30px!important;
                    width: 40%;
                    margin-left:20%;
                    // background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }
                .register{
                    display:inline;
                    // text-align: right;
                    margin-left:50px;
                    // color:#f3a407;
                    color: #f56c6c;
                }

            }
        }
    }
    @media (max-width: 767px) {

        .search{
            position:relative;
            width: 100%;
            height: 100%;
            //            background-image: url(../common/img/background.jpg);
            background-size:100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            .logo{
                // margin-left: 30%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img{
                    width: 60%;
                }
            }
            .rank{
                background-color:#f56c6c;
                color:#ffffff;
                height:5%;
                width:70%;
                text-align:center;
                border-radius: 30px;
                margin-bottom:10px;
                .rankfont{
                    font-size:1.5rem
                }

            }
            .likedDialog{
                width:100%;
                overflow: auto;
                .el-dialog__body {
                    //  position: absolute;
                    //  height:auto;
                    //  width:auto;
                    overflow: auto;
                }

            }
            .header-out{
                position:absolute;
                right:10px;
                top:5px;
            }
            .header-in{
                position:absolute;
                right:10px;
                top:5px;
            }
            .donate{
                position:absolute;
                right:20px;
                top:20px;

            }
            .search-input{
                width:70%;
                padding: 10px;
                margin-top: 10px;
                //                margin-left:50%;

                .pickdate-class{
                    //  margin-left:20%;
                    width:100%;
                    margin:0 auto;
                }
                .el-input{
                    // margin-bottom: 20px;
                    .el-input__inner{
                        border-radius: 30px!important;
                        text-align: center;
                    }
                }


                .el-button-left{
                    border-radius: 30px!important;
                    width: 40%;
                    // background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }
                .el-button-right{
                    //  display:inline;
                    font-size:1em;
                    border-radius: 30px!important;
                    width: 40%;
                    margin-left:20%;
                    // background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }
                .register{
                    display:inline;
                    // text-align: right;
                    margin-left:50px;
                    // color:#f3a407;
                    color: #f56c6c;
                }

            }
        }
    }



</style>
