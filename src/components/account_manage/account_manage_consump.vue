<template>
    <div>
        <div class="consump common_style mt20 box_adorn">
            <div class="common_head omit1">
                <i class="iconfont icon-xiaofei"></i>
                <em class="font16">消费记录</em>
            </div>
            <!--一键导出-->
            <div class="common_btn tr">
                <button @click="get_excel"><i class="iconfont icon-xiazai"></i>一键导出</button>
            </div>
            <div class="table_style" v-if="list.length">
                <el-table id="out-table" :data="list" :key='0' element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                    <el-table-column align="center" label="消费批次号">
                        <template slot-scope="scope"><span>{{scope.row.label}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="产品类型">
                        <template slot-scope="scope"><span>11</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="核验类型">
                        <template slot-scope="scope"><span>11</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="消费内容">
                        <template slot-scope="scope"><span>11</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="消费金额/元">
                        <template slot-scope="scope"><span class="table_primary">11</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="消费类型">
                        <template slot-scope="scope"><span>11</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="消费时间">
                        <template slot-scope="scope"><span>11</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="消费状态">
                        <template slot-scope="scope">
                            <span :class="{'table_success':scope.row.sort == 1,'table_fail':scope.row.sort == 0}">11</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="操作人">
                        <template slot-scope="scope"><span>11</span></template>
                    </el-table-column>

                </el-table>
                <div class="page clearfix mt20 box">
                    <el-col :span="18">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50"></el-pagination>
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
export default {
    data () {
        return {
            list:[
                {
                    "id":1,
                    "value":"0",
                    "label":"1-49人",
                    "type":"org_size",
                    "description":"公司规模",
                    "sort":0,
                    "remarks":"企业规模"
                },
                {
                    "id":1,
                    "value":"0",
                    "label":"1-49人",
                    "type":"org_size",
                    "description":"公司规模",
                    "sort":1,
                    "remarks":"企业规模"
                }
            ],
            currentPage:1
        }
    },
    mounted(){
        // this.$toast.show({
        //     text: '12344',
        //     type: 'error',
        // })
    },
    methods: {
        //导出
        get_excel(){
            getExcel('out-table','消费记录.xlsx');
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

<style scoped>
</style>
