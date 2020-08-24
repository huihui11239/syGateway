<template>
  <div class="header-wrap">
    <div class="header-left">
      <!-- <div class="logo-txt">汉邦智慧上云网关</div> -->
      <img class="logo-txt" src="./../../../static/img/logo-txt.png" alt />
    </div>
    <div class="header-right">
      <div class="alarm">
        <Alarm />
        <span class="alarmNum">0</span>
      </div>
      <div class="user">
        <img src="./../../../static/img/admin-icon.png" alt />
        <span class="userName">{{userName}}</span>
      </div>
      <div class="loginOut" @click="loginOut">退出</div>
    </div>
  </div>
</template>

<script>
import Alarm from "./Alarm";
import { getData, postData } from "../../utils/request/http";
export default {
  name: "Header",
  data() {
    return {
      userName:
        localStorage.getItem("loginName") !== undefined
          ? localStorage.getItem("loginName")
          : "admin"
    };
  },

  methods: {
    /*
     @Desc: 退出登录
     @Author: HHH , @Date: 2020-08-13 10:58:01
    */
    loginOut() {
      var that = this;
      postData("/web/logout", {})
        .then(res => {
          that.logining = false;
          console.log(res);
          if (res.code == "0") {
            localStorage.clear();
            this.$router.push({ path: "/" });
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    enterAccount() {}
  },

  components: {
    Alarm
  }
};
</script>

<style >
.el-header {
  padding: 0 !important;
}
.header-wrap {
  width: 100%;
  height: 60px;
  background-color: rgb(84, 92, 100);
  box-shadow: 0 0 10px #dcdada;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  flex: 1;
}
.header-left .logo-txt {
  color: #fff;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  margin-left: 16%;
}
.header-right {
  width: 22%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 40px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}
.alarm {
  width: 40px;
  height: 20px;
  position: relative;
  margin-right: 30px;
}
.alarmNum {
  background-color: red;
  position: absolute;
  right: 3px;
  top: -5px;
  width: 20px;
  height: 20px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  border-radius: 50%;
}
.header-right .user {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.header-right .user img {
  width: 20px;
  height: 20px;
  display: block;
  margin-right: 5px;
}
.loginOut {
  cursor: pointer;
}
.loginOut:hover {
  font-size: 17px;
}
</style>
