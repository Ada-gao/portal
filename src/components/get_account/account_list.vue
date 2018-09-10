<template>
    <div class="basic_info common_style box_adorn mt20">
    	<div class="common_head omit1">
            <i class="iconfont icon-gongsi1"></i>
            <em class="font16">帐号列表</em>
        </div>
        <el-form :model="listQuery" :rules="rules" ref="form" class="pt20">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item prop="companyName">
                        <el-input v-model="listQuery.deptName" placeholder="输入所属公司名称" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="accountId">
                        <el-input v-model="listQuery.username" placeholder="输入账号ID"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="contactName">
                        <el-input v-model="listQuery.name" placeholder="输入联系人姓名" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="accountStatus">
                        <el-select style="width: 100%" v-model="listQuery.delFlag" placeholder="选择账户状态" clearable>
  		                	<el-option v-for="item in account_status" :key="item.label" :label="item.label" :value="item.value"></el-option>
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

                <el-table-column align="center" label="账号名称">
                    <template slot-scope="scope"><span>{{scope.row.username}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="所属公司">
                    <template slot-scope="scope"><span>{{scope.row.deptName}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="联系人">
                    <template slot-scope="scope"><span>{{scope.row.name}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="账户余额(元)">
                    <template slot-scope="scope"><span class="table_primary">{{scope.row.amount}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="查询条数">
                    <template slot-scope="scope"><span>{{scope.row.description}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="手机号">
                    <template slot-scope="scope"><span>{{scope.row.phone}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="账户状态">
                    <template slot-scope="scope"><span :class="{'table_success':scope.row.delFlag == 0,'table_fail':scope.row.delFlag == 1}">{{scope.row.delFlag == 0 ? '启用' : '停用'}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作" fixed="right">
                    <template slot-scope="scope"><a href="javascript:void(0);" @click="for_system_details(scope.row)" class="table_primary">查看详情</a></template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box">
                <el-col :span="18">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
                <el-col :span="6">
                    <div class="tip pr">
                        <p class="tr"><em class="in_b" ref="title"><i></i>累着查询次数：100次</em></p>
                    </div>
                </el-col>
            </div>
        </div>
        <v_no_data v-if="list.length == 0"></v_no_data>
    </div>
</template>

<script>
import { fetchList } from "@/api/user";
export default {
    data () {
        return {
        	account_status:[
                {
                    label:'启用',
                    value:0
                },
                {
                    label:'停用',
                    value:1
                },
            ],			//账户状态 数据
        	list:[],					//账号列表数据
        	currentPage:1,				//默认为第一页
            listQuery: {
                page: 1,
                limit: 20,
                deptName:'',            //公司名
                name:'',                //联系人姓名
                delFlag:'',             //账户状态
                username:'',            //账号id
            },
            total:null,
            rules: {}
        }
    },
    mounted(){
        this.getList();
    },
    methods: {
        //获取公司列表
        getList() {
            fetchList(this.listQuery).then(response => {
                this.list = response.data.records;
                this.total = response.data.total;
            });
        },
    	//点击重置
    	reset(){
            this.listQuery = {
                page: 1,
                limit: 20,
                deptName:'',            //公司名
                name:'',                //联系人姓名
                delFlag:'',             //账户状态
                username:'',            //账号id
            },
            this.getList()
    	},
    	//点击查询
    	verif(){
    		this.getList();
    	},
    	handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        //账号 查看详情
        for_system_details(item){
            this.$router.push({path:'/account/handle/company_details', query: {type:'1',userId:item.userId,deptId:item.deptId,username:item.username}});
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
