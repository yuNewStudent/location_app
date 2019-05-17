import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import HomePage from '@/views/HomePage/HomePage'
import MyPage from '@/views/My/My'
import LocationPage from '@/views/Location/Location'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/homepage',
      children: [
        {
          path: '/homepage',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/my',
          name: 'MyPage',
          component: MyPage
        },
        {
          path: '/locationpage',
          name: 'LocationPage',
          component: LocationPage
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
