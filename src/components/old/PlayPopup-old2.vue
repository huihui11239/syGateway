<template>
  <div class="wrapper">
    <div class="main">
      <div class="control-box">
        <div class="control">
          <div class="circle">
            <img class="center" src="../../static/img/control-circle.png" />
            <img class="top" src="../../static/img/play-icon-top.png" @click="topControl" />
            <img class="right" src="../../static/img/play-icon-right.png" @click="rightControl" />
            <img class="bottom" src="../../static/img/play-icon-bottom.png" @click="bottomControl" />
            <img class="left" src="../../static/img/play-icon-left.png" @click="leftControl" />
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
        <div>
          <video
            id="myVideo"
            ref="myVideo"
            class="video-js vjs-big-play-centered vjs-fluid"
            controls
            preload="auto"
            width="100%"
            height="100%"
          >
            <source type="rtmp/flv" :src="videoUrl" />
          </video>
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
      //videoUrl: "rtmp://58.200.131.2:1935/livetv/hunantv",
      videoUrl: "rtmp://202.69.69.180:443/webcast/bshdlive-pc",
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
    },
    /*
 @Desc: 初始video
 @Author: HHH , @Date: 2020-08-13 15:05:52
*/
    initVideo() {
      //此处初始化的调用，我放在了获取数据之后的方法内，而不是放在钩子函数mounted
      //页面dom元素渲染完毕，执行回调里面的方法
      this.$nextTick(() => {
        let myPlayer = this.$video(document.getElementById("myVideo"), {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: false,
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          // width: "800px",
          //设置视频播放器的显示高度（以像素为单位）
          // height: "400px",
          controlBar: {
            playToggle: true
          }
        });
      });
    },

    /* 
      @desc 获取视频src
    */
    async getVideoSrc() {
      var that = this;
      let _cameraNum = that.cameraNum;
      console.log(_cameraNum);
      let res = await postData("web/camera/video/url", {
        cameraNum: _cameraNum,
        protocol: "RTMP"
      }).catch();
      if (res.code == "0") {
        console.log(res);
        //let src = res.data.url;

        that.initVideo(); //初始video
      } else {
        that.$message.error("error");
      }
    },

    /*
     @Desc: play
     @Author: HHH , @Date: 2020-08-10 15:09:34
    */
    fnplay() {
      var that = this;
      // if (!that.player) {
      //   return;
      // }
      postData("web/camera/video/begin", {
        cameraNum: that.cameraNum
      })
        .then(res => {
          console.log(res);
          //this.play();
          this.playBtnColor = "#676a6d";
          this.playBtnBackground = "#ccc";
          this.stopBtnColor = "#fff";
          this.stopBtnBackground = "#d03edd";
        })
        .catch(err => {
          that.$message.error("error");
        });
    },
    /*
     @Desc: pause
     @Author: HHH , @Date: 2020-08-10 15:09:49
    */
    fnpause() {
      var that = this;
      postData("web/camera/video/finish", {
        cameraNum: that.cameraNum
      })
        .then(res => {
          console.log(res);
          //this.pause();
          this.playBtnColor = "#676a6d";
          this.playBtnBackground = "#ccc";
          this.stopBtnColor = "#fff";
          this.stopBtnBackground = "#d03edd";
        })
        .catch(err => {
          that.$message.error("error");
        });
    },

    /*
     @Desc: 控制台-上
     @Author: HHH , @Date: 2020-08-13 11:07:43
    */
    topControl() {
      var that = this;
      postData("web/camera/video/ytcontrol", {
        cameraNum: that.cameraNum,
        yt_action: 3,
        yt_step: 5
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            that.$message.success("top ok！");
          }
        })
        .catch(err => {
          that.$message.error("error");
        });
    },
    /*
     @Desc: 控制台-右
     @Author: HHH , @Date: 2020-08-13 11:18:12
    */
    rightControl() {
      var that = this;
      postData("web/camera/video/ytcontrol", {
        cameraNum: that.cameraNum,
        yt_action: 2,
        yt_step: 5
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            that.$message.success("top ok！");
          }
        })
        .catch(err => {
          that.$message.error("error");
        });
    },
    /*
     @Desc: 控制台-底
     @Author: HHH , @Date: 2020-08-13 11:18:12
    */
    bottomControl() {
      var that = this;
      postData("web/camera/video/ytcontrol", {
        cameraNum: that.cameraNum,
        yt_action: 4,
        yt_step: 5
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            that.$message.success("top ok！");
          }
        })
        .catch(err => {
          that.$message.error("error");
        });
    },
    /*
     @Desc: 控制台-左
     @Author: HHH , @Date: 2020-08-13 11:18:12
    */
    leftControl() {
      var that = this;
      postData("web/camera/video/ytcontrol", {
        cameraNum: that.cameraNum,
        yt_action: 1,
        yt_step: 5
      })
        .then(res => {
          console.log(res);
          if (res.code == "0") {
            that.$message.success("top ok！");
          }
        })
        .catch(err => {
          that.$message.error("error");
        });
    }
  },
  created() {},
  mounted() {
    this.getVideoSrc();
    //this.playVideo();
  },
  // beforeDestroy() {
  //   const videoDom = this.$refs.myVideo; //不能用document 获取节点
  //   videojs(myVideo).dispose(); //销毁video实例，避免出现节点不存在 但是flash一直在执行,也避免重新进入页面video未重新声明
  // }
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

.video-box >>> .player-wrapper {
  height: 100% !important;
}

.video-box >>> video {
  /* width:100%!important;
  height: 100% !important; */
  background: #000 !important;
}
</style>