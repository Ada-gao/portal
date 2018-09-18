<template>
    <div>
        <div class="mt20">
        	<el-table :data="list" v-if="list.length" v-loading="loading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="消费批次号">
                    <template slot-scope="scope">
                        <span>{{scope.row.batchNo}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="消费产品">
                    <template slot-scope="scope">
                        <span>{{scope.row.productType}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="产品名称">
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
                        <span v-if="scope.row.monetary == null">--</span>
                        <span v-else class="table_primary">{{scope.row.monetary | formatMoney}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="消费时间">
                    <template slot-scope="scope"><span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.createName}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template slot-scope="scope"><span @click="get_consump_details(scope.row)" class="table_primary cursor">查看详情</span></template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box" v-if="list.length">
                <el-col :span="24">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
                <!-- <el-col :span="6">
                    <div class="tip pr">
                        <p class="tr"><em class="in_b" ref="title"><i></i>累计消费金额：10000元</em></p>
                    </div>
                </el-col> -->
            </div>
            <v_no_data v-if="list.length == 0"></v_no_data>
        </div>
        <!--table 结束-->

        <!--table 详情-->
        <consump_details_recode v-if="details" :batchId="batchId"></consump_details_recode>
    </div>
</template>

<script>
import request from "@/router/axios"
import consump_details_recode from './consump_details_recode'
import { mapState } from "vuex"
export default {
    components: { consump_details_recode },
    data () {
        return {
        	list:[],			    //查询列表
        	listQuery: {
                page: 1,            //当前页数
                limit: 10,           //一页显示数据量
                createBy:this.$route.query.userId
            },
            loading:false,
            total:null,
            details:false,            //展示消费详情  false为隐藏
            batchId:null
        }
    },
    computed: {
        ...mapState({
            dic: state => state.dic
        }),
    },
    created(){
        this.get_consumpData();
    },
    methods: {
        //获取消费列表
        get_consumpData(){
            request({
                url: "/admin/consumerBatch/consumerBatch",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.loading = false;
                this.list = res.data.records;
                this.total = res.data.total;
                for(var i in this.list){
                    for(var j in this.dic.userType){
                        if(this.list[i].productType == this.dic.userType[j].value){
                            this.list[i].productType = this.dic.userType[j].label
                        }
                    }
                }
            })
        },
        //查看消费详情
        get_consump_details(item){
            this.batchId = item.batchId
            this.details = true;
        },
    	//当前页码
        handleCurrentChange(val){
            this.listQuery.page = val;
            this.loading = true;
            this.get_consumpData();
        },
        //每页显示多少天数据
        handleSizeChange(val){
            this.listQuery.limit = val;
            this.loading = true;
            this.get_consumpData();
        },
    }
}
</script>

<style lang="scss" scoped>
.query_result_head>span{ line-height: 32px;}
</style>
