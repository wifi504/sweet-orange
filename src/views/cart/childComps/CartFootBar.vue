<template>
  <div class="cart-foot-bar">
    <select-box class="select-box" :select="false"/>
    <div class="content">
      <span>已选0件,合计:</span>
      <span>￥30</span>
      <span>优惠减:￥50</span>
    </div>
    <div class="go-to-pay">去结算</div>
  </div>
</template>

<script>
import SelectBox from "@/components/common/selectBox/SelectBox";

export default {
  name: "CartFootBar",
  components: {
    SelectBox
  },
  props: {}
}
</script>

<style scoped>
.cart-foot-bar {
  background-color: var(--color-background-light);
  width: 100%;
  height: 60px;
  position: absolute;
  z-index: 100;
  bottom: 55px;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, .05);
}

.select-box {
  position: absolute;
  left: 8px;
  top: calc((60px - 24px) / 2);
}

.content {
  position: absolute;
  height: 60px;
  left: calc(16px + 24px);
  top: 0;
}

.go-to-pay {
  background-color: var(--color-tint);
  color: var(--color-background-light);
  display: inline-block;
  border-radius: 100px;
  font-size: var(--font-normal-size);
  padding: 12px 30px;
  position: absolute;
  right: 15px;
  top: calc((60px - var(--font-normal-size) - 24px) / 2);
}
</style>