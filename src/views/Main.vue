<template>
  <div id="app">
    <el-container class="main-wrap">
      <el-aside style="width: 200px; border-right:1px solid rgb(84, 92, 100)">
        <Menu />
      </el-aside>
      <el-container class="el-container-r">
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <div class="routeWrap">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./../components/common/Header";
import Menu from "./../components/common/Menu";

export default {
  name: "Main",
  components: {
    Menu,
    Header,
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  /* background-color: #f8f9fa; */
  width: 100%;
  height: auto;
  overflow: hidden;
}

.main-wrap {
  display: flex;
  justify-content: flex-start !important;
}
.el-container-r {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.routeWrap {
  width: 100%;
  height: auto;
  overflow: hidden;
  overflow: auto;
  padding: 20px;
}

.el-main {
  padding: 0 !important;

}
</style>
