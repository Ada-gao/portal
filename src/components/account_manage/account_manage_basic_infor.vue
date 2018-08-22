<template>
    <div>
        <div class="basic_info common_style mt20 box_adorn">
            <div class="common_head omit1">
                <i class="iconfont icon-552cde89f09d1"></i>
                <em class="font16">基本信息<i class="font12">（变更账号信息，请联系对接商务经理，谢谢）</i></em>
            </div>
            <div class="app-container mt10">
                <el-form class="form-border" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="账号ID：">
                                <span>shuxiangxinxikeji</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="姓名：">
                                <span>王秀明</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系手机：">
                                <span>13333333333</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="Account ID：">
                                <span>shuxiangxinxikeji</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="职位：">
                                <span>风控总监</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="所属行业：">
                                <span>IT/互联网-金融科技</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="公司名称：">
                                <span>shuxiangxinxikeji</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="所在地：">
                                <span>上海市-浦东新区</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="公司邮箱：">
                                <span>wangxiuming@163.com</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            list:[]         //基本信息列表
        }
    },
    methods: {
    
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
