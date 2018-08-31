<template>
    <div  class="basic_info common_style box_adorn">
    	<div class="spec_head">
    		<em class="in_b"></em><span>新建账号</span>
    	</div>
    	<div class="product_set">账户基本信息</div>
    	<div>
            <el-form :model="form" :rules="rules" ref="form" class="pt20" label-width="110px">

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="所属公司" prop="companyName">
                            <el-input v-model="form.companyName" placeholder="请选择所属公司"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账户类型" prop="companyEmail">
                            <el-input v-model="form.companyEmail" placeholder="请输入账户类型"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="余额提醒" prop="companyEmail">
                            <el-input v-model="form.companyEmail" placeholder="请输入余额提醒"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账户到期时间" prop="companyEmail">
                            <el-input v-model="form.companyEmail" placeholder="请选择账户到期时间"></el-input>
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
                            <el-input v-model="form.occupation" placeholder="请输入联系人职位"></el-input>
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
                        <el-form-item label="联系邮箱" prop="contactMobile">
                            <el-input v-model="form.contactMobile" placeholder="请输入联系邮箱" maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="登录账户" prop="contactMobile">
                            <el-input v-model="form.contactMobile" placeholder="请输入登录账号" maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="登录密码" prop="contactMobile">
                            <el-input v-model="form.contactMobile" placeholder="请输入登录密码" maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div class="product_set">产品设定</div>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="产品类型" label-width="80px" prop="product_type">
                            <el-select style="width:100%" v-model="form.select_data" multiple filterable allow-create default-first-option placeholder="请选择产品类型" size="medium">
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
        </div>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
export default {
    data () {
        return {          
            form:{
                dto:'dto',
                companyName:'',                      //公司名称
                companyProvince:"",                 //省
                companyCity:'',                     //市
                companyAddress:'',                  //公司地址
                companyQualification:'',            //公司资质
                industryType:'',                  //行业大类
                industry:'',                      //行业小类
                remark:'',                          //备注
                deptId:'',
                contact:'',                         //联系人姓名
                contactMobile:'',                   //联系电话
                companyEmail:'',                     //公司邮箱
                occupation:'',                      //职务
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
    }
}
</script>

<style lang="scss" scoped>
.common_style{ padding-top: 0!important;}
.product_set{ margin:20px 0 0 30px; font-size: 16px; font-weight: 600;}

//产品设定
.product_set{ margin:0 0 25px 30px; font-size: 16px; font-weight: 600;}
.select_con>p{ padding-left: 10px; margin-bottom: 15px; }
.select_con .style{ padding:0 10px;}
.select_con span{ margin-left: 5px;}
.select_con input{ width: 46px!important; height: 26px; line-height: 26px; padding:0 5px; text-align: center; border:1px solid #C8C8C8; border-radius: 2px; -webkit-border-radius: 2px; margin:0 5px; }
</style>