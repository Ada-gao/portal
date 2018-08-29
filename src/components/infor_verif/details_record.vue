<template>
    <div>
    	<div class="query_result_head clearfix pt25">
			<span>{{type == 1 ? '本批次详细核验日志' : '本批次详细查询日志'}}</span>
			<div class="common_btn fr"><button><i class="iconfont icon-xiazai"></i>一键导出</button></div>
		</div>
		<!--table 列表-->
        <div class="mt20">
        	<el-table :data="list" v-loading="false" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="消费批次号">
                    <template slot-scope="scope">
                        <span>C000001</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验类型" class-name="left">
                    <template slot-scope="scope">
                        <span>二要素</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>张三</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="手机号码">
                    <template slot-scope="scope">
                        <span>13386182259</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="身份证号码" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>12334552323232323</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验结果">
                    <template slot-scope="scope"><span>信息一致/信息不一致</span></template>
                </el-table-column>

                <el-table-column align="center" label="查询时间">
                    <template slot-scope="scope"><span>2018-8-29 14:50:24</span></template>
                </el-table-column>

                <el-table-column align="center" label="核验状态">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="核验方式">
                    <template slot-scope="scope"><span>API</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费金额(元)">
                    <template slot-scope="scope"><span>0.2</span></template>
                </el-table-column>

                <el-table-column align="center" label="查询人">
                    <template slot-scope="scope"><span>ABC</span></template>
                </el-table-column>

                <el-table-column align="center" label="所属公司">
                    <template slot-scope="scope"><span>数赟科技</span></template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box">
                <el-col :span="18">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50"></el-pagination>
                </el-col>
                <el-col :span="6">
                    <div class="tip pr">
                        <p class="tr"><em class="in_b" ref="title"><i></i>本批次：100条</em></p>
                    </div>
                </el-col>
            </div>
        </div>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import query_condit from 'components/infor_verif/query_condit'
export default {
	components: { query_condit },
    data () {
        return {
            type:1,             // 1为信息核验    2为历史结果查询  默认为1
        	list:[],			//查询列表
        	currentPage:1,		//当前页面为1
        }
    },
    created(){
        if(this.$route.query.type){
            this.type = this.$route.query.type
        }
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

<style lang="scss" scoped>
.query_result_head>span{ line-height: 32px;}
</style>
