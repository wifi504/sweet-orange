<template>
  <div>
    <!--  标题栏  -->
    <cart-nav-bar/>
    <!--  主板面  -->
    <scroll class="cart-scroll">
      <cart-item v-for="cartItem in cartItems" :cart-item="cartItem"/>
    </scroll>
    <!--  结算部分 Foot Bar  -->
    <cart-foot-bar/>
  </div>
</template>

<script>
import CartNavBar from "@/views/cart/childComps/CartNavBar";
import Scroll from "@/components/common/scroll/Scroll";
import CartItem from "@/views/cart/childComps/CartItem";
import CartFootBar from "@/views/cart/childComps/CartFootBar";

import {getCartViewData} from "@/network/cart";

export default {
  name: "Cart",
  components: {
    CartNavBar,
    Scroll,
    CartItem,
    CartFootBar
  },
  data() {
    return {
      isGetData: false,
      goods: [],
      cart: [],
      cartItems: []
    }
  },
  created() {
    this.cart = this.$store.state.cart
    this.cartItems = new Array(this.cart.length)
    getCartViewData().then(res => {
      this.goods = res.goods
      this.isGetData = true
      this.updateCartItems()
    })
  },
  methods: {
    updateCartItems() {
      if (this.isGetData) {
        // 购物车更新，重新整理 cartItems
        this.cartItems = []
        for (let item of this.cart) {
          const good = this.goods.find(obj => obj.id === item.id)
          this.cartItems.push({
            id: item.id,
            name: good.name,
            detail: good.detail,
            image: good.image,
            currentPrice: good.currentPrice,
            originalPrice: good.originalPrice,
            count: item.count,
            stock: good.stock,
            select: item.select
          })
        }
      }
    }
  },
  watch: {
    cart: function (newVal, oldVal) {
      this.updateCartItems()
    }
  },
  activated() {
    this.updateCartItems()
  }
}
</script>

<style scoped>
.cart-scroll {
  width: 100%;
  height: calc(100vh - 44px - 55px - 60px);
}
</style>