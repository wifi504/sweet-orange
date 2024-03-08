<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
#tab-bar {
  display: flex;

  height: 55px;
  background-color: var(--color-background-light);
  box-shadow: 0 0 4px rgba(0, 0, 0, .1);

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
</style>
