<template>
  <div class="video">
    <div class="con" @click="test">{{video}}</div>
    <div class="video-wrap">
      <video-player class="vjs-custom-skin" :options="playerOptions"></video-player>
    </div>
  </div>
</template>
<script>
// require styles
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
// video-player
import { videoPlayer } from "vue-video-player";
// rtmp video-flash
import "videojs-flash";

export default {
  name: "video-sel",
  data() {
    return {
      video: "hello video",
      code: -2315,
      msg: "Not found SubPlatformChildDevSipId",
      playerOptions: {
        height: "260",
        language: "en",
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "rtmp/mp4",
            src: "rtmp://58.200.131.2:1935/livetv/hunantv"
          }
        ],
        techOrder: ["flash"],
        autoplay: false,
        controls: true,
        poster: "",
        notSupportedMessage: "不支持的视频格式",
        flash: {
          swf: "static/videojs-swf_5.0.2_video-js.swf"
        }
      }
    };
  },
  components: {
    videoPlayer
  },
  mounted() {},
  methods: {
    test() {
      this.$message.error(this.code + "，" + this.msg);
    }
  }
};
</script>

<style lang="less" scoped>
.video {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .con {
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .video-wrap {
    width: 500px;
    height: 300px;
  }
}
</style>