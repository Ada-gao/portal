<template>
    <div>
        <el-form class="company_details pt20" label-width="100px">

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="公司名称：" class="omit1"><span>数赟信息科技有限公司</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="所在地：" class="omit1"><span>上海市-浦东新区</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="公司地址：" class="omit1"><span>上海市浦东新区陆家嘴</span></el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="所属行业："><span>IT/互联网-金融科技</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="公司规模："><span>1000以上</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="公司邮箱："><span>wangxiuming@163.com</span></el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="联系人："><span>王秀明</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="职务："><span>总经理</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系手机："><span>13333333333</span></el-form-item>
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
</template>

<script>
import Validate from '@/util/filter_rules'
export default {
    data () {
        return {          
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
