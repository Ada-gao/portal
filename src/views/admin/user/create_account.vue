<template>
    <div  class="basic_info common_style box_adorn">
    	<div class="spec_head">
    		<em class="in_b"></em>
            <span v-if="type == 'change'">修改账号</span>
            <span v-if="type == 'add'">新建账号</span>
    	</div>
    	<div class="set_info">账户基本信息</div>
    	<div>
            <el-form :model="form" :rules="rules" ref="form" class="pt20" label-width="110px">

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="所属公司" prop="deptName">
                            <el-select style="width: 100%" v-model="form.deptName" @change="change_company" placeholder="请选择所属公司" clearable>
                                <el-option v-for="item in company_list" :key="item.name" :label="item.name" :value="item"></el-option>
                           </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账户类型" prop="userType">
                            <el-select style="width: 100%" v-model="form.userType" placeholder="请输入账户类型" clearable>
                                <el-option v-for="item in userType_list" :key="item.label" :label="item.label" :value="item.value"></el-option>
                           </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="余额提醒" prop="warningAmount">
                            <el-input @change="validWarn" v-model="form.warningAmount" maxlength="5" placeholder="请输入余额提醒"></el-input>
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
                    <el-col :span="12">
                        <el-form-item label="角色" prop="role">
                            <el-select class="filter-item" v-model="form.role" placeholder="请选择" multiple :multipleLimit='1'>
                                <el-option v-for="item in rolesOptions" :key="item.roleId" :label="item.roleDesc" :value="item.roleId" :disabled="isDisabled[item.delFlag]">
                                    <span style="float: left">{{ item.roleDesc }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.roleCode }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="type == 'change' && form.username != userInfo.username">
                    <el-col :span="12">
                        <el-form-item label="账号状态" prop="delFlag">
                            <el-select class="filter-item" v-model="form.delFlag" placeholder="请选择账号状态">
                                <el-option v-for="item in statusOptions" :key="item.label" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div v-if="type == 'add'" class="product_set">产品设定</div>
                <el-row v-if="type == 'add'">
                    <el-col :span="12">
                        <el-form-item label="产品类型" label-width="80px" prop="select_data">
                            <el-select style="width:100%" v-model="form.select_data" multiple filterable allow-create default-first-option placeholder="请选择产品类型" size="medium" @change="change_product_type">
                                <el-option v-for="item in productType_list" :key="item.label" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <!--产品设定-->
            <div class="select_con" v-if="type == 'add'" v-for="(plist,key) in product_info" :key="key">
                <p>{{plist[0].productTypeName}}</p>
                <el-form class="form-border style"> <!--数据  :model="list"-->
                    <el-row>
                        <el-checkbox-group v-model="checkList">
                            <el-col :span="6" v-for="(item,index) in plist" :key="index">
                                <el-form-item>
                                    <el-checkbox :label="item.productId" :key="item.productId" @change="change_product(key,index,item)">
                                    </el-checkbox>
                                    <span>{{item.productName}}</span><input type="text" :value="item.productPrice" @keyup="validNum(key,index,item)" :disabled="item.checked" v-model="item.productPrice"><em>元</em>
                                    
                                </el-form-item>
                            </el-col>
                        </el-checkbox-group>
                    </el-row>
                </el-form>
            </div>
            <!--产品设定 结束-->
            <el-col :span="24" slot="footer" class="clearfix" style="text-align: center; float: none; margin-top: 20px;">
                <el-button class="search_btn" @click="$router.back()">取 消</el-button>
                <el-button type="primary" @click="submit" v-if="type == 'add'">提 交</el-button>
                <el-button type="primary" @click="updata" v-else>修 改</el-button>
            </el-col>
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDeptVisible">
            <el-tree class="filter-tree" :data="treeDeptData" :default-checked-keys="checkedKeys" check-strictly node-key="id" highlight-current ref="deptTree" :props="defaultProps" @node-click="getNodeData" default-expand-all></el-tree>
        </el-dialog>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import request from "@/router/axios"
import { addObj,putObj } from "@/api/user"
import { fetchDeptTree,deptRoleList } from "@/api/role"
import { mapState } from "vuex"
export default {
    data () {
        //验证汉字
        const validZw = (rule, value, callback) => {
            var reg = /[\u4e00-\u9fa5]/
            if (!value) {
                callback(new Error('请输入登录账户'))
            } else if (reg.test(value)) {
                callback(new Error('请您输入正确的登录账户'))
            } else {
                callback()
            }
        }
        return {   
            checkList:[],
            type:'',                                //type为change是为账户修改   add为新增
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
                product:[],                        //产品设定
                role:[],                        //角色
                delFlag:'',                     //公司状态
                roleList:[]
            },
            rules: {    //表单验证
                deptName: [
                    {required: true, trigger: 'blur', message: '请选择所属公司'}
                ],
                userType: [
                     {required: true, trigger: 'blur', message: '请选择账户类型'}
                ],
                warningAmount: [
                     {required: true, trigger: 'blur', validator: Validate.validNumber}
                ],
                expirationDate: [
                     {required: false, trigger: 'blur', message: '请选择账户到期时间'}
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
                name: [
                     {required: true, trigger: 'blur', message: '请输入联系人'}
                ],
                position: [
                     {required: true, trigger: 'blur', message: '请输入公司职务'}
                ],
                username: [
                     {required: true, trigger: 'blur', validator: validZw}
                ],
                select_data: [
                     {required: true, trigger: 'blur', message: '请选择产品类型'}
                ],
                role: [
                     {required: true, trigger: 'blur', message: '请选择角色'}
                ],
                delFlag: [
                     {required: true, trigger: 'blur', message: '请选择公司状态'}
                ]
            },
            statusOptions:[
                {
                    label:'启用',
                    value:0
                },
                {
                    label:'停用',
                    value:1
                },
            ],
            dialogDeptVisible: false,
            treeDeptData:[],
            rolesOptions: [],
            checkedKeys: [],
            textMap: {
                update: "编辑",
                create: "创建"
            },
            isDisabled: {
                0: false,
                1: true
            },
            defaultProps: {
                children: "children",
                label: "name"
            },
            dialogStatus: "create",
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo
        }),
    },
    created() {
        this.handleDept();
        this.get_allType();
        this.get_produceType();
        if(this.$route.query.type){
            this.type = this.$route.query.type;
        }
        if(this.$route.query.data){
            this.form = JSON.parse(this.$route.query.data);
            this.getNodeData();
            for(var i in this.statusOptions){
                if(this.statusOptions[i].value == this.form.delFlag){
                    this.form.delFlag = this.statusOptions[i].value
                }
            }
        }
    },
    methods: {
        //选择公司
        change_company(e){
            this.form.deptId = e.id;
            this.form.deptName = e.name;
            this.getNodeData();
        },
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
                this.treeDeptData = response.data;
            });
        },
        //获取角色列表
        getNodeData() {
            var id = this.form.deptId;
            deptRoleList(id).then(response => {
                this.rolesOptions = response.data;
                for (var i = 0; i < this.form.roleList.length; i++) {
                    this.form.role[i] = this.form.roleList[i].roleId;
                }
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
                    //数据处理
                    for(var i in this.product_info){
                        for(var j in this.product_info[i]){
                            this.$set(this.product_info[i][j],"status",1);
                            this.$set(this.product_info[i][j],"checked",true);
                            this.$set(this.product_info[i][j],"productPrice",0);
                            for(var g in this.productType_list){
                                if(this.productType_list[g].value == this.product_info[i][j].productType){
                                    this.product_info[i][j].productTypeName = this.productType_list[g].label
                                }
                            }
                        }
                    }
                }).catch(() => {})
            }
        },
        clearNoNum(price){ 
            price = price.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
            price = price.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
            price = price.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            price = price.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数 
            if(price.indexOf(".")< 0 && price !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
                price = parseFloat(price)
            } 
            return price
        }, 
        validNum(index,key,item){
            this.product_info[key][index].productPrice = this.clearNoNum(item.productPrice)
        },
        validWarn(){
            this.form.warningAmount = this.clearNoNum(this.form.warningAmount)
        },
        //选择 勾选
        change_product(key,index,item){
            if(item.checked){
                this.$set(this.product_info[key][index],"status",0);
                this.$set(this.product_info[key][index],"checked",false);
            }else{
                this.$set(this.product_info[key][index],"status",1);
                this.$set(this.product_info[key][index],"checked",true);
            }
            
        },
        //点击提交 创建新的用户
        submit() {
            for(var i=0; i< this.product_info.length;i++){
                for(var j=0; j< this.product_info[i].length;j++){
                    this.form.product.push(this.product_info[i][j])
                    if(this.form.product[i].status == 0 && !this.form.product[i].productPrice){
                        this.$toast.show({
                            text:'选中产品价格不能为零或空',
                            type:'error'
                        })
                        return
                    }
                }
            }
            this.$refs['form'].validate(valid => {
                if(valid){
                    addObj(this.form).then(() => {
                        this.$toast.show({
                            text:'创建用户信息成功',
                            type:'success'
                        })
                        this.$router.back();
                    });
                } else {
                    return false;
                }
            });
        },
        //点击修改用户信息
        updata(){
           this.$refs['form'].validate(valid => {
                if(valid){
                    putObj(this.form).then(() => {
                        this.$toast.show({
                            text:'修改用户信息成功',
                            type:'success'
                        })
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
input:disabled{ background-color: #F5F7FA;}
</style>