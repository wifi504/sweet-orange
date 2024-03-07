<template>
  <nav-bar @left-click="pageBack">
    <svg slot="left" t="1709790103546" class="icon" viewBox="0 0 1024 1024" version="1.1"
         xmlns="http://www.w3.org/2000/svg" p-id="4398" width="200" height="200">
      <path
          d="M699.2 142.421333l-362.026667 362.026667a10.666667 10.666667 0 0 0 0 15.104l362.026667 362.026667a32 32 0 0 1-45.248 45.248l-362.026667-362.026667a74.666667 74.666667 0 0 1 0-105.6l362.026667-362.026667a32 32 0 0 1 45.226667 45.226667z"
          fill="#8A8A8A" p-id="4399"></path>
    </svg>
    <div class="title" slot="center">详情页</div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {}
  },
  methods: {
    pageBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
  color: var(--color-high-text);
}

.icon {
  width: 60%;
  height: 60%;
}

.icon path {
  fill: var(--color-high-text);
}
</style>