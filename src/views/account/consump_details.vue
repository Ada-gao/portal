<template>
    <div  class="basic_info common_style box_adorn">
    	<div class="spec_head">
    		<em class="in_b"></em><span>消费批次详情</span>
    	</div>
        <details_record :batchId="batchId"></details_record>
    </div>
</template>

<script>
import request from "@/router/axios";
import details_record from 'components/infor_verif/details_record'
export default {
    components: { details_record },
    data () {
        return {
            batchId:this.$route.query.batchId
        }
    },
}
</script>
<style lang="scss" scoped>
.common_style{ padding-top: 0!important;}
</style>
