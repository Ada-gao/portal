<template>
    <div  class="basic_info common_style box_adorn">
    	<div class="spec_head">
    		<em class="in_b"></em><span>{{type == 'change' ? '修改账号' : '新建账号'}}</span>
    	</div>
    	<div class="set_info">账户基本信息</div>
    	<div>
            <el-form :model="form" :rules="rules" ref="form" class="pt20" label-width="110px">

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="所属公司" prop="name">
                            <el-select style="width: 100%" v-model="form.deptName" placeholder="请选择所属公司" clearable @change="check_company">
                                <el-option v-for="item in company_list" :key="item.name" :label="item.name" :value="item"></el-option>
                           </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账户类型" prop="userType">
                            <el-select style="width: 100%" v-model="form.userType" placeholder="请输入账户类型" clearable @change="get_userType">
                                <el-option v-for="item in userType_list" :key="item.label" :label="item.label" :value="item.value"></el-option>
                           </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="余额提醒" prop="warningAmount">
                            <el-input v-model="form.warningAmount" placeholder="请输入余额提醒"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账户到期时间" prop="expirationDate">
                            <el-date-picker v-model="form.expirationDate" type="datetime" placeholder="请选择账户到期时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="联系人" prop="name">
                            <el-input v-model="form.name" placeholder="请输入联系人姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系手机" prop="phone">
                            <el-input v-model="form.phone" placeholder="请输入联系手机" maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="联系邮箱" prop="email">
                            <el-input v-model="form.email" placeholder="请输入联系邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职务">
                            <el-input v-model="form.position" placeholder="请输入联系人职位"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="登录账户" prop="username">
                            <el-input v-model="form.username" placeholder="请输入登录账号" maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div v-if="!type" class="product_set">产品设定</div>

                <el-row v-if="!type">
                    <el-col :span="12">
                        <el-form-item label="产品类型" label-width="80px" prop="product_type">
                            <el-select style="width:100%" v-model="form.select_data" multiple filterable allow-create default-first-option placeholder="请选择产品类型" size="medium" @change="change_product_type">
                                <el-option v-for="item in productType_list" :key="item.label" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="select_con" v-if="!type">
                <p>身份信息核验</p>
                <el-form class="form-border style"> <!--数据  :model="list"-->
                    <el-row>
                        <el-checkbox-group>
                            <el-col :span="6">
                                <el-form-item>
                                    <el-checkbox label="1" key="1"><span>二要素</span><input type="text" :value="1.2"><em>元</em></el-checkbox>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item>
                                    <el-checkbox label="2" key="2"><span>手机三要素</span><input type="text" :value="1.2"><em>元</em></el-checkbox>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item>
                                    <el-checkbox label="3" key="3"><span>银行卡三要素</span><input type="text" :value="1.2"><em>元</em></el-checkbox>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item>
                                    <el-checkbox label="4" key="4"><span>三要素</span><input type="text" :value="1.2"><em>元</em></el-checkbox>
                                </el-form-item>
                            </el-col>
                        </el-checkbox-group>
                    </el-row>
                </el-form>
            </div>
            <el-col :span="24" slot="footer" class="clearfix" style="text-align: center; float: none; margin-top: 20px;">
                <el-button class="search_btn" @click="$router.back()">取 消</el-button>
                <el-button type="primary" @click="submit" v-if="!type">提 交</el-button>
                <el-button type="primary" @click="updata" v-else>修 改</el-button>
            </el-col>
        </div>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import request from "@/router/axios";
import { fetchDeptTree,addObj,putObj } from "@/api/role";
export default {
    data () {
        return {   
            type:'',                                //type为change是为账户修改   其他为新增
            company_list:[],                        //公司列表
            userType_list:[],                       //账户类型列表
            productType_list:[],                    //产品类型列表
            product_info:[],                        //核验列表
            form:{
                deptId:'',                          //所属公司id
                deptName:'',                        //所属公司
                userType:'',                        //账户类型
                warningAmount:'',                         //余额提醒
                expirationDate:'',                  //到期时间
                name:'',                            //联系人姓名
                phone:'',                           //联系电话
                email:'',                           //公司邮箱
                position:'',                        //职务
                username:'',                    //登录账号

                product_type:'',                    //产品设定
            },
            rules: {    //表单验证
                deptName: [
                    {required: true, trigger: 'blur', message: '请选择所属公司'}
                ],
                userType: [
                     {required: true, trigger: 'blur', message: '请选择账户类型'}
                ],
                warningAmount: [
                     {required: true, trigger: 'blur', message: '请输入余额提醒'}
                ],
                expirationDate: [
                     {required: true, trigger: 'blur', message: '请选择账户到期时间'}
                ],
                contact: [
                     {required: true, trigger: 'blur', message: '请输入联系人姓名'}
                ],
                phone: [
                     {required: true, trigger: 'blur', validator: Validate.isvalidateMobile}
                ],
                email: [
                     {required: true, trigger: 'blur', validator: Validate.validEmail}
                ],
                position: [
                     {required: true, trigger: 'blur', message: '请输入公司职务'}
                ],
                username: [
                     {required: true, trigger: 'blur', message: '请输入登录账号'}
                ],
                product_type: [
                     {required: false, trigger: 'blur', message: '请选择产品类型'}
                ]
            }
        }
    },
    created() {
        this.handleDept();
        this.get_allType();
        this.get_produceType();
        if(this.$route.query.type){
            this.type = this.$route.query.type;
        }
        if(this.$route.query.data){
            this.form = JSON.parse(this.$route.query.data)
            console.log(this.form,'555')
        }
    },
    methods: {
        //获取所有类型
        get_allType(){
            request({
                url: "/admin/dict/type/" + 'user_type',
                method: "get",
            }).then(res => {
                this.userType_list = res.data;
            }).catch(() => {})
        },
        //获取公司
        handleDept() {
            fetchDeptTree().then(response => {
                this.company_list = response.data;
            });
        },
        //获取产品类型
        get_produceType(){
            request({
                url: "/admin/dict/type/" + 'product_type',
                method: "get",
            }).then(res => {
                this.productType_list = res.data;
            }).catch(() => {})
        },
        //选择产品类型
        change_product_type(e){
            this.product_info = [];
            for(var i in e){
                request({
                    url: "/admin/product/" + e[i],
                    method: "get",
                }).then(res => {
                    this.product_info.push(res.data);
                }).catch(() => {})
            }
        },
        //选择公司
        check_company(){

        },
        //选择账户类型
        get_userType(){},
        //点击提交 创建新的用户
        submit() {
            var reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
            if(!reg.test(this.form.warningAmount)){
                this.$message.error('请输入有效的余额');
                return
            }
            this.$refs['form'].validate(valid => {
                if(valid){
                    addObj(this.form).then(() => {
                        this.$message.success('修改用户信息成功')
                        this.$router.back();
                    });
                } else {
                    return false;
                }
            });
        },
        //点击修改用户信息
        updata(){
            var reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
            if(!reg.test(this.form.warningAmount)){
                this.$message.error('请输入有效的余额');
                return
            }
           this.$refs['form'].validate(valid => {
                if(valid){
                    putObj(this.form).then(() => {
                        this.$message.success('修改用户信息成功')
                        this.$router.back();
                    });
                } else {
                    return false;
                }
            }); 
        }
    }
}
</script>

<style lang="scss" scoped>
.common_style{ padding-top: 0!important;}
.set_info{ margin:20px 0 0 30px; font-size: 16px; font-weight: 600;}

//产品设定
.product_set{ margin:0 0 25px 30px; font-size: 16px; font-weight: 600;}
.select_con>p{ padding-left: 10px; margin-bottom: 15px; }
.select_con .style{ padding:0 10px;}
.select_con span{ margin-left: 5px;}
.select_con input{ width: 46px!important; height: 26px; line-height: 26px; padding:0 5px; text-align: center; border:1px solid #C8C8C8; border-radius: 2px; -webkit-border-radius: 2px; margin:0 5px; }
</style>