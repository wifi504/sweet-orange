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
  getters: {},
  mutations: {
    addGoodToCart(state, obj) {
      // 在购物车中确认是否添加了指定商品
      let findGood = state.cart.find(good => good.id === obj.id)
      if (!findGood) {
        state.cart.push({
          'id': obj.id,
          'stock': obj.stock,
          count: 0,
          select: 0
        })
      }
      findGood = state.cart.find(good => good.id === obj.id)
      // 增加商品数量
      if (findGood.count < findGood.stock) {
        findGood.count++
        console.log('完成购物车添加，id=' + obj.id + ',count=' + findGood.count)
        return true
      } else {
        console.log('无法购物车添加，id=' + obj.id + ',count=' + findGood.count)
        return false
      }
    },
    removeGoodFromCart(state, obj) {
      // 在购物车中确认商品是不是只剩一个了
      let findGood = state.cart.find(good => good.id === obj.id)
      if (findGood.count === 1) {
        // 删除这个商品
        const index = state.cart.findIndex(good => good.id === obj.id)
        state.cart.splice(index, 1)
        console.log('完成购物车删除，id=' + obj.id)
      } else {
        findGood.count--
        console.log('完成购物车减少，id=' + obj.id + ',count=' + findGood.count)
      }
    }
  },
  actions: {},
  modules: {}
})

// 将所有Vuex更改保存进本地
store.subscribe((mutations, state) => {
  localStorage.setItem('vuex', JSON.stringify(state))
})

export default store