<template>
    <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="old_pwd">
            <el-input type="password" v-model.number="ruleForm.old_pwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
            <el-input type="password" v-model="ruleForm.new_pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="new_pwd_check">
            <el-input type="password" v-model="ruleForm.new_pwd_check" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')">确认修改</el-button>
            <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import loading from '../components/loading'

    export default {
        components:{loading},

        data() {
            var checkold_pwd = (rule, value, callback) => {
                let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
                if (value === '') {
                    callback(new Error('旧密码不能为空'));
                } else if(!reg.test(value)){
                    callback(new Error('密码长度需6-16位，且包含字母和字符'))
                } else {
                    callback();
                }
            };

            var validatePass = (rule, value, callback) => {
                let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(!reg.test(value)){
                    callback(new Error('密码长度需6-16位，且包含字母和字符'))
                } else {
                    if (this.ruleForm.new_pwd_check !== '') {
                        this.$refs.ruleForm.validateField('new_pwd_check');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.new_pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    old_pwd: '',
                    new_pwd: '',
                    new_pwd_check: ''
                },
                rules: {
                    new_pwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    new_pwd_check: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    old_pwd: [
                        { validator: checkold_pwd, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //alert('submit!');
                        this.load=true
                        console.log(this.ruleForm)
                        this.$api.user.resetpwd({
                            email:sessionStorage.getItem('username'),
                            old_pwd:this.ruleForm.old_pwd,
                            new_pwd:this.ruleForm.new_pwd
                        }).then((res)=>{
                            console.log(res)
                            this.load=false
                            if(res.data.status=='0'){
                                this.$alert('修改密码成功！');
                                this.$refs[formName].resetFields();
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
</style>
