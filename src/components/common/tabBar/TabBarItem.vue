<template>
  <div class="tab-bar-item" @click="itemClick">
    <div :class="{'svg-active': isActive}">
      <slot name="item-svg"></slot>
    </div>
    <div :class="{'text-active': isActive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String
  },
  computed: {
    isActive() {
      return !this.$route.path.indexOf(this.path)
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err => {
        console.log("无效的导航：（别对着同一个按钮点啦！...( ＿ ＿)ノ｜）\n" + err.toString())
      })
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: var(--font-normal-size);
  color: var(--color-text);
}

.tab-bar-item svg {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}

.tab-bar-item svg path {
  fill: var(--color-text);
}

.text-active {
  color: var(--color-high-text);
}

.svg-active svg path {
  fill: var(--color-high-text);
}
</style>
