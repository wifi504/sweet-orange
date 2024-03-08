<template>
  <div class="foot-bar">
    <div class="foot-bar-item1">
      <div class="btnA" @click="contactClick">咨询客服</div>
    </div>
    <div class="foot-bar-item2" :class="{'gray': isOutOfStock}">
      <div :class="{'btnA': this.isAddCart,
                    'btnB': !this.isAddCart}"
           @click="cartClick">{{ cartText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailFootBar",
  props: {
    id: {
      type: Number,
      default: -1
    },
    stock: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isOutOfStock: true,
      isAddCart: false
    }
  },
  computed: {
    cartText() {
      if (this.isOutOfStock) {
        return '无货'
      }
      if (this.isAddCart) {
        return '已加入，去结算'
      }
      return '加入购物车'
    }
  },
  methods: {
    contactClick() {
      this.$emit('contact-click')
    },
    cartClick() {
      if (this.isAddCart) {
        this.$router.push('/cart')
      } else if (!this.isOutOfStock) {
        this.isAddCart = true
        this.$emit('cart-click')
      }
    }
  },
  watch: {
    stock: function (newVal, oldVal) {
      if (this.$store.state.cart.find(good => good.id === this.id)) {
        this.isAddCart = true
      }
      this.isOutOfStock = newVal <= 0
    }
  },
  deactivated() {
    this.isAddCart = false;
  }
}
</script>

<style scoped>
.foot-bar {
  background-color: var(--color-background-light);
  width: 100vw;
  height: 55px;
  position: fixed;
  bottom: 0;
  box-shadow: 0 0 8px rgba(0, 0, 0, .1);
  display: flex;
}

.foot-bar-item1 {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 5px 5px 8px 10px;
}

.foot-bar-item2 {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 5px 10px 8px 5px;
}

.btnA {
  border-radius: 100px;
  background-color: var(--color-tint-light);
  border: 2px solid var(--color-high-text);
  display: inline-block;
  width: 100%;
  height: 100%;
  color: var(--color-high-text);
  font-size: var(--font-normal-size);
  line-height: calc(var(--font-normal-size) + 21px);
}

.btnB {
  border-radius: 100px;
  background-color: var(--color-tint);
  border: 2px solid var(--color-tint);
  display: inline-block;
  width: 100%;
  height: 100%;
  color: var(--color-tint-light);
  font-size: var(--font-normal-size);
  line-height: calc(var(--font-normal-size) + 21px);
}

.gray {
  filter: grayscale(100%) opacity(50%);
  -webkit-filter: grayscale(100%) opacity(50%);
}
</style>