<template>
    <div class="upload_excel basic_info common_style box_adorn">
        <div class="head clearfix">
            <h3 class="fl">批量上传</h3>
            <i @click="cancel" class="fr el-icon-close cursor"></i>
        </div>
        <div class="tc">
            <div class="upload_main cursor pr">
                <i class="iconfont icon-shangchuan-"></i>
                <p>选择上传文件，<em>点击上传</em>（支持xls、xlsx文件）</p>
                <upload-excel-component class="pa selected cursor" @on-selected-file='selected'></upload-excel-component>
            </div>
        </div>
        
        <div style="margin-top: 25px;">
            <!--报错数据展示-->
            <el-table :data="error_show_list" v-if="error_list.length"  element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="行">
                    <template slot-scope="scope"><span>{{scope.row.index}}</span></template>
                </el-table-column>
                <el-table-column align="center" label="错误项">
                    <template slot-scope="scope"><span>{{scope.row.error_type}}</span><span class="table_fail">({{scope.row.error_name}})</span></template>
                </el-table-column>
            </el-table>
            <!--正确展示-->
            <div v-if="tableData.length && error_list.length == 0 && show_list.length">
                <el-table :data="show_list" highlight-current-row style="width: 100%;margin-top:10px;">
                    <el-table-column  align="center" v-for='item of tableHeader' :prop="item" :label="item" :key='item'></el-table-column>
                </el-table>
            </div>
            <!--页码-->
            <div class="page clearfix mt20 box" v-if="tableData.length">
                <el-col :span="24" v-if="error_list.length">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                    
                </el-col>
                <el-col v-else>
                    <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page.sync="listQuery2.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery2.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-col>
            </div>
        </div>
        <div class="common_btn tc">
            <button @click="cancel">取消</button>
            <button :class="{'disable':(error_list.length != 0 || tableData.length == 0)}" @click="for_verif"><i class="iconfont icon-heyan"></i>立即核验</button>
        </div>
    </div>
</template>

<script>
import UploadExcelComponent from '@/components/uploadExcel.vue'
export default {
    components: { UploadExcelComponent },
    props:['type'],
    data () {
        return {
            form:{
                filename:''         //导入文件名称
            },
            tableHeader:[],         //导入文件头部
            tableData:[],           //导入文件内容
            show_list:[],           //展示正确
            error_list:[],          //所有错误项
            error_show_list:[],     //展示错误
            listQuery: {
                page: 1,
                limit: 10,
            },
            total:null,
            listQuery2: {
                page: 1,
                limit: 10,
            },
        }
    },
    created(){
        
    },
    methods: {
        //导出
        selected(data){
            this.tableHeader = data.header
            this.tableData = data.results
            this.form.filename = data.filename
            this.checkExcel()
        },
        //校验上传信息
        checkExcel() {
            this.error_list = [];
            let index = 0
            this.errorData = []
            let regPhone = /^((1[3-8][0-9])+\d{8})$/            //验证手机号码
            let regCardNo = /^([1-9]{1})(\d{14}|\d{18})$/       //银行卡号验证
            var regIdCart = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/     //身份证
            if(this.type == 0){
                if(this.tableHeader.length != 2 || this.tableHeader[0] != '姓名' || this.tableHeader[1] != '身份证'){
                    this.$message.error('模板标题错误');
                    return
                }
            }
            if(this.type == 1){
                if(this.tableHeader.length != 3 || this.tableHeader[0] != '姓名' || this.tableHeader[1] != '身份证' || this.tableHeader[1] != '手机号码'){
                    this.$message.error('模板标题错误');
                    return
                }
            }
            if(this.type == 2){
                if(this.tableHeader.length != 3 || this.tableHeader[0] != '姓名' || this.tableHeader[1] != '身份证' || this.tableHeader[1] != '银行卡号'){
                    this.$message.error('模板标题错误');
                    return
                }
            }
            if(this.type == 3){
                if(this.tableHeader.length != 4 || this.tableHeader[0] != '姓名' || this.tableHeader[1] != '身份证' || this.tableHeader[1] != '手机号码' || this.tableHeader[1] != '银行卡号'){
                    this.$message.error('模板标题错误');
                    return
                }
            }
            for (let i = 0; i < this.tableData.length; i++) {
                //姓名
                if (this.tableData[i].姓名) {
                    if (this.tableData[i].姓名.length > 50) {
                        this.check_common(index,i,'姓名(不能超过50个字)',this.tableData[i].姓名)
                        index++
                    }
                }else{
                    this.check_common(index,i,'姓名不能为空',this.tableData[i].姓名)
                    index++
                }
                //身份证
                if(this.tableData[i].身份证){
                    if (!regIdCart.test(Number(this.tableData[i].身份证))) {
                        this.check_common(index,i,'身份证不正确',this.tableData[i].身份证)
                        index++
                    }
                }else{
                    this.check_common(index,i,'身份证不能为空',this.tableData[i].身份证)
                    index++
                }
                //手机号码
                if(this.type == 2 || this.type == 3){
                   if(this.tableData[i].手机号码){
                        if (!regPhone.test(Number(this.tableData[i].手机号码))) {
                            this.check_common(index,i,'手机号码不正确',this.tableData[i].手机号码)
                            index++
                        }
                    }else{
                        this.check_common(index,i,'手机号码不能为空',this.tableData[i].手机号码)
                        index++
                    } 
                }
                //银行卡号
                if(this.type == 1 || this.type == 3){
                    if(this.tableData[i].银行卡号){
                        if (!regCardNo.test(Number(this.tableData[i].银行卡号))) {
                            this.check_common(index,i,'银行卡号不正确',this.tableData[i].银行卡号)
                            index++
                        }
                    }else{
                        this.check_common(index,i,'银行卡号不能为空',this.tableData[i].银行卡号)
                        index++
                    }
                }
            }
            
            if(this.errorData.length == 0){
                var num = 0;
                this.total = this.tableData.length
                this.show_list = this.tableData
                this.show_list=[];
                if(this.tableData.length>10){
                    num = 10;
                }else{
                    num = this.tableData.length;
                }
                for(var i=0; i < num; i++){
                    this.show_list.push(this.tableData[i]) 
                }
            }else{
                var num = 0;
                this.error_list = this.errorData;
                this.total = this.error_list.length 
                this.error_show_list=[];
                if(this.error_list.length>10){
                    num = 10;
                }else{
                    num = this.error_list.length;
                }
                for(var i=0; i < num; i++){
                    this.error_show_list.push(this.error_list[i]) 
                }
            } 
        },
        check_common(index,i,error,type){
            this.errorData[index] = new Object()
            this.errorData[index].index = i + 2
            this.errorData[index].error_name = error
            this.errorData[index].error_type = type
        },
        //当前页码
        handleCurrentChange(val){
            var num =0;
            this.error_show_list = [];
            this.listQuery.page = val;
            if(val*this.listQuery.limit > this.error_list.length){
                num = this.error_list.length
            }else{
                num = val*this.listQuery.limit
            }
            for(var i=(val-1)*this.listQuery.limit; i < num; i++){
                this.error_show_list.push(this.error_list[i])
            }
        },
        //每页显示多少数据
        handleSizeChange(val){
            this.error_show_list = [];
            this.listQuery.limit = val;
            if(val > this.error_list.length){
                val = this.error_list.length
            }
            for(var i=0; i< val; i++){
                this.error_show_list.push(this.error_list[i])
            }
        },
        //当前页码
        handleCurrentChange2(val){
            var num =0;
            this.show_list = [];
            this.listQuery2.page = val;
            if(val*this.listQuery2.limit > this.tableData.length){
                num = this.tableData.length
            }else{
                num = val*this.listQuery2.limit
            }
            for(var i=(val-1)*this.listQuery2.limit; i < num; i++){
                this.show_list.push(this.tableData[i])
            }
        },
        //每页显示多少数据
        handleSizeChange2(val){
            this.show_list = [];
            this.listQuery2.limit = val;
            if(val > this.tableData.length){
                val = this.tableData.length
            }
            for(var i=0; i< val; i++){
                this.show_list.push(this.tableData[i])
            }
        },
        //取消弹框
        cancel(){
            this.$emit('changeStatus');
        },
        //立即核验
        for_verif(){
            if(this.error_list.length || this.tableData.length == 0) return;
            this.$emit('upload_verif',this.tableData)
        }
    }
}
</script>
<style lang="scss" scoped>
.upload_excel{ position: absolute; top: 0; left: 0; right: 0; bottom:0; overflow: auto; background-color: #fff;}
.upload_excel .head>h3{ font-size: 16px; color: #1F2D3D;}
.upload_excel .head>i{ color:#C0CCDA; font-size: 22px; }

.upload_main{ display: inline-block; margin-top: 10px; border:1px solid #DDDDDD; border-radius: 4px; padding:20px 28px 28px;}
.upload_main>i{ font-size: 50px; color: #99A9BF;}
.upload_main p{ color: #99A9BF;}
.upload_main p em{ color: #1A8CE1;}

.selected{ left: 0; right: 0; bottom: 10px; opacity: 0; cursor: pointer;}

.common_btn{ margin: 50px 0 30px 0;}
</style>
