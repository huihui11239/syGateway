<template>
  <div class="breadcrumb-wrapper">
       <el-breadcrumb style="margin-top: 10px;margin-left: 20px;float: left;color:#333;" separator-class="el-icon-arrow-right">
         <el-breadcrumb-item  v-for="(item, index) in levelList" :key="item.index" :to="item.index">
           <span class="el-icon-s-home" style="color: #333;margin-right: 10px;" v-if="index == 0"></span>
           <span class="el-icon-tickets" style="color: #333;margin-right: 10px;" v-if="index == 1"></span>
           <span class="el-icon-takeaway-box" style="color: #333;margin-right: 10px;" v-if="index == 2"></span>
           <span class="el-icon-coordinate" style="color: #333;margin-right: 10px;" v-if="index == 3"></span>
           <span class="el-icon-notebook-2" style="color: #333;margin-right: 10px;" v-if="index == 4"></span>
           <span style="color: #333;">{{item.title}}</span>
         </el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed:{
        levelList:{
            get(){
                return this.$store.state.titles
            }
        }
    },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.breadcrumb-wrapper{
     width: 100%;
    height: 36px;
    background: #ebecec;
}

</style>