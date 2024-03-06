import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/home/Home')
const Group = () => import('@/views/group/Group')
const Community = () => import('@/views/community/Community')
const Cart = () => import('@/views/cart/Cart')
const Profile = () => import('@/views/profile/Profile')

const Detail = () => import('@/views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/group',
    component: Group,
    meta: {
      title: '全体橘合'
    }
  },
  {
    path: '/community',
    component: Community,
    meta: {
      title: '橘子贴吧'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    }
  },
  {
    path: '/detail',
    component: Detail,
    meta: {
      title: '详情页'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {

  // 修改页面标题
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' | 橘子有点点甜'
  }

  // 继续执行管道钩子
  next()
})

export default router
