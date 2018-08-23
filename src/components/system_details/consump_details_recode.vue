<template>
    <div>
    	<div class="query_result_head clearfix pt25">
			<span>消费批次详情</span>
			<div class="common_btn fr"><button><i class="iconfont icon-xiazai"></i>一键导出</button></div>
		</div>
		<!--table 列表-->
        <div class="mt20">
        	<el-table :data="list" v-loading="false" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="消费批次号">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验类型" class-name="left">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyAddress}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="手机号码">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyProvince}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="身份证号码" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.industryType}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验结果">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="查询时间">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="核验状态">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="核验方式">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费金额">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="查询人">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="所需公司">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
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
        	list:[],			//查询列表
        	currentPage:1,		//当前页面为1
        }
    },
    created(){
        
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
