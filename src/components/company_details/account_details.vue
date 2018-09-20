<template>
    <div>
        <div class="modify" @click="change_account"><i class="iconfont icon-xiugai"></i>修改</div>
        <el-form class="company_details pt20" label-width="100px" v-loading="loading" element-loading-text="给我一点时间">

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="账户名称：" class="omit1"><span>{{basic_info.username}}</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="手机号：" class="omit1"><span>{{basic_info.phone}}</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮箱：" class="omit1"><span>{{basic_info.email}}</span></el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="所属公司：" class="omit1"><span>{{basic_info.deptName}}</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="账户创建时间：" class="omit1"><span>{{basic_info.updateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="账户到期时间：" class="omit1"><span>{{basic_info.expirationDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <!-- <el-col :span="8">
                    <el-form-item label="Account Id:" class="omit1">
                        <span>{{userInfo.username}}</span>
                        <em class="ml15 cursor tr none" @click="check_key"><i class="iconfont icon-zhongzhi mr5"></i>重置key</em>
                    </el-form-item>
                </el-col> -->
                <el-col :span="8">
                    <el-form-item label="账户状态：">
                        <span>{{basic_info.delFlag == 0 ? '启用' : '停用'}}</span>
                        <!-- <el-switch class="status_change" @change="check_restart" v-model="restart" active-color="#1A8CE1" active-text="启用"></el-switch> -->
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="账户余额：">
                        <span>{{userInfo.amount | formatMoney}}元</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="余额提醒：">
                        <span>{{userInfo.warningAmount | formatMoney}}元</span>
                    </el-form-item>
                </el-col>

            </el-row>
        </el-form>

        <!--修改密码 弹框-->
        <el-dialog title="修改登录密码" :visible.sync="checkPass">
            <el-form :model="form" ref="form" :rules="rules">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="新密码" label-width="80px" prop="password">
                            <el-input v-model="form.password" placeholder="输入新密码" maxlength="12"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer">
                <el-button @click="checkPass = false">取 消</el-button>
                <el-button type="primary" @click="submit_pass">确 定</el-button>
            </span>
        </el-dialog>

        <!--点击修改-->
        <el-dialog title="账户信息修改" :visible.sync="modify_account" width='70%'>
            <el-form :model="form" ref="form" :rules="rules" label-width="110px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="余额提醒"  prop="warningAmount">
                            <el-input v-model="form.warningAmount" placeholder="请输入余额"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账户状态" prop="userType">
                            <el-input v-model="form.userType" placeholder="请输入账户状态"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="账户到期时间" prop="expirationDate">
                            <el-date-picker v-model="form.expirationDate" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer">
                <el-button @click="modify_account = false">取 消</el-button>
                <el-button type="primary" @click="change_info">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import request from "@/router/axios"
import { mapState } from "vuex"
export default {
    data () {
        return {   
            userId:this.$route.query.userId,
            restart:false,          //是否启用
            basic_info:{},          //基本信息数据
            checkPass:false,        //修改密码
            autoplay:false,         //轮播图不制动滚动
            index:0,                //轮播图默认展示第一张
            swiper_img:false,       //查看大图 默认隐藏
            data_time:'',           //账户到期时间
            modify_account:false,   //账户修改弹框
            loading:false,          //loading
            form:{
                password:''         //新密码
            },
            rules: {
                password: [
                    {required: true, trigger: 'blur', validator: Validate.validatePass }
                ]
            },
        }
    },
    mounted(){
        this.get_basicInfo();
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            dic: state => state.dic
        }),
    },
    methods: {
        //获取账户信息
        get_basicInfo(){
            this.loading = true;
            request({
                url: "/admin/user/" + this.userId,
                method: "get",
            }).then(res => {
                this.loading = false;
                this.basic_info = res.data;
                for(var i in this.dic.userType){
                    if(this.dic.userType[i].value == this.basic_info.userType){
                        this.basic_info.userTypeName = this.dic.userType[i].label;
                    }
                }
            }).catch(() => {})
        },
        //重置key
        check_key(){
            this.$confirm('确定重置key吗?', '取消', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
            }).catch(() => {
                          
            });
        },
        //启用停用
        check_restart(e){
            if(!this.restart){
               this.$confirm('确定停用吗?', '取消', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.restart = false;
                }).catch(() => {
                     this.restart = true;         
                }); 
            }
        },
        //修改密码 确认
        submit_pass(){
            this.$refs['form'].validate(valid => {
                
            })
        },
        change_info(){},

        //修改账户信息 确认
        change_account(){
            this.$router.push({path:'/admin/user/create_account', query: {type:'change',data:JSON.stringify(this.basic_info)}});
        }
    }
}
</script>

<style lang="scss" scoped>
.company_details i,.company_details em{ color: #1A8CE1;}
.status_change{ margin-left: 60px;}
//弹框样式
.modify{ line-height: 24px; color: #1A8CE1; cursor: pointer; position: absolute; right: 25px; top: 20px;}
.modify i{ color: #1A8CE1; margin-right: 5px;}
</style>
