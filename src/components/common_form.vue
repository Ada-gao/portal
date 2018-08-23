<template>
    <div>
		<el-form :model="form" :rules="rules" ref="form" class="pt20" label-width="100px">

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="账号ID" prop="account">
                        <el-input v-model="form.account" placeholder="请输入账号id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="登录密码" prop="password">
                        <el-input v-model="form.password" placeholder="请输入登录密码" maxlength="12"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="公司名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入公司名称"></el-input>
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
                    <el-form-item label="公司地址" prop="company_address">
                        <el-input v-model="form.company_address" placeholder="请输入公司地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属行业" prop="industry">
                        <el-select v-model="form.industryType" placeholder="请选择行业大类" @change="changeIndustry" style="width: 47%!important;">
                            <el-option v-for="item in coInfo.industryType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-select class="fr" v-model="form.industry" placeholder="请选择行业小类" style="width: 47%!important;">
                            <el-option v-for="item in coInfo.industry" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
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
                    <el-form-item label="职位" prop="occupation">
                        <el-input v-model="form.occupation" placeholder="请输入职位"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="联系手机" prop="contactMobile">
                        <el-input v-model="form.contactMobile" placeholder="请输入联系手机" maxlength="11"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司邮箱" prop="companyMail">
                        <el-input v-model="form.companyMail" placeholder="请输入公司邮箱"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="公司资质" class="clearfix">
                        <ul class="img_list fl clearfix">
                            <li class="pr fl"><img src="/static/img/bg.jpg"><span @click="delete_img" class="pa in_b none">删除</span></li>
                        </ul>
                        <div class="upload tc fl">
                            <em class="block">+</em>
                            <span>点击添加图片<i class="block">支持JPG、文件10M</i></span>
                            <input @change="handleChange" type="file" class="cursor" ref='img'/>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input rows="3" type="textarea" v-model="form.text" placeholder="请输入备注" maxlength="12"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="product_set" v-if="type != 'change'">产品设定</div>

            <el-row v-if="type != 'change'">
                <el-col :span="24">
                    <el-form-item label="产品类型" label-width="80px" prop="product_type">
                        <el-select style="width:100%" v-model="form.select_data" multiple filterable allow-create default-first-option placeholder="请选择产品类型" size="medium">
                            <el-option v-for="item in select_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <div class="select_con" v-if="type != 'change'">
                <p>身份信息核验</p>
                <el-form class="form-border style"> <!--数据  :model="list"-->
                    <el-row>
                        <el-checkbox-group v-model="checkList">
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

        <el-col :span="24" slot="footer" class="clearfix" style="text-align: center; float: none;">
            <el-button class="search_btn" @click="$router.back()">取 消</el-button>
            <el-button type="primary" @click="submit">提 交</el-button>
        </el-col>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import { provinceAndCityData } from 'element-china-area-data' // 省市区数据
// import { getAuthDustryByType, getAuthDustries, uploadLogo } from '@/api/api'
export default {
    data () {
        return {
            type:'',                    //当为change是为修改   其他为创建账号
            provinceData: provinceAndCityData,      //省份数据
            cityData:{},                //市数据
            select_list:[],             //产品类型数据
            checkList:[],
            coInfo:{
                industryType:[],        //行业大类
                industry:[]             //行业小类
            },
            form:{
                name:'',                    //姓名
                account:'',                 //账号
                password:'',                //登录密码
                companyProvince:"河南省",         //省
                companyCity:'',             //市
                company_address:'',         //公司地址
                industryType:'',            //行业大类
                industry:'',                //行业小类
                contact:'',                 //联系人姓名
                occupation:'',              //职位
                contactMobile:'',           //联系电话
                companyMail:''              //公司邮箱
            },
            rules: {    //表单验证
                name: [
                    {required: true, trigger: 'blur', message: '请输入公司名称'}
                ],
                account: [
                    {required: true, trigger: 'blur', message: '请输入账号id'}
                ],
                password: [
                    {required: true, trigger: 'blur', message: '请输入登录密码'}
                ],
                companyCity: [
                     {required: true, trigger: 'blur', message: '请输入公司所在地'}
                ],
                company_address: [
                     {required: true, trigger: 'blur', message: '请输入公司地址'}
                ],
                industry: [
                     {required: true, trigger: 'blur', message: '请选择所属行业'}
                ],
                contact: [
                     {required: true, trigger: 'blur', message: '请输入联系人姓名'}
                ],
                occupation: [
                     {required: true, trigger: 'blur', message: '请输入职位'}
                ],
                contactMobile: [
                     {required: true, trigger: 'blur', validator: Validate.isvalidateMobile}
                ],
                companyMail: [
                     {required: true, trigger: 'blur', message: '请输入公司邮箱'}
                ],
                product_type: [
                     {required: true, trigger: 'blur', message: '请选择产品类型'}
                ],
            }
        }
    },
    created(){
        this.get_industry_data();
        if(this.$route.query.type){
            this.type = this.$route.query.type;
        }
        this.changeProvince(this.form.companyProvince)
    },
    methods: {
        //上传图片
        handleChange(){
            var file_obj = this.$refs['img'].files[0];
            console.log(file_obj)
            let formData = new FormData()
            formData.append('file', file_obj)
            uploadLogo(formData).then(res => {
                console.log(res.data,'111')
            })
        },
        //选择省份
    	changeProvince (val) {
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
            this.form.companyCity = null
        },
        //获取行业大类数据
        get_industry_data(){
            getAuthDustries().then(res => {
                this.coInfo.industryType = res.data 
            })
        },
        
        //选择行业大类
        changeIndustry (val) {
            this.form.industry = ''
            //获取行业小类
            getAuthDustryByType(val).then(res => {
                this.coInfo.industry = res.data
            })
        },

        //删除图片
        delete_img(){

        },

        //提交
        submit(){
            this.$refs['form'].validate(valid => {
                console.log(valid,'111')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.query_result_head>span{ line-height: 32px;}

.upload{ width: 120px; height: 80px; border:1px solid #C8C8C8; background-color: #FAFAFA; border-radius: 2px; -webkit-border-radius: 2px; line-height: 20px; font-size: 0; position: relative;}
.upload input{ position: absolute; top: 0; left: 0; height: 80px; width: 120px; opacity: 0;}
.upload em{ font-size: 30px; color:#1A8CE1; margin-top: 10px; }
.upload span{ display: block; font-size: 12px; margin-top: 5px;}
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
