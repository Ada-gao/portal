<template>
    <div class="login-border">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules1" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
            <div class="title tc font16">找回密码</div>
            <div class="fg-cont">
                <el-steps :active="activeStep" align-center>
                    <el-step title="身份验证"></el-step>
                    <el-step title="重置登录密码"></el-step>
                    <el-step title="操作成功"></el-step>
                </el-steps>
                <!--第一步-->
                <div class="step" v-if="activeStep === 0">
                    <el-form-item prop="mobile">
                        <el-input name="mobile" type="text" size="small" v-model="loginForm.mobile" autoComplete="on" placeholder="请输入手机号或邮箱" maxlength="11"/>
                    </el-form-item>
                    <el-form-item prop="smsCode">
                        <el-col :span="24" class="pr">
                            <el-input name="smsCode" type="text" size="small" v-model="loginForm.smsCode" autoComplete="on" placeholder="请输入验证码" maxlength="4"/>
                            <div class="get_code pa" @click="get_code">{{text}}</div>
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" style="width:100%" :loading="loading" @click.native.prevent="next_step('loginForm')">下一步</el-button>
                    </el-form-item>
                    <div class="for_login cursor" @click="for_login">返回登录</div>
                </div>
                <!--第二步-->
                <div class="step" v-else-if="activeStep === 1">
                    <el-form-item prop="newPW">
                        <el-input :type="passwordType" size="small" autoComplete="on" placeholder="请输入新密码" v-model="loginForm.newPW">
                            <i slot="suffix" class="iconfont  el-input__icon" v-if="loginForm.newPW" :class="passwordType == 'password' ? 'icon-yanjing_yincang_o' : 'icon-yanjing_xianshi_o'" style="font-size: 24px;"  @click="showPassword('newPW')"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="newPW1">
                        <el-input :type="passwordType1" autoComplete="on" size="small" placeholder="请确认新密码" v-model="loginForm.newPW1">
                            <i slot="suffix" class="iconfont  el-input__icon" v-if="loginForm.newPW1" :class="passwordType1 == 'password' ? 'icon-yanjing_yincang_o' : 'icon-yanjing_xianshi_o'" style="font-size: 24px;"  @click="showPassword('newPW1')"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width:100%" :loading="loading"  @click.native.prevent="for_submit('loginForm')">确定</el-button>
                    </el-form-item>
                    <div class="for_login cursor" @click="for_login">返回登录</div>
                </div>
                <!--第三步-->
                <div class="step" v-else>
                    <div class="fg-success">
                        <i class="iconfont icon-chenggong"></i>
                        <span>设置成功！请妥善保存您的密码！</span>
                    </div>
                    <el-form-item>
                        <el-button style="width:100%" type="primary" @click="for_login">返回登录页</el-button>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
import request from "@/router/axios";
export default {
    name: "get_password",
    data() {
        return {
            passwordType:'password',
            passwordType1:'password',
            loginRules1: {
                mobile: [
                    { required: true, message: '请输入手机号或邮箱', trigger: 'blur' }
                ],
                smsCode: [
                    { required: true, message: '请输入验证码', trigger: 'change, blur' }
                ],
                newPW: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: "密码长度最少为6位", trigger: "blur" }
                ],
                newPW1: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { min: 6, message: "密码长度最少为6位", trigger: "blur" }
                ],
            },
            loginForm: {
                mobile:'',      //手机号
                smsCode:'',     //验证码
                newPW:'',       //新密码
                newPW1:'',     //确认新密码
            },
            loading: false,
            activeStep: 0,
            time: 60,
            timeFlag:false,
            pwdStep: 0,
            click_again:false,      //防止重复点击
        };
    },
    computed: {
        text: function () {
            if (this.timeFlag === false) {
                return '获取验证码'
            } else {
                return this.time > 0 ? this.time + 's' + '后重新获取' : '重新获取'
            }
        }
    },
    methods: {
        //获取验证码
        get_code: function () {
            const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            if(!this.loginForm.mobile){
                this.$message.error('请输入手机号码或邮箱')
                return;
            }
            if (this.loginForm.mobile.split('.').length > 1) {
                if (!pattern.test(this.loginForm.mobile)) {
                    this.$message.error('邮箱格式不正确')
                    return
                }
                this.code_request();
            } else {
                if (!(/^1[34578]\d{9}$/.test(this.loginForm.mobile))) {
                    this.$message.error('手机号格式不正确')
                    return
                }
                this.code_request();
            }
        },
        //获取验证码请求
        code_request(){
            if(this.click_again) return;
            this.click_again = true;
            request({
                url: "/admin/password/code",
                method: "get",
                params:{
                    number:this.loginForm.mobile
                }
            }).then(response => {
                this.click_again = false;
                if (response.data.data) {
                    this.count_down();
                    this.$message.success("验证码发送成功");
                } else {
                    this.$message.error(response.data.msg);
                }
            }).catch(() => {
                this.click_again = false;
            })
        },
        
        //倒计时
        count_down() {
            if (this.time > 0) {
                this.timeFlag = true
                this.verifyTimer = setInterval(() => {
                    --this.time
                }, 1000)
            } else {
                this.timeFlag = false
                this.time = 60
                setInterval(this.verifyTimer)
                this.verifyTimer = null
            }
        },
        //下一步
        next_step(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if(this.click_again) return;
                    this.click_again = true;
                    request({
                        url: "/admin/password/verify",
                        method: "post",
                        params:{
                            number:this.loginForm.mobile,
                            code:this.loginForm.smsCode
                        }
                    }).then(response => {
                        this.click_again = false;
                        if (response.data.code == 0) {
                            this.activeStep = 1
                        } else {
                            this.$message.error(response.data.msg);
                        }
                    }).catch(() => {
                        this.click_again = false;
                    })
                }
            })
        },
        //密码的显示与隐藏
        showPassword(type){
            if(type == 'newPW' && this.passwordType == 'password'){
                this.passwordType = 'text'
            }else{
                this.passwordType = 'password'
            }
            if(type == 'newPW1' && this.passwordType1 == 'password'){
                this.passwordType1 = 'text'
            }else{
                this.passwordType1 = 'password'
            }
        },
        //修改密码
        for_submit(formName){
            if(this.loginForm.newPW != this.loginForm.newPW1){
                this.$message.error('输入的两次密码不一致');
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if(this.click_again) return;
                    this.click_again = true;
                    request({
                        url: "/admin/password/reset",
                        method: "post",
                        params:{
                            number:this.loginForm.mobile,
                            password:this.loginForm.newPW,
                            confirmPassword:this.loginForm.newPW1
                        }
                    }).then(response => {
                        this.click_again = false;
                        if (response.data.data) {
                            this.activeStep = 2
                        } else {
                            this.$message.error(response.data.msg);
                        }
                    }).catch(() => {
                        this.click_again = false;
                    })
                }
            })
        },
        //返回登录
        for_login(){
            this.$emit("go_login")
        },
    }
};
</script>
<style lang="scss" scoped>
.login-border .title{ font-size: 14px; margin-bottom: 15px; color: #707070;}
.for_login{ font-size: 14px; text-align: right; color: #707070; }
.step{ margin-top: 15px;}
.get_code{ width: 94px; text-align: center; top: 0; right: 0; line-height: 18px; font-size: 12px; margin-top: 12px; color: #1A8CE1; border-left:1px solid #1A8CE1; cursor: pointer;}
.fg-success{ padding:30px 0 35px 0; text-align: center;}
.fg-success i{ color: #13CE66; font-size: 40px; vertical-align: middle; margin-right: 5px;}
.fg-success span{ line-height: 40px; vertical-align: middle;}
</style>
