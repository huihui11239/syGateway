<template>
  <div class="wrapper">
    <div class="main">
      <div class="control-box">
        <div class="control">
          <div class="circle">
            <img class="center" ref="center" src="../../static/img/control-circle.png" />
            <img class="stop-control" :src="controlIcon.cenrerControl" @click="centerControl" />
            <img class="top" :src="controlIcon.top" @click="topControl" />
            <img class="right" :src="controlIcon.right" @click="rightControl" />
            <img class="bottom" :src="controlIcon.bottom" @click="bottomControl" />
            <img class="left" :src="controlIcon.left" @click="leftControl" />
          </div>
          <div class="btn-wrap">
            <button
              class="play-btn"
              @click="fnplay"
              :style="{'color':playBtnColor,'background':playBtnBackground}"
            >开启</button>
            <button
              class="stop-btn"
              @click="fnpause"
              :style="{'color':stopBtnColor,'background':stopBtnBackground}"
            >结束</button>
          </div>
        </div>
      </div>
      <div class="video-box">
        <EasyPlayer
          ref="video"
          @ready="ready"
          @snapInside="snapInside"
          :videoUrl="videoUrl"
          @play="play"
          @message="message"
          @timeupdate="timeupdate"
          fluent
          live
          stretch
          :show-custom-button="true"
        ></EasyPlayer>
        <div class="close">
          <i class="el-icon-circle-close" @click="closePopup"></i>
        </div>
        <div class="cover-box">
          <img src="../../static/img/login-logo.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData, postData } from "../utils/request/http";
import EasyPlayer from "easy-player";
import bus from "./../utils/bus";

export default {
  name: "PlayPopup",
  components: {
    EasyPlayer
  },
  props: {
    cameraNum: {
      type: String
    }
  },
  data() {
    return {
      player: null,
      videoUrl: "",
      //videoUrl: "rtmp://192.168.1.160:1935/live/34020000001320000011",
      //videoUrl: "rtmp://58.200.131.2:1935/livetv/hunantv",
      controlIcon: {
        cenrerControl: require("../../static/img/stop-control.png"),
        top: require("../../static/img/play-icon-top.png"),
        right: require("../../static/img/play-icon-right.png"),
        bottom: require("../../static/img/play-icon-bottom.png"),
        left: require("../../static/img/play-icon-left.png")
      },
      playBtnColor: "#fff",
      playBtnBackground: "#5447ff",
      stopBtnColor: "#fff",
      stopBtnBackground: "#d03edd"
    };
  },
  watch: {},
  computed: {},
  methods: {
    /* 
      @desc 关闭弹窗
    */
    closePopup() {
      let showPlayPopup = {
        showPlayPopup: false
      };
      bus.$emit("sendCloseEvent", showPlayPopup);
      // this.fnpause();
    },

    /* 
      @desc 获取视频src
    */
    async getVideoSrc() {
      var that = this;
      let _cameraNum = this.cameraNum;
      let res = await postData("/web/camera/video/url", {
        cameraNum: _cameraNum,
        protocol: "RTMP"
      }).catch(res => {
        that.$message.error(res.code + "，" + res.msg);
      });
      if (res.code == "0") {
        console.log(res);
        that.videoUrl = res.data.url;
        //that.fnplay();
        //that.player.play();
        //console.log(that.videoUrl)
      } else {
        that.$message.error(res.code + "，" + res.msg);
      }
    },

    //内部快照回调
    snapInside(e) {
      console.log(e);
    },
    // 在这里设置，因为能播放，player对象肯定就已经存在
    play(time) {
      this.player = this.$refs.video.player;
      //console.log(time);
    },
    //触发通知消息
    message(obj) {
      console.log(obj);
    },
    ready(player) {
      console.log("ready");
    },
    //进度更新
    timeupdate(time) {
      // console.log(time);
    },

    /*
     @Desc: play
     @Author: HHH , @Date: 2020-08-10 15:09:34
    */
    

    async fnplay() {
      var that = this;
      // if (!that.player) {
      //   return;
      // }
      let res = await postData("/web/camera/video/begin", {
        cameraNum: that.cameraNum
      }).catch(res => {
        that.$message.error(res.code + "，22" + res.msg);
      });
      if (res.code == 0) {
        that.player.play();
        that.playBtnColor = "#676a6d";
        that.playBtnBackground = "#ccc";
        that.stopBtnColor = "#fff";
        that.stopBtnBackground = "#d03edd";
      } else {
        that.$message.error(res.code + "，11" + res.msg);
      }
    },
    /*
     @Desc: pause
     @Author: HHH , @Date: 2020-08-10 15:09:49
    */
    fnpause() {
      var that = this;
      postData("/web/camera/video/finish", {
        cameraNum: that.cameraNum
      })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            that.player.pause();
            that.stopBtnBackground = "#676a6d";
            that.stopBtnBackground = "#ccc";
            that.playBtnColor = "#fff";
            that.playBtnBackground = "#d03edd";
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    /*
    @Desc: 控制台-中间-停止
    @Author: HHH , @Date: 2020-08-14 11:20:24
    */
    centerControl() {
      var that = this;
      that.controlIcon.cenrerControl = require("../../static/img/stop-control2.png");

      that.controlIcon.top = require("../../static/img/play-icon-top.png");
      that.controlIcon.right = require("../../static/img/play-icon-right.png");
      that.controlIcon.bottom = require("../../static/img/play-icon-bottom.png");
      that.controlIcon.left = require("../../static/img/play-icon-left.png");

      postData("/web/camera/video/ytcontrol", {
        cameraNum: that.cameraNum,
        yt_action: 24,
        yt_step: 5
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            that.$message.success("stop-control！");
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    /*
     @Desc: 控制台-上
     @Author: HHH , @Date: 2020-08-13 11:07:43
    */
    topControl() {
      var that = this;
      that.controlIcon.top = require("../../static/img/play-icon-top2.png");

      that.controlIcon.cenrerControl = require("../../static/img/stop-control.png");
      that.controlIcon.right = require("../../static/img/play-icon-right.png");
      that.controlIcon.bottom = require("../../static/img/play-icon-bottom.png");
      that.controlIcon.left = require("../../static/img/play-icon-left.png");

      postData("/web/camera/video/ytcontrol", {
        cameraNum: that.cameraNum,
        yt_action: 3,
        yt_step: 5
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            that.$message.success("top-ok");
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    /*
     @Desc: 控制台-右
     @Author: HHH , @Date: 2020-08-13 11:18:12
    */
    rightControl() {
      var that = this;
      that.controlIcon.right = require("../../static/img/play-icon-right2.png");

      that.controlIcon.cenrerControl = require("../../static/img/stop-control.png");
      that.controlIcon.top = require("../../static/img/play-icon-top.png");
      that.controlIcon.bottom = require("../../static/img/play-icon-bottom.png");
      that.controlIcon.left = require("../../static/img/play-icon-left.png");

      postData("/web/camera/video/ytcontrol", {
        cameraNum: that.cameraNum,
        yt_action: 2,
        yt_step: 5
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            that.$message.success("right-ok！");
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    /*
     @Desc: 控制台-底
     @Author: HHH , @Date: 2020-08-13 11:18:12
    */
    bottomControl() {
      var that = this;
      that.controlIcon.bottom = require("../../static/img/play-icon-bottom2.png");

      that.controlIcon.cenrerControl = require("../../static/img/stop-control.png");
      that.controlIcon.top = require("../../static/img/play-icon-top.png");
      that.controlIcon.right = require("../../static/img/play-icon-right.png");
      that.controlIcon.left = require("../../static/img/play-icon-left.png");

      postData("/web/camera/video/ytcontrol", {
        cameraNum: that.cameraNum,
        yt_action: 4,
        yt_step: 5
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            that.$message.success("bottom-ok！");
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    /*
     @Desc: 控制台-左
     @Author: HHH , @Date: 2020-08-13 11:18:12
    */
    leftControl() {
      var that = this;
      that.controlIcon.left = require("../../static/img/play-icon-left2.png");

      that.controlIcon.cenrerControl = require("../../static/img/stop-control.png");
      that.controlIcon.top = require("../../static/img/play-icon-top.png");
      that.controlIcon.right = require("../../static/img/play-icon-right.png");
      that.controlIcon.bottom = require("../../static/img/play-icon-bottom.png");

      postData("/web/camera/video/ytcontrol", {
        cameraNum: that.cameraNum,
        yt_action: 1,
        yt_step: 5
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            that.$message.success("left-ok！");
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    }
  },
  created() {},
  mounted() {
    //console.log(this.cameraNum);
    this.getVideoSrc();
  }
};
</script>
<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(0, 0, 0, 0.8);
  width: 100%;
  height: 100vh;
  color: aliceblue;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  width: 80%;
  height: 60vh;
  /* border: 1px solid #fff; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.control-box {
  width: 30%;
  height: 100%;
  z-index: 999;
  /* border: 1px solid rgb(67, 142, 192);
  box-shadow: rgb(0, 0,0, rgb(67, 142, 192)); */
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.control {
  width: 60%;
  height: 100%;
  border: 1px solid #ccc;
  box-shadow: 0 0 0 rgb(67, 142, 192);
  box-shadow: 0 0 0 rgb(67, 142, 192);
  box-shadow: -2px -2px 0px rgb(67, 142, 192);
  border-radius: 30px;
  position: relative;
  margin: 0 auto;
}
.control .circle {
  width: 100%;
  position: relative;
  height: 60%;
}
.control .circle img {
  display: inline-block;
}
.circle .center {
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.stop-control {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.circle .top {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 10px);
}
.circle .right {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-10px, -50%);
}
.circle .bottom {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -10px);
}
.circle .left {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(10px, -50%);
}

.btn-wrap {
  width: 80%;
  height: 60px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.play-btn {
  border: 0;
  background-color: transparent;
  outline: none;
  width: 60px;
  height: 36px;
  line-height: 36px;
  border-radius: 15px;
  /* background: #5447ff;
  color: #fff; */
}
.stop-btn {
  border: 0;
  background-color: transparent;
  outline: none;
  width: 60px;
  height: 36px;
  line-height: 36px;
  border-radius: 15px;
  /* background: #d03edd;
  color: #fff; */
}
/* right */
.video-box {
  flex: 1;
  height: 100%;
  position: relative;
}

.video-box >>> .el-icon-circle-close {
  position: absolute;
  top: -40px;
  right: -40px;
  font-size: 30px;
}
.cover-box {
  position: absolute;
  left: 0;
  bottom: 0;
  background: rgb(0, 0, 0, 0.8);
  width: 30px;
  height: 30px;
}
.cover-box img {
  width: 100%;
  height: 100%;
}
.video-box >>> .player-wrapper {
  height: 100% !important;
}

.video-box >>> .video-wrapper {
  height: 100% !important;
}
.video-box >>> .video-wrapper {
  padding-bottom: 0 !important;
}
</style>