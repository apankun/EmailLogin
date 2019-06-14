<template>
   <div class="login">
       <div class="donate" circle>
           <el-button type="warning"  @mouseover.native="donateVisible=true"
                      circle>赏</el-button>
       </div>
       <div class="header">
           <span class="headerSpan" @click="back()">返回主页</span>
       </div>
       <div class="logo">
           <img src="../common/img/logo.png" alt="">
          <!-- <span>V-login</span>-->
       </div>
       <el-dialog
               title="打赏"
               :visible.sync="donateVisible"
               width="30%">
           <donote></donote>
       </el-dialog>
       <div class="login-input">
           <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <el-form-item label="" prop="email">
                <el-input v-model="ruleForm.email" clearable placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        <loading v-if="load"></loading>
                        <span v-else>注册</span>
                    </el-button>
                </el-form-item>
            </el-form>
            <p class='register'><router-link to='/login'>已有账号,去登录</router-link></p>
       </div>

   </div>
</template>

<script>
import loading from '../components/loading'
import donote from '../components/donote'
export default {
    components:{loading,donote},
    data(){
        var checkEmail = (rule, value, callback) => {
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if (!value) {
                return callback(new Error('邮箱不能为空'));
            }
            setTimeout(() => {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的邮箱'));
            }else{
                 callback();
            }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
            if (value === '') {
                callback(new Error('请输入密码'));
            }else if(!reg.test(value)){
                callback(new Error('密码长度需6-16位，且包含字母和字符'))
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return{
            ruleForm: {
                checkPass: '',
                pass: '',
                email: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                email: [
                    { validator: checkEmail, trigger: 'blur' }
                ]
            },
            load:false,
            donateVisible:false
        }
    },
    methods: {
        back(){
            this.$router.push("/");//返回上一层
        },
      submitForm(formName) {
       // this.load=true
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.load=true
              console.log(this.ruleForm)
              this.$api.user.register({
                  email:this.ruleForm.email,
                  password:this.ruleForm.pass,
                  recheck:this.ruleForm.checkPass
              }).then((res)=>{
                  console.log(res)
                  this.load=false
                  if(res.data.status=='0'){
                      this.$alert('注册成功, 请您到您的邮箱中点击激活链接来激活您的帐号', '提示', {
                        confirmButtonText: '确定',
                        callback:action => {
                            // this.$router.go(0)
                            this.$router.push('/login')
                        }
                    });
                  }else {
                      this.$message.error(res.data.msg);
                  }

              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<style lang='scss'>

    @media (max-width: 2000px) {
        .login {
            position: relative;
            width: 100%;
            height: 100%;
        //    background-image: url(../common/img/background.jpg);
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;

            .logo {
               // margin-left: 15%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img {
                    width: 60%;
                }
            }

            .header {
                position: absolute;
                right: 10px;
                top: 5px;
                .headerSpan{
                    color:#8e8e8e;
                }
            }
            .donate{
                position:absolute;
                right:20px;
                top:20px;

            }
            .login-input {
                width: 20%;
                padding: 10px;
                margin-top: 10px;
//                margin-left: 50%;

                .el-input {
                    // margin-bottom: 20px;
                    .el-input__inner {
                        border-radius: 30px !important;
                        text-align: center;
                    }
                }

                .el-button {
                    border-radius: 30px !important;
                    width: 100%;
                  //  background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }

                .register {
                    text-align: right;
                    margin: 10px;

                    a {
                      //  color: #f3a407
                        color:#f56c6c;
                    }
                }

            }
        }
    }
    @media (max-width: 1700px) {

        .login {
            position: relative;
            width: 100%;
            height: 100%;
          //  background-image: url(../common/img/background.jpg);
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;

            .logo {
               // margin-left: 15%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img {
                    width: 60%;
                }
            }

            .header {
                position: absolute;
                right: 10px;
                top: 5px;
                .headerSpan{
                    color:#8e8e8e;
                }
            }
            .donate{
                position:absolute;
                right:20px;
                top:20px;

            }
            .login-input {
                width: 20%;
                padding: 10px;
                margin-top: 10px;
//                margin-left: 50%;

                .el-input {
                    // margin-bottom: 20px;
                    .el-input__inner {
                        border-radius: 30px !important;
                        text-align: center;
                    }
                }

                .el-button {
                    border-radius: 30px !important;
                    width: 100%;
                  //  background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }

                .register {
                    text-align: right;
                    margin: 10px;

                    a {
                      //  color: #f3a407
                        color:#f56c6c;
                    }
                }

            }
        }
    }
    @media (max-width: 1025px) {

        .login {
            position: relative;
            width: 100%;
            height: 100%;
            //  background-image: url(../common/img/background.jpg);
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;

            .logo {
                // margin-left: 15%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img {
                    width: 60%;
                }
            }

            .header {
                position: absolute;
                right: 10px;
                top: 5px;
                .headerSpan{
                    color:#8e8e8e;
                }
            }
            .donate{
                position:absolute;
                right:20px;
                top:20px;

            }
            .login-input {
                width: 70%;
                padding: 10px;
                margin-top: 10px;
                //                margin-left: 50%;

                .el-input {
                    // margin-bottom: 20px;
                    .el-input__inner {
                        border-radius: 30px !important;
                        text-align: center;
                    }
                }

                .el-button {
                    border-radius: 30px !important;
                    width: 100%;
                    //  background: rgb(243, 164, 7);
                    background:#f56c6c;
                    color: #fff;
                    border: 0;
                }

                .register {
                    text-align: right;
                    margin: 10px;

                    a {
                        //  color: #f3a407
                        color:#f56c6c;
                    }
                }

            }
        }
    }


</style>
