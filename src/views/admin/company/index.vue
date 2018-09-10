<template>
    <div class="app-container calendar-list-container">
        <div class="common_head omit1">
            <i class="iconfont icon-gongsi1"></i>
            <em class="font16">公司列表</em>
        </div>
        <!--筛选条件-->
        <el-form :model="listQuery" ref="form" class="pt20">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item prop="name">
                        <el-input @keyup.enter.native="handleFilter" v-model="listQuery.name" placeholder="输入公司名称" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="companyProvince">
                        <el-select v-model="listQuery.companyProvince" placeholder="省份筛选">
                            <el-option v-for="item in provinceData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="industryType">
                        <el-select v-model="listQuery.industryType" placeholder="行业筛选">
                            <el-option v-for="item in industryData" :key="item.industryName" :label="item.industryName" :value="item.industryName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="orgSize">
                        <el-select v-model="listQuery.orgSize" placeholder="公司规模筛选">
                            <el-option v-for="item in orgSizeData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="common_btn tc">
            <button @click="reset"><i class="iconfont icon-zhongzhi"></i>重置</button>
            <button @click="handleFilter"><i class="iconfont el-icon-search"></i>查询</button>
        </div>

        <div class="filter-container tr">
            <el-button v-if="sys_company_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit" size="medium">
                <i class="iconfont icon-svg16"></i>新建公司
            </el-button>
        </div>

        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 99%" v-if="list.length">

            <el-table-column align="center" label="公司ID">
                <template slot-scope="scope"><span>{{scope.row.companyId}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="公司名称">
                <template slot-scope="scope">
                    <span><img v-if="scope.row.avatar" class="user-avatar" style="width: 20px; height: 20px; border-radius: 50%;" :src="scope.row.avatar+'?imageView2/1/w/20/h/20'"> {{scope.row.companyName}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="公司所在地" show-overflow-tooltip>
                <template slot-scope="scope"><span>{{scope.row.companyAddress}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="所在省份">
                <template slot-scope="scope"><span>{{scope.row.companyProvince}} </span></template>
            </el-table-column>

            <el-table-column align="center" label="所属行业">
                <template slot-scope="scope"><span>{{scope.row.industryType}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="公司规模">
                <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button v-if="sys_company_view" size="small" type="success" @click="for_company_details(scope.row)">查看详情</el-button>
                    <el-button v-if="sys_company_del" size="small" type="danger" @click="deletes(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <v_no_data v-if="list.length == 0"></v_no_data>

        <div v-show="!listLoading && list.length" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { provinceAndCityData } from 'element-china-area-data' // 省市区数据
import request from "@/router/axios";
export default {
    data() {
        return {
            provinceData: provinceAndCityData,      //省份数据
            orgSizeData:[],                         //公司规模
            industryData:[],                        //行业
            list: [],             //公司管理列表数据
            account_status:[],      //账户状态 数据
            total: null,            //数据总页码
            listLoading: true,      //加载列表数据loading
            listQuery: {
                page: 1,                //当前页数
                limit: 20,              //一页显示数据量
                name:'',                //搜索公司名称
                companyProvince:'',     //所在省份
                industryType:'',        //所属行业
                orgSize:'',             //公司规模
            },
            tableKey: 0
        };
    },
    computed: {
        ...mapGetters(["permissions"])
    },
    created() {
        //获取操作权限
        this.sys_company_view = this.permissions["sys_company_view"];
        this.sys_company_del = this.permissions["sys_company_del"];
        this.sys_company_add = this.permissions["sys_company_add"];
        this.sys_company_upd = this.permissions["sys_company_upd"];
        this.getList();
        this.get_orgSizeData();
        this.get_industryData(0);
    },
    methods: {
        //获取公司规模
        get_orgSizeData(){
            request({
                url: "/admin/dict/type/" + 'org_size',
                method: "get",
            }).then(response => {
                if(response.status == 200){
                   this.orgSizeData = response.data;
                }
            }).catch(()=>{

            })
        },
        //获取行业  一级
        get_industryData(id){
            request({
                url: "/admin/industry/" + id,
                method: "get",
            }).then(response => {
                if(response.status == 200){
                   this.industryData = response.data
                }
            }).catch(()=>{

            })
        },
        //点击重置
        reset(){
            this.$refs['form'].resetFields();
            this.getList();
        },
        //查看公司详情跳转
        for_company_details(item){
            this.$router.push({path:'/admin/company/detail', query: {companyId:item.companyId}});
        },
        //创建新公司跳转
        handleCreate() {
            this.$router.push({path:'/admin/company/create', query: {type: 'create'}});
        },
        //获取公司列表
        getList() {
            this.listLoading = true;
            request({
                url: "/admin/company/companyPage",
                method: "get",
                params:this.listQuery
            }).then(response => {
                this.listLoading = false;
                if (response.status == 200) {
                    this.total = response.data.total;
                    this.list = response.data.records;
                    for(var i in this.list){
                        for(var j in this.orgSizeData){
                           if(this.orgSizeData[j].value == this.list[i].orgSize){
                                this.list[i].orgSize = this.orgSizeData[j].label
                            } 
                        } 
                    }
                } else {
                    this.$message.error(response.data.msg);
                }
            }).catch(() => {})
        },
        //搜索
        handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        },
        //页码修改
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getList();
        },
        //页码修改
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        //点击删除
        deletes(row) {
            this.$confirm("此操作将永久删除该公司(公司名:" + row.companyName + "), 是否继续?","提示",{
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                request({
                    url: "/admin/company/" + row.companyId,
                    method: "delete",
                }).then(response => {
                    if (response.status == 200) {
                        this.getList(); 
                        this.$notify({
                            title: "成功",
                            message: "删除成功",
                            type: "success",
                            duration: 2000
                        });  
                    }
                }).catch(() => {
                    this.$notify({
                        title: "失败",
                        message: "删除失败",
                        type: "error",
                        duration: 2000
                    });
                })
            }).catch(()=>{});
        }
    }
};
</script>
<style scoped lang="scss">
.filter-item i{ color:#fff; margin-right: 10px;}
</style>
