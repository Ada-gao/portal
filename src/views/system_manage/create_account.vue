<template>
    <div  class="basic_info common_style box_adorn">
    	<div class="spec_head">
    		<em class="in_b"></em><span>新建账号</span>
    	</div>
    	<div class="product_set">公司基本信息</div>
    	<common_form></common_form>
    </div>
</template>

<script>
import common_form from 'components/common_form'
export default {
	components: { common_form },
    data () {
        return {          
           
        }
    }
}
</script>

<style lang="scss" scoped>
.common_style{ padding-top: 0!important;}
.product_set{ margin:20px 0 0 30px; font-size: 16px; font-weight: 600;}
</style>