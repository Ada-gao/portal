<template>
    <div>
        <div class="consump common_style mt20 box_adorn">
            <div class="common_head omit1">
                <i class="iconfont icon-lituizhi-"></i>
                <em class="font16">登录记录</em>
            </div>
            <!--一键导出-->
            <div class="common_btn tr">
                <button><i class="iconfont icon-xiazai"></i>一键导出</button>
            </div>
            <div class="table_style" v-if="list.length">
                <el-table :data="list" :key='0' element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                    <el-table-column align="center" label="登录ID">
                        <template slot-scope="scope"><span>11</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="登录时间">
                        <template slot-scope="scope"><span>22</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="登录IP地址">
                        <template slot-scope="scope"><span>33</span></template>
                    </el-table-column>

                </el-table>
                <div class="page clearfix mt20 box">
                    <el-col :span="18">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50"></el-pagination>
                    </el-col>
                    <el-col :span="6">
                        <div class="tip pr">
                            <p class="tr"><em class="in_b cursor" ref="title"><i></i>累计登录次数：3次</em></p>
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
export default {
    data () {
        return {
            list:[],
            right:'160px',
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
.tip_title{ top: 50%; margin-top: -26px; padding:10px; width: 170px; background: rgba(38,41,50,0.60); border-radius: 4px; -webkit-border-radius: 4px;  }
.tip_title:after{ content: ""; display:block; width:0; height:0; border-width:6px 0 6px 6px; border-style:solid; border-color:transparent transparent transparent rgba(38,41,50,0.60); margin-top: -6px; position:absolute; top:50%; right:-6px; }
.tip_title em,.tip_title p{ white-space: nowrap; color: #fff; }
.tip_title em{display: block; font-size: 10px; margin-top: 2px; }
.tip:hover .tip_title{ display: block; }
.tip p i{ display: inline-block; width: 6px; }
.tip>p{ line-height: 32px; color: #1A8CE1; }
</style>
