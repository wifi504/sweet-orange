<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabBar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  },
  mounted() {
    if (!this.$store.state.isDebugMode) {
      console.log('橘子有点点甜三创赛项目');
      console.log('开发人员现在就lhl一个');
      console.log('非常缺前后端开发');
      console.log('如果你想加入');
      console.log('联系我们组长');
      console.log('QQ: 2380088500');
      console.log('WX: SFY031017');
      console.log = function () {}
    }
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
