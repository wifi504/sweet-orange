<template>
  <div id="model-box" @click="closeModal">
    <div id="model-card" @click="doNone">
      <nav-bar class="title">
        <div slot="center">{{ title }}</div>
        <svg @click="closeModal" slot="right" t="1709046651159" class="icon" viewBox="0 0 1175 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="4221" width="200" height="200">
          <path
              d="M551.251896 794.52738c-145.792755 0-264.84246-119.049705-264.84246-264.84246s119.049705-264.84246 264.84246-264.84246 264.84246 119.049705 264.84246 264.84246c0 146.655434-119.049705 264.84246-264.84246 264.84246z m0-502.94187c-131.98989 0-238.962089 106.972199-238.96209 238.962089 0 131.98989 106.972199 238.962089 238.96209 238.962089 131.98989 0 238.962089-106.972199 238.962089-238.962089 0-131.98989-106.972199-238.962089-238.962089-238.962089z"
              fill="#2D3036" p-id="4222"></path>
          <path
              d="M567.642797 529.68492l94.032013-94.032014c4.313395-4.313395 4.313395-11.214827 0-15.528222s-11.214827-4.313395-15.528222 0l-94.032013 94.032014-94.032014-94.032014c-4.313395-4.313395-11.214827-4.313395-15.528222 0s-4.313395 11.214827 0 15.528222l94.032013 94.032014-94.032013 94.032013c-4.313395 4.313395-4.313395 11.214827 0 15.528223s11.214827 4.313395 15.528222 0l94.032014-94.032014 94.032013 94.032014c4.313395 4.313395 11.214827 4.313395 15.528222 0s4.313395-11.214827 0-15.528223l-94.032013-94.032013z"
              fill="#2D3036" p-id="4223"></path>
        </svg>
      </nav-bar>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";

export default {
  name: "ModalBox",
  components: {
    NavBar
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '这是一段测试文本... '
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    doNone(e) {
      e.stopPropagation();
    }
  }
}
</script>

<style scoped>
#model-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.5);
}

#model-card {
  width: 85%;
  background-color: var(--color-background);
  border-radius: 5px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, .2);
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
  z-index: 10001;
}

#model-card .title {
  color: var(--color-text);
}

#model-card .title svg {
  width: 100%;
  height: 100%;
}

#model-card .content {
  padding: 15px;
  width: 100%;
  min-height: 200px;
  text-align: justify;
  text-indent: 2em;
  color: var(--color-text);
}
</style>