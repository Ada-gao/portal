<template>
  <div class="top">
    <div class="top-button is-left">
      <div class="tags-breadcrumb">
        <i class="iconfont cursor" style="font-size:20px!important" :class="[{ 'icon-zhankaicaidan': isCollapse, 'icon-shouqicaidan': !isCollapse }]" @click="showCollapse"></i>
      </div>
    </div>
    <h1 class="top-title" >
      <em>你好，{{userInfo.username}}</em>
      <topMenu class="none"></topMenu>
    </h1>
    <div class="top-button is-right">
      <el-tooltip class="item none" effect="dark" content="主题色" placement="bottom">
        <span class="top-item">
          <top-theme></top-theme>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">
        <span class="top-item">
          <top-lock></top-lock>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="isFullScren?'退出全屏':'全屏'" placement="bottom">
        <span class="top-item">
          <i :class="isFullScren?'icon-tuichuquanping':'icon-quanping'" @click="handleScreen"></i>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="用户头像" placement="bottom">
        <img class="top-userImg" v-if="userInfo.avatar" :src="userInfo.avatar ? userInfo.avatar : '../../../assets/img/user.png'">
        <img class="top-userImg" v-if="!userInfo.avatar" src="../../../assets/img/user.png">
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link cursor">
          {{userInfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="white-space: nowrap;">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">修改密码</router-link>
          </el-dropdown-item>
<!--           <el-dropdown-item>
            <a href="https://gitee.com/log4j/pig" target="_blank">pig地址</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a href="https://gitee.com/smallweigit/avue" target="_blank">avue地址</a>
          </el-dropdown-item> -->
          <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/util/util";
import topLock from "./top-lock";
import topMenu from "./top-menu";
import topTheme from "./top-theme";
export default {
  components: { topLock, topMenu, topTheme },
  name: "top",
  data() {
    return {};
  },
  filters: {},
  created() {},
  mounted() {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(["isFullScren", "isCollapse"])
  },
  methods: {
    showCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    handleScreen() {
      fullscreenToggel();
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    logout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.top-title{ font-size: 14px; color: #333;}
</style>

