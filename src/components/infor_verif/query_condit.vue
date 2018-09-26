<template>
	<div>
        <div class="query_result_head clearfix pt25">
            <span>{{type == 1 ? '本次查询结果' : '所有消费批次清单'}}</span>
            <div class="common_btn fr"><button @click="get_excel" :class="{'disable':list.length == 0}"><i class="iconfont icon-xiazai"></i>一键导出</button></div>
        </div>
        <!--table 列表-->
        <div class="mt20" v-if="list.length">
        	<el-table :data="list" v-loading="loading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="消费批次号">
                    <template slot-scope="scope">
                        <span>{{scope.row.batchNo}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="产品类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.productType}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.productName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="申请条数">
                    <template slot-scope="scope">
                        <span>{{scope.row.batchCount}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验成功">
                    <template slot-scope="scope">
                        <span v-if="scope.row.succCount == null">--</span>
                        <span v-else class="table_success">{{scope.row.succCount}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验失败">
                    <template slot-scope="scope">
                        <span v-if="scope.row.failCount == null">--</span>
                        <span v-else class="table_fail">{{scope.row.failCount}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="消费金额/元">
                    <template slot-scope="scope">
                        <span v-if="scope.row.monetary === null">--</span>
                        <span v-else class="table_primary">{{scope.row.monetary | formatMoney}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0" class="table_primary">正在核验</span>
                        <span v-if="scope.row.status == 1" class="table_success">核验成功</span>
                        <span v-if="scope.row.status == 2" class="table_fail">核验失败</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="消费时间">
                    <template slot-scope="scope"><span>{{scope.row.createTime | moment('YYYY-MM-DD HH:mm:ss')}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.createName}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作" width="120px">
                    <template slot-scope="scope">
                        <!-- <span class="table_primary cursor" @click="refurbish(scope.row)" v-if="type != 2">刷新/</span> -->
                        <span class="table_primary cursor" @click="get_details(scope.row)">查看详情</span>
                    </template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box" v-if="type == 2">
                <el-col :span="24">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
                <!-- <el-col :span="6">
                    <div class="tip pr">
                        <p class="tr"><em class="in_b" ref="title"><i></i>累计查询量：10000条</em></p>
                    </div>
                </el-col> -->
            </div>
        </div>
        <!--没有数据-->
        <v_no_data v-if="list.length == 0"></v_no_data>
        <!--本批次详细核验日志-->
        <details_record  v-if="details && list.length" :batchId="batchId" :type_status="type_status"></details_record>
	</div>
</template>

<script>
import Validate from '@/util/filter_rules'
import details_record from 'components/infor_verif/details_record'
import { getExcel } from '@/util/auth'
export default {
    props:['list','listQuery','total','loading','excel','excel_list'],
	components: { details_record },
    data () {
        return {
            type:1,             // 1为信息核验    2为历史结果查询  默认为1
            details:false,       //详情默认不显示为false
            batchId:''
        }
    },
    created(){
        if(this.$route.query.type){
            this.type = this.$route.query.type
        }
    },
    methods: {
    	//查看详情
    	get_details(item){
            if(item.productName == '二要素'){
                this.type_status = 0
            }else if(item.productName == '银行卡三要素'){
                this.type_status = 1
            }else if(item.productName == '手机三要素'){
                this.type_status = 2
            }else{
                this.type_status = 3        //四要素
            }
            this.details = true;
            this.batchId = item.batchId
    	},
    	//当前页码
        handleCurrentChange(val){
            this.$emit("change",'page',val)
        },
        //每页显示多少数据
        handleSizeChange(val){
            this.$emit("change",'limit',val)
        },
        //导出
        get_excel(){
            if(this.list.length == 0) return;
            if(this.type == 1){
                this.data_proces(this.list);
            }else{
                var num = Math.ceil(this.total/this.listQuery.limit);
                if(num == 1){
                    this.data_proces(this.list);
                }else{
                    this.$emit("change",'all')
                }
            }
        },
        //刷新核验批次数据
        refurbish(item){
            this.$emit("refure",item)
        },
        //导出数据处理
        data_proces(data){
            let list = []
            data.forEach((item,index) => {
                let obj = new Object()
                item.createTime = this.$moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")
                obj.消费批次号 = item.batchNo
                obj.产品类型 = item.productType
                obj.核验类型 = item.productName
                obj.申请条数 = item.batchCount
                obj.核验成功 = item.succCount
                obj.核验失败 = item.failCount
                if(item.monetary != null){
                   obj.消费金额 = item.monetary.toFixed(2) 
                }else{
                    obj.消费金额 = item.monetary
                }
                if (item.status == 0){
                    obj.核验状态 = '正在核验'
                } else if (item.status == 1){
                    obj.核验状态 = '核验成功'
                } else{
                    obj.核验状态 = '核验失败'
                }
                obj.消费时间 = item.createTime
                obj.操作人 = item.createName
                list[index] = obj
            })
            if(this.type == 2){
                getExcel(list,'所有消费批次清单.xlsx');
            }else{
                getExcel(list,'本次查询结果.xlsx');
            }
            this.$emit("changeExcel")
        }
    },
    watch:{
        list:function(val){
            this.details = false;
        },
        excel:function(){
            if(this.excel){
                this.data_proces(this.excel_list);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.el-form-item__content .el-date-editor{ width: 100%;}
.common_btn>button{ margin:0 15px; height: 32px; }
.query_result_head>span{ line-height: 32px;}
</style>
