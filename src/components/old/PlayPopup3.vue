<template>
  <div>
    <div>
      <video
        ref="viodeRef"
        id="video2"
        class="video-js vjs-default-skin vjs-big-play-centered"
        controls
        preload="auto"
        width="640"
        height="264"
        poster
      >
        <!--type="application/x-mpegURL"-->
        <source :src="playOptions.source[0].src" />
        <p class="vjs-no-js">不支持播放</p>
      </video>
      <div class="actions">
        <a href="javascript:;" id="btn1">播放</a>
        <a href="javascript:;" id="btn2">暂停</a>
        <a href="javascript:;" id="btn3">隐藏音量调节控件</a>
        <a href="javascript:;" id="btn4">设置宽高</a>
        <a href="javascript:;" id="btn6">隐藏</a>
        <a href="javascript:;" id="btn5">显示</a>
        <a href="javascript:;" id="btn7">设置其它资源</a>
        <a href="javascript:;" id="btn8">销毁</a>
      </div>
      <!-- <router-link to="/lazyload">跳转</router-link>
        <div class="methods" style="font-size: 18px;text-align: left;margin-left: 50px;background-color: skyblue">
          方法：
          autoplay：自动播放    <br>
          buffered   <br>
          bufferedEnd   <br>
          bufferedPercent  <br>
          cancelFullScreen：取消全屏  deprecated    <br>
          controls      <br>
          currentSrc   <br>
          currentTime:当前时间    <br>
          currentType <br>
          dispose:销毁实例，在退出页面的时候 一定要销毁 <br>
          duration <br>
          ended <br>
          error <br>
          exitFullscreen   <br>
          init  :初始化     <br>
          isFullScreen deprecated  //摈弃   <br>
          isFullscreen ：全屏（用这个方法前先使用 requestFullscreen）    <br>
          language  <br>
          load  <br>
          loop  <br>
          muted  <br>
          pause  <br>
          paused  <br>
          play  <br>
          playbackRate  <br>
          poster  <br>
          preload:预加载，一般直接用auto 根据浏览器自动执行加载  <br>
          remainingTime  <br>
          requestFullScreen deprecated <br>
          requestFullscreen <br>
          seeking  <br>
          src <br>
          volume :静音 <br>
          addChild inherited <br>
          addClass inherited <br>
          buildCSSClass inherited <br>
          children inherited <br>
          contentEl inherited<br>
          createEl inherited<br>
          dimensions inherited<br>
          el inherited<br>
          enableTouchActivity inherited<br>
          getChild inherited<br>
          getChildById inherited<br>
          hasClass inherited<br>
          height inherited<br>
          hide inherited<br>
          id inherited<br>
          initChildren inherited<br>
          name inherited<br>
          off inherited<br>
          on inherited  ：绑定事件<br>
          one inherited<br>
          options inherited：视频参数 是一个对象<br>
          player inherited<br>
          ready inherited<br>
          removeChild inherited<br>
          removeClass inherited<br>
          show inherited<br>
          trigger inherited<br>
          triggerReady inherited<br>
          width inherited<br>
        </div>
        <div style="font-size: 16px;background-color: beige;text-align: left;margin-left: 50px;margin-top: 50px;">
          事件：<br>
          durationchange<br>
          ended<br>
          firstplay<br>
          fullscreenchange<br>
          loadedalldata<br>
          loadeddata<br>
          loadedmetadata<br>
          loadstart<br>
          pause<br>
          play<br>
          progress<br>
          seeked<br>
          seeking<br>
          timeupdate<br>
          volumechange<br>
          waiting<br>
          resize inherited<br>
      </div>-->
    </div>
  </div>
</template>

<script>
// import videojs from "video.js/dist/video.min";
// import "video.js/dist/video-js.min.css";
// import "videojs-flash/dist/videojs-flash";

export default {
  name: "Videojs",
  data: function() {
    return {
      playOptions: {
        autoplay: false, // 自动播放
        controls: true, // 是否显示控制栏
        notSupportedMessage:
          "此视频暂无法播放，检查相机状态是否正常或请查看是否安装flash", //无法播放时显示的信息
        techOrder: ["flash", "html5"], // 兼容顺序
        sourceOrder: true,
        flash: {
          swf: "../../../static/VideoJS.swf" //如果是本地视频  需要相应的videoJS.swf文件
        },
        source: [
          {
            type: "rtmp/flv",
            src: "rtmp://58.200.131.2:1935/livetv/hunantv"
          }
        ],
        poster: "" //播放器 默认图片
        //              controlBar: {                     // 配置控制栏
        //                timeDivider: false, // 时间分割线
        //                durationDisplay: false, // 总时间
        //                progressControl: true, // 进度条
        //                customControlSpacer: true, // 未知
        //                fullscreenToggle: true // 全屏
        //              },
      },
      myPlayer: ""
    };
  },

  mounted: function() {
    var _this = this;
    //切换src的方法：
    //---(一定要在load里面添加上url，然后执行play函数，play函数执行后会自动执行ready,loadedmetadata,timeupdate等函数)
    _this.myPlayer.off("timeupdate"); //移除timeupdate事件
    _this.myPlayer.reset(); //重置 video

    _this.myPlayer.src([
      {
        type: "rtmp/mp4",
        src: _this.currentSrc
      }
    ]);
    _this.myPlayer.load(_this.currentSrc);
    _this.myPlayer.play();
    //-----------------------------------------------------------------------end

    //  const _this = this;
    this.myPlayer = videojs("video2", _this.playOptions, function() {
      //--------methods
      this.load();
      this.play();
      //this.pause();//暂停

      //------events    绑定事件用on    移除事件用off
      this.on("loadstart", function() {
        console.log("loadstart------------");
      });
      this.on("loadedmetadata", function() {
        console.log("loadedmetadata---视频源数据加载完成----");
      });
      this.on("loadeddata", function() {
        console.log("loadeddata---渲染播放画面----"); //autoPlay必须为false
      });
      this.on("progress", function() {
        console.log("progress-------加载过程----");
      });
      this.on("timeupdate", function() {
        const curTime = this.currentTime();
        //              console.log('timeupdate-------------',curTime);
      });
      this.off("timeupdate", function() {
        console.log("off----------");
      });
    });
  },
  methods: {},
  beforeDestroy: function() {
    const videoDom = this.$refs.viodeRef; //不能用document 获取节点
    videojs(videoDom).dispose(); //销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
  }
};
</script>

<style scope>
</style>