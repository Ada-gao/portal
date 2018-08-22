<template>
    <div>
        <div class="consump common_style mt20 box_adorn">
            <div class="common_head omit1">
                <i class="iconfont icon-deposit"></i>
                <em class="font16">充值记录</em>
            </div>
            <!--一键导出-->
            <div class="common_btn tr">
                <button><i class="iconfont icon-xiazai"></i>一键导出</button>
            </div>
            <div class="table_style">
                <el-table :data="list" :key='0' element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                    <el-table-column align="center" label="充值编号">
                        <template slot-scope="scope"><span>11</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="充值类型">
                        <template slot-scope="scope"><span>22</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="充值金额">
                        <template slot-scope="scope"><span>33</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="充值时间">
                        <template slot-scope="scope"><span>44</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="充值状态" show-overflow-tooltip>
                        <template slot-scope="scope"><span>55</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="操作人">
                        <template slot-scope="scope"><span>66</span></template>
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
            <v_no_data class="list.length == 0"></v_no_data>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            list:[],
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
