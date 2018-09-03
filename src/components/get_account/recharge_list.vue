<template>
    <div class="basic_info common_style box_adorn mt20">
    	<div class="common_head omit1">
            <i class="iconfont icon-552cde89f09d1"></i>
            <em class="font16">充值列表</em>
            <div class="common_btn fr"><button><i class="iconfont icon-xiazai"></i>一键导出</button></div>
        </div>
        <el-form :model="form" :rules="rules" ref="form" class="pt20">
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-form-item prop="companyName">
                        <el-input v-model="form.companyName" placeholder="输入所属公司名称" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="7">
                    <el-form-item prop="rechargeType">
                        <el-select style="width: 100%" v-model="form.rechargeType" placeholder="选择充值类型" clearable @change="check_status">
  		                	<el-option v-for="item in recharge_data" :key="item.value" :label="item.label" :value="item.label"></el-option>
           			   </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="7">
                    <el-form-item prop="productType">
                        <el-select style="width: 100%" v-model="form.productType" placeholder="选择产品类型" clearable @change="check_status">
                            <el-option v-for="item in product_data" :key="item.value" :label="item.label" :value="item.label"></el-option>
                       </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="common_btn tc">
        	<button @click="reset"><i class="iconfont icon-zhongzhi"></i>重置</button>
        	<button @click="verif"><i class="iconfont el-icon-search"></i>查询</button>
        </div>
        <!--table 列表-->
        <div class="mt20" v-if="list.length">
        	<el-table :data="list" v-loading="false" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="充值编号">
                    <template slot-scope="scope"><span>{{scope.row.description}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="所属公司">
                    <template slot-scope="scope"><span>{{scope.row.description}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值类型">
                    <template slot-scope="scope"><span>{{scope.row.description}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值金额(元)">
                    <template slot-scope="scope"><span class="table_primary">{{scope.row.description}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="备注" show-overflow-tooltip>
                    <template slot-scope="scope"><span>{{scope.row.description}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值时间">
                    <template slot-scope="scope"><span>{{scope.row.description}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值状态">
                    <template slot-scope="scope"><span :class="{'table_success':scope.row.sort == 1,'table_fail':scope.row.sort == 0}">{{scope.row.description}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.description}}</span></template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box">
                <el-col :span="18">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50"></el-pagination>
                </el-col>
                <el-col :span="6">
                    <div class="tip pr">
                        <p class="tr"><em class="in_b" ref="title"><i></i>累着查询金额：100元</em></p>
                    </div>
                </el-col>
            </div>
        </div>
        <!--没有数据-->
        <v_no_data v-if="list.length == 0"></v_no_data>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
export default {
    data () {
        return {
        	product_data:[],			//产品类型数据
            recharge_data:[],           //充值类型数据					
            list:[                      //账号列表数据
                {
                    "id":1,
                    "value":"0",
                    "label":"1-49人",
                    "type":"org_size",
                    "description":"公司规模",
                    "sort":0,
                    "remarks":"企业规模"
                },
                {
                    "id":1,
                    "value":"0",
                    "label":"1-49人",
                    "type":"org_size",
                    "description":"公司规模",
                    "sort":1,
                    "remarks":"企业规模"
                }
            ],
        	currentPage:1,				//默认为第一页
            form:{
            	companyName:'',		     //公司名称
            	rechargeType:'',		 //充值类型
            	productType:'',		     //产品类型
            },
            rules: {	//表单验证
                companyName: [
                    {required: true, trigger: 'blur', message: '请输入所属公司名称'}
                ],
                rechargeType: [
                    {required: true, trigger: 'blur', message: '请选择充值类型'}
                ],
                productType: [
                    {required: true, trigger: 'blur', message: '请选择产品类型'}
                ]
            }
        }
    },
    mounted(){
        
    },
    methods: {
    	//选择账户状态
    	check_status(){

    	},
    	//点击重置
    	reset(){
    		this.$refs['form'].resetFields()
    	},
    	//点击核验
    	verif(){
    		this.$refs['form'].validate(valid => {
    			console.log(valid,'111')
    		})
    	},
    	//当前页码
        handleCurrentChange(val){
            console.log(val,'111');
        },
        //每页显示多少天数据
        handleSizeChange(val){
            console.log(val,'222')
        }
    }
}
</script>

<style lang="scss" scoped>
.common_head{ line-height: 32px;}
</style>
