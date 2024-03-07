<template>
  <div class="background">
    <img :src="this.href" alt="商品图片">
  </div>
</template>

<script>
export default {
  name: "ImgModelBox",
  props: {
    href: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.background {
  background-color: rgba(0, 0, 0, .5);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

.background img {
  width: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>