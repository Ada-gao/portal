<template>
    <div  class="app-container">
    	<div class="spec_head">
    		<em class="in_b"></em><span>修改密码</span>
    	</div>
    	<el-form class="pt20" :model="form" :rules="rules" ref="form" label-width="100px">
    		<el-row>
                <el-col :span="17">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input type="password" v-model="form.oldPassword" placeholder="请输入原密码" maxlength="12"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="17">
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="form.newPassword" placeholder="请输入新密码" maxlength="12"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="17">
                    <el-form-item label="确认密码" prop="againPassword">
                        <el-input type="password" v-model="form.againPassword" placeholder="请再次输入新密码" maxlength="12"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>

        <el-col :span="17" slot="footer" class="clearfix" style="text-align: center; float: none;">
            <el-button class="search_btn" @click="$router.back()">取 消</el-button>
            <el-button class="add_btn" @click="submit">提 交</el-button>
        </el-col>
    </div>
</template>

<script>
//import Validate from '@/common/filter_rules'
export default {
    data () {
        return {
            form:{
            	oldPassword:'',
            	newPassword:'',
            	againPassword:''
            },
            rules: {
                oldPassword: [
                    {required: true, trigger: 'blur'}
                ],
                newPassword: [
                    {required: true, trigger: 'blur'}
                ],
                againPassword: [
                    {required: true, trigger: 'blur'}
                ],
            },
        }
    },
    methods: {
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
.common_style{ padding-top: 0;}
</style>
