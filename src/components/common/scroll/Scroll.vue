<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    doScrollRefresh() {
      console.log('刷新滚动视图');
      this.scroll.refresh()
    }
  },
  mounted() {
    // 1. 创建 BetterScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  }
}
</script>

<style scoped>

</style>
