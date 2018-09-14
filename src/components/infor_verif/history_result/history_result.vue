<template>
    <div>
    	<div class="query_result">
    		<!--查询结果-->
    		<query_condit :list="list" :listQuery="listQuery" :total="total" :loading="loading" @change="changePage" :excel="excel" :excel_list="excel_list" @changeExcel='excel = false'></query_condit>
    	</div>
    </div>
</template>

<script>
import query_condit from 'components/infor_verif/query_condit'
import request from "@/router/axios"
import { mapState } from "vuex"
export default {
	components: { query_condit },
    data () {
        return {
            list:[],        //所有消费批次清单
            listQuery: {
                page: 1,                //当前页数
                limit: 10,              //一页显示数据量
            },
            total:null,
            loading:false,
            excel:false,                 //导出做监听的字段
            excel_list:[]
        }
    },
    mounted(){
        this.get_consumpData();
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            dic: state => state.dic
        }),
    },
    methods: {
        //获取消费列表
        get_consumpData(type){
            this.listQuery.createBy = this.userInfo.userId;
            if(type){
                this.limit = this.listQuery.limit;
                this.listQuery.limit = this.total
            }
            request({
                url: "/admin/consumerBatch/consumerBatch",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.loading = false;
                this.total = res.data.total;
                for(var i in res.data.records){
                    for(var j in this.dic.productType){
                        if(res.data.records[i].productType == this.dic.productType[j].value){
                            res.data.records[i].productType = this.dic.productType[j].label
                        }
                    }
                }
                if(type){
                    this.listQuery.limit = this.limit
                    this.excel_list = res.data.records
                    this.excel = true;
                }else{
                    this.list = res.data.records;
                }
            })
        },
        changePage(type,val){
            this.loading = true;
            if(type == 'all'){
               this.get_consumpData('excel'); 
               return
            }
            if(type == 'page'){
                this.listQuery.page = val
            }
            if(type == 'limit'){
                this.listQuery.limit = val
            }
            this.get_consumpData();
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
