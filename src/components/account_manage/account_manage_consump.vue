<template>
    <div>
        <div class="consump common_style mt20 box_adorn">
            <div class="common_head omit1">
                <i class="iconfont icon-xiaofei"></i>
                <em class="font16">消费记录</em>
            </div>
            <!--一键导出-->
            <div class="common_btn tr">
                <button @click="get_excel" :class="{'disable':list.length == 0}"><i class="iconfont icon-xiazai"></i>一键导出</button>
            </div>
            <div class="table_style">
                <el-table id="out-table" :data="list" :key='0' v-loading="loading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                    <el-table-column align="center" label="消费批次号">
                        <template slot-scope="scope"><span>{{scope.row.batchNo}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="消费产品">
                        <template slot-scope="scope"><span>{{scope.row.productType}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="产品名称">
                        <template slot-scope="scope"><span>{{scope.row.productName}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="申请条数">
                        <template slot-scope="scope"><span>{{scope.row.batchCount}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="消费数量">
                        <template slot-scope="scope"><span>{{scope.row.batchCount}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="核验失败">
                        <template slot-scope="scope"><span>{{scope.row.failCount | setdefault('--')}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="消费金额/元">
                        <template slot-scope="scope"><span :class="{'table_primary':scope.row.monetary != null}">{{scope.row.monetary | setdefault('--')}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="消费时间">
                        <template slot-scope="scope"><span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="核验状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 0" class="table_primary">正在核验</span>
                            <span v-if="scope.row.status == 1" class="table_success">核验成功</span>
                            <span v-if="scope.row.status == 2" class="table_fail">核验失败</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="操作人">
                        <template slot-scope="scope"><span>{{scope.row.createName}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope"><span @click="get_consump_details(scope.row)" class="table_primary cursor">查看详情</span></template>
                    </el-table-column>

                </el-table>
                <div class="page clearfix mt20 box">
                    <el-col :span="18">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                    </el-col>
                    <el-col :span="6" class="tr">
                        <div class="tip pr in_b">
                            <p class="tr"><em class="in_b cursor" ref="title"><i></i>累计充值金额：100000元</em></p>
                            <div class="tip_title tc pa none">
                                <p>累计充值金额：100000元</p>
                                <em>试用消费50元，付费消费9995元</em>
                            </div>
                        </div>
                    </el-col>
                </div>
            </div>
            <!--没有数据-->
            <v_no_data v-if="list.length == 0"></v_no_data>
        </div>
    </div>
</template>

<script>
import { getExcel } from '@/util/auth'
import request from "@/router/axios"
import { mapState } from "vuex"
export default {
    data () {
        return {
            list:[],
            listQuery: {
                page: 1,                //当前页数
                limit: 10,              //一页显示数据量
            },
            total:null,
            loading:false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            dic: state => state.dic
        }),
    },
    mounted(){
        this.get_consumpData();
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
            }).catch(() => {})
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
        //导出
        get_excel(){
            if(this.list.length == 0) return;
            getExcel('out-table','消费记录.xlsx');
        },
        //查看消费详情
        get_consump_details(item){
            this.$router.push({path:'/account/handle/consump_details',query: {batchId:item.batchId}});
        }
    }
}
</script>

<style scoped>
</style>
