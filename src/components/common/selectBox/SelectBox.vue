<template>
  <div class="select-box" :class="{'activated':select}">
    <svg t="1709811814083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="5598" width="200" height="200">
      <path
          d="M997.888 70.144C686.592 261.12 460.8 502.272 358.912 623.104L110.08 428.032 0 516.608l429.568 437.248C503.296 764.416 737.792 394.24 1024 131.072l-26.112-60.928m0 0z"
          p-id="5599"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "SelectBox",
  props: {
    select: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.select-box {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: var(--color-light-text) 2px solid;
  position: relative;
  background-color: var(--color-background-light);
}

.activated {
  background-color: var(--color-tint);
  border: none;
}

.select-box svg {
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.select-box svg path {
  fill: var(--color-background-light);
}
</style>