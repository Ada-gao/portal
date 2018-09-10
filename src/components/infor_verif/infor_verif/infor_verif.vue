<template>
    <div>
    	<div class="infor_head">
    		<div class="check pt20">
	    		<span>核验类型</span>
	    		<el-radio-group v-model="type" @change="check_type">
				    <el-radio :disabled="list.status == 1" v-for="(list,index) in verif_Type" :key="index" :label="index">{{list.productName}}</el-radio>
				</el-radio-group>
				<div class="common_btn fr"><button @click="dialogVisible = true"><i class="iconfont icon-xiazai"></i>批量上传</button></div>
			</div>
			<!--form 开始-->
			<el-form :model="form" :rules="rules" ref="form" class="pt20">
	            <el-row :gutter="20">
	                <el-col :span="6" v-if="type >= 1">
	                    <el-form-item prop="name">
	                        <el-input v-model="form.name" placeholder="输入姓名" maxlength="50"></el-input>
	                    </el-form-item>
	                </el-col>
	                <el-col :span="6" v-if="type >= 2">
	                    <el-form-item prop="tel">
	                        <el-input v-model="form.tel" placeholder="输入手机号码" maxlength="11"></el-input>
	                    </el-form-item>
	                </el-col>
	                <el-col :span="6" v-if="type >= 3">
	                    <el-form-item prop="id_card">
	                        <el-input v-model="form.id_card" placeholder="输入身份证号码"></el-input>
	                    </el-form-item>
	                </el-col>
	                <el-col :span="6" v-if="type >= 4">
	                    <el-form-item prop="bank_card">
	                        <el-input v-model="form.bank_card" placeholder="输入银行卡号"></el-input>
	                    </el-form-item>
	                </el-col>
	            </el-row>
	        </el-form>

	        <div class="common_btn tc">
	        	<button @click="reset"><i class="iconfont icon-zhongzhi"></i>重置</button>
	        	<button @click="verif"><i class="iconfont icon-heyan"></i>立即核验</button>
	        </div>

    	</div>
    	<div class="query_result">
            <!--查询结果-->
    		<query_condit></query_condit>
    	</div>
        <!--点击批量导入-->
        <el-dialog title="批量上传" :visible.sync="dialogVisible" width="36%">
            <span>请选择需要导入的文件</span>
            <div class="upload_file pr">
                <el-input style="display: none" v-model="form.filename"></el-input>
                <upload-excel-component class="pa selected cursor" @on-selected-file='selected'></upload-excel-component>
                <a class="in_b" href="javascript:void(0);">上传附件</a>
                <span>支持上传xls、xlsx文件</span>
                <em class="block"><i class="el-icon-document"></i>附件.信息核验.excel</em>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">开始导入</el-button>
            </span>
        </el-dialog>
        <!--点击开始导入-->
        <el-dialog title="批量上传" :visible.sync="begin" width="36%">
            <div class="status">
                <div class="status_type"><i class="iconfont icon-chenggong"></i></div>
                <div class="status_con">
                    <h3>导入完成</h3>
                    <p class="con mt10">共导入<em>100</em>条，失败<i>5</i>条</p>
                    <h4 class="mt10">下载错误报告，查看失败原因</h4>
                    <a class="in_b mt10" href="javascript:void(0);"><i class="iconfont icon-xiazai"></i>错误报告20180807.txt</a>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="begin = false">取 消</el-button>
                <el-button type="primary" @click="begin = false">开始导入</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import query_condit from 'components/infor_verif/query_condit'
import UploadExcelComponent from '@/components/uploadExcel.vue'
import request from "@/router/axios"
import { mapState } from "vuex"
export default {
	components: { query_condit, UploadExcelComponent },
    data () {
        return {
            verif_Type:[],          //核验类型数据
            dialogVisible:false,    //点击开始导入弹框默认为false
            begin:false,             //开始导入弹框默认为false
            type:0,		           //核验类型 默认为1 选择可用的第一个 
            form:{
            	name:'',		     //姓名
            	tel:'',			     //手机号码
            	id_card:'',		     //身份证
            	bank_card:'',	     //银行卡
                filename:''
            },
            rules: {	//表单验证
                name: [
                    {required: true, trigger: 'blur', message: '请输入姓名'}
                ],
                tel: [
                    {required: true, trigger: 'blur', validator: Validate.isvalidateMobile}
                ],
                id_card: [
                    {required: true, trigger: 'blur', message: '请输入身份证号码'}
                ],
                bank_card: [
                     {required: true, trigger: 'blur', message: '请输入银行卡号'}
                ],
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo
        }),
    },
    mounted(){
        this.get_verifType();
    },
    methods: {
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
                //设置 默认选中
                for(var i in this.verif_Type){
                    if(this.verif_Type[i].status == 0){
                        this.type = Number(i) + 1;
                        return;
                    }
                }

            }).catch(() => {})
        },
    	//选择核验类型
    	check_type(type){
    		this.type = type;
    	},
    	//点击重置
    	reset(){
    		this.$refs['form'].resetFields()
    	},
    	//点击核验
    	verif(){
    		this.$refs['form'].validate(valid => {
    			console.log(valid,'111')
    		})
    	},
        //开始导入
        selected(data){

        }
    }
}
</script>

<style lang="scss" scoped>
.check{ line-height: 32px;}
.check>span{ padding-right: 30px; color: #1F2D3D;}
.query_result_head>span{ line-height: 32px;}
.infor_head>.common_btn>button{ margin:0 15px; height: 32px; }
.infor_head>.common_btn>button:last-child{ background-color: #1A8CE1; color: #fff;}
.infor_head>.common_btn>button:last-child i{ color: #fff;}

/*弹框样式*/
.upload_file{ margin-top: 25px;}
.upload_file>em{ color: #475669; margin-top: 25px;}
.upload_file>span{ font-size: 12px; color: #9B9B9B; margin-left: 10px;}
.upload_file>a{ width: 74px; height: 30px; line-height: 30px; text-align: center; border: 1px solid #E4E4E4; border-radius: 2px; -webkit-border-radius: 2px; color: #1A8CE1;}
.selected{ top: 0; left: 0; width: 74px; height: 30px; opacity: 0;}

.status{ display: flex;}
.status .status_con{ margin-left: 15px; flex:1; }
.status_type i{ font-size: 60px; color: #13CE66;}
.status_con h3{ font-size: 16px; color: #000;}
.status_con .con em{ color: #1A8CE1; margin:0 5px; }
.status_con .con i{ color: red; margin: 0 5px; }
.status_con h4{ color: #4A4A4A}
.status_con>a{ color: #1A8CE1;}
.status_con>a i{ color: #1A8CE1;}
</style>
