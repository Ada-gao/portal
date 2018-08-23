<template>
    <div class="pt5">
    	<div class="common_btn tr">
    		<button class="current" @click="for_account_recharge"><i class="iconfont icon-yue-copy vm"></i><span class="vm">账号充值</span></button>
    		<button v-if="list.length"><i class="iconfont icon-xiazai"></i><span class="vm">一键导出</span></button>
    	</div>
    	<!--table 列表-->
        <div class="mt20">
        	<el-table :data="list" v-if="list.length" v-loading="false" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="充值编号">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="充值类型" class-name="left">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="充值金额/元">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyAddress}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="备注">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyProvince}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="充值时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.industryType}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="充值状态">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

            </el-table>
            <v_no_data v-if="list.length == 0"></v_no_data>
            <div class="page clearfix mt20" v-if="list.length">
            	<el-col :span="18">
		            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50"></el-pagination>
		        </el-col>
            </div>
        </div>
    </div>
</template>

<script>
import recharge_recode from 'components/system_details/recharge_recode'
export default {
	components: { recharge_recode },
    data () {
        return {
            list:[],			//充值记录列表
            currentPage:1,		//当前页面为1
        }
    },
    mounted(){
        
    },
    methods: {
    	//tab 切换
    	for_account_recharge(type){
            this.$router.push({path:'/account_recharge'});
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

<style lang="scss" scoped>
</style>
