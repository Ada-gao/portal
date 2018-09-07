<template>
    <div class="article">
        <!--我的信息-->
        <account_manage_our></account_manage_our>
        <!--基本信息-->
        <account_manage_basic_infor></account_manage_basic_infor>
        <!--消费记录-->
        <account_manage_consump></account_manage_consump>
        <!--充值记录-->
        <account_manage_recharge></account_manage_recharge>
        <!--登录记录-->
        <account_manage_login></account_manage_login>
    </div>
</template>

<script>
import account_manage_our from 'components/account_manage/account_manage_our'
import account_manage_basic_infor from 'components/account_manage/account_manage_basic_infor'
import account_manage_consump from 'components/account_manage/account_manage_consump'
import account_manage_recharge from 'components/account_manage/account_manage_recharge'
import account_manage_login from 'components/account_manage/account_manage_login'
export default {
    components: { account_manage_our, account_manage_basic_infor, account_manage_consump, account_manage_recharge, account_manage_login },
    data () {
        return {
        
        }
    },
}
</script>
