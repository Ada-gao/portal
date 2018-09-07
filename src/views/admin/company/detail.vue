<template>
    <div class="basic_info common_style box_adorn">
        <div class="spec_head">
            <em class="in_b"></em><span>公司信息</span>
            <div class="fr">
                <span class="cursor" @click="for_company_change"><i class="iconfont icon-xiugai mr5"></i><em>修改</em></span>
            </div>
        </div>
        <!--公司详情-->
        <div>
            <el-form class="company_details pt20" label-width="100px" v-loading="loading" element-loading-text="给我一点时间">

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="公司名称：" class="omit1"><span>{{details_data.companyName}}</span></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所在地：" class="omit1">
                            <span>{{details_data.companyProvince}} - {{details_data.companyCity}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公司地址：" class="omit1">
                            <span>{{details_data.companyAddress}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="所属行业："><span>{{details_data.industryType + details_data.industry}}</span></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公司规模："><span>{{details_data.orgSizeName}}</span></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公司邮箱："><span>{{details_data.companyEmail}}</span></el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="联系人："><span>{{details_data.contact}}</span></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职务："><span>{{details_data.position}}</span></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系手机："><span>{{details_data.contactMobile}}</span></el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="公司资质：" style="margin-bottom: 0;">
                            <ul class="img_list in_b clearfix">
                                <li class="pr fl" @click="swiper_img = true" v-for="(img,index) in details_data.companyQualification" :key="index"><img :src="img"><span class="pa in_b none">查看图片</span></li>
                            </ul>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20" v-if="details_data.remark">
                    <el-col :span="24">
                        <el-form-item label="备注：">
                            <span>{{details_data.remark}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!--图片滚动-->
            <div class="img_tk" v-if="swiper_img == true">
                <div class="swiper">
                    <el-carousel arrow='never' :initial-index="index" :autoplay="autoplay" ref="carousel" indicator-position="none" width="560px">
                        <el-carousel-item name="index" v-for="(img,index) in details_data.companyQualification" :key="index">
                            <h3><img class="block" :src="img"></h3>
                        </el-carousel-item>
                    </el-carousel>
                    <a @click="swiper_img = false,index = 0" class="closed" href="javascript:void(0);"><i class="el-icon-close"></i></a>
                    <div class="handle">
                        <a v-if="index != 0" class="prev" @click="switch_index('prev')" href="javascript:void(0);"><i class="el-icon-arrow-left"></i></a>
                        <a v-if="index != 1" class="next" @click="switch_index('next')" href="javascript:void(0);"><i class="el-icon-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import { mapGetters } from "vuex";
import request from "@/router/axios";
export default {
    computed: {
        ...mapGetters(["permissions"])
    },
    data () {
        return {
            companyId:'',           //公司id
            orgSizeData:[],         //公司规模
            autoplay:false,         //轮播图不制动滚动
            index:0,                //轮播图默认展示第一张
            swiper_img:false,       //查看大图 默认隐藏
            details_data:{},         //公司详情数据
            loading:false
        }
    },
    created() {
        this.sys_company_upd = this.permissions["sys_company_upd"];
    },
    mounted(){
        this.companyId = this.$route.query.companyId;
        this.get_orgSizeData();
    },
    methods: {
        //获取公司规模
        get_orgSizeData(){
            request({
                url: "/admin/dict/type/" + 'org_size',
                method: "get",
            }).then(response => {
                if(response.status == 200){
                   this.orgSizeData = response.data;
                   this.get_companyDetails();
                }
            }).catch(()=>{

            })
        },
        //获取公司详情
        get_companyDetails(id,type){
            this.loading = true;
            request({
                url: "/admin/company/" + this.companyId,
                method: "get"
            }).then(response => {
                this.loading = false;
                this.details_data = response.data;
                this.details_data.companyQualification = response.data.companyQualification.split(',');
                for(var j in this.orgSizeData){
                   if(this.orgSizeData[j].value == this.details_data.orgSize){
                        this.details_data.orgSizeName = this.orgSizeData[j].label
                    } 
                }
            })
        },
        //点击修改
        for_company_change(){
            this.$router.push({path:'/admin/company/change', query: {type:'change',details_data:JSON.stringify(this.details_data)}});
        },
        //轮播图切换
        switch_index:function(type){
            if(type == 'prev'){
                if(this.index == 0) return
                this.index = this.index - 1;
                this.setActiveItem(this.index);
            }else{
                if(this.index == 1) return;
                this.index = this.index + 1;
                this.setActiveItem(this.index);
            }
        },
        setActiveItem:function(index){
            this.$refs.carousel.setActiveItem(index);
        },
    }
}
</script>

<style lang="scss" scoped>
.common_style{ padding-top: 0!important;}
.tab_head li{ margin-right: 60px;}
.tab_head li a{ height:32px; }
.tab_head li.current a{ color: #1A8CE1; border-bottom: 2px solid #1A8CE1;}

.company_details i,.company_details em{ color: #1A8CE1;}
.img_list li{ width: 120px; height: 80px; margin-right: 10px; cursor: pointer; }
.img_list li:hover span{ display: block;}
.img_list li span{ width: 120px; height: 80px; top: 0; left: 0; background-color: rgba(0,0,0,.4); font-size: 10px; color: #fff; text-align: center; line-height: 80px;}
.img_list img{ width: 120px; height: 80px; }

//弹框样式
.img_tk{ position:fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.2); z-index: 10000;}
.img_tk .closed{ position: absolute; display: flex; height: 40px; width: 40px; top: 10px; right: 10px; background-color: rgba(0,0,0,0.4); z-index: 10; }
.img_tk .closed i,.handle>a i{ margin: auto;  color: #fff; font-size: 18px;}
.swiper{ width: 560px; position: absolute; top: 50%; left: 50%; transform:translate(-50%,-50%); -webkit-transform:translate(-50%,-50%);}
.handle>a{ position: absolute; display: flex; height: 40px; width: 40px; top: 10px; right: 10px; background-color: rgba(0,0,0,0.4); z-index: 10; top: 50%; margin-top:-20px; }
.handle>a.prev{ left:-60px;}
.handle>a.next{ right:-60px;}

.swiper img{ width: 560px; max-height: 300px;}

.spec_head div em{ background: none; color: #1A8CE1;}
.spec_head div i{ color: #1A8CE1;}
</style>
