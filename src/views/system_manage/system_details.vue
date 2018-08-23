<template>
    <div class="basic_info common_style box_adorn">
    	<div class="tab_head clearfix">
    		<ul class="fl clearfix">
    			<li class="fl" :class="{'current':type == 1}" @click="check_type(1)"><a class="in_b font16" href="javascript:void(0);">公司详情</a></li>
    			<li class="fl" :class="{'current':type == 2}" @click="check_type(2)"><a class="in_b font16" href="javascript:void(0);">产品管理</a></li>
    			<li class="fl" :class="{'current':type == 3}" @click="check_type(3)"><a class="in_b font16" href="javascript:void(0);">消费记录</a></li>
    			<li class="fl" :class="{'current':type == 4}" @click="check_type(4)"><a class="in_b font16" href="javascript:void(0);">充值记录</a></li>
    		</ul>
    	</div>
        <!--公司详情-->
        <company_details v-if="type == 1"></company_details>
    	<!--产品管理-->
    	<product_manage_recode v-if="type == 2"></product_manage_recode>
    	<!--消费记录-->
    	<consump_recode v-if="type == 3"></consump_recode>
    	<!--充值记录-->
    	<recharge_recode v-if="type == 4"></recharge_recode>
    </div>
</template>

<script>
import recharge_recode from 'components/system_details/recharge_recode'
import consump_recode from 'components/system_details/consump_recode'
import product_manage_recode from 'components/system_details/product_manage_recode'
import company_details from 'components/system_details/company_details'
export default {
	components: { company_details, product_manage_recode, consump_recode, recharge_recode },
    data () {
        return {
            type:1,		// 1为信息核验 2位历史结果查询  默认为1
        }
    },
    mounted(){
        //if(this.$route.query.type){
           // this.type = this.$route.query.type
       // }
    },
    methods: {
    	//tab 切换
    	check_type(type){
    		this.type = type;
            this.$router.replace({path:'/system/system_details', query: {type: this.type}});
    	}
    }
}
</script>

<style lang="scss" scoped>
.tab_head li{ margin-right: 60px;}
.tab_head li a{ height:32px; }
.tab_head li.current a{ color: #1A8CE1; border-bottom: 2px solid #1A8CE1;}
</style>
