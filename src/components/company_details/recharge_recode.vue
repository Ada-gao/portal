<template>
    <div class="pt5">
    	<div class="common_btn tr">
    		<button class="current" @click="for_account_recharge"><i class="iconfont icon-yue-copy vm"></i><span class="vm">账号充值</span></button>
    		<button :class="{'disable':list.length == 0}" @click="get_excel"><i class="iconfont icon-xiazai"></i><span class="vm">一键导出</span></button>
    	</div>
    	<!--table 列表-->
        <div class="mt20">
        	<el-table :data="list" v-if="list.length" id="out-table" v-loading="loading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="充值流水号">
                    <template slot-scope="scope"><span>{{scope.row.rechargeCode}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="所属公司">
                    <template slot-scope="scope"><span>{{scope.row.companyName}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值账号">
                    <template slot-scope="scope"><span>{{scope.row.username}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值类型">
                    <template slot-scope="scope"><span>{{scope.row.rechargeName}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值金额/元">
                    <template slot-scope="scope">
                        <span class="table_primary">{{scope.row.rechargeAmount | formatMoney}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="充值时间" >
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
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
                    <template slot-scope="scope"><span>{{scope.row.createBy}}</span></template>
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
import recharge_recode from 'components/company_details/recharge_recode'
import request from "@/router/axios";
import { getExcel } from '@/util/auth'
import { mapState } from "vuex";
export default {
	components: { recharge_recode },
    data () {
        return {
            deptId:this.$route.query.deptId,
            username:this.$route.query.username,
            list:[],			//充值记录列表
            listQuery: {
                page: 1,                //当前页数
                limit: 10,              //一页显示数据量
                userId:this.$route.query.userId
            },
            total:null,
            loading:false
        }
    },
    mounted(){
        this.get_rechargeType();
    },
    methods: {
        //获取充值类型
        get_rechargeType() {
            request({
                url: "/admin/dict/type/" + 'user_type',
                method: "get",
            }).then(res => {
                this.recharge_data = res.data;
                this.get_rechargeData();
            }).catch(() => {})
        },
        //获取充值记录
        get_rechargeData(type) {
            this.loading = true;
            if(type){
                this.limit = this.listQuery.limit;
                this.listQuery.limit = this.total
            }
            request({
                url: "/admin/rechargeRecord/rechargeRecordPage",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.loading = false;
                this.total = res.data.total;
                for(var i in res.data.records){
                    for(var j in this.recharge_data){
                        if(res.data.records[i].rechargeType == this.recharge_data[j].value){
                            res.data.records[i].rechargeName = this.recharge_data[j].label;
                        }
                    }
                }
                //导出文件判断
                if(type){
                    this.listQuery.limit = this.limit
                    this.data_proces(res.data.records)
                }else{
                    this.list = res.data.records;
                }
            })
        },
    	//跳转到账号充值
    	for_account_recharge(type){
            this.$router.push({path:'/account/handle/recharge',query: {deptId:this.deptId,username:this.username}});
    	},
    	//当前页码
        handleCurrentChange(val){
            this.listQuery.page = val;
            this.loading = true;
            this.get_rechargeData();
        },
        //每页显示多少天数据
        handleSizeChange(val){
            this.listQuery.limit = val;
            this.loading = true;
            this.get_rechargeData();
        },
        //导出
        get_excel(){
            if(this.list.length == 0) return;
            var num = Math.ceil(this.total/this.listQuery.limit);
            if(num == 1){
                this.data_proces(this.list);
            }else{
                this.get_rechargeData('excel')
            }
        },
        //导出数据处理
        data_proces(data){
            let list = []
            data.forEach((item,index) => {
                let obj = new Object()
                if (item.status){
                    item.status = '充值成功'
                } else{
                    item.status = '充值失败'
                }
                let date = new Date(item.createTime)
                item.createTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' +date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                obj.充值流水号 = item.rechargeCode
                obj.所属公司 = item.companyName
                obj.充值账号 = item.username
                obj.充值类型 = item.rechargeName
                obj.充值金额 = item.rechargeAmount.toFixed(2)
                obj.充值时间 = item.createTime
                obj.充值状态 = item.status
                obj.充值备注 = item.remark
                obj.操作人 = item.username
                list[index] = obj
            })
            getExcel(list,'充值记录.xlsx');
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
