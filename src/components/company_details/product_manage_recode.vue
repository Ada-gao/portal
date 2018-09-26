<template>
    <div>
    	<div class="query_result_head clearfix pt15">
			<div class="common_btn fr"><button class="current" @click="set_product"><i class="iconfont icon-chanpinguanli"></i>产品设定</button></div>
		</div>
		<!--table 列表-->
        <div class="mt20">
        	<el-table :data="list" v-if="list.length" v-loading="loading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="产品类型">
                    <template slot-scope="scope"><span>{{scope.row.productType}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="产品名称">
                    <template slot-scope="scope"><span>{{scope.row.productName}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费单价(元/条)">
                    <template slot-scope="scope"><span class="table_primary">{{scope.row.productPrice | formatMoney}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作时间">
                    <template slot-scope="scope"><span>{{scope.row.updateTime | moment('YYYY-MM-DD HH:mm:ss')}}</span></template>
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
            <product_history_details v-if="history" :product_id="productId"></product_history_details>
        </div>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import product_history_details from 'components/company_details/product_history_details'
import request from "@/router/axios"
import { mapState } from "vuex"
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
            loading:false,
            history:false,                      //查看产品历史详情 是否显示   false为隐藏   true为显示
            productId:''                       //查看产品历史详情  produceId默认为空
        }
    },
    computed: {
        ...mapState({
            dic: state => state.dic
        }),
    },
    created(){
        this.get_productList();
    },
    methods: {
        //获取产品管理列表
        get_productList(){
            request({
                url: "/admin/product/productPage",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.loading = false
                this.list = res.data.records
                for(var i in this.list){
                    for(var j in this.dic.productType){
                        if(this.list[i].productType == this.dic.productType[j].value){
                            this.list[i].productType = this.dic.productType[j].label
                        }
                    }
                }
                this.total = res.data.total;
            })
        },
    	//页码修改
        handleSizeChange(val) {
            this.loading = true;
            this.listQuery.limit = val;
            this.get_productList();
        },
        //页码修改
        handleCurrentChange(val) {
            this.loading = true;
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
