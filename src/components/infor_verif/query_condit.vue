<template>
	<div>
        <div class="query_result_head clearfix pt25">
            <span>{{type == 1 ? '本次查询结果' : '所有消费批次清单'}}</span>
            <div class="common_btn fr" v-if="list.length"><button @click="get_excel" :class="{'disable':list.length == 0}"><i class="iconfont icon-xiazai"></i>一键导出</button></div>
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
                        <span>{{scope.row.succCount | setdefault('--')}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验失败">
                    <template slot-scope="scope">
                        <span>{{scope.row.failCount | setdefault('--')}}</span>
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
                    <template slot-scope="scope"><span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.createName}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <span class="table_primary cursor" @click="get_details(scope.row)">查看详情</span>
                    </template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box" v-if="type == 2">
                <el-col :span="18">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
                <el-col :span="6">
                    <div class="tip pr">
                        <p class="tr"><em class="in_b" ref="title"><i></i>累计查询量：10000条</em></p>
                    </div>
                </el-col>
            </div>
        </div>
        <!--没有数据-->
        <v_no_data v-if="list.length == 0"></v_no_data>
        <!--本批次详细核验日志-->
        <div v-if="details && list.length">
            <details_record :batchId="batchId" :type_status="type_status"></details_record>
        </div>
	</div>
</template>

<script>
import Validate from '@/util/filter_rules'
import details_record from 'components/infor_verif/details_record'
import { getExcel } from '@/util/auth'
export default {
    props:['list','listQuery','total','loading','type_status'],
	components: { details_record },
    data () {
        return {
            type:1,             // 1为信息核验    2为历史结果查询  默认为1
            details:false       //详情默认不显示为false
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
            getExcel('out-table','核验记录.xlsx');
        }
    },
    watch:{
        list:function(val){
            if(this.list.length == 0){
                this.details = false;
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
