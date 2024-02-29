<template>
  <div class="top-button">
    <svg t="1709192837802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="6025" width="200" height="200">
      <path
          d="M936 407.2l-368-368c-16-16-38.4-21.6-59.2-16-16 0-32 5.6-44.8 17.6L98.4 407.2c-24 24-24 62.4 0 86.4 24 24 62.4 24 86.4 0L462.4 216v725.6c0 33.6 27.2 61.6 61.6 61.6 33.6 0 61.6-27.2 61.6-61.6V232l263.2 263.2c24 24 63.2 24 87.2 0 24.8-24 24.8-63.2 0-88z"
          p-id="6026"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
.top-button {
  width: 45px;
  height: 45px;
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 100;
  background-color: var(--color-background-light);
  border-radius: 50%;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
}

.top-button svg {
  width: 55%;
  height: 55%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.top-button svg path {
  fill: var(--color-high-text);
}
</style>