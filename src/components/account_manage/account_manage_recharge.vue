<template>
    <div>
        <div class="consump common_style mt20 box_adorn">
            <div class="common_head omit1">
                <i class="iconfont icon-chongzhi1"></i>
                <em class="font16">充值记录</em>
            </div>
            <!--一键导出-->
            <div class="common_btn tr">
                <button><i class="iconfont icon-xiazai"></i>一键导出</button>
            </div>
            <div class="table_style">
                <el-table :data="list" :key='0' element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                    <el-table-column align="center" label="充值流水号">
                        <template slot-scope="scope"><span>{{scope.row.rechargeCode}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="充值金额(元)">
                        <template slot-scope="scope"><span class="table_primary">{{scope.row.rechargeAmount | formatMoney}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="充值时间">
                        <template slot-scope="scope"><span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="充值状态" show-overflow-tooltip>
                        <template slot-scope="scope"><span class="table_success">充值成功</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="充值备注" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.remark}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="操作人">
                        <template slot-scope="scope"><span>{{scope.row.username}}</span></template>
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
import request from "@/router/axios";
export default {
    data () {
        return {
            list:[],            //充值记录列表
            currentPage:1,      //当前页面为1
            listQuery: {
                page: 1,                //当前页数
                limit: 20,              //一页显示数据量
            },
            total:null
        }
    },
    mounted(){
        this.get_rechargeData();
    },
    methods: {
        //获取充值记录
        get_rechargeData() {
            request({
                url: "/admin/rechargeRecord/rechargeRecordPage",
                method: "get",
            }).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            }).catch(() => {})
        },
        //当前页码
        handleCurrentChange(val){
            this.listQuery.page = val;
            this.get_rechargeData();
        },
        //每页显示多少天数据
        handleSizeChange(val){
            this.listQuery.limit = val;
            this.get_rechargeData();
        }
    }
}
</script>

<style scoped>
</style>
