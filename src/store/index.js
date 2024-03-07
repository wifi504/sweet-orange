import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 如果本地有上次的Vuex内容，那么提取出来
let initState = {}
if (localStorage.getItem('vuex')) {
  initState = JSON.parse(localStorage.getItem('vuex'))
}

const store = new Vuex.Store({
  state: {
    isDebugMode: true,
    cart: [],
    // 利用对象解构合并原有数据
    ...initState
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

// 将所有Vuex更改保存进本地
store.subscribe((mutations, state) => {
  localStorage.setItem('vuex', JSON.stringify(state))
})

export default store