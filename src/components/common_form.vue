<template>
    <div>
		<el-form :model="form" :rules="rules" ref="form" class="pt20" label-width="100px">

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="公司名称" prop="companyName">
                        <el-input v-model="form.companyName" placeholder="请输入公司名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在地" prop="companyCity">
                        <el-select v-model="form.companyProvince" placeholder="请选择省份" @change="changeProvince"
                         style="width: 47%!important;">
                            <el-option v-for="item in provinceData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-select class="fr" v-model="form.companyCity" placeholder="请选择地区"
                         style="width: 47%!important;">
                            <el-option v-for="item in cityData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="公司地址" prop="companyAddress">
                        <el-input v-model="form.companyAddress" placeholder="请输入公司地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属行业" prop="industry">
                        <el-select v-model="form.industryType" placeholder="请选择行业大类" @change="changeIndustry" style="width: 47%!important;">
                            <el-option v-for="item in coInfo.industryType" :key="item.industryName" :label="item.industryName" :value="item.industryName"></el-option>
                        </el-select>
                        <el-select class="fr" v-model="form.industry" placeholder="请选择行业小类" style="width: 47%!important;" @click.native="get_industry">
                            <el-option v-for="item in coInfo.industry" :key="item.industryName" :label="item.industryName" :value="item.industryName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="公司规模" prop="orgSize">
                        <el-select v-model="form.orgSize" placeholder="请选择公司规模">
                            <el-option v-for="item in orgSizeData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司邮箱" prop="companyEmail">
                        <el-input v-model="form.companyEmail" placeholder="请输入公司邮箱"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="联系人" prop="contact">
                        <el-input v-model="form.contact" placeholder="请输入联系人姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="职务">
                        <el-input v-model="form.position" placeholder="请输入职务"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="联系手机" prop="contactMobile">
                        <el-input v-model="form.contactMobile" placeholder="请输入联系手机" maxlength="11"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="公司资质" class="clearfix" prop="companyQualification">
                        <ul class="img_list fl clearfix" v-if="img_list.length">
                            <li class="pr fl" v-for="(img,index) in img_list"><img :src="img"><span @click="delete_img(index)" class="pa in_b none">删除</span></li>
                        </ul>
                        <div class="upload tc fl" v-if="img_list.length < 5">
                            <em class="block">+</em>
                            <span>点击添加图片<i class="block">支持JPG、PNG 文件10M</i></span>
                            <input @change="upload_img"  multiple="multiple" type="file" class="cursor" ref='img'/>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input rows="3" type="textarea" v-model="form.remark" placeholder="请输入备注" maxlength="12"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-col :span="24" slot="footer" class="clearfix" style="text-align: center; float: none;">
            <el-button class="search_btn" @click="$router.back()">取 消</el-button>
            <el-button v-if="type != 'change'" type="primary" @click="submit">提 交</el-button>
            <el-button v-if="type == 'change'" type="primary" @click="details_change">修 改</el-button>
        </el-col>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import request from "@/router/axios";
import { provinceAndCityData } from 'element-china-area-data' // 省市区数据
export default {
    data () {
        return {
            type:'',                    //当为change是为修改   其他为创建账号
            provinceData: provinceAndCityData,      //省份数据
            orgSizeData:[],                 //公司规模
            industryTypeData:[],            //所属行业一级
            cityData:{},                //市数据
            select_list:[],             //产品类型数据
            checkList:[],
            coInfo:{
                industryType:[],        //行业大类
                industry:[]             //行业小类
            },
            img_list:[],            //上传图片列表
            form:{
                dto:'dto',
                companyId:'',                       //公司ID
                companyName:'',                      //公司名称
                companyProvince:"",                 //省
                companyCity:'',                     //市
                companyAddress:'',                  //公司地址
                companyQualification:'',            //公司资质
                industryType:'',                  //行业大类
                industry:'',                      //行业小类
                remark:'',                          //备注
                deptId:'',                          //部门id
                contact:'',                         //联系人姓名
                contactMobile:'',                   //联系电话
                companyEmail:'',                     //公司邮箱
                position:'',                      //职务
                orgSize:''                          //公司规模
            },
            rules: {    //表单验证
                companyName: [
                    {required: true, trigger: 'blur', message: '请输入公司名称'}
                ],
                companyCity: [
                     {required: true, trigger: 'blur', message: '请输入公司所在地'}
                ],
                companyAddress: [
                     {required: true, trigger: 'blur', message: '请输入公司地址'}
                ],
                industry: [
                     {required: true, trigger: 'blur', message: '请选择所属行业'}
                ],
                contact: [
                     {required: true, trigger: 'blur', message: '请输入联系人姓名'}
                ],
                contactMobile: [
                     {required: true, trigger: 'blur', validator: Validate.isvalidateMobile}
                ],
                companyEmail: [
                     {required: true, trigger: 'blur', validator: Validate.validEmail}
                ],
                product_type: [
                     {required: true, trigger: 'blur', message: '请选择产品类型'}
                ],
                companyNumber: [
                     {required: true, trigger: 'blur', message: '请选择公司规模'}
                ],
                companyQualification: [
                     {required: true, trigger: 'blur', message: '请上传公司资质'}
                ],
                orgSize: [
                     {required: true, trigger: 'change', message: '请选择公司规模'}
                ]
            }
        }
    },
    created(){
        //获取一级行业
        this.get_industryData(0)
        if(this.$route.query.type){
            this.type = this.$route.query.type;
        }
        if(this.$route.query.details_data){
            var details_data = this.$route.query.details_data
            this.form = JSON.parse(details_data)
            this.form.companyQualification = JSON.parse(details_data).companyQualification.join(",");
            this.img_list = JSON.parse(details_data).companyQualification;
        }
        this.get_orgSizeData();
        //当存在省份  获取省份下的市
        if(this.form.companyProvince){
            this.changeProvince(this.form.companyProvince,'init')
        }
    },
    methods: {
        get_industry(){
            if(this.coInfo.industry.length) return;
            for(var i in this.coInfo.industryType){
                if(this.coInfo.industryType[i].industryName == this.form.industryType){
                    this.get_industryData(this.coInfo.industryType[i].industryId,'industry')
                }
            }
        },
        //获取公司规模
        get_orgSizeData(){
            request({
                url: "/admin/dict/type/" + 'org_size',
                method: "get",
            }).then(response => {
                if(response.status == 200){
                   this.orgSizeData = response.data 
                }
            })
        },
        //上传图片
        upload_img(){
            var file_obj = this.$refs['img'].files[0]
            let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
            if (!file_obj || supportedTypes.indexOf(file_obj.type) == -1) {
                this.$toast.show({
                    text:'图片文件格式只支持：jpg、jpeg和png',
                    type:'error'
                })
                return;
            }
            if(file_obj.size > 1024000){
                this.$toast.show({
                    text:'图片过大',
                    type:'error'
                })
                return;
            }
            let formData = new FormData()
            formData.append('file', file_obj)
            request({
                url: "/admin/company/upload",
                method: "post",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                this.img_list.push(res.data)
                this.form.companyQualification = this.img_list.join(","); 
            })
            
        },
        //删除图片
        delete_img(index){
            this.img_list.splice(index,1);
            this.form.companyQualification = this.img_list.join(",");
        },
        //选择省份
    	changeProvince (val,type) {
            let idx = this.provinceData.findIndex((item, index) => {
                return item.label == val
            })
            var cityarr = []
            if (!this.provinceData[idx].children || typeof this.provinceData[idx].children === 'undefined' || this.provinceData[idx].children.length === 0) {
                this.form.companyCity = null
                cityarr.label = '市辖区'
                this.cityData = []
                this.cityData[0] = cityarr
                return
            }
            this.cityData = this.provinceData[idx].children
            if(!type) this.form.companyCity = null
        },
        //所属行业  一级
        get_industryData(id,type){
            request({
                url: "/admin/industry/" + id,
                method: "get",
            }).then(response => {
                if(response.status == 200){
                   if(type){
                        this.coInfo.industry = response.data
                   }else{
                        this.coInfo.industryType = response.data
                   }
                }
            })
        },
        //选择所属行业 一级
        changeIndustry(){
            for(var i in this.coInfo.industryType){
                if(this.coInfo.industryType[i].industryName == this.form.industryType){
                    this.get_industryData(this.coInfo.industryType[i].industryId,'industry')
                }
            }
            this.form.industry = '';
        },
        //提交
        submit(){
            this.$refs['form'].validate(valid => {
                if(valid){
                    request({
                        url: "/admin/company/add",
                        method: "post",
                        data: this.form,
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.$toast.show({
                                text:'新建公司账号成功',
                                type:'success'
                            })
                            this.$router.back()
                        } else {
                            this.$toast.show({
                                text:res.data.msg,
                                type:'error'
                            })
                        }
                    })
                }
            })
        },
        //修改公司信息
        details_change(){
            this.$refs['form'].validate(valid => {
                if(valid){
                    //公司规模传给后台 转化
                    for(var j in this.orgSizeData){
                       if(this.orgSizeData[j].value == this.form.orgSize){
                            this.form.orgSize = this.orgSizeData[j].value
                        } 
                    }
                    request({
                        url: "/admin/company/" + this.form.companyId,
                        method: "put",
                        data: this.form,
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.$toast.show({
                                text:'新建公司账号成功',
                                type:'success'
                            })
                            this.$router.back()
                        } else {
                            this.$toast.show({
                                text:res.data.msg,
                                type:'error'
                            })
                        }
                    })
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.query_result_head>span{ line-height: 32px;}

.upload{ width: 120px; height: 80px; border:1px solid #C8C8C8; background-color: #FAFAFA; border-radius: 2px; -webkit-border-radius: 2px; line-height: 20px; font-size: 0; position: relative;}
.upload input{ position: absolute; top: 0; left: 0; height: 80px; width: 120px; opacity: 0;}
.upload em{ font-size: 30px; color:#1A8CE1; margin-top: 10px; }
.upload span{ display: block; font-size: 12px; margin-top: 5px; color:#A1A1A1;}
.upload i{ display: block; font-size: 10px;}
.img_list li{ width: 120px; height: 80px; margin-right: 10px; }
.img_list li:hover span{ display: block;}
.img_list li span{ width: 120px; height: 20px; line-height: 20px; font-size:14px; bottom: 0; background-color: rgba(0,0,0,.3); font-size: 10px; color: #fff; text-align: center; cursor: pointer; }
.img_list img{ width: 120px; height: 80px; }

//产品设定
.product_set{ margin:0 0 25px 30px; font-size: 16px; font-weight: 600;}
.select_con>p{ padding-left: 10px; margin-bottom: 15px; }
.select_con .style{ padding:0 10px;}
.select_con span{ margin-left: 5px;}
.select_con input{ width: 46px!important; height: 26px; line-height: 26px; padding:0 5px; text-align: center; border:1px solid #C8C8C8; border-radius: 2px; -webkit-border-radius: 2px; margin:0 5px; }
</style>
