<template>
    <div>
    	<div class="query_result">
    		<!--查询结果-->
    		<query_condit :list="list" :listQuery="listQuery" :total="total" :loading="loading" @change="changePage"></query_condit>
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
            loading:false
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
        get_consumpData(){
            this.listQuery.createBy = this.userInfo.userId;
            request({
                url: "/admin/consumerBatch/consumerBatch",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.loading = false;
                this.list = res.data.records;
                this.total = res.data.total;
                for(var i in this.list){
                    for(var j in this.dic.productType){
                        if(this.list[i].productType == this.dic.productType[j].value){
                            this.list[i].productType = this.dic.productType[j].label
                        }
                    }
                }
            })
        },
        changePage(type,val){
            this.loading = true;
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
