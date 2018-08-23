<template>
    <div>
    	<div class="query_result">
    		<!--查询结果-->
    		<query_condit></query_condit>
    	</div>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import query_condit from 'components/infor_verif/query_condit'
export default {
	components: { query_condit },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
</style>
