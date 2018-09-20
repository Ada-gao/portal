<template>
    <div>
        <div v-if="!upload_dialog">
            <div class="down fr">
                <a :href="downloadUrl">下载模版</a>
            </div>
        	<div class="infor_head">
        		<div class="check pt20">
    	    		<span>核验类型</span>
    	    		<el-radio-group v-model="type" @change="check_type">
    				    <el-radio  v-for="(list,index) in verif_Type" :disabled="list.status == 1" :key="index" :label="index">{{list.productName}}</el-radio>
    				</el-radio-group>
    				<div class="common_btn fr"><button @click="upload_dialog = true"><i class="iconfont icon-xiazai"></i>批量上传</button></div>
    			</div>
    			<!--form 开始-->
    			<el-form :model="form" :rules="rules" ref="form" class="pt20">
    	            <el-row :gutter="20">
    	                <el-col :span="6">
    	                    <el-form-item prop="personName">
    	                        <el-input v-model="form.personName" placeholder="请输入姓名" maxlength="50"></el-input>
    	                    </el-form-item>
    	                </el-col>
                        <el-col :span="6">
                            <el-form-item prop="idNumber">
                                <el-input v-model="form.idNumber" placeholder="请输入身份证号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="type == 1 || type == 3">
                            <el-form-item prop="cardNo">
                                <el-input v-model="form.cardNo" placeholder="请输入银行卡号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="type == 2 || type == 3">
                            <el-form-item prop="mobile">
                                <el-input v-model="form.mobile" placeholder="请输入手机号码" maxlength="11"></el-input>
                            </el-form-item>
                        </el-col>
    	            </el-row>
    	        </el-form>

    	        <div class="common_btn tc">
    	        	<button @click="reset"><i class="iconfont icon-zhongzhi"></i>重置</button>
    	        	<button @click="verif('one')"><i class="iconfont icon-heyan"></i>立即核验</button>
    	        </div>

        	</div>
            <!--查询结果-->
        	<div class="query_result">
        		<query_condit :list="list" :loading="loading" :type_status="type" @refure="refure_data"></query_condit>
        	</div>
        </div>
        <!--上传文件核验-->
        <upload_excel :type="type" v-if="upload_dialog" @changeStatus="upload_dialog = false" @upload_verif="for_verif"></upload_excel>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import query_condit from 'components/infor_verif/query_condit'
import upload_excel from './upload_excel.vue'
import request from "@/router/axios"
import { mapState } from "vuex"
export default {
	components: { query_condit,upload_excel },
    data () {
        return {
            verif_Type:[],              //核验类型数据
            productType:'',             //核验类型
            productName:'',             //核验类型名称
            type:0,                     //核验类型 默认为0 选择可用的第一个 
            list:[],        //所有消费批次清单
            listQuery: {
                page: 1,                //当前页数
                limit: 10,              //一页显示数据量
            },
            click_again:false,
            upload_dialog:false,        //批量上传弹框
            total:null,
            loading:false,
            form:{
            	personName:'',		     //姓名  personName/name
            	mobile:'',			     //手机号码  mobile/mobileNo
            	idNumber:'',		     //身份证  idNumber/idCardNum
                cardNo:''                //银行卡  cardNo
            },
            form2:{                     //传给后台数据
                batchs:[],
                vo:{}
            },                   
            downloadUrl: '',            //下载对应的模板
            rules: {	                //表单验证
                personName: [
                    {required: true, trigger: 'blur', message: '请输入姓名'}
                ],
                mobile: [
                    {required: true, trigger: 'blur', validator: Validate.isvalidateMobile}
                ],
                idNumber: [
                    {required: true, trigger: 'blur', validator: Validate.validIdCart}
                ],
                cardNo: [
                     {required: true, trigger: 'blur', validator: Validate.validCardNo}
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
    mounted(){
        this.get_verifType();
    },
    methods: {
        //选择核验类型
        check_type(type){
            this.type = type;
            this.down_switch(type);
        },
        //获取所有类型类型
        get_verifType(){
            request({
                url: "/admin/product/productList",
                method: "get",
                params:{
                    userId:this.userInfo.userId
                },
            }).then(res => {
                this.verif_Type = res.data;
                //设置 默认选中 获取规格/名称
                for(var i in this.verif_Type){
                    if(this.verif_Type[i].status == 0){
                        this.productType = this.verif_Type[i].productType;
                        this.productName = this.verif_Type[i].productName;
                        this.form2.vo = this.verif_Type[i];
                        this.type = Number(i);
                        this.down_switch(i);
                        return false;
                    }

                }
            })
        },
        down_switch(item){
            if(item == 0){
                this.downloadUrl = '/static/excel/二要素模版.xlsx'
            }else if(item == 1){
                this.downloadUrl = '/static/excel/银行三要素模版.xlsx'
            }else if(item == 2){
                this.downloadUrl = '/static/excel/手机三要素模版.xlsx'
            }else if(item == 3){
                this.downloadUrl = '/static/excel/四要素模版.xlsx'
            }
        },
    	//点击重置
    	reset(){
    		this.$refs['form'].resetFields()
            this.list = [];
    	},
        replaceKey (target, change) {
            for (let key in target) {
                target[change[key]] = target[key]
                delete target[key]
            }
            return target
        },
        for_verif(data){
            if(this.type == 0){
                var keyMap = {
                    姓名: 'personName',
                    身份证: 'idNumber'
                }
            }else if(this.type == 1){
                var keyMap = {
                    姓名: 'personName',
                    身份证: 'idNumber',
                    银行卡号: 'cardNo'
                }
            }else if(this.type == 2){
                var keyMap = {
                    姓名: 'name',
                    手机号码: 'mobile',
                    身份证: 'idCardNum'
                }
            }else{
                let keyMap = {
                    姓名: 'personName',
                    身份证: 'idNumber',
                    手机号码: 'mobileNo',
                    银行卡号: 'cardNo'
                }
            }
            let table = JSON.parse(JSON.stringify(data))
            table.forEach(item => {
                this.replaceKey(item, keyMap)
            })
            this.verif('list',table)
        },
    	//点击核验
    	verif(type,item){
            if(type == 'one'){
                this.$refs['form'].validate(valid => {
                    if(valid){
                        this.get_common_data(type);
                    }
                })
            }else{
                this.get_common_data(type,item);
            }
    	},
        //请求数据
        get_common_data(type,item){
            if(this.click_again) return;
            this.click_again = true;
            this.form2.batchs = [];
            if(type == 'one'){
                var obj = {};
                if(this.type == 0){
                    obj.personName = this.form.personName
                    obj.idNumber = this.form.idNumber
                }else if(this.type == 1){
                    obj.personName = this.form.personName
                    obj.idNumber = this.form.idNumber
                    obj.cardNo = this.form.cardNo
                }else if(this.type == 2){
                    obj.name = this.form.personName
                    obj.idCardNum = this.form.idNumber
                    obj.mobile = this.form.mobile
                }else if(this.type == 3){
                    obj.personName = this.form.personName
                    obj.idNumber = this.form.idNumber
                    obj.mobileNo = this.form.mobile
                    obj.cardNo = this.form.cardNo
                }
                
                this.form2.batchs.push(obj);
            }else{
                this.form2.batchs = item;
            } 
            this.form2.vo = this.verif_Type[this.type];
            request({
                url: "/admin/consumerBatch",
                method: "post",
                data: this.form2,
            }).then(res => {
                this.click_again = false;
                this.list = [];
                this.list.push(res.data.data);
                this.total = res.data.total;
                for(var i in this.list){
                    for(var j in this.dic.productType){
                        if(this.list[i].productType == this.dic.productType[j].value){
                            this.list[i].productType = this.dic.productType[j].label
                        }
                    }
                }
                if(type == 'list'){
                    this.upload_dialog = false;
                }
                //查看结果
                this.for_verif_result(res.data.data)
            })
        },
        for_verif_result(item){
            this.form2.batch = item;
            request({
                url: "/admin/consumerBatch",
                method: "put",
                data: this.form2,
            }).then(res => {
                this.list = [];
                this.list.push(res.data.data);
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
        //刷新核验批次
        refure_data(item){
            this.for_verif_result(item)
        },
    }
}
</script>

<style lang="scss" scoped>
.down{ position: absolute; top: 20px; right: 30px;}
.down>a{ color: #1A8CE1}
.check{ line-height: 32px;}
.check>span{ padding-right: 30px; color: #1F2D3D;}
.query_result_head>span{ line-height: 32px;}
.infor_head>.common_btn>button{ margin:0 15px; height: 32px; }
.infor_head>.common_btn>button:last-child{ background-color: #1A8CE1; color: #fff;}
.infor_head>.common_btn>button:last-child i{ color: #fff;}
</style>
