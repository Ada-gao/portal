<template>
    <div>
		<!--table 列表-->
        <div class="mt20">
        	<el-table :data="list" v-if="list.length" v-loading="false" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="消费批次号">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="消费产品">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="产品详情">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="申请条款">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyProvince}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="消费数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.industryType}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验失败">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费金额/元">
                    <template slot-scope="scope"><span class="table_primary">{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费时间">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template slot-scope="scope"><span @click="get_consump_details" class="table_primary cursor">查看详情</span></template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box" v-if="list.length">
                <el-col :span="18">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
                <el-col :span="6">
                    <div class="tip pr">
                        <p class="tr"><em class="in_b" ref="title"><i></i>累计消费金额：10000元</em></p>
                    </div>
                </el-col>
            </div>
            <v_no_data v-if="list.length == 0"></v_no_data>
        </div>
        <!--table 结束-->

        <!--table 详情-->
        <consump_details_recode v-if="details"></consump_details_recode>
    </div>
</template>

<script>
import request from "@/router/axios"
import consump_details_recode from './consump_details_recode'
export default {
    components: { consump_details_recode },
    data () {
        return {
        	list:[],			    //查询列表
        	listQuery: {
                page: 1,            //当前页数
                limit: 10           //一页显示数据量
            },
            total:null,
            details:false            //展示消费详情  false为隐藏
        }
    },
    created(){
        
    },
    methods: {
        //展示消费详情
        get_consump_details(){
            this.details = true;
        },
    	//当前页码
        handleCurrentChange(val){
            console.log(val,'111');
        },
        //每页显示多少天数据
        handleSizeChange(val){
            console.log(val,'222')
        }
    }
}
</script>

<style lang="scss" scoped>
.query_result_head>span{ line-height: 32px;}
</style>
