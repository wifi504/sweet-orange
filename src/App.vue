<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tab-bar v-show="this.$route.path !== '/detail'"/>

    <!--  声明  -->
    <modal-box v-if="this.$store.state.isDebugMode ? false : showInfo"
               @close-modal="()=>{this.showInfo=false}"
               title="声明" content="">
      <div slot="content">
        <p>此网页为《橘子有点点甜》三创赛项目的H5前端Demo，不具任何商业用途</p>
        <br>
        <p>本项目开放源代码许可：</p>
        <p>GNU General Public License v3.0</p>
        <br><br><br><br><br><br><br><br>
        <link-button href="https://github.com/wifi504/sweet-orange/"
                     text="Open in Github" @btn-click="()=>{this.showInfo=false}"/>
      </div>
    </modal-box>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabBar/MainTabBar";
import ModalBox from "@/components/common/modalBox/ModalBox";
import LinkButton from "@/components/content/linkButton/LinkButton";

export default {
  name: 'App',
  components: {
    MainTabBar,
    ModalBox,
    LinkButton
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
      console.log = function () {
      }
    }
  },
  data() {
    return {
      showInfo: true
    }
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
