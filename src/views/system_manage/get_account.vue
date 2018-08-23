<template>
    <div class="pull-height animated" :class="{'zoomOutUp': isLock}">
        <div class="index">
            <sidebar class="left"></sidebar>
            <div class="right">
                <div class="nav">
                    <top class="top"></top>
                    <tags></tags>
                </div>
                <div class="main">
                    <div class="router">
                        <div class="get_account">
                            <get_account_handle></get_account_handle>
                            <account_list></account_list>
                            <recharge_list></recharge_list>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import tags from "@/page/index/tags";
import top from "@/page/index/top/";
import sidebar from "@/page/index/sidebar/";

import get_account_handle from 'components/get_account/get_account_handle'
import account_list from 'components/get_account/account_list'
import recharge_list from 'components/get_account/recharge_list'
export default {
	components: { get_account_handle, account_list, recharge_list,top,tags,sidebar },
    data () {
        return {          
           
        }
    },
    computed: mapGetters(["isLock"]),
}
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  position: relative;
  height: 100%;
  background: #fff;
  overflow: hidden;
  .left {
    width: 230px;
    overflow-y: auto;
  }
  .right {
    padding-top: 107px;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    flex: 1;
  }
  .main {
    height: 100%;
    background: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
    .router {
      // padding: 15px 8px;
      // background: #fff;
      min-height: 100%;
      height: auto;
      overflow: hidden;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
  .nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }
  .top {
    margin-bottom: 2px;
  }
}
</style>
