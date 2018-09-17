<template>
    <div class="basic_info common_style box_adorn mt20">
    	<div class="common_head omit1">
            <i class="iconfont icon-552cde89f09d1"></i>
            <em class="font16">充值列表</em>
            <div class="common_btn fr"><button :class="{'disable':list.length == 0}" @click="get_excel"><i class="iconfont icon-xiazai"></i>一键导出</button></div>
        </div>
        <el-form :model="listQuery" :rules="rules" id="out-table" ref="form" class="pt20">
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-form-item>
                        <el-input v-model="listQuery.companyName" placeholder="输入所属公司名称" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="7">
                    <el-form-item>
                        <el-select style="width: 100%" v-model="listQuery.rechargeType" placeholder="选择充值类型" clearable>
  		                	<el-option v-for="item in recharge_data" :key="item.label" :label="item.label" :value="item.value"></el-option>
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

                <el-table-column align="center" label="充值金额(元)">
                    <template slot-scope="scope"><span class="table_primary">{{scope.row.rechargeAmount | formatMoney}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值时间">
                    <template slot-scope="scope"><span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="充值状态">
                    <template slot-scope="scope"><span class="table_success">充值成功</span></template>
                </el-table-column>

                <el-table-column align="center" label="备注" show-overflow-tooltip>
                    <template slot-scope="scope"><span>{{scope.row.remark}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.createBy}}</span></template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box">
                <el-col :span="24">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
            </div>
        </div>
        <!--没有数据-->
        <v_no_data v-if="list.length == 0"></v_no_data>
    </div>
</template>

<script>
import { getExcel } from '@/util/auth'
import Validate from '@/util/filter_rules'
import request from "@/router/axios"
import { mapState } from "vuex"
export default {
    data () {
        return {
            recharge_data:[
                {
                    label:'充值失败',
                    value:0
                },
                {
                    label:'充值成功',
                    value:1
                }
            ],           //充值类型数据					
            list:[],                    //账号列表数据
            listQuery: {
                page: 1,                //当前页数
                limit: 10,              //一页显示数据量
                companyName:'',         //公司名称
                rechargeType:'',        //充值类型
            },
            total:null,
            loading:false,
            rules: {}	//表单验证
        }
    },
    computed: {
        ...mapState({
            dic: state => state.dic
        }),
    },
    mounted(){
        this.get_rechargeData();
    },
    methods: {
        //获取充值记录
        get_rechargeData(type) {
            if(type){
                this.limit = this.listQuery.limit;
                this.listQuery.limit = this.total
            }
            request({
                url: "/admin/rechargeRecord/rechargeRecordPage",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.total = res.data.total;
                for(var i in res.data.records){
                    for(var j in this.dic.userType){
                        if(res.data.records[i].rechargeType == this.dic.userType[j].value){
                            res.data.records[i].rechargeName = this.dic.userType[j].label;
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
    	//点击重置
    	reset(){
    		this.listQuery = {
                page: 1,
                limit: 10,
                companyName:'',
                rechargeType:''
            },
            this.get_rechargeData();
    	},
    	//点击查询
    	verif(){
    		this.get_rechargeData();
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
.common_head{ line-height: 32px;}
</style>
