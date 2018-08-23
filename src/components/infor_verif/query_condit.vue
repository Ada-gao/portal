<template>
	<div>
        <div class="query_result_head clearfix pt25">
            <span>{{type == 1 ? '本次查询结果' : '所有消费批次清单'}}</span>
            <div class="common_btn fr"><button><i class="iconfont icon-xiazai"></i>一键导出</button></div>
        </div>
	    <el-form :model="form" :rules="rules" ref="form" class="pt20">
		    <el-row :gutter="20">
		        <el-col :span="6">
		            <el-form-item prop="tel">
		                <el-input v-model="form.tel" placeholder="输入手机号" maxlength="11"></el-input>
		            </el-form-item>
		        </el-col>
		        <el-col :span="6">
		            <el-form-item prop="name">
		                <el-input v-model="form.name" placeholder="输入姓名" maxlength="50"></el-input>
		            </el-form-item>
		        </el-col>
		        <el-col :span="6">
		            <el-form-item prop="id_card">
		                <el-input v-model="form.id_card" placeholder="输入身份证号码"></el-input>
		            </el-form-item>
		        </el-col>
		        <el-col :span="6">
		            <el-form-item prop="bank_card">
		                <el-input v-model="form.bank_card" placeholder="输入银行卡号"></el-input>
		            </el-form-item>
		        </el-col>
		        <el-col :span="6">
		            <el-form-item prop="time">
		                <el-date-picker v-model="form.time" type="daterange" range-separator="-" start-placeholder="选择时间" end-placeholder="选择时间"></el-date-picker>
		            </el-form-item>
		        </el-col>
		        <el-col :span="6">
		            <el-form-item prop="result_type">
		                <el-select style="width: 100%" v-model="form.result" placeholder="选择核验结果" clearable @change="check_resule">
		                	<el-option v-for="item in resule_list" :key="item.value" :label="item.label" :value="item.label"></el-option>
          			   </el-select>
		            </el-form-item>
		        </el-col>
		    </el-row>
		</el-form>
		<div class="common_btn tc">
        	<button @click="reset"><i class="iconfont icon-zhongzhi"></i>重置</button>
        	<button @click="get_data"><i class="iconfont icon-xiazai"></i>查询</button>
        </div>
        <!--table 列表-->
        <div class="mt20" v-if="list.length">
        	<el-table :data="list" v-loading="false" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="消费批次号">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="产品类型" class-name="left">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="申请条款">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyAddress}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="消费数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyProvince}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验失败" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.industryType}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="消费金额/元">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="核验状态">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费时间">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作人">
                    <template slot-scope="scope"><span>{{scope.row.orgSize}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="操作" fixed="right">
                    <template slot-scope="scope">
                        <a size="small" class="common_btn" @click="get_details(scope.row)">查看详情</a>
                    </template>
                </el-table-column>

            </el-table>
            <div class="page clearfix mt20 box">
                <el-col :span="18">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="50"></el-pagination>
                </el-col>
                <el-col :span="6">
                    <div class="tip pr">
                        <p class="tr"><em class="in_b" ref="title"><i></i>累计查询量：10000条</em></p>
                    </div>
                </el-col>
            </div>
        </div>
        <!--没有数据-->
        <v_no_data v-if="list.length == 0"></v_no_data>
        <div>
            <!--本批次详细核验日志-->
            <details_record></details_record>
        </div>
	</div>
</template>

<script>
import Validate from '@/util/filter_rules'
import details_record from 'components/infor_verif/details_record'
export default {
	components: { details_record },
    data () {
        return {
            type:1,             // 1为信息核验    2为历史结果查询  默认为1
        	resule_list:[], 	//选择核验结果列表
        	list:[],			//查询列表
        	currentPage:1,		//当前页面为1
            form:{
            	name:'',		//姓名
            	tel:'',			//手机号码
            	id_card:'',		//身份证
            	bank_card:'',	//银行卡
            	result:'',		//核验结果
            	time:''			//选择的日期
            },
            value6:'',
            rules: {	//表单验证
                name: [
                    {required: false, trigger: 'blur', message: '请输入姓名'}
                ],
                tel: [
                    {required: false, trigger: 'blur', validator: Validate.isvalidateMobile}
                ],
                id_card: [
                    {required: false, trigger: 'blur', message: '请输入身份证号码'}
                ],
                bank_card: [
                     {required: false, trigger: 'blur', message: '请输入银行卡号'}
                ],
                time: [
                     {required: false, trigger: 'blur', message: '请选择时间'}
                ],
                result_type: [
                     {required: false, trigger: 'blur', message: '请输入银行卡号'}
                ],
            }
        }
    },
    created(){
        if(this.$route.query.type){
            this.type = this.$route.query.type
        }
    },
    methods: {
    	//选择核验结果
    	check_resule(type){

    	},
    	//点击重置
    	reset(){
    		this.$refs['form'].resetFields()
    	},
    	//查看详情
    	get_details(){
    		console.log(11)
    	},
    	//查询
    	get_data(){
            this.$refs['form'].validate(valid => {
                console.log(valid,'111')
            })
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
.el-form-item__content .el-date-editor{ width: 100%;}
.common_btn>button{ margin:0 15px; height: 32px; }
.query_result_head>span{ line-height: 32px;}
</style>
