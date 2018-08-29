<template>
    <div class="basic_info common_style box_adorn">
        <div class="spec_head">
            <em class="in_b"></em><span>公司详情</span>
        </div>
        <!--公司详情-->
        <div>
            <el-form class="company_details pt20" label-width="100px">

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="账号ID：" class="omit1">
                            <span>shuyunxinxikeji1001</span>
                            <em class="ml15 cursor" @click="checkPass = true"><i class="iconfont icon-zhongzhi mr5"></i>修改密码</em>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Account Id：" class="omit1">
                            <span>shuyunxinxikeji1002</span>
                            <em class="ml15 cursor" @click="check_key"><i class="iconfont icon-zhongzhi mr5"></i>重置key</em>
                            <div class="fr">
                                <router-link v-if="sys_company_upd" :to="{path:'/admin/company/change', query:{type:'change'}}" tag="span" class="mr20 cursor"><i class="iconfont icon-zhongzhi mr5"></i><em>修改</em></router-link>
                                <el-switch @change="check_restart" v-model="restart" active-color="#1A8CE1" active-text="启用"></el-switch>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="公司名称：">
                            <span>数赟信息科技有限公司</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账户状态：">
                            <span>付费使用</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="账户余额：">
                            <span>10000元</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="余额提醒：">
                            <span>1000元</span>
                            <em class="ml15 cursor" @click="checkBalance = true"><i class="iconfont icon-zhongzhi mr5"></i>修改余额提醒</em>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="公司地址：">
                            <span>上海市浦东新区峨山路91号</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在地：">
                            <span>上海市-浦东新区</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="联系人：">
                            <span>王小虎</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业：">
                            <span>IT/互联网-金融科技</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="联系手机：">
                            <span>13901871234</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职位：">
                            <span>风控总监</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="公司邮箱：">
                            <span>wangxiuming@163.com</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="公司资质：" style="margin-bottom: 0;">
                            <ul class="img_list in_b clearfix">
                                <li class="pr fl" @click="swiper_img = true"><img src="/static/img/bg/bg1.jpg"><span class="pa in_b none">查看图片</span></li>
                            </ul>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注：">
                            <span>2018.7.1 对接需求，开测试帐号，后期继续跟进。</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!--图片滚动-->
            <div class="img_tk" v-if="swiper_img == true">
                <div class="swiper">
                    <el-carousel arrow='never' :initial-index="index" :autoplay="autoplay" ref="carousel" indicator-position="none" width="560px">
                        <el-carousel-item name="index">
                            <h3><img class="block" src="/static/img/bg/bg1.jpg"></h3>
                        </el-carousel-item>
                        <el-carousel-item name="index">
                            <h3><img class="block" src="/static/img/bg/bg1.jpg"></h3>
                        </el-carousel-item>
                    </el-carousel>
                    <a @click="swiper_img = false,index = 0" class="closed" href="javascript:void(0);"><i class="el-icon-close"></i></a>
                    <div class="handle">
                        <a v-if="index != 0" class="prev" @click="switch_index('prev')" href="javascript:void(0);"><i class="el-icon-arrow-left"></i></a>
                        <a v-if="index != 1" class="next" @click="switch_index('next')" href="javascript:void(0);"><i class="el-icon-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            <!--修改密码-->
            <!--修改密码 弹框-->
            <el-dialog title="修改登录密码" :visible.sync="checkPass">
                <el-form :model="form" ref="form" :rules="rules">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="新密码" label-width="80px" prop="password">
                                <el-input v-model="form.password" placeholder="输入新密码" maxlength="12"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer">
                    <el-button @click="checkPass = false">取 消</el-button>
                    <el-button type="primary" @click="submit_pass">确 定</el-button>
                </span>
            </el-dialog>
            <!--修改余额提醒-->
            <el-dialog title="修改余额提醒" :visible.sync="checkBalance">
                <el-form :model="form" ref="form" :rules="rules">
                    <el-row :gutter="10">
                        <el-col :span="17">
                            <el-form-item label="余额低于" label-width="80px" prop="password">
                                <el-input v-model="form.password" placeholder="请输入最低余额提醒"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <em>元,进行余额提醒</em>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer">
                    <el-button @click="checkBalance = false">取 消</el-button>
                    <el-button type="primary" @click="submit_balance">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["permissions"])
    },
    data () {
        return {
            sys_company_upd:false,      //是否有权限修改公司详情
            restart:false,          //是否启用
            checkPass:false,        //修改密码
            checkBalance:false,     //修改余额提醒
            autoplay:false,         //轮播图不制动滚动
            index:0,                //轮播图默认展示第一张
            swiper_img:false,       //查看大图 默认隐藏
            form:{
                password:''         //新密码
            },
            rules: {
                password: [
                    {required: true, trigger: 'blur', validator: Validate.validatePass }
                ]
            },
        }
    },
    created() {
        this.sys_company_upd = this.permissions["sys_company_upd"];
    },
    mounted(){

    },
    methods: {
        //重置key
        check_key(){
            this.$confirm('确定重置key吗?', '取消', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
            }).catch(() => {
                          
            });
        },
        //启用停用
        check_restart(e){
            if(!this.restart){
               this.$confirm('确定停用吗?', '取消', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.restart = false;
                }).catch(() => {
                     this.restart = true;         
                }); 
            }
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
        //修改密码 确认
        submit_pass(){
            this.$refs['form'].validate(valid => {
                console.log(valid,'111')
            })
        },
        //修改余额
        submit_balance(){

        }
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

.swiper img{ width: 560px; height: auto;}
</style>
