import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDebugMode: true,
    cart: []
  },
  getters: {
  },
  mutations: {
    addGoodToCart(state, id) {
      // 在购物车中添加指定商品
      let findGood = state.cart.find(good => good.id === id)
      if (findGood) {
        findGood.count++
      } else {
        state.cart.push({
          id,
          count: 1
        })
      }
      findGood = state.cart.find(good => good.id === id)
      console.log('完成购物车添加，id=' + id + ',count=' + findGood.count)
    }
  },
  actions: {
  },
  modules: {
  }
})
