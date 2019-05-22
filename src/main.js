// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Axios from 'axios'
import App from './App'
import router from './router'
import Moment from 'moment'
import './assets/js/appback.js'

Vue.config.productionTip = false
Vue.prototype.moment = Moment
Vue.prototype.$http = Axios
Vue.use(MintUI)
// 请求返回拦截
Axios.interceptors.response.use(
  res => {
    // console.log(res)
    if (res.data.code === 400) {
      // app &&
      //   app.$message({
      //     type: 'warning',
      //     message: '登录身份过期，请重新登录。'
      //   })
      // sessionStorage.removeItem('token')
      // sessionStorage.removeItem('user')
      // // router.push({ name: 'login' })
      // return Promise.reject(new Error('身份过期'))
    } else {
      return res.data
    }
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
