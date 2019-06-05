import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Regisiter')
const ResetPassword = () => import('@/views/ResetPassword')
const HomePage = () => import('@/views/HomePage/HomePage')
const MyPage = () => import('@/views/My/My')
const LocationPage = () => import('@/views/Location/Location')
const AccountManage = () => import('@/views/My/AccountManage')
const DeviceList = () => import('@/views/My/DeviceList')
const FindDevice = () => import('@/views/My/FindDevice')
const WarningSetting = () => import('@/views/My/WarningSetting')
const MessageCenter = () => import('@/views/My/MessageCenter')

const ControlPhone = () => import('@/components/Home/ControlPhone')
const NoteStep = () => import('@/components/Home/NoteStep')
const HeartRate = () => import('@/components/Home/HeartRate')
const BloodPressure = () => import('@/components/Home/BloodPressure')

const PhoneBook = () => import('@/components/Home/PhoneBook')
const EmergencyContact = () => import('@/components/Home/EmergencyContact')
const AlarmSeting = () => import('@/components/Home/AlarmSeting')
const BlackList = () => import('@/components/Home/BlackList')

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
            },
            {
              path: '/homepage/controlphone',
              name: 'ControlPhone',
              component: ControlPhone
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
