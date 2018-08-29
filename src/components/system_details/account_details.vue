<template>
    <div>
        <div class="modify" @click="modify_account = true"><i class="iconfont icon-xiugai"></i>修改</div>
        <el-form class="company_details pt20" label-width="100px">

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="账号ID：" class="omit1"><span>shuyunxinxikeji1001</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="账户类型：" class="omit1"><span>付费使用</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="账户到期时间：" class="omit1"><span>2018.12.31</span></el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="Account Id:" class="omit1">
                        <span>shuyunxinxikeji2</span>
                        <em class="ml15 cursor tr" @click="check_key"><i class="iconfont icon-zhongzhi mr5"></i>重置key</em>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="账户状态：">
                        <span>启用</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="登录账号：">
                        <span>shuyun001</span>
                        <em class="ml15 cursor" @click="checkPass = true"><i class="iconfont icon-zhongzhi mr5"></i>修改密码</em>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="账户余额：">
                        <span>10000</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="余额提醒：">
                        <span>1000元</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

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

        <!--点击修改-->
        <el-dialog title="账户信息修改" :visible.sync="modify_account" width='70%'>
            <el-form :model="form" ref="form" :rules="rules" label-width="110px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="余额提醒"  prop="password">
                            <el-input v-model="form.password" placeholder="请输入余额"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账户状态" prop="status">
                            <el-input v-model="form.password" placeholder="请输入账户状态"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="账户到期时间" prop="data">
                            <el-date-picker v-model="data_time" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer">
                <el-button @click="modify_account = false">取 消</el-button>
                <el-button type="primary" @click="modify_pass">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
export default {
    data () {
        return {          
            checkPass:false,        //修改密码
            autoplay:false,         //轮播图不制动滚动
            index:0,                //轮播图默认展示第一张
            swiper_img:false,       //查看大图 默认隐藏
            data_time:'',           //账户到期时间
            modify_account:false,   //账户修改弹框
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
        //修改密码 确认
        submit_pass(){
            this.$refs['form'].validate(valid => {
                console.log(valid,'111')
            })
        },
        //修改账户信息 确认
        modify_pass(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
.company_details i,.company_details em{ color: #1A8CE1;}
//弹框样式

.modify{ line-height: 24px; color: #1A8CE1; cursor: pointer; position: absolute; right: 25px; top: 20px;}
.modify i{ color: #1A8CE1; margin-right: 5px;}
</style>
