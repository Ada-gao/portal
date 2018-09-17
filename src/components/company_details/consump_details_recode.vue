<template>
    <div>
    	<div class="query_result_head clearfix pt25">
			<span>消费批次详情</span>
			<div class="common_btn fr"><button @click="get_excel" :class="{'disable':list.length == 0}"><i class="iconfont icon-xiazai"></i>一键导出</button></div>
		</div>
		<!--table 列表-->
        <div class="mt20">
        	<el-table id="out-table" :data="list" v-if="list.length" v-loading="loading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="消费流水号">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="产品名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyAddress}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="手机号码">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyProvince}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="身份证号码" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.industryType}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验结果">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="查询时间">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="核验状态">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="核验方式">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费金额(元)">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="查询人">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="所属公司">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box" v-if="list.length">
                <el-col :span="18">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
                <el-col :span="6">
                    <div class="tip pr">
                        <p class="tr"><em class="in_b" ref="title"><i></i>本批次：100条</em></p>
                    </div>
                </el-col>
            </div>
            <v_no_data v-if="list.length == 0"></v_no_data>
        </div>
    </div>
</template>

<script>
import request from "@/router/axios"
import { getExcel } from '@/util/auth'
export default {
    props: ['batchId'],
    data () {
        return {
        	list:[],			//查询列表
        	listQuery: {
                page: 1,                        //当前页数
                limit: 10                      //一页显示数据量
            },
            loading:false,
            total:null,
        }
    },
    created(){
        this.get_consumpDetailsData();
    },
    methods: {
        //获取消费批次详情列表
        get_consumpDetailsData(type){
            this.listQuery.batchId = this.batchId;
            if(type){
                this.limit = this.listQuery.limit;
                this.listQuery.limit = this.total
            }
            request({
                url: "/admin/consumerInfo/consumerInfoPage",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.loading = false;
                this.total = res.data.total;
                if(type){
                    this.listQuery.limit = this.limit
                    this.data_proces(res.data.records)
                }else{
                    this.list = res.data.records;
                }
            })
        },
    	//当前页码
        handleCurrentChange(val){
            this.listQuery.page = val;
            this.loading = true;
            this.get_consumpDetailsData();
        },
        //每页显示多少天数据
        handleSizeChange(val){
            this.listQuery.limit = val;
            this.loading = true;
            this.get_consumpDetailsData();
        },
        //导出
        get_excel(){
            if(this.list.length == 0) return;
            var num = Math.ceil(this.total/this.listQuery.limit);
            if(num == 1){
                this.data_proces(this.list);
            }else{
                this.get_consumpDetailsData('excel')
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
                obj.充值流水号 = item.companyCode
                obj.产品名称 = item.companyName
                obj.申请条数 = item.username
                obj.消费数量 = item.rechargeName
                obj.核验失败 = item.rechargeAmount.toFixed(2)
                obj.消费金额 = item.createTime
                obj.消费时间 = item.status
                obj.操作人 = item.username
                list[index] = obj
            })
            getExcel(list,'消费批次详情.xlsx');
        }
    },
    watch:{
        batchId:function(){
            this.get_consumpDetailsData();
        },
    }
}
</script>

<style lang="scss" scoped>
.query_result_head>span{ line-height: 32px;}
</style>
