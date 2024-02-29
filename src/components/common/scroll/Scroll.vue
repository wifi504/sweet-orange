<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <!--  返回顶部按钮  -->
    <back-top v-show="isBackTopButtonReallyShow" @click.native="doBackTop"/>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

import BackTop from "@/components/common/scroll/backTop/BackTop";

export default {
  name: "Scroll",
  components: {
    BackTop
  },
  props: {
    showBackTopButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
      contentScrollY: 0
    }
  },
  computed: {
    probeType() {
      return this.showBackTopButton ? 3 : 0
    },
    isBackTopButtonReallyShow() {
      if (!this.showBackTopButton) return false;
      return this.contentScrollY <= -100;
    }
  },
  methods: {
    doScrollRefresh() {
      if (this.$store.state.isDebugMode) {
        console.log('刷新滚动视图');
      }
      this.scroll.refresh()
    },
    doBackTop() {
      if (this.$store.state.isDebugMode) {
        console.log('执行返回顶部')
      }
      this.scroll.scrollTo(0, 0, 500)
    }
  },
  mounted() {
    // 1. 创建 BetterScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType
    })

    // 2. 设置监听器
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      // this.$emit('scroll', position);
      this.contentScrollY = position.y;
    })
  }
}
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
