<template>
    <div class="pt5">
    	<div class="common_btn tr">
    		<button class="current" @click="for_account_recharge"><i class="iconfont icon-yue-copy vm"></i><span class="vm">账号充值</span></button>
    		<button :class="{'disable':list.length == 0}"><i class="iconfont icon-xiazai" @click="get_excel"></i><span class="vm">一键导出</span></button>
    	</div>
    	<!--table 列表-->
        <div class="mt20">
        	<el-table :data="list" id="out-table" v-loading="loading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="充值流水号">
                    <template slot-scope="scope"><span>{{scope.row.rechargeCode}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值金额/元">
                    <template slot-scope="scope">
                        <span class="table_primary">{{scope.row.rechargeAmount | formatMoney}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="充值时间" >
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="充值状态">
                    <template slot-scope="scope"><span class="table_success">充值成功</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值备注" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.remark}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.username}}</span></template>
                </el-table-column>

            </el-table>
            <v_no_data v-if="list.length == 0"></v_no_data>
            <div v-show="list.length" class="pagination-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import recharge_recode from 'components/system_details/recharge_recode'
import request from "@/router/axios";
export default {
	components: { recharge_recode },
    data () {
        return {
            list:[],			//充值记录列表
            currentPage:1,		//当前页面为1
            listQuery: {
                page: 1,                //当前页数
                limit: 20,              //一页显示数据量
            },
            total:null,
            loading:false
        }
    },
    mounted(){
        this.get_rechargeData();
    },
    methods: {
        //获取充值记录
        get_rechargeData() {
            this.loading = true;
            request({
                url: "/admin/rechargeRecord/rechargeRecordPage",
                method: "get",
            }).then(res => {
                this.loading = false;
                this.list = res.data.records;
                this.total = res.data.total;
            }).catch(() => {})
        },
    	//跳转到账号充值
    	for_account_recharge(type){
            this.$router.push({path:'/wel/account_recharge'});
    	},
    	//当前页码
        handleCurrentChange(val){
            this.listQuery.page = val;
            this.get_rechargeData();
        },
        //每页显示多少天数据
        handleSizeChange(val){
            this.listQuery.limit = val;
            this.get_rechargeData();
        },
        //导出
        get_excel(){
            if(!this.list.length) return;
            getExcel('out-table','充值记录记录.xlsx');
        },
    }
}
</script>

<style lang="scss" scoped>
</style>
