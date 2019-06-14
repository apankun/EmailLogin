<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入留言标题"></el-input>
        </el-form-item>
        <el-form-item label="留言" prop="desc">
            <el-input type="textarea" placeholder="请输入留言内容" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')">立即留言</el-button>
            <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import loading from '../components/loading'

    export default {
        components:{loading},
        data() {
            return {
                ruleForm: {
                    name: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入留言标题', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    desc: [
                        { required: false, message: '请输入留言内容', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       // alert('submit!');
                        this.load=true
                        console.log(this.ruleForm)
                        this.$api.user.bbs({
                            email:sessionStorage.getItem('username'),
                            title:this.ruleForm.name,
                            message:this.ruleForm.desc
                        }).then((res)=>{
                            console.log(res)
                            this.load=false
                            if(res.data.status=='0'){
                                this.$alert('您的留言已收到，我们将尽快处理您的问题，感谢您的反馈！');
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
