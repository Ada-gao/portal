<template>
    <div>
    	<div class="query_result_head clearfix pt15">
			<div class="common_btn fr"><button class="current" @click="set_product"><i class="iconfont icon-chanpinguanli"></i>产品设定</button></div>
		</div>
		<!--table 列表-->
        <div class="mt20">
        	<el-table :data="list" v-if="list.length" v-loading="false" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="产品类型">
                    <template slot-scope="scope"><span>{{scope.row.productType}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="产品名称">
                    <template slot-scope="scope"><span>{{scope.row.productName}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费单价(元/条)">
                    <template slot-scope="scope"><span class="table_primary">{{scope.row.productPrice}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作时间">
                    <template slot-scope="scope"><span>{{scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="状态">
                    <template slot-scope="scope"><span :class="{'table_success':scope.row.status == 0,'table_fail':scope.row.status == 1}">{{scope.row.status == 0 ? '有效' : '无效'}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.updateBy}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template slot-scope="scope"><span class="table_primary cursor" @click="get_historyData(scope.row)">查看历史</span></template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box" v-if="list.length">
                <el-col :span="24">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
            </div>
            <!--产品列表为空-->
            <v_no_data v-if="list.length == 0"></v_no_data>
            <!--查看历史详情-->
            <product_history_details v-if="history" :productType_list="productType_list" :product_id="productId"></product_history_details>
        </div>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import product_history_details from 'components/company_details/product_history_details'
import request from "@/router/axios"
export default {
	components: { product_history_details },
    data () {
        return {
            productType_list:[],                //产品类型列表
        	list:[],			                //查询列表
        	listQuery: {
                page: 1,                        //当前页数
                limit: 10,                      //一页显示数据量
                userId:this.$route.query.userId
            },
            total:null,                         //总页数
            history:false,                      //查看产品历史详情 是否显示   false为隐藏   true为显示
            productId:''                       //查看产品历史详情  produceId默认为空
        }
    },
    created(){
        this.get_produceType();
    },
    methods: {
        //获取产品类型
        get_produceType(){
            request({
                url: "/admin/dict/type/" + 'product_type',
                method: "get",
            }).then(res => {
                this.productType_list = res.data;
                this.get_productList();
            }).catch(() => {})
        },
        //获取产品管理列表
        get_productList(){
            request({
                url: "/admin/product/productPage",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.list = res.data.records
                for(var i in this.productType_list){
                    for(var j in this.list){
                        if(this.productType_list[i].value == this.list[j].productType){
                            this.list[j].productType = this.productType_list[i].label
                        }
                    }
                }
                this.total = res.data.total;
            }).catch(() => {})
        },
    	//页码修改
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.get_productList();
        },
        //页码修改
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.get_productList();
        },
        //查看产品历史详情
        get_historyData(item){
            this.history = true;
            this.productId = item.productId;
        },
        set_product(){
            this.$router.push({path:'/account/handle/set_product', query: {userId:this.$route.query.userId}});
        }
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
