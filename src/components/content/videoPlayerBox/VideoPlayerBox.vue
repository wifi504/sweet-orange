<template>
  <div ref="box">
    <d-player id="vue-d-player"
              :options="playerOptions"
              ref="player"
              :style="'width: ' + playerWidth + 'px;' +
               'height: ' + playerHeight + 'px;'"/>
  </div>
</template>

<script>
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

export default {
  name: "VideoPlayerBox",
  components: {
    'd-player': VueDPlayer
  },
  data() {
    return {
      playerOptions: {
        theme: window.getComputedStyle(document.documentElement)
            .getPropertyValue('--color-tint')
      },
      playerWidth: 0,
      playerHeight: 0
    }
  },
  methods: {
    updateSize() {
      console.log("重置播放器窗口尺寸");
      this.playerWidth = this.$refs.box.clientWidth;
      this.playerHeight = this.playerWidth * 9 / 16;
    },
    setVideoSource(url) {
      console.log("设置播放器视频源");
      const player = this.$refs.player.dp;
      player.switchVideo({
        url: url
      })
    }
  },
  mounted() {
    document.querySelector('[data-balloon="页面全屏"]').remove()
    this.updateSize()
  }
}
</script>

<style scoped>

</style>