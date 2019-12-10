<template>
  <div class="warning_setting">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png'
             @click='back' />
      </span>
      <span class="title">报警设置</span>
      <span class="comfirm"></span>
    </div>
    <div class="content"
         v-if='show'>
      <div class="content_l">
        <div class="content_left">
          <p>SOS报警</p>
        </div>
        <div class="content_middle">
        </div>
        <div class="content_right">
          <mt-switch :disabled='permission===2'
                     @change="changeSosStatus"
                     v-model="sos"></mt-switch>
        </div>
      </div>
      <div class="content_l">
        <div class="content_left">
          <p>低电量报警</p>
        </div>
        <div class="content_middle">
        </div>
        <div class="content_right">
          <mt-switch :disabled='permission===2'
                     @change="lowbattery"
                     v-model="electricity"></mt-switch>
        </div>
      </div>
      <div class="content_c">
        <P>默认状态下，当手表电量低于10%时进行报警，您也可以通过点击
          <span class="content_t">"低电量报警"</span>进行<span class="content_t">自定义</span>设置。
        </P>
      </div>
      <div class="content_l">
        <div class="content_left">
          <p>智能围拦报警</p>
        </div>
        <div class="content_middle">
        </div>
        <div class="content_right">
          <mt-switch :disabled='permission===2'
                     @change='Intelligent'
                     v-model="fence"></mt-switch>
        </div>
      </div>
      <div class="content_l">
        <div class="content_left">
          <p>计步开关</p>
        </div>
        <div class="content_middle">
        </div>
        <div class="content_right">
          <mt-switch :disabled='permission===2'
                     @change='changeStepStatus'
                     v-model="step"></mt-switch>
        </div>
      </div>
    </div>
    <change-control v-if='isShowEditorControl'
                    :title='title.add'
                    @addControl='addControl'></change-control>
  </div>
</template>

<script>
import ChangeControl from '@/components/Home/ChangeControl'
import { Switch, Indicator, MessageBox, Toast } from 'mint-ui'
export default {
  data () {
    return {
      show: false,
      appuserId: '',
      sos: false,
      electricity: false,
      step: localStorage.getItem('device') && JSON.parse(localStorage.getItem('device')).wearerStepswitch ? true : false,
      fence: false,
      permission: null,
      isShowEditorControl: false,
      title: {
        add: '新增中控号码',
        editor: '修改中控号码'
      }
    }
  },
  components: {
    ChangeControl
  },
  created () {
    var usernames = localStorage.getItem(('user') || '{}')
    var userx = (JSON.parse(usernames) || '{}')
    this.appuserId = userx.appuserId
    this.Queryall()
    this.permission = JSON.parse(localStorage.getItem('device')) && JSON.parse(localStorage.getItem('device')).appuserPermission
    if (this.permission === 2) {
      Toast({
        message: '你没有权限设置',
        iconClass: 'icon icon-success'
      })
      return
    }
  },
  methods: {
    Queryall () {
      this.$http.get(`${config.httpBaseUrl}/alarms/get`, {
        params: {
          appuserId: this.appuserId
        }
      }).then(res => {
        if (res.code === 200) {
          this.show = true
          if (res.date.alarmswitch.alarmswitchSosType) {
            this.sos = true
          } else {
            this.sos = false
          }
          if (res.date.alarmswitch.alarmswitchElectricityType) {
            this.electricity = true
          } else {
            this.electricity = false
          }
          if (res.date.alarmswitch.alarmswitchFenceType) {
            this.fence = true
          } else {
            this.fence = false
          }
        }
      })
    },
    back () {
      this.$router.push({ name: 'MyPage' })
    },
    // SoS报警
    changeSosStatus () {
      this.changeStatus('sos', this.sos)
    },
    // 智能围栏报警
    Intelligent () {
      this.changeStatus('fence', this.fence)
    },
    // 低电量报警
    lowbattery () {
      this.changeStatus('electricity', this.electricity)
    },
    changeStatus (type, status) {
      const werarerCenternumber = JSON.parse(localStorage.getItem('device')).werarerCenternumber
      if (!werarerCenternumber) {
        MessageBox.confirm('你还没有设置中控号码,是否现在设置？').then(action => {
          this.isShowEditorControl = true
        }).catch(() => {
        })
        return
      }
      if (status) {
        status = 1
      } else {
        status = 0
      }
      this.$http.get(`${config.httpBaseUrl}/alarms/shutdown`, {
        params: {
          type,
          appuserId: this.appuserId,
          status
        }
      }).then(res => {
        if (res.code === 200) {
          Toast({
            message: '修改成功',
            iconClass: 'icon icon-success'
          })
        }
      })
    },
    addControl (bol, phone) {
      this.isShowEditorControl = false
      if (bol) {
        Indicator.open({
          text: '修改中...',
          spinnerType: 'fading-circle'
        })
        const data = {
          id: JSON.parse(localStorage.getItem('device')).wearerDeviceId,
          keyWord: 'CENTER',
          currency1: phone
        }
        this.$http.post(`${config.httpBaseUrl}/Appcommand/command`, data).then(res => {
          Indicator.close()
          if (res.code === 200) {
            // 添加至locastorage
            let device = JSON.parse(localStorage.getItem('device'))
            device.werarerCenternumber = phone
            localStorage.setItem('device', JSON.stringify(device))
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
      }
    },
    // 修改计步开关
    changeStepStatus (value) {
      let device = JSON.parse(localStorage.getItem('device'))
      let currency1
      if (value) {
        device.wearerStepswitch = 0
        currency1 = '00:00-00:00'
      } else {
        device.wearerStepswitch = 1
        currency1 = '00:00-23:59'
      }
      localStorage.setItem('device', JSON.stringify(device))
      const data = {
        keyWord: 'WALKTIME',
        id: JSON.parse(localStorage.getItem('device')).wearerDeviceId,
        currency1,
        currency2: '00:00-00:00',
        currency3: '00:00-00:00'
      }
      Indicator.open('修改中...')
      this.$http.post(`/Appcommand/command`, data).then(res => {
        Indicator.close()
        if (res.code === 200) {
          Toast({
            message: '修改成功',
            iconClass: 'icon icon-success'
          })
        } else {
          Toast({
            message: '修改失败',
            iconClass: 'icon icon-success'
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.warning_setting {
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
  }
  .content_k {
    width: 100%;
    background: rgb(239, 239, 239);
    height: 0.1rem;
  }
  .content_l {
    width: 100%;
    display: flex;
    background-color: #ffffff;
    box-shadow: 0px 15px 10px -20px #888888;
    margin-bottom: 10px;
  }
  .content_left {
    width: 30%;
    font-size: 0.2rem;
    margin: 0.25rem 0rem;
    line-height: 0.25rem;
  }
  .content_left p {
    margin-top: 0.1rem;
    margin-left: 0.2rem;
    line-height: 0.25rem;
  }
  .content_middle {
    width: 50%;
    margin: 0.25rem 0rem;
    font-size: 0.2rem;
  }
  .content_middle span {
    line-height: 0.25rem;
    font-size: 0.2rem;
  }
  .content_right {
    width: 20%;
    margin: 0.25rem 0rem;
    font-size: 0.2rem;
    text-align: right;
    float: right;
  }
  .content_t {
    color: #000;
  }
  .content_c {
    padding: 0 8px 8px;
  }
  .content_c p {
    font-size: 0.2rem;
    line-height: 0.4rem;
    color: rgba(185, 185, 185, 1);
  }
}
</style>