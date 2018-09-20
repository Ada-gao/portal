<template>
    <div  class="basic_info common_style box_adorn">
    	<div class="spec_head">
    		<em class="in_b"></em><span>消费批次详情</span>
    	</div>
        <details_record :batchId="batchId" :type_status="type_status"></details_record>
    </div>
</template>

<script>
import request from "@/router/axios";
import details_record from 'components/infor_verif/details_record'
export default {
    components: { details_record },
    data () {
        return {
            batchId:this.$route.query.batchId,
            type_status:0,          
        }
    },
    created() {
        //判定核验类型
        var productName = this.$route.query.productName
        if(productName == '二要素'){
            this.type_status = 0
        }else if(productName == '银行卡三要素'){
            this.type_status = 1
        }else if(productName == '手机三要素'){
            this.type_status = 2
        }else{
            this.type_status = 3        //四要素
        }
    },
}
</script>
<style lang="scss" scoped>
.common_style{ padding-top: 0!important;}
</style>
