<template>
    <div class="basic_info common_style box_adorn">
    	<div class="clearfix tc">
	    	<el-col :span="12" class="bort">
	            <div class="get_account clearfix in_b">
	                <router-link :to="{path:'/admin/user/create_account'}" tag="div" class="spicle fl"><i class='iconfont icon-kaitong vm'></i>开通账号</router-link>
	            </div>
	        </el-col>
	        <el-col :span="12">
	            <div class="account_recharge clearfix in_b">
	                <router-link :to="{path:'/wel/account_recharge'}" tag="div" class="spicle fl"><i class='iconfont icon-recharge vm'></i>账号充值</router-link>
	            </div>
	        </el-col>
	    </div>
    </div>
</template>

<style lang="scss" scoped>
.basic_info>div{ font-size: 0;}
.common_style{ padding:45px 0;}
.get_account .spicle:hover{ background-color: #41AEFF;}
.get_account .spicle,.get_account .spicle:active{ background: #1A8CE1; }
.account_recharge .spicle:hover{ background-color: #FDCD7E;}
.account_recharge .spicle,.account_recharge .spicle:active{ background: #F8C065; }
.spicle{ height: 50px; width: 180px; box-shadow: 0 6px 6px 2px rgba(26,140,225,0.08); border-radius: 4px; -webkit-border-radius: 4px; color: #fff; font-size: 16px; line-height: 50px; cursor: pointer; }
.spicle i{ font-size: 22px; color: #fff; margin-right: 10px;}
.bort{ position: relative;}
.bort:after{ content:'\0020'; height: 40px; width: 1px; position: absolute; right: 0; top: 8px; background-color: #D5D5D5;}
</style>
