import axios from "axios";

export function request(config) {
  // 1. 创建实例
  const instance = axios.create({
    baseURL: '/sweet-orange/test',
    timeout: 3000
  })

  // 2. axios 拦截器

  // 请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config)
    // 对请求做一些验证，如判断是否符合服务器要求，或者做一些加载中的动画事件等
    return config // return 回去后去到下面的第三步
  }, error => {
    console.log(error)
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res)
    // 对服务器的响应结果进行处理...
    return res.data
  }, err => {
    console.log('拦截器错误信息：' + err)
  })

  // 3. 发送真正的网络请求
  return instance(config) // Promise
}
