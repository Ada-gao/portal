<template>
    <div class="basic_info common_style box_adorn">
    	<div class="tab_head clearfix">
    		<ul class="fl clearfix">
    			<li class="fl" :class="{'current':type == 1}" @click="check_type(1)"><a class="in_b font16" href="javascript:void(0);">信息核验</a></li>
    			<li class="fl" :class="{'current':type == 2}" @click="check_type(2)"><a class="in_b font16" href="javascript:void(0);">历史结果查询</a></li>
    		</ul>
    	</div>
    	<!--信息核验 内容-->
    	<infor_verif v-if="type == 1"></infor_verif>
    	<!--历史结果查询-->
    	<history_result v-if="type == 2"></history_result>
    </div>
</template>

<script>
import infor_verif from 'components/infor_verif/infor_verif/infor_verif'
import history_result from 'components/infor_verif/history_result/history_result'
export default {
	components: { infor_verif, history_result },
    data () {
        return {
            type:1,		//1为信息核验 2位历史结果查询  默认为1
        }
    },
    mounted(){
        if(this.$route.query.type){
            this.type = this.$route.query.type;
        }
    },
    methods: {
    	//tab 切换
    	check_type(type){
    		this.type = type;
            this.$router.replace({path:'/product/infor_verif', query: {type: this.type}});
    	}
    }
}
</script>
<style lang="scss" scoped>
.tab_head li{ margin-right: 60px;}
.tab_head li a{ height:32px; }
.tab_head li.current a{ color: #1A8CE1; border-bottom: 2px solid #1A8CE1;}
</style>
