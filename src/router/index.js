import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Regisiter'
import ResetPassword from '@/views/ResetPassword'
import HomePage from '@/views/HomePage/HomePage'
import MyPage from '@/views/My/My'
import LocationPage from '@/views/Location/Location'
import AccountManage from '@/views/My/AccountManage'
import DeviceList from '@/views/My/DeviceList'
import FindDevice from '@/views/My/FindDevice'
import WarningSetting from '@/views/My/WarningSetting'
import MessageCenter from '@/views/My/MessageCenter'

import NoteStep from '@/components/Home/NoteStep'
import HeartRate from '@/components/Home/HeartRate'
import BloodPressure from '@/components/Home/BloodPressure'

import PhoneBook from '@/components/Home/PhoneBook'
import EmergencyContact from '@/components/Home/EmergencyContact'
import AlarmSeting from '@/components/Home/AlarmSeting'
import BlackList from '@/components/Home/BlackList'
// const ProductExit = name => () => import('@/pages/ProductExit/' + name)

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
          component: HomePage,
          children: [
            {
              path: '/homepage/notestep',
              name: 'NoteStep',
              component: NoteStep
            },
            {
              path: '/homepage/heartrate',
              name: 'HeartRate',
              component: HeartRate
            },
            {
              path: '/homepage/bloodpressure',
              name: 'BloodPressure',
              component: BloodPressure
            },
            {
              path: '/homepage/phonebook',
              name: 'PhoneBook',
              component: PhoneBook
            },
            {
              path: '/homepage/emergencycontact',
              name: 'EmergencyContact',
              component: EmergencyContact
            },
            {
              path: '/homepage/alarmseting',
              name: 'AlarmSeting',
              component: AlarmSeting
            },
            {
              path: '/homepage/blacklist',
              name: 'BlackList',
              component: BlackList
            }
          ]
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
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/restpassword',
      name: 'ResetPassword',
      component: ResetPassword
    }
  ]
})
