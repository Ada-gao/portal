<template>
    <div  class="basic_info common_style box_adorn">
    	<div class="spec_head">
    		<em class="in_b"></em><span>账号充值</span>
    	</div>
    	<el-form class="pt20" :model="form" :rules="rules" ref="form" label-width="120px">
    		<el-row>
                <el-col :span="12">
                    <el-form-item label="所属公司" prop="companyName">
                        <el-select style="width: 100%" v-model="form.companyName" placeholder="选择所属公司" clearable @change="check_company">
		                	<el-option v-for="item in company_list" :key="item.name" :label="item.name" :value="item"></el-option>
          			   </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属账户" prop="username">
                        <el-select style="width: 100%" v-model="form.username" placeholder="请选择所属账户" clearable @change="get_userType">
                            <el-option v-for="item in username_list" :key="item.username" :label="item.username" :value="item.username"></el-option>
                       </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属类型" prop="userType">
                        <el-input type="text" v-model="form.userType" placeholder="请选择所属账户" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="充值金额(元)" prop="rechargeamount">
                        <el-input type="text" v-model="form.rechargeamount" placeholder="输入充值金额"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="确认金额(元)" prop="rechargeamount1">
                        <el-input type="text" v-model="form.rechargeamount1" placeholder="再次输入充值金额"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="充值备注">
                        <el-input type="textarea" rows="3" v-model="form.remark" placeholder="请输入备注内容" maxlength="12"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>

        <el-col :span="24" slot="footer" class="clearfix" style="text-align: center; float: none;">
            <el-button class="search_btn" @click="$router.back()">取 消</el-button>
            <el-button type="primary" @click="submit">提 交</el-button>
        </el-col>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import request from "@/router/axios";
import { fetchDeptTree } from "@/api/role";
export default {
    data () {
        return {
            deptId:'',                  //公司id
            username:'',                //账号名称
        	company_list:[],		     //公司列表
            username_list:{},            //账号列表
        	type_list:[],			     //充值类型
            all_type:[],
            again_click:false,
            form:{
            	companyName:'',			     //所属公司
            	userType:'',			    //充值类型
                username:'',                //所属账户
            	rechargeamount:'',			//充值金额
            	rechargeamount1:'',	        //重复充值金额
            	remark:''				    //备注
            },
            rules: {
                companyName: [
                    {required: true, trigger: 'blur', message: '请选择所属公司'}
                ],
                userType: [
                    {required: true, trigger: 'blur',  message: '请选择充值类型'}
                ],
                username: [
                    {required: true, trigger: 'blur',  message: '请选择所属账户'}
                ],
                rechargeamount: [
                    {required: true, trigger: 'blur',  message: '请输入充值金额'}
                ],
                rechargeamount1: [
                    {required: true, trigger: 'blur',  message: '请再次输入充值金额'}
                ],
            },
        }
    },
    created() {
        this.handleDept();
        this.get_allType();
        if(this.$route.query.deptId){
            this.deptId = this.$route.query.deptId;
            request({
                url: "/admin/user/recharge/" + this.deptId,
                method: "get",
            }).then(res => {
                this.username_list = res.data;
            }).catch(() => {})
        }
        if(this.$route.query.username){
            this.username = this.$route.query.username;
            this.form.username = this.username;
            this.get_userType(this.form.username)
        }
    },
    methods: {
        //获取所有类型
        get_allType(){
            request({
                url: "/admin/dict/type/" + 'user_type',
                method: "get",
            }).then(res => {
                this.all_type = res.data;
            }).catch(() => {})
        },
        //获取公司
        handleDept() {
            fetchDeptTree().then(response => {
                this.company_list = response.data;
                if(this.deptId){
                    for(var i in this.company_list){
                        if(this.company_list[i].id == this.deptId){
                            this.form.companyName = this.company_list[i].name;
                        }
                    }
                }
            });
        },
    	//选择公司 获取所属账户
    	check_company(e){
            this.form.companyName = e.name;
            request({
                url: "/admin/user/recharge/" + e.id,
                method: "get",
            }).then(res => {
                this.username_list = res.data;
            }).catch(() => {})
        },
        //获取所属类型
        get_userType(e){
            request({
                url: "/admin/user/findUserByUsername/" + e,
                method: "get",
            }).then(res => {
                this.form.userType = res.data.userType;
                for(var i in this.all_type){
                    if(this.all_type[i].value == res.data.userType){
                        this.form.userType = this.all_type[i].label
                    }
                }
            }).catch(() => {})
        },
        //提交
        submit(){
            var reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
            if(this.form.rechargeamount != this.form.rechargeamount1){
                this.$message.error('两次金额输入不一致');
                return
            }
            if(!reg.test(this.form.rechargeamount) || !reg.test(this.form.rechargeamount1)){
                this.$message.error('请输入有效金额');
                return
            }
        	this.$refs['form'].validate(valid => {
                if(valid){
                    this.$confirm('是否确认充值', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=> {
                        for(var i in this.all_type){
                            if(this.all_type[i].label == this.form.userType){
                                this.form.userType = this.all_type[i].value
                            }
                        }
                        if(this.again_click) return;
                        this.again_click = true;
                        request({
                            url: "/admin/user/recharge",
                            method: "put",
                            data:this.form
                        }).then(res => {
                            this.$message.success('充值成功');
                            this.again_click = false;
                            this.$router.back();
                        }).catch(() => {
                            this.again_click = false;
                        })
                        
                    }).then(()=> {

                    }).catch(function(err) {})
                }
    		})
        }
    }
}


</script>

<style lang="scss" scoped>
.common_style{ padding-top: 0!important;}
</style>
