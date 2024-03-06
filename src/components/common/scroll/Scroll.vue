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
      contentScrollY: 0,
      isBackTopButtonReallyShow: false,
      hiddenButton: null // 初始化隐藏按钮防抖函数指针
    }
  },
  computed: {
    probeType() {
      return this.showBackTopButton ? 3 : 0
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
    },
    updateBackTopButtonFlag(distance) {
      if (!this.showBackTopButton) {
        // 不启用返回顶部按钮
        this.isBackTopButtonReallyShow = false
      } else {
        // 启用返回顶部
        if (distance <= 200) {
          // 滚动太少就不显示
          this.isBackTopButtonReallyShow = false
        } else {
          this.isBackTopButtonReallyShow = true
          // 用户不滚了的时候隐藏按钮
          this.hiddenButton()
        }
      }
    },
    debounce(func, delay) { // 防抖函数
      let timer
      return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
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
      this.updateBackTopButtonFlag(-position.y)
    })
  },
  created() {
    this.hiddenButton = this.debounce(() => { // 初始化防抖函数
      if (this.$store.state.isDebugMode) {
        console.log('用户停止滚动，自动隐藏返回顶部按钮...')
      }
      this.isBackTopButtonReallyShow = false
    }, 2000)
  }
}
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
