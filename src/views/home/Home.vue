<template>
  <div>
    <!-- 首页顶部的Bar -->
    <nav-bar class="home-nav">
      <img slot="left" src="@/assets/img/logo.png" alt="logo">
      <div slot="center">橘子有点点甜</div>
    </nav-bar>
    <!-- 首页的主板面 -->
    <scroll class="home-space" ref="home" :show-back-top-button="true">
      <!--  宣传片  -->
      <video-player-box class="home-video" ref="video"/>
      <!--  公告  -->
      <text-horiz-scroll :text="noticeText" class="home-notice" ref="notice">
        <svg slot="svg-icon" t="1707946424640" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="20170" width="200" height="200">
          <path
              d="M921.9 468.6H749.6c-9.4 0-18.4 3.8-25 10.5-6.6 6.7-10.3 15.7-10.3 25.1v11.1c0 19.6 15.9 35.5 35.4 35.5h172.2c19.5 0 35.3-15.9 35.3-35.5v-11.1c0-9.4-3.7-18.4-10.3-25.1-6.6-6.7-15.6-10.5-25-10.5zM522.4 163.9c-53.6 42.6-165.7 102.3-246.3 159.8h-0.1c-0.9 0.6-1.8 3.8-2.8 4.3-9.5 5.4-13.8 20.1-65.6 20.1h-101c-26 0-42 12.2-42 39.6V631c0 27.4 14.7 40.9 42 40.9H208c51.5 0.1 55.7 14.8 65.2 20.1 0.9 0.5 1.8 3.7 2.7 4.3h0.1c78.2 57.5 191 121.8 246.4 162.7 16.7 12.3 72.1 33.9 72.1-42.1v-614c0-76.1-55.9-51.8-72.1-39z m159 167.8c9.2 16.1 27.3 20.2 40.5 9l141.5-119.3c13.3-11.1 16.5-33.2 7.4-49.4l-5.2-9.1c-9.1-16.1-27.3-20.1-40.5-9L683.6 273.2c-13.2 11.2-16.5 33.2-7.4 49.4l5.2 9.1z m40.4 347.4c-13.2-11.1-31.3-7-40.4 9l-5.2 9.1c-9.1 16.1-5.8 38.2 7.4 49.4L825.1 866c13.2 11.1 31.3 7.1 40.4-9l5.2-9.1c9.1-16.1 5.8-38.2-7.4-49.4L721.8 679.1z m0 0"
              fill="#77808F" p-id="20171"></path>
        </svg>
      </text-horiz-scroll>
      <!--  商品列表  -->
      <goods-display-box v-for="good in goods"
                         ref="goods"
                         :key="good.id"
                         :id="good.id"
                         :name="good.name"
                         :stock="good.stock"
                         :detail="good.detail"
                         :img-url="good.image"
                         :current-price="good.currentPrice"
                         :original-price="good.originalPrice"
                         @good-click="goodClick"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import NavBar from "@/components/common/navBar/NavBar";
import TextHorizScroll from "@/components/common/textHorizScroll/TextHorizScroll";
import VideoPlayerBox from "@/components/content/videoPlayerBox/VideoPlayerBox";
import GoodsDisplayBox from "@/components/content/goodsDisplayBox/GoodsDisplayBox";

import {getHomeViewData} from "@/network/home";

export default {
  name: "Home",
  components: {
    Scroll,
    NavBar,
    TextHorizScroll,
    VideoPlayerBox,
    GoodsDisplayBox
  },
  data() {
    return {
      noticeText: '',
      goods: []
    }
  },
  methods: {
    updateView() {
      if (this.$store.state.isDebugMode) {
        console.log('HomeView Updating...');
      }
      this.$refs.notice.updateScroll();
      this.$refs.video.updateSize();
      if (this.$refs.goods) {
        this.$refs.goods.forEach(good => {
          good.updateDetail();
        });
      }
      setTimeout(() => {
        this.$refs.home.doScrollRefresh();
        if (this.$store.state.isDebugMode) {
          console.log('---- HomeView Updated!');
        }
      })
    },
    goodClick(id) {
      let checkedGood = null
      for (let good of this.goods) {
        if (good.id === id) {
          checkedGood = good
          break
        }
      }
      const info = JSON.stringify(checkedGood, null, 2)
      if (this.$store.state.isDebugMode) {
        console.log('点击了商品：\n' + info);
      }
      this.$router.push({
        path: '/detail',
        query: {
          'id': id
        }
      }).catch(err => {
        console.log("无效的导航：（别对着同一个按钮点啦！...( ＿ ＿)ノ｜）\n" + err.toString())
      })
    }
  },
  created() {
    // 获取展示信息
    getHomeViewData().then(res => {
      // console.log(res);
      this.noticeText = res.noticeText;
      this.goods = res.goods;
      this.$refs.video.setVideoSource(res.videoUrl);
    })
  },
  mounted() {
    // 监听尺寸变化，这种情况要回调 updated
    window.onresize = () => {
      if (this.$store.state.isDebugMode) {
        console.log("Window resize!")
      }
      this.updateView()
    };

    // 加载完毕后进行一次更新
    if (this.$store.state.isDebugMode) {
      console.log("Vue Mounted!")
    }
    this.updateView()
  },
  updated() {
    // 如果Home里面有变量或组件变化，这种情况要回调 updated
    if (this.$store.state.isDebugMode) {
      console.log("Vue Updated!")
    }
    this.updateView()
  },
  destroyed() {
    window.onresize = null;
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);

  /* 整条Bar固定在视窗顶部 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.home-nav img {
  width: 75%;
}

/* 首页的主板面 */
.home-space {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 55px;
  /*border: green 2px solid;*/
}

/* 公告 */
.home-notice {
  margin: 8px;
}

/* 宣传片 */
.home-video {
  /*border: green 2px solid;*/
  width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, .2);
}
</style>