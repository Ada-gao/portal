<template>
    <div  class="basic_info common_style box_adorn">
    	<div class="spec_head">
    		<em class="in_b"></em><span>账号充值</span>
    	</div>
    	<el-form class="pt20" :model="form" :rules="rules" ref="form" label-width="120px">
    		<el-row>
                <el-col :span="12">
                    <el-form-item label="所属公司" prop="company">
                        <el-select style="width: 100%" v-model="form.company" placeholder="选择所属公司" clearable @change="check_company">
		                	<el-option v-for="item in company_list" :key="item.value" :label="item.label" :value="item.label"></el-option>
          			   </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属账户" prop="money">
                        <el-input type="password" v-model="form.money" placeholder="请选择所属账户"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="充值金额(元)" prop="money">
                        <el-input type="password" v-model="form.money" placeholder="输入充值金额"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="确认金额(元)" prop="repeat_money">
                        <el-input type="password" v-model="form.repeat_money" placeholder="再次输入充值金额"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="充值备注">
                        <el-input type="textarea" rows="3" v-model="form.text" placeholder="请输入备注内容" maxlength="12"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>

        <el-col :span="24" slot="footer" class="clearfix" style="text-align: center; float: none;">
            <el-button class="search_btn" @click="$router.back()">取 消</el-button>
            <el-button type="primary" @click="submit">提 交</el-button>
        </el-col>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
export default {
    data () {
        return {
        	company_list:[],		//公司列表
        	type_list:[],			//充值类型 列表
            form:{
            	company:'',			//所属公司
            	type:'',			//充值类型
            	money:'',			//充值金额
            	repeat_money:'',	//重复充值金额
            	text:''				//备注
            },
            rules: {
                company: [
                    {required: true, trigger: 'blur', message: '请选择所属公司'}
                ],
                type: [
                    {required: true, trigger: 'blur',  message: '请选择充值类型'}
                ],
                money: [
                    {required: true, trigger: 'blur',  message: '请输入充值金额'}
                ],
                repeat_money: [
                    {required: true, trigger: 'blur',  message: '请再次输入充值金额'}
                ],
            },
        }
    },
    methods: {
    	//选择公司
    	check_company(e){},
    	//充值类型
    	check_type(e){},
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
.common_style{ padding-top: 0!important;}
</style>
