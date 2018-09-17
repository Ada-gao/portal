<template>
    <div>
        <div class="basic_info common_style mt20 box_adorn">
            <div class="common_head omit1">
                <i class="iconfont icon-gerenxinxi"></i>
                <em class="font16">基本信息<i class="font12">（变更账号信息，请联系对接商务经理，谢谢）</i></em>
            </div>
            <div class="app-container mt10">
                <el-form class="form-border" label-width="110px">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="账号ID：">
                                <span>{{userInfo.username}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="账号类型：">
                                <span>{{basic_info.userType}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="账户到期时间：">
                                <span>{{basic_info.expirationDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="Account ID：">
                                <span>{{userInfo.username}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="姓名：">
                                <span>{{basic_info.name}}</span>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="联系手机：">
                                <span>{{basic_info.phone}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="公司名称：">
                                <span>{{basic_info.companyName}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="职务：">
                                <span>{{basic_info.position}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="所属行业：">
                                <span>{{basic_info.industryType}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="所在地：">
                                <span>{{basic_info.companyAddress}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="公司邮箱：">
                                <span>{{basic_info.email}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import request from "@/router/axios";
import { mapState } from "vuex";
export default {
    data () {
        return {
            userType_list:[],       //类型
            basic_info:{}           //基本信息
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            dic: state => state.dic
        }),
    },
    created() {
        this.get_basicInfo();
    },
    methods: {
        get_basicInfo(){
            request({
                url: "/admin/user/baseUserInfo",
                method: "get"
            }).then(res => {
                this.basic_info = res.data;
                for(var i in this.dic.userType){
                    if(this.dic.userType[i].value == this.basic_info.userType){
                        this.basic_info.userType = this.dic.userType[i].label;
                    }
                }
            }).catch(() => {})
        }
    }
}
</script>

<style scoped lang="scss">
.app-container{ padding:0 30px;}
.our_info{ padding:35px 0; text-align: center;}
.our_info .spicle{ width: 70px; height: 70px; }
.our_info .balance .spicle{ background-color:#1A8CE1; }
.our_info .consump .spicle{ background-color:#F8C065 ; }
.our_info .con{ margin-left: 20px;}
.our_info .con>div{ text-align: left;}
.basic_info{ background-color: #fff;}
</style>
