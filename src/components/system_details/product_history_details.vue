<template>
    <div>
        <div class="query_result_head clearfix pt25">
            <span>产品历史详情</span>
        </div>
        <div class="mt20">
        	<el-table :data="list" v-loading="false" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="产品类型">
                    <template slot-scope="scope"><span>{{scope.row.companyCode}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="产品详情">
                    <template slot-scope="scope"><span>{{scope.row.companyCode}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费单价(元/条)">
                    <template slot-scope="scope"><span>{{scope.row.companyAddress}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="现消费单价(元/条)">
                    <template slot-scope="scope"><span>{{scope.row.companyAddress}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作时间">
                    <template slot-scope="scope"><span>{{scope.row.companyProvince}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="状态">
                    <template slot-scope="scope"><span>{{scope.row.industryType}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box">
                <el-col :span="24">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50"></el-pagination>
                </el-col>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        	list:[],			//查询列表
        	currentPage:1,		//当前页面为1
            dialog:false,
            form:{
                region:''
            },
            select_list: [{
                    value: 'HTML',
                    label: 'HTML'
                }, {
                    value: 'CSS',
                    label: 'CSS'
                }, {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }],
            select_data: [],
            rules: {
                product_type: [
                    {required: true, trigger: 'blur', message: '请选择产品类型',}
                ]
            },
            checkList:[],
        }
    },
    created(){
        
    },
    methods: {
        //选择省份信息核验
        check(e){
            console.log(e)
        },
    	//当前页码
        handleCurrentChange(val){
            console.log(val,'111');
        },
        //每页显示多少天数据
        handleSizeChange(val){
            console.log(val,'222')
        },
        //点击确定
        submit(){
            this.$refs['form'].validate(valid => {
                console.log(valid,'111')
            })
        }
    }
}
</script>

<style lang="scss">
.query_result_head>span{ line-height: 32px;}
.el-checkbox__input.is-checked+.el-checkbox__label{ color: #333;}
/*弹框样式*/
.select_con>p{ padding-left: 10px; margin-bottom: 15px; }
.select_con .style{ padding:0 10px;}
.select_con span{ margin-left: 5px;}
.select_con input{ width: 46px!important; height: 26px; line-height: 26px; padding:0 5px; text-align: center; border:1px solid #C8C8C8; border-radius: 2px; -webkit-border-radius: 2px; margin:0 5px; }
</style>
