<template>
  <div class="cart-item">
    <select-box class="select-box" :select="false"/>
    <div class="img-box">
      <img v-if="isDataLoad" :src="imgUrl" alt="商品图片">
      <svg t="1709792309554" class="pre-load" viewBox="0 0 1117 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="6699" width="200" height="200">
        <path
            d="M997.003183 39.703255v35.839983c0 21.829808-17.966537 39.703255-39.912709 39.703255H153.832657c-21.969445 0-39.912709 17.850174-39.912709 39.679982v598.597546c0 21.829808-17.966537 39.679982-39.912709 39.679982H39.912709A39.912709 39.912709 0 0 1 0 753.524021V39.703255C0 17.873446 17.966537 0 39.912709 0h917.177765c21.946172 0 39.912709 17.873446 39.912709 39.703255zM1070.544968 191.674095c25.716352 0 46.522161 20.712718 46.545433 46.26616v739.839664A46.335979 46.335979 0 0 1 1070.591513 1023.999535H233.285712c-25.693079 0-46.545433-20.712718-46.545433-46.219616v-739.839664c0-25.553443 20.852354-46.242888 46.545433-46.242888h837.282529z m-93.021049 693.573503h0.046546v-138.705392l-139.54321-138.705391-139.589754 138.705391-232.564258-231.167895-139.589755 138.728664v231.144623h651.240431z m-93.044321-369.873287c51.455977 0 93.044321-41.425436 93.044321-92.462503 0-51.153431-41.588345-92.485776-93.044321-92.485776-51.409431 0-92.997776 41.332345-92.997776 92.485776 0 51.037068 41.588345 92.462503 92.997776 92.462503z"
            fill="#C8C8C8" p-id="6700"></path>
      </svg>
    </div>
    <div class="content">
      <div class="content-title">{{ title }}</div>
      <div class="content-detail">{{ detail }}</div>
      <div class="content-current-price">{{ currentPrice }}</div>
      <div class="content-original-price">{{ originalPrice }}</div>
      <div class="counter">
        <div class="decreaseBtn">-</div>
        <div>{{ count }}</div>
        <div class="increaseBtn">+</div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectBox from "@/components/common/selectBox/SelectBox";

export default {
  name: "CartItem",
  components: {
    SelectBox
  },
  props: {
    cartItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isDataLoad: false,
      id: -1,
      title: '加载中...',
      detail: '加载中...',
      imgUrl: '',
      currentPrice: 0,
      originalPrice: 0,
      count: 0,
      stock: 0,
      select: 0
    }
  },
  methods: {
    updateCartItem() {
      console.log('购物车商品信息更新');
      this.isDataLoad = false
      this.id = this.cartItem.id
      this.title = this.cartItem.name
      this.detail = this.cartItem.detail
      this.imgUrl = this.cartItem.image
      this.currentPrice = this.cartItem.currentPrice
      this.originalPrice = this.cartItem.originalPrice
      this.count = this.cartItem.count
      this.stock = this.cartItem.stock
      this.select = this.cartItem.select
      this.isDataLoad = true
    }
  },
  created() {
    this.updateCartItem()
  }
}
</script>

<style scoped>
.cart-item {
  border-top: var(--color-background-dark) 1px solid;
  border-bottom: var(--color-background-dark) 1px solid;
  width: 100%;
  height: 120px;
  position: relative;
}

.select-box {
  position: absolute;
  left: 8px;
  top: calc((120px - 24px) / 2);
}

.img-box {
  width: 100px;
  height: 100px;
  background-color: var(--color-background-dark);
  position: absolute;
  border-radius: 12px;
  left: calc(8px + 24px + 10px);
  top: calc((120px - 100px) / 2);
  overflow: hidden;
}

.img-box img {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 10;
}

.img-box svg {
  width: 55%;
  height: 55%;
  position: absolute;
  top: 48%;
  left: 48%;
  transform: translateX(-50%) translateY(-50%);
}

.img-box svg path {
  fill: var(--color-light-text);
}

.content {
  position: absolute;
  left: calc(8px + 24px + 10px + 100px);
  right: 0;
  top: 0;
  bottom: 0;
  padding: 12px;
}

.content-title {
  color: var(--color-text);
  font-size: var(--font-normal-size);
  font-weight: bold;
}
</style>