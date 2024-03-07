<template>
  <div class="nav-bar">
    <div class="nav-left" @click="()=>{this.$emit('left-click')}">
      <slot name="left"></slot>
    </div>
    <div class="nav-center" @click="()=>{this.$emit('center-click')}">
      <slot name="center"></slot>
    </div>
    <div class="nav-right" @click="()=>{this.$emit('right-click')}">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.nav-bar {
  /* NavBar的高度 */
  --bar-height: 44px;

  /* 整条Bar的样式 */
  background-color: var(--color-background-light);
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  height: var(--bar-height);
  color: var(--color-background-light);
  font-size: var(--font-large-size);
}

.nav-center {
  /* 内容居中 */
  display: grid;
  place-items: center;

  width: calc(100% - 2 * var(--bar-height));
  height: var(--bar-height);

  /* 绝对于Bar定位 */
  position: absolute;
  top: 0;
  left: var(--bar-height);
}

.nav-left, .nav-right {
  /* 内容居中 */
  display: grid;
  place-items: center;
  width: var(--bar-height);
  height: var(--bar-height);
}

.nav-left {
  /* 绝对于Bar定位 */
  position: absolute;
  top: 0;
  left: 0;
}

.nav-right {
  /* 绝对于Bar定位 */
  position: absolute;
  top: 0;
  right: 0;
}
</style>