import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Regisiter from '@/views/Regisiter'
import HomePage from '@/views/HomePage/HomePage'
import MyPage from '@/views/My/My'
import LocationPage from '@/views/Location/Location'
import AccountManage from '@/views/My/AccountManage'
import DeviceList from '@/views/My/DeviceList'
import FindDevice from '@/views/My/FindDevice'
import WarningSetting from '@/views/My/WarningSetting'
import MessageCenter from '@/views/My/MessageCenter'

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
          component: MyPage,
          children: [
            {
              path: '/my/accountManage',
              name: 'AccountManage',
              component: AccountManage
            },
            {
              path: '/my/deviceList',
              name: 'DeviceList',
              component: DeviceList
            },
            {
              path: '/my/warningSetting',
              name: 'WarningSetting',
              component: WarningSetting
            },
            {
              path: '/my/finddevice',
              name: 'FindDevice',
              component: FindDevice
            },
            {
              path: '/my/messagecenter',
              name: 'MessageCenter',
              component: MessageCenter
            }
          ]
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
    },
    {
      path: '/regisiter',
      name: 'Regisiter',
      component: Regisiter
    }
  ]
})
