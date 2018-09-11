<template>
    <div>
    	<div class="query_result_head clearfix pt25">
			<span>{{type == 1 ? '本批次详细核验日志' : '本批次详细查询日志'}}</span>
			<div class="common_btn fr"><button @click="get_excel" :class="{'disable':list.length == 0}"><i class="iconfont icon-xiazai"></i>一键导出</button></div>
		</div>
        <!--搜索条件 开始-->
        <div v-if="list.length">
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
                <button @click="get_data"><i class="iconfont el-icon-search"></i>查询</button>
            </div>
        </div>
        <!--搜索条件 结束-->
		<!--table 列表-->
        <div class="mt20" v-if="list.length">
        	<el-table :data="list" v-loading="loading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

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
                <el-col :span="24">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
            </div>
        </div>
        <!--没有数据-->
        <v_no_data v-if="list.length == 0"></v_no_data>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import request from "@/router/axios"
import { getExcel } from '@/util/auth'
import { mapState } from "vuex"
export default {
    props:['batchId'],
    data () {
        return {
            type:this.$route.query.type,             // 1为信息核验    2为历史结果查询
        	list:[],			                     //查询列表
            resule_list:[],                          //核验列表数据
        	listQuery: {
                page: 1,                        //当前页数
                limit: 10                      //一页显示数据量
            },
            total:null,
            loading:false,
            form:{
                name:'',                            //姓名
                tel:'',                             //手机号码
                id_card:'',                         //身份证
                bank_card:'',                       //银行卡
                result:'',                          //核验结果
                time:''                             //选择的日期
            },
            rules: {    //表单验证
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
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            dic: state => state.dic
        }),
    },
    created(){
        this.get_consumpDetailsData();
    },
    methods: {
        //获取消费批次详情列表
        get_consumpDetailsData(){
            this.listQuery.batchId = this.batchId;
            request({
                url: "/admin/consumerInfo/consumerInfoPage",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.loading = false;
                this.list = res.data.records;
                this.total = res.data.total;
                for(var i in this.list){
                    for(var j in this.dic.productType){
                        if(this.list[i].productType == this.dic.productType[j].value){
                            this.list[i].productType = this.dic.productType[j].label
                        }
                    }
                }
            })
        },
        //选择核验结果
        check_resule(type){

        },
        //点击重置
        reset(){
            this.$refs['form'].resetFields();
            this.get_consumpDetailsData();
        },
        //查询
        get_data(){
            this.$refs['form'].validate(valid => {
                console.log(valid,'111')
            })
        },
    	//当前页码
        handleCurrentChange(val){
            this.listQuery.page = val;
            this.loading = true;
            this.get_consumpDetailsData();
        },
        //每页显示多少天数据
        handleSizeChange(val){
            this.listQuery.limit = val;
            this.loading = true;
            this.get_consumpDetailsData();
        },
        //导出
        get_excel(){
            if(this.list.length == 0) return;
            getExcel('out-table','消费记录.xlsx');
        }
    },
    watch:{
        batchId:function(val){
            this.get_consumpDetailsData();
        }
    }
}
</script>

<style lang="scss" scoped>
.query_result_head>span{ line-height: 32px;}
</style>
