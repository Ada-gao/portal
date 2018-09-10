<<template>
    <div class="get_account">
        <get_account_handle></get_account_handle>
        <account_list></account_list>
        <recharge_list></recharge_list>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import get_account_handle from 'components/get_account/get_account_handle'
import account_list from 'components/get_account/account_list'
import recharge_list from 'components/get_account/recharge_list'
export default {
    name: "handle",
    components: { get_account_handle, account_list, recharge_list },
    data () {
        return {          
           
        }
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
