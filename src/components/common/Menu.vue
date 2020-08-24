<template>
  <div class="menu-wrap">
    <el-row class="tac">
      <el-col :span="12">
        <!-- <h5>自定义颜色</h5> -->
        <el-menu
          style="width: 200px;height: 100vh;"
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <div class="logo" @click="()=>{this.$router.push('/home')}">
            <img src="./../../../static/img/logo.png" alt />
            <!-- <div class="logo-txt">视频播放</div> -->
          </div>
          <!-- <template>
                <div>
                    <div>
                        <el-menu-item @click="setTitle()">
                            <i class="el-icon-set-up"></i>
                            <span class="menu-txt" slot="title">摄像机列表</span>
                        </el-menu-item>
                    </div>
                </div>
          </template>-->
          <template>
            <div v-for="(item, index) in menus" :key="index">
              <div v-if="item.expand == false">
                <el-menu-item :index="item.index" @click="setTitle(item)">
                  <i :class="item.iconClass"></i>
                  <span slot="title">{{item.title}}</span>
                </el-menu-item>
              </div>
              <div v-else>
                <el-submenu :index="item.index">
                  <template slot="title">
                    <i :class="item.iconClass"></i>
                    <span>{{item.title}}</span>
                  </template>
                  <el-menu-item-group v-for="(item1,index1) in item.children" :key="index1">
                    <el-menu-item :index="item1.index" @click="setTitle(item1)">
                      <i class="el-icon-map-location"></i>
                      <span>{{item1.title}}</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </div>
            </div>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          expand: false,
          index: "/home",
          title: "摄像机列表",
          hasParent: false,
          iconClass: "el-icon-set-up"
        },
        {
          expand: false,
          index: "/systemConfig",
          title: "系统设置",
          hasParent: false,
          iconClass: "el-icon-setting"
        }
      ], // menu菜单（注意格式，自己修改，如果没有子级，index与path必须一致！！！）
      findItem: {}, // 递归得到当前对象
      parentItem: {}, // 递归得到父级对象
      arr: []
    };
  },
  methods: {
    /*
        * @desc 递归函数
        * @params {Array} arr 递归的数组
        *         {String} index 传入的menu
        *         {Object} itemParent  父级
          @return 返回父子级
          @version 1.0.0
        * */
    findChild(arr, index, itemParent = {}) {
      arr.forEach(item => {
        //利用foreach循环遍历
        if (item.index == index) {
          //判断递归结束条件
          this.findItem = item;
          this.parentItem = itemParent;
          this.arr.push(item);
          return { child: this.findItem, parent: this.parentItem };
        } else if (item.expand == true && item.children.length > 0) {
          //判断chlidren是否有数据
          // this.arr.push(item)
          this.findChild(item.children, index, item); //递归调用
          this.arr.unshift(item);
        }
      });
      return { child: this.findItem, parent: this.parentItem };
    },

    /*
     * @desc 点击每一个menu函数
     * @params {Object} item 循环的每一个对象
     * */
    setTitle(item) {
      this.arr = [];
      if (
        item.hasParent == false ||
        (item.hasParent == true &&
          typeof item.children != "undefined" &&
          item.children.length == 0)
      ) {
        this.arr.push(item);
        this.$store.commit("setHeaderTitle", this.arr);
        return false;
      }
      this.findChild(this.menus, item.index);
      this.$store.commit("setHeaderTitle", this.arr);
    }
  },
  mounted() {
    this.arr = [];
    var child = this.findChild(this.menus, this.$route.path, {}).child;
    if (
      child.hasParent == false ||
      (child.hasParent == true &&
        typeof child.children != "undefined" &&
        child.children.length == 0)
    ) {
      this.arr = [];
      this.arr.push(child);
      this.$store.commit("setHeaderTitle", this.arr);
      return false;
    }
    this.$store.commit("setHeaderTitle", this.arr);
  }
};
</script>
<style scoped>
/* .logo-txt{
    color: #fff;
    font-size: 20px;
    font-weight: bold;
}
.menu-wrap{
    overflow: hidden;
}
.logo {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 25px;
  cursor: pointer;
}
.logo img {
  width: 120px;
  height: 50px;
}

.menu-wrap >>> .el-menu-item{
  background: #222223!important;
  height:100px;
  line-height: 100px;
}

.menu-wrap >>> .el-icon-set-up{
  font-size: 40px!important;
}
.menu-wrap >>> .menu-txt{
  margin-left: 15px;
  font-size: 20px!important;
} */

.logo-txt {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.menu-wrap {
  overflow: hidden;
}
.logo {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 25px;
  cursor: pointer;
}
.logo img {
  width: 120px;
  height: 50px;
}

.menu-wrap >>> .el-menu-item {
  /* background: #222223!important; */
  height: 100px;
  line-height: 100px;
}
.menu-wrap >>> .is-active {
  background: #434a50 !important;
}
</style>
