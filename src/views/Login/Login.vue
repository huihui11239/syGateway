<template>
  <div class="login-container">
    <div class="wrap">
      <!-- <div class="left">
        <img src="./../../../static/img/loginLeft.jpg" />
      </div>-->
      <div class="right">
        <div class="logo">
          <img src="./../../../static/img/login-logo.png" />
        </div>
        <div class="title">{{title}}</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          status-icon
          ref="ruleForm"
          label-position="left"
          label-width="0px"
          class="demo-ruleForm login-page"
        >
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              auto-complete="off"
              placeholder="请输入用户名"
              prefix-icon="el-icon-s-custom"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              auto-complete="off"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item style="width:100%;height:50px;">
            <el-button
              type="primary"
              style="width:100%;"
              @click="handleSubmit"
              :loading="logining"
              v-if="title == '汉邦智慧上云网关'"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
import { getData, postData } from "../../utils/request/http";
import { strToJson } from "../../utils/Tool";
import axios from "axios";

export default {
  name: "Login",
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入帐户名"));
      } else {
        callback();
      }
    };

    var checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      title: "汉邦智慧上云网关",
      btnText: "登录",
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            validator: checkName,
            required: true,
            message: "请输入正确的用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: checkPwd,
            required: true,
            message: "请输入正确的密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    var that = this;
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      if (key == 13) {
        that.handleSubmit();
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.login(); //login
        } else {
          return false;
        }
      });
    },

    /*登录接口*/
    async login() {
      var that = this;
      that.logining = true;
      postData("/web/login", {
        user_name: that.ruleForm.username,
        user_pwd: that.ruleForm.password
      })
        .then(res => {
          // 成功
          that.logining = false;
          console.log(res);
          if (res.code == "0") {
            that.$message.success("登录成功");
            that.$router.push({ path: "/home" });
            // localStorage.removeItem("token")
            localStorage.setItem("token", res.data.auth_token); //缓存token
            localStorage.setItem("loginName", that.ruleForm.username); //缓存token
          } else if (res.code == "1") {
            that.$message.error("用户名密码不匹配!");
          } else if (res.code == "-56502") {
            that.$message.error("账号密码错误");
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(err => {
          that.$message.error("error");
        });
    }
    // loginChange() {
    //   this.title = "播放rtmp";
    // }
  }
};
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
}
.login-container {
  width: 100%;
  height: 100vh;
  background: url("./../../../static/img/loginBg.jpg") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.wrap {
  width: 30%;
  height: 496px;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 10%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* .left {
  width: 45%;
  height: 470px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left img {
  width: 80%;
  height: 80%;
} */
.right {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}
.logo {
  width: 60px;
  height: 60px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 10px;
}
.logo img {
  width: 100%;
  height: 100%;
  display: inline;
  text-align: center;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  width: 350px;
  height: 100%;
}
.title {
  margin-bottom: 43px;
  text-align: center;
  font-size: 30px;
}
</style>
