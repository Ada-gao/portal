<template>
    <div>
        <!--我的信息-->
        <div class="our_info clearfix box_adorn">
            <el-col :span="12" class="bort">
                <div class="balance clearfix in_b">
                    <div class="spicle fl"><i class='iconfont icon-yue-copy'></i></div>
                    <div class="fl con pr">
                        <div class="stat_tit">账户余额</div>
                        <div class="price omit1 mt20"><em>{{info.balance | formatMoney}}<small>元</small></em><span v-show="info.warning == 1"><i class="iconfont icon-tishi"></i>余额不足，请尽快充值!</span></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="consump clearfix in_b">
                    <div class="spicle fl"><i class='iconfont icon-leiji'></i></div>
                    <div class="fl con pr">
                        <div class="stat_tit">累计消费金额</div>
                        <div class="price mt20"><em>{{info.countAmount | formatMoney}}<small>元</small></em></div>
                    </div>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
import request from "@/router/axios";
export default {
    data () {
        return {
            info:{},        //基本信息
        }
    },
    created() {
        this.get_infoData();
    },
    methods: {
        get_infoData(){
            request({
                url: "/admin/user/statistics",
                method: "get",
            }).then(res => {
                this.info = res.data.data
            })
        },
    }
}
</script>

<style scoped lang="scss">
.our_info{ padding:35px 0; text-align: center;}
.our_info .bort{ position: relative;}
.our_info .bort:after{ content:'\0020'; height: 40px; width: 1px; position: absolute; right: 0; top: 20px; background-color: #D5D5D5;}
.our_info .spicle{ width: 70px; height: 70px; border-radius: 4px; -webkit-border-radius: 4px; display: flex;}
.our_info .balance .spicle{ background-color:#1A8CE1; }
.our_info .consump .spicle{ background-color:#F8C065 ; }
.our_info .spicle i{ font-size: 40px; color: #fff; margin: auto; line-height: 70px;}
.our_info .con{ margin-left: 20px;}
.our_info .con>div{ text-align: left;}
.our_info .con{ height: 70px;}
.stat_tit{ color: #475669; font-size: 14px;}
.price span{ font-size: 12px; color: #475669; margin-left: 20px;}
.price em{ font-size: 28px;}
.balance .price em{ color: #1A8CE1;}
.consump .price em{ color: #FDCE82;}
.balance .price i{ color: #D0021B; margin-right: 5px;}
</style>
