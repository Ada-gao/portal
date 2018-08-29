<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="公司名称" v-model="listQuery.name"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            <el-button v-if="sys_company_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
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

            <el-table-column align="center" label="公司地址">
                <template slot-scope="scope"><span>{{scope.row.companyAddress}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="所在省份" show-overflow-tooltip>
                <template slot-scope="scope"><span>{{scope.row.companyProvince}} </span></template>
            </el-table-column>

            <el-table-column align="center" label="所属行业">
                <template slot-scope="scope"><span>{{scope.row.industry}}-{{scope.row.industryType}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="公司规模">
                <template slot-scope="scope"><span>{{scope.row.deptName}}</span></template>
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
import { fetchList, getObj, addObj, putObj, delObj } from "@/api/user";
import { deptRoleList, fetchDeptTree } from "@/api/role";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { mapGetters } from "vuex";
import request from "@/router/axios";
export default {
    name: "table_user",
    directives: { waves },
    data() {
        return {
            list: null,             //公司管理列表数据
            total: null,            //数据总页码
            listLoading: true,      //加载列表数据loading
            listQuery: {
                page: 1,            //当前页数
                limit: 20,          //一页显示数据量
                name:''         //搜索公司名称
            },
            tableKey: 0
        };
    },
    computed: {
        ...mapGetters(["permissions"])
    },
    created() {
        this.getList();
        this.sys_company_view = this.permissions["sys_company_view"];
        this.sys_company_del = this.permissions["sys_company_del"];
        this.sys_company_add = this.permissions["sys_company_add"];
        this.sys_company_upd = this.permissions["sys_company_upd"];
    },
    methods: {
        //查看公司详情跳转
        for_company_details(item){
            this.$router.push({path:'/admin/company/detail', query: {item: encodeURI(JSON.stringify(item))}});
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
                    this.list = response.data.records
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
