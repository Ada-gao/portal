<template>
    <div>
    	<div class="query_result_head clearfix pt25">
			<span>消费批次详情</span>
			<div class="common_btn fr"><button class="current" @click="dialog = true"><i class="iconfont icon-chanpinguanli"></i>产品设定</button></div>
		</div>
		<!--table 列表-->
        <div class="mt20">
        	<el-table :data="list" v-loading="false" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="产品消费类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验类型" class-name="left">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="消费单价(元/条)">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyAddress}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyProvince}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作类型" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.industryType}}</span>
                    </template>
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
        <!--产品设定 弹框-->
        <el-dialog title="产品设定" :visible.sync="dialog" width="60%">
            <el-form :model="form" ref="form" :rules="rules">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="产品类型" label-width="80px" prop="product_type">
                            <el-select style="width:100%" v-model="select_data" multiple filterable allow-create default-first-option placeholder="请选择产品类型" size="medium">
                                <el-option v-for="item in select_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="select_con">
                <p>身份信息核验</p>
                <el-form class="form-border style"> <!--数据  :model="list"-->
                    <el-row>
                        <el-checkbox-group v-model="checkList" @change="check">
                            <el-col :span="6">
                                <el-form-item>
                                    <el-checkbox label="1" key="1"><span>二要素</span><input type="text" :value="1.2"><em>元</em></el-checkbox>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item>
                                    <el-checkbox label="2" key="2"><span>手机三要素</span><input type="text" :value="1.2"><em>元</em></el-checkbox>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item>
                                    <el-checkbox label="3" key="3"><span>银行卡三要素</span><input type="text" :value="1.2"><em>元</em></el-checkbox>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item>
                                    <el-checkbox label="4" key="4"><span>三要素</span><input type="text" :value="1.2"><em>元</em></el-checkbox>
                                </el-form-item>
                            </el-col>
                        </el-checkbox-group>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer">
                <el-button @click=" dialog = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
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
