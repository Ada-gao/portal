<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class="login-border" v-if="login_status == 1">
      <div class="login-main">
        <h4 class="login-title">登录</h4>
          <!--全局换色-->
          <!-- <top-theme></top-theme> -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户密码" name="user">
            <userLogin></userLogin>
          </el-tab-pane>
          <el-tab-pane label="短信验证码" name="code">
            <codeLogin></codeLogin>
          </el-tab-pane>
        </el-tabs>
        <div class="forget_btn font14 cursor tr mt10" @click="login_status = 2">忘记密码</div>
      </div>
    </div>
    <get_password v-if="login_status == 2"  @go_login="change_login_status"></get_password>
  </div>
</template>
<script>
import get_password from "./get_password";
import userLogin from "./userlogin";
import codeLogin from "./codelogin";
import thirdLogin from "./thirdlogin";
import topTheme from "../index/top/top-theme";
import theme from "@/mixins/theme";
import { mapGetters } from "vuex";
export default {
  name: "login",
  mixins: [theme()],
  components: {
    topTheme,
    userLogin,
    codeLogin,
    thirdLogin,
    get_password
  },
  data() {
    return {
      activeName: "user",
      login_status:1,     //默认为登录状态  2为忘记密码
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["website"])
  },
  props: [],
  methods: {
    change_login_status(){
      this.login_status = 1;
    }
  }
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
}
.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/login.png");
  background-size: 100% 100%;
}
.login-info {
  padding-left: 60px;
}
.login-info-title {
  line-height: 90px;
}
.login-info-item {
  font-size: 14px;
}
.login-border {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 40px 25px 40px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 2px #eee;
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  color: #1A8CE1;
  letter-spacing: 3px;
  font-size: 24px;
}
.login-submit {
  margin-top: 20px;
  width: 100%;
  background: #3080fe;
  border-radius: 28px;
}
.login-form {
  .el-form-item__content {
    width: 270px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  width: 100px;
  height: 38px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}

.forget_btn{ color: #9B9B9B;}
.forget_btn:hover{ color: #409EFF;}
.login-border .el-form-item__error{ padding-top: 0;}
.login-border .el-step__main .el-step__title{ font-size: 12px;} 
.login-border .el-step__main .is-process,.login-border .el-step__main .is-finish{ color: #1A8CE1; font-weight: 500;}
.login-border .el-step__icon.is-text{ border:2px solid #D8D8D8; background-color:#D8D8D8; }
.login-border .el-step__icon-inner{ color: #fff; font-weight: 500;}
.login-border .is-process .el-step__icon.is-text,.login-border .is-finish .el-step__icon.is-text{ border:2px solid #1A8CE1; background-color:#1A8CE1;}
.login-border .el-step__icon{ width: 20px; height: 20px;}
.login-border .el-step.is-horizontal .el-step__line{ top: 9px;}
.login-border .is-finish .el-step__line{ background-color: #1A8CE1;}
.login-border .el-form-item__content{ background-color: #fff;}
</style>
