<template>
  <div class="home-wrap">
    <div class="show-title">
      <span>摄像机列表</span>
      <el-button class="manual-refresh" type="primary" plain @click="manualRefresh">
        手动刷新
        <i class="el-icon-refresh el-icon--right"></i>
      </el-button>
    </div>
    <!-- 摄像机列表 -->
    <el-table
      class="cameraList"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      max-height="300"
      :header-cell-style="{padding:'5px'}"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0px'}"
    >
      <el-table-column label="摄像机编号" min-width="8.66%" align="left">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>摄像机编号: {{ scope.row.cameraNum }}</p>
            <p>摄像机名称: {{ scope.row.cameraName }}</p>
            <p>行政区: {{ scope.row.area }}</p>
            <p>摄像机方向: {{ scope.row.cameraOrientation }}</p>
            <p>摄像机类型: {{ scope.row.摄像机类型 }}</p>
            <p>所属类别: {{ scope.row.classify }}</p>
            <p>所属单位: {{ scope.row.department }}</p>
            <p>网关编号: {{ scope.row.gatewayNum }}</p>
            <p>经度/纬度: {{ scope.row.longAndLati }}</p>
            <p>摄像机桩号: {{ scope.row.pileNum }}</p>
            <p>所在高速: {{ scope.row.poiName }}</p>
            <p>所在路段: {{ scope.row.road }}</p>
            <p>所属管理处: {{ scope.row.roadSec }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.cameraNum }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="摄像机名称" min-width="8.66%" align="left">
        <template slot-scope="scope">{{decodeURI(scope.row.cameraName)}}</template>
      </el-table-column>
      <el-table-column label="行政区划代码" min-width="6.66%" align="left">
        <template slot-scope="scope">{{decodeURI(scope.row.area)}}</template>
      </el-table-column>
      <el-table-column label="摄像机方向" min-width="6.66%" align="left">
        <template slot-scope="scope">{{decodeURI(scope.row.cameraOrientation)}}</template>
      </el-table-column>
      <el-table-column label="摄像机类型" min-width="4.66%" align="left">
        <template slot-scope="scope">{{decodeURI(scope.row.cameraType)}}</template>
      </el-table-column>
      <el-table-column label="所属类别" min-width="5.66%" align="left">
        <template slot-scope="scope">{{decodeURI(scope.row.classify==0?"公路":"其他")}}</template>
      </el-table-column>
      <el-table-column label="所属单位名称" min-width="6.66%" align="left">
        <template slot-scope="scope">{{decodeURI(scope.row.department)}}</template>
      </el-table-column>
      <el-table-column label="网关编号" min-width="8.66%" align="left">
        <template slot-scope="scope">{{decodeURI(scope.row.gatewayNum)}}</template>
      </el-table-column>
      <el-table-column label="经度/纬度" min-width="6.66%" align="left">
        <template slot-scope="scope">{{decodeURI(scope.row.longAndLati)}}</template>
      </el-table-column>
      <el-table-column label="摄像机桩号" min-width="6.66%" align="left">
        <template slot-scope="scope">{{scope.row.pileNum}}</template>
      </el-table-column>
      <el-table-column label="所在高速" min-width="6.66%" align="left">
        <template slot-scope="scope">{{decodeURI(scope.row.poiName)}}</template>
      </el-table-column>
      <el-table-column label="所在路段" min-width="6.66%" align="left">
        <template slot-scope="scope">{{scope.row.road}}</template>
      </el-table-column>
      <el-table-column label="所属管理处" min-width="5.66%" align="left">
        <template slot-scope="scope">{{scope.row.roadSec}}</template>
      </el-table-column>
      <el-table-column class="play-box" fixed="right" label="操作" min-width="4.66%" align="left">
        <template slot-scope="scope">
          <el-tooltip popper-class="tooltip" placement="top">
            <i class="el-icon-video-play" @click="clickPlayIcon(scope.row.cameraNum)"></i>
            <div slot="content" class="tooltip-content">
              <div>播放视频</div>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗组件 -->
    <PlayPopup v-if="showPlayPopup" :cameraNum="cameraNum"></PlayPopup>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="PaginationSet.currentPage"
        :limit.sync="PaginationSet.pagesize"
        layout="total, prev, pager, next,jumper"
        :total="PaginationSet.listTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getData, postData } from "../../utils/request/http";
import PlayPopup from "../../components/PlayPopup";
import bus from "./../../utils/bus";

export default {
  data() {
    return {
      //ip列表数据
      tableData: [],
      //ip列表的分页参数
      PaginationSet: {
        listTotal: 0, //IP列表的总数
        currentPage: 1, //默认开始页面
        pagesize: 1000 //每页初始显示条数
      },
      copyTableData1: [], //copy ip list
      showPlayPopup: false, //播放弹窗
      cameraNum: ""
    };
  },
  components: {
    PlayPopup
  },
  created() {
    /*
     @Desc: 关闭弹窗的事件bus
     @Author: HHH , @Date: 2020-08-07 14:55:20
    */
    bus.$on("sendCloseEvent", showPlayPopup => {
      this.showPlayPopup = false;
      console.log(this.showPlayPopup);
    });
  },
  mounted() {
    this.getcameraList();
  },
  methods: {
    /*
     @Desc: 初始列表
     @Author: HHH , @Date: 2020-08-13 10:27:14
    */

    async getcameraList() {
      var that = this;
      let res = await postData("/web/camera/list", {}).catch();
      if (res.code == "0") {
        console.log(res);
        that.tableData = res.data.cameras;
        that.PaginationSet.listTotal = res.data.cameras.length;
      } else {
        //that.$message.error("error1");
      }
    },
    /*
     @Desc: ip列表中，显示当前所在页
      @params {Number} current 第几页
     @Author: HHH , @Date: 2020-08-13 10:27:41
    */

    handleCurrentChange(current) {
      //console.log(`当前在第: ${current}页`);
      this.PaginationSet.currentPage = current;
      this.tableData = this.paging1(this.PaginationSet.pagesize, current);
    },
    /*
     @Desc: 本地分页的方法
     @Author: HHH , @Date: 2020-08-13 10:28:00
    */
    paging1(size, current) {
      const tableList1 = JSON.parse(JSON.stringify(this.copyTableData1));
      const tablePush = [];
      tableList1.forEach((item, index) => {
        if (size * (current - 1) <= index && index <= size * current - 1) {
          tablePush.push(item);
        }
      });
      return tablePush;
    },
    /*
     @Desc: 点击列表中的，播放按钮显示弹窗
     @Author: HHH , @Date: 2020-08-07 14:57:42
    */
    clickPlayIcon(cameraNum) {
      this.showPlayPopup = true;
      //console.log(this.showPlayPopup);
      this.cameraNum = cameraNum;
    },
    /*
     @Desc: 手动刷新，摄像机列表
     @Author: HHH , @Date: 2020-08-18 11:06:31
    */
    manualRefresh() {
      var that = this;
      getData("/web/sip/catalog", {})
        .then(res => {
          that.logining = false;
          console.log(res);
          if (res.code == "0") {
            that.getcameraList();
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    }
  }
};
</script>
<style scoped>
/*标题*/
.show-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: relative;
  background: #c0dee2;
  padding-left: 15px;
  font-size: 14px;
  margin: 6px 0 10px 0;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}

.show-title::before {
  content: "";
  width: 2px;
  height: 16px;
  /* background: #29c0b7; */
  background: #676a6d;
  position: absolute;
  top: 12px;
  left: 27px;
}

.show-title span {
  float: left;
  color: #676a6d;
  margin-left: 25px;
}
.show-title .manual-refresh {
  float: right;
  margin-right: 20px;
}
/* ip列表 */
.cameraList {
  margin-top: 35px;
  /* padding: 0 20px; */
}

/* 更改form表单默认样式,表头 */
.home-wrap >>> .el-table--border th,
.el-table__fixed-right-patch {
  /* background: #c0dee2; */
  background: #f0f3f4;
}

.home-wrap >>> .el-table .cell,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 10px;
  text-align: center;
}
.home-wrap >>> .demo-form-inline {
  width: 96%;
  margin: 0 auto;
  margin-top: 35px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #c0dee2;
  box-shadow: 0px 3px 1px #ceece8;
  border-radius: 25px;
}
.ip-del-btn {
  color: #f13636;
}

/* 分页*/
.block {
  margin: 20px 0 0 10px;
}

.home-wrap >>> .el-icon-video-play {
  font-size: 20px !important;
  z-index: 990;
}

/* play-icon */
</style>
