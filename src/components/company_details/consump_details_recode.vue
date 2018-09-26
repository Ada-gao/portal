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
                        <span>{{scope.row.infoNo}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="产品名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.productName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="手机号码" v-if="type_staus == 2 || type_staus == 3">
                    <template slot-scope="scope">
                        <span>{{scope.row.phone}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="身份证号码" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.idCard}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验结果">
                    <template slot-scope="scope">
                        <span v-if="type_status == 0">{{scope.row.result == 0 ? '信息一致' : '信息不一致'}}</span>
                        <span v-if="(type_status == 1 || type_status == 3)">{{scope.row.result == 0 ? '信息不一致' : '信息一致'}}</span>
                        <span v-if="type_status == 2 && scope.row.result == 1">信息一致</span>
                        <span v-if="type_status == 2 && scope.row.result == 2">手机号已实名，但是身份证和姓名均与实名信息不一致</span>
                        <span v-if="type_status == 2 && scope.row.result == 3">手机号已实名，手机号和证件号一致，姓名不一致</span>
                        <span v-if="type_status == 2 && scope.row.result == 4">手机号已实名，手机号和姓名一致，身份证不一致</span>
                        <span v-if="type_status == 2 && scope.row.result == 5">其他不一致</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="查询时间">
                    <template slot-scope="scope"><span>{{scope.row.createTime | moment('YYYY-MM-DD HH:mm:ss')}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="核验状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0" class="table_primary">正在核验</span>
                        <span v-if="scope.row.status == 1" class="table_success">核验成功</span>
                        <span v-if="scope.row.status == 2" class="table_fail">核验失败</span>
                    </template>
                </el-table-column>


                <el-table-column align="center" label="核验方式">
                    <template slot-scope="scope"><span>{{scope.row.mode}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费金额(元)">
                    <template slot-scope="scope"><span>{{scope.row.amount | formatMoney}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="查询人">
                    <template slot-scope="scope"><span>{{scope.row.createBy}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="所属公司">
                    <template slot-scope="scope"><span>{{scope.row.company}}</span></template>
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
    props: ['batchId','type_status'],
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
                item.createTime = this.$moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")
                obj.消费批次号 = item.infoNo
                obj.产品名称 = item.productName
                obj.姓名 = item.name
                if(this.type_staus == 2 || this.type_staus == 3){
                    obj.手机号码 = item.phone
                }
                obj.身份证号码 = item.idCard
                if(this.type_status == 0){
                    if(item.result == 0){
                        obj.核验结果 = '信息一致'
                    }else{
                        obj.核验结果 = '信息不一致'
                    }
                }
                if(this.type_status == 1 || this.type_status == 3){
                    if(item.result == 0){
                        obj.核验结果 = '信息不一致'
                    }else{
                        obj.核验结果 = '信息一致'
                    }
                }
                if(this.type_status == 2){
                    if(item.result == 1){
                        obj.核验结果 = '信息一致'
                    }else if(item.result == 2){
                        obj.核验结果 = '手机号已实名，但是身份证和姓名均与实名信息不一致'
                    }else if(item.result == 3){
                        obj.核验结果 = '手机号已实名，手机号和证件号一致，姓名不一致'
                    }else if(item.result == 4){
                        obj.核验结果 = '手机号已实名，手机号和姓名一致，身份证不一致'
                    }else if(item.result == 5){
                        obj.核验结果 = '其他不一致'
                    }
                }
                obj.查询时间 = item.createTime
                if (item.status == 0){
                    obj.核验状态 = '正在核验'
                } else if (item.status == 1){
                    obj.核验状态 = '核验成功'
                } else {
                    obj.核验状态 = '核验失败'
                }
                obj.核验方式 = item.mode
                if(item.amount != null){
                    obj.消费金额 = item.amount.toFixed(2)
                }else{
                    obj.消费金额 = item.amount
                }
                obj.查询人 = item.createBy
                obj.所属公司 = item.company
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
