<template>
  <div class="device_list"
       @click='hideAction'>
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png'
             @click='back' />
      </span>
      <span class="title">设备列表</span>
      <span class="comfirm"></span>
    </div>
    <div class="content">
      <div class="content_l"
           v-for='(item, index) in devices'
           :key='index'
           @touchstart='touchstart(item.wearerDeviceId, index)'
           @touchend='touchend'>
        <div class="content_left">
          <img :src="item.wearerImage" />
          <span>{{item.wearerNickname}}</span>
        </div>
        <div class="content_right"
             @click="find(item.wearerDeviceId)">
          查找设备
        </div>
      </div>
      <div class="action"
           ref='action'>
        <p class="editor"
           @click.stop='removeDevice()'>解绑</p>
      </div>
      <div class="content_c">
        <P>若设备处于联网状态，则提示指令发送成功，设备端接收到指令后，即作出响铃提示。
          若设备处于关机或未联网状态，则无法向设备端发送相关指令。</P>
      </div>
      <!-- <div class="login" v-if='!loging'>
        <input type="text" v-model='account' placeholder="请输入账号">
        <input type="text" v-model='password' placeholder="请输入密码">
        <button @click='handleLogin'>登录</button>
      </div>
      <webrtc-view v-else :account='account' :password='password'></webrtc-view> -->
    </div>
    <message-page :title='title'
                  v-if='isShowChangePermission'
                  class="change_permission"
                  @closeAddContact='closeChangePermission'>
      <div class="permission_content">
        <p v-for="(item, index) in users"
           :key='index'
           class="per_item">
          <span>{{item.appuserNumber}}</span>
          <input name='sex'
                 v-model='selectPer'
                 :value="item.appuserId"
                 type="radio">
        </p>
      </div>
    </message-page>
  </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
import MessagePage from '@/components/MessageBox'
// import WebrtcView from '@/components/webrtc'
export default {
  data () {
    return {
      title: '权限转让',
      devices: [],
      appuserId: '',
      selectDevice: {
        index: '',
        wearerDeviceId: ''
      },
      users: [],
      isShowChangePermission: false,
      selectPer: '',
      account: '',
      password: '',
      loging: false
    }
  },
  created () {
    var usernames = localStorage.getItem(('user') || '{}')
    var userx = (JSON.parse(usernames) || '{}')
    this.appuserId = userx.appuserId
    this.querylist()
  },
  methods: {
    querylist () {
      this.$http
        .get(`${config.httpBaseUrl}/wearer/getAll`, {
          params: {
            appuserId: this.appuserId,
          }
        })
        .then(res => {
          if (res.code === 200) {
            this.devices = res.date.wearers
          }
        })
    },
    back () {
      this.$router.push({ name: 'MyPage' })
    },
    // 长按事件
    touchstart (item, index) {
      this.time = setTimeout(() => {
        // 展示操作窗口
        this.showAction(item, index)
      }, 500)
    },
    touchend (e) {
      clearTimeout(this.time)
    },
    find (id) {
      const data = {
        id,
        keyWord: 'FIND'
      }
      this.$http.post(`${config.httpBaseUrl}/Appcommand/command`, data).then(res => {
        if (res.code === 200) {
          this.controlPhone = phone
          Toast({
            message: '操作成功',
            iconClass: 'icon icon-success'
          })
        } else {
          Toast({
            message: '设备不再线',
            iconClass: 'icon icon-success'
          })
        }
      })
      MessageBox({
        title: '确认查找该设备吗？',
        message: '点击"确认"后，即向该该设备发送指令。',
        showCancelButton: true
      })
    },
    // 修改联系人
    showEditorContact () {
      this.isShowEditorPhoneBook = true
    },
    // 解绑设备
    removeDevice () {
      let permission = JSON.parse(localStorage.getItem('device')).appuserPermission
      if (permission !== 1) {
        this.deleDevice()
      } else {
        // 转让权限
        this.$http.get(`${config.httpBaseUrl}/appuser/getwerarId`, {
          params: {
            wearerDeviceId: this.selectDevice.wearerDeviceId
          }
        }).then(res => {
          if (res.code === 200) {
            // 如果第二级权限没有人员直接删除
            if (!res.date.appusers.length) {
              this.deleDevice()
            } else {
              this.isShowChangePermission = true
              this.users = res.date.appusers
            }
          }
        })
      }

      // this.devices.splice(this.selectPerson.index, 1)
      // this.hideAction()
      // Toast({
      //   message: '操作成功',
      //   iconClass: 'icon icon-success'
      // })
    },
    // 转让权限
    changePermission () {
      this.$http.get(`${config.httpBaseUrl}/appuser/updatePermission`, {
        params: {
          wearerDeviceId: this.selectDevice.wearerDeviceId,
          appuserId: this.selectPer, // 需转让的接受id
          appId: this.appuserId // 转让人的id
        }
      }).then(res => {
        Toast({
          message: '操作成功',
          iconClass: 'icon icon-success'
        })
      })
    },
    // 删除手表
    deleDevice () {
      this.$http.get(`${config.httpBaseUrl}/appuser/delete`, {
        params: {
          wearerDeviceId: this.selectDevice.wearerDeviceId,
          appuserId: this.appuserId
        }
      }).then(res => {
        Toast({
          message: '解绑成功',
          iconClass: 'icon icon-success'
        })
        this.hideAction()
        this.devices.splice(this.selectDevice.index, 1)
      })
    },
    // 关闭权限设置
    closeChangePermission (bol) {
      if (bol) {
        this.changePermission()
      }
      this.isShowChangePermission = false
      this.selectPer = ''
    },
    showAction (wearerDeviceId, index) {
      this.selectDevice.wearerDeviceId = wearerDeviceId
      this.selectDevice.index = index
      this.$refs.action.style.display = 'block'
      this.$refs.action.style.top = .4 + (index * 1.4) + 'rem'
    },
    // 隐藏操作栏
    hideAction () {
      if (!this.$refs.action) { return }
      this.$refs.action.style.display = 'none'
    },
    // 登录网易云信
    // handleLogin () {
    //   if (!this.account || !this.password) {
    //     return Toast('登录信息不能为空')
    //   }
    //   this.loging = true
    // }
  },
  components: {
    MessagePage
    // WebrtcView
  }
}
</script>

<style lang='scss' scoped>
.device_list {
  width: 100vw;
  position: fixed;
  top: 0.48rem;
  bottom: 0;
  background: rgb(239, 239, 239);
  .home_header {
    background: #15bf86;
    color: white;
    box-sizing: border-box;
    height: 0.96rem;
    padding: 0 0.26rem;
    font-size: 0.36rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .back {
      width: 60px;
      img {
        width: 0.18rem;
        height: 0.25rem;
      }
    }
    .title {
      text-align: center;
      flex: 1;
    }
    .comfirm {
      width: 60px;
      text-align: right;
      font-size: 0.28rem;
    }
  }
  .content {
    width: 100%;
    overflow: auto;
    position: fixed;
    top: 1.44rem;
    bottom: 0;
    width: 100vw;
    .action {
      width: 1.6rem;
      height: 0.65rem;
      font-size: 0.26rem;
      text-align: center;
      position: absolute;
      background: white;
      // top: 90px;
      display: none;
      right: 70px;
      p {
        border-radius: 5px;
        line-height: 0.65rem;
        &.editor {
          background: #d4f4ea;
        }
      }
    }
  }
  .content_l {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0px 15px 10px -20px #888888;
    margin-bottom: 10px;
    height: 1.2rem;
    .content_left {
      font-size: 0.2rem;
      display: flex;
      align-items: center;
      margin-left: 10px;
      img {
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        background-color: #eee;
      }
      span {
        display: inline-block;
        margin-left: 5px;
      }
    }
    .content_right {
      width: 1.42rem;
      height: 0.44rem;
      line-height: 0.44rem;
      background-color: #15bf86;
      font-size: 0.26rem;
      color: white;
      text-align: center;
      border-radius: 0.25rem 0rem 0rem 0.25rem;
      span {
        line-height: 0.5rem;
        color: #ffffff;
      }
    }
  }
  .content_c {
    padding: 5px 10px;
    p {
      font-size: 0.2rem;
      color: rgba(185, 185, 185, 1);
      line-height: 0.4rem;
    }
  }
  .login {
    width: 70vw;
    margin: 0.3rem auto;
    font-size: 0.28rem;
    input {
      width: 100%;
      margin: 0.1rem 0;
      padding: 0.1rem 0.2rem;
      border-radius: 5px;
    }
  }
  .change_permission {
    .permission_content {
      width: 200px;
      padding: 10px 0 0;
      .per_item {
        display: flex;
        align-items: center;
        padding: 5px 0 0;
        justify-content: space-between;
        // span {
        //   margin-right: 10px;
        // }
        input {
        }
      }
    }
  }
}
</style>
