<template>
    <div>
        <div class="query_result_head clearfix pt25">
            <span>产品历史详情</span>
        </div>
        <div class="mt20">
        	<el-table :data="list" v-loading="loading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="产品类型">
                    <template slot-scope="scope"><span>{{scope.row.productType}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="产品名称">
                    <template slot-scope="scope"><span>{{scope.row.productName}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费单价(元/条)">
                    <template slot-scope="scope"><span class="table_primary">{{scope.row.productPrice}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="现消费单价(元/条)">
                    <template slot-scope="scope"><span class="table_primary">{{scope.row.productReprice}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作时间">
                    <template slot-scope="scope"><span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="状态">
                    <template slot-scope="scope"><span :class="scope.row.delFlag == 0 ? 'table_success' : 'table_fail'">{{scope.row.delFlag == 0 ? '有效' : '无效'}}</span></template>
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
    </div>
</template>

<script>
import request from "@/router/axios"
export default {
    props: ['product_id','productType_list'],
    data () {
        return {
        	list:[],			//查询列表
            listQuery: {
                page: 1,                        //当前页数
                limit: 10                      //一页显示数据量
            },
            total:null,
            loading:false
        }
    },
    created(){
        this.get_historyData();
    },
    methods: {
        //查看产品历史详情
        get_historyData(){
            this.loading = true;
            this.listQuery.productId = this.product_id;
            request({
                url: "/admin/productHistory/productHistoryPage",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.loading = false;
                this.list = res.data.records
                this.total = res.data.total
                for(var i in this.productType_list){
                    for(var j in this.list){
                        if(this.productType_list[i].value == this.list[j].productType){
                            this.list[j].productType = this.productType_list[i].label
                        }
                    }
                }
            }).catch(() => {})
        },
    	//页码修改
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.get_historyData();
        },
        //页码修改
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.get_historyData();
        }
    },
    watch:{
        product_id:function(val){
            this.get_historyData();
        },
    }
}
</script>

<style lang="scss">
.query_result_head>span{ line-height: 32px;}
.el-checkbox__input.is-checked+.el-checkbox__label{ color: #333;}
/*弹框样式*/
.select_con>p{ padding-left: 10px; margin-bottom: 15px; }
.select_con .style{ padding:0 10px;}
.select_con span{ margin-left: 5px;}
.select_con input{ width: 46px!important; height: 26px; line-height: 26px; padding:0 5px; text-align: center; border:1px solid #C8C8C8; border-radius: 2px; -webkit-border-radius: 2px; margin:0 5px; }
</style>
