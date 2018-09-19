<template>
    <div>
    	<div class="query_result_head clearfix pt25">
			<span>{{type == 1 ? '本批次详细核验日志' : '本批次详细查询日志'}}</span>
			<div class="common_btn fr"><button @click="get_excel" :class="{'disable':list.length == 0}"><i class="iconfont icon-xiazai"></i>一键导出</button></div>
		</div>
        <!--搜索条件 开始-->
        <div>
            <el-form :model="form" :rules="rules" ref="form" class="pt20">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item prop="phone">
                            <el-input v-model="form.phone" placeholder="输入手机号" maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="form.name" placeholder="输入姓名" maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="idCard">
                            <el-input v-model="form.idCard" placeholder="输入身份证号码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="bankCard">
                            <el-input v-model="form.bankCard" placeholder="输入银行卡号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="time">
                            <el-date-picker v-model="form.time" type="daterange" range-separator="-" start-placeholder="选择时间" end-placeholder="选择时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="result_type">
                            <el-select style="width: 100%" v-model="form.result" placeholder="选择核验结果" clearable v-if="type_status != 2">
                                <el-option v-for="item in resule_list" :key="item.value" :label="item.label" :value="item.label"></el-option>
                           </el-select>
                           <el-select style="width: 100%" v-model="form.result" placeholder="选择核验结果" clearable v-if="type_status == 2">
                                <el-option v-for="item in resule_list2" :key="item.value" :label="item.label" :value="item.label"></el-option>
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
                        <span>{{scope.row.infoNo}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.productName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="手机号码" v-if="type_status == 2 || type_status == 3">
                    <template slot-scope="scope">
                        <span>{{scope.row.phone}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="身份证号码" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.idCard}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验结果">
                    <template slot-scope="scope">
                        <span v-if="type_status == 0">{{scope.row.result == 0 ? '信息一致' : '信息不一致'}}</span>
                        <span v-if="(type_status == 1 || type_status == 3)">{{scope.row.result == 0 ? '信息不一致' : '信息一致'}}</span>

                        <span v-if="type_status == 2 && scope.row.result == 1">信息一致</span>
                        <span v-if="type_status == 2 && scope.row.result == 2">手机号已实名，但是身份证和姓名均与实名信息不一致</span>
                        <span v-if="type_status == 2 && scope.row.result == 3">手机号已实名，手机号和证件号一致，姓名不一致</span>
                        <span v-if="type_status == 2 && scope.row.result == 4">手机号已实名，手机号和姓名一致，身份证不一致</span>
                        <span v-if="type_status == 2 && scope.row.result == 5">其他不一致</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="查询时间">
                    <template slot-scope="scope"><span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="核验状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0" class="table_primary">正在核验</span>
                        <span v-if="scope.row.status == 1" class="table_success">核验成功</span>
                        <span v-if="scope.row.status == 2" class="table_fail">核验失败</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="核验方式">
                    <template slot-scope="scope"><span>{{scope.row.mode}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="消费金额(元)">
                    <template slot-scope="scope"><span class="table_primary">{{scope.row.amount | formatMoney}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="查询人">
                    <template slot-scope="scope"><span>{{scope.row.createBy}}</span></template>
                </el-table-column>

                <el-table-column align="center" label="所属公司">
                    <template slot-scope="scope"><span>{{scope.row.company}}</span></template>
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
    props:['batchId','type_status'],
    data () {
        return {
            type:this.$route.query.type,             // 1为信息核验    2为历史结果查询
        	list:[],			                     //查询列表
            resule_list:[                            //核验列表数据
                {
                    label:'信息一致',
                    value:0
                },
                {
                    label:'信息不一致',
                    value:1
                }
            ],   
            resule_list2:[                            //手机三要素核验列表数据
                {
                    label:'三要素一致',
                    value:1
                },
                {
                    label:'手机号已实名，但是身份证和姓名均与实名信息不一致',
                    value:2
                },
                {
                    label:'手机号已实名，手机号和证件号一致，姓名不一致',
                    value:3
                },
                {
                    label:'手机号已实名，手机号和姓名一致，身份证不一致',
                    value:4
                },
                {
                    label:'其他不一致 ',
                    value:5
                }
            ],                 
        	listQuery: {
                page: 1,                        //当前页数
                limit: 10                      //一页显示数据量
            },
            total:null,
            loading:false,
            form:{
                name:'',                            //姓名
                phone:'',                           //手机号码
                idCard:'',                          //身份证
                bankCard:'',                        //银行卡
                time:'',                            //选择的日期
                result:''                           //核验结果
            },
            rules: {    //表单验证
                name: [
                    {required: false, trigger: 'blur', message: '请输入姓名'}
                ],
                phone: [
                    {required: false, trigger: 'blur', message: '请输入手机号码'}
                ],
                idCard: [
                    {required: false, trigger: 'blur', message: '请输入身份证号'}
                ],
                bankCard: [
                     {required: false, trigger: 'blur', message: '请输入银行卡号'}
                ],
                time: [
                     {required: false, trigger: 'blur', message: '请选择时间'}
                ],
                result_type: [
                     {required: false, trigger: 'blur', message: '请选择核验结果'}
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
        get_consumpDetailsData(type){
            this.listQuery.name = this.form.name;
            this.listQuery.phone = this.form.phone;
            this.listQuery.idCard = this.form.idCard;
            this.listQuery.bankCard = this.form.bankCard;
            this.listQuery.startTime = this.form.time[0];
            this.listQuery.endTime = this.form.time[1];
            this.listQuery.result = this.form.result;
            this.listQuery.batchId = this.batchId;
            if(type){
                this.limit = this.listQuery.limit;
                this.listQuery.limit = this.total
            }
            request({
                url: "/admin/consumerInfo/consumerInfoPage",
                method: "get",
                params:this.listQuery
            }).then(res => {
                this.loading = false;
                this.total = res.data.total;
                if(type){
                    this.listQuery.limit = this.limit
                    this.data_proces(res.data.records)
                }else{
                    this.list = res.data.records;
                    if(this.type_status == 1 || this.type_status == 3){
                        this.resule_list[0].value = 1;
                        this.resule_list[1].value = 0;
                    }
                }
            })
        },
        //点击重置
        reset(){
            this.$refs['form'].resetFields();
            this.get_consumpDetailsData();
        },
        //查询
        get_data(){
            this.$refs['form'].validate(valid => {
                if(valid){
                    this.get_consumpDetailsData();
                }
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
            var num = Math.ceil(this.total/this.listQuery.limit);
            if(num == 1){
                this.data_proces(this.list);
            }else{
                this.get_consumpDetailsData('excel')
            }
        },
        //导出数据处理
        data_proces(data){
            let list = []
            data.forEach((item,index) => {
                let obj = new Object()
                if(this.type_status == 0){
                    if(item.result == 0){
                        item.result = '信息一致'
                    }else{
                        item.result = '信息不一致'
                    }
                }
                if(this.type_status == 1 || this.type_status == 3){
                    if(item.result == 0){
                        item.result = '信息不一致'
                    }else{
                        item.result = '信息一致'
                    }
                }
                if(this.type_status == 2){
                    if(item.result == 1){
                        item.result = '信息一致'
                    }else if(item.result == 2){
                        item.result = '手机号已实名，但是身份证和姓名均与实名信息不一致'
                    }else if(item.result == 3){
                        item.result = '手机号已实名，手机号和证件号一致，姓名不一致'
                    }else if(item.result == 4){
                        item.result = '手机号已实名，手机号和姓名一致，身份证不一致'
                    }else if(item.result == 5){
                        item.result = '其他不一致'
                    }
                }
                if (item.status == 0){
                    item.status = '正在核验'
                } else if (item.status == 1){
                    item.status = '核验成功'
                } else {
                    item.status = '核验失败'
                }
                let date = new Date(item.createTime)
                item.createTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' +date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                obj.消费批次号 = item.infoNo
                obj.核验类型 = item.productName
                obj.姓名 = item.name
                if(this.type_status == 2 || this.type_status == 3){
                    obj.手机号码 = item.phone
                }
                obj.身份证号码 = item.idCard
                obj.核验结果 = item.result
                obj.查询时间 = item.createTime
                obj.核验状态 = item.status
                obj.核验方式 = item.mode
                obj.消费金额 = item.amount.toFixed(2)
                obj.查询人 = item.createBy
                obj.所属公司 = item.company
                list[index] = obj
            })
            getExcel(list,'核验批次详情记录.xlsx');
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
