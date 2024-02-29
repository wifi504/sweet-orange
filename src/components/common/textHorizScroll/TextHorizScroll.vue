<template>
  <div class="radius-box" ref="radius">
    <div class="before-text-icon"
         :style="'height: ' + boxHeight + 'px;' +
          'width: ' + boxHeight + 'px;'">
      <slot name="svg-icon"></slot>
    </div>
    <div class="scroll-text-box" ref="box"
         :style="textStyle + 'height: ' + boxHeight + 'px;' +
          'width: ' + boxWidth + 'px;' +
           'left: ' + (boxHeight + 5) + 'px;'">
      <div class="scroll-text-line" ref="line"
           :style="'transform: translateX('+ scrollPosition1 +'px);'">
        {{ text }}
      </div>
      <div class="scroll-text-line"
           :style="'transform: translateX('+ scrollPosition2 +'px);'">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextHorizScroll",
  props: {
    text: {
      type: String,
      default: '这是一个自动水平滚动条！哈哈哈！ヾ(•ω•`)o | 测试文本 123'
    },
    textStyle: {
      type: String,
      default: 'font-size: var(--font-normal-size);'
    },
    scrollSpeed: {
      type: Number,
      default: 0.5
    }
  },
  data() {
    return {
      boxHeight: 0,
      boxWidth: 0,
      scrollPosition1: 0,
      scrollPosition2: 0,
      animateFrame: null
    }
  },
  mounted() {
    this.makeTextScroll();
  },
  methods: {
    makeTextScroll() {
      // 计算盒子大小
      this.boxHeight = this.$refs.line.scrollHeight;
      this.boxWidth = this.$refs.radius.clientWidth - 25 - this.boxHeight;

      // 文本宽度（给它补了20像素的空格，看起来连贯）
      const lineWid = this.$refs.line.scrollWidth + 20;
      // 框宽度
      const boxWid = this.boxWidth;

      // 如果文本宽度大于框的宽度，启动滚动，否则直接让 1号 显示在开头
      if (this.$store.state.isDebugMode) {
        console.log('字宽与盒宽：' + lineWid + " | " + boxWid)
      }
      if (lineWid > boxWid) {
        let is1before2 = true; // 1号 在 2号 左边吗
        // 动画循环函数
        const animate = () => {
          if (is1before2) {
            // 1号 开始向左
            this.$set(this.$data, 'scrollPosition1',
                this.scrollPosition1 - this.scrollSpeed)
            // 2号 在 1号 的后面
            this.$set(this.$data, 'scrollPosition2',
                this.scrollPosition1 + lineWid)
            // 如果 2号 到了框的左边再过一点，让 1号 在 2号 后面
            if (this.scrollPosition2 <= -boxWid - 10) is1before2 = false
          } else {
            // 2号 开始向左
            this.$set(this.$data, 'scrollPosition2',
                this.scrollPosition2 - this.scrollSpeed)
            // 1号 在 2号 的后面
            this.$set(this.$data, 'scrollPosition1',
                this.scrollPosition2 + lineWid)
            // 如果 1号 到了框的左边再过一点，让 2号 在 1号 后面
            if (this.scrollPosition1 <= -boxWid - 10) is1before2 = true
          }

          this.animateFrame = requestAnimationFrame(animate);
        }
        // 执行动画
        animate();
      } else {
        this.$set(this.$data, 'scrollPosition1', -boxWid + 2)
      }
    },
    updateScroll() {
      // 文本更新或框发生变化，回调此函数使动画正确
      if (this.animateFrame != null) {
        cancelAnimationFrame(this.animateFrame)
        this.animateFrame = null
      }

      this.boxHeight = 0;
      this.boxWidth = 0;
      this.scrollPosition1 = 0;
      this.scrollPosition2 = 0;

      this.makeTextScroll()
    }
  }
}
</script>

<style scoped>
.radius-box {
  padding: 10px;
  border-radius: 10px;
  border: solid var(--color-tint) 2px;
  background-color: var(--color-tint-light);
}

.scroll-text-box {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  /*border: red 2px solid;*/
}

.scroll-text-line {
  display: inline-block;
  position: absolute;
  left: 100%;
}

.before-text-icon {
  position: absolute;
  /*border: red 2px solid;*/
}

.before-text-icon svg {
  height: 100%;
  width: 100%;
}

.before-text-icon svg path {
  fill: var(--color-tint);
}
</style>