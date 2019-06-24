<template>
  <div class="alarm_seting" @click='hideAction'>
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='closeAlarmSeting'/>
      <span class="title">闹钟设置</span>
      <img src='@/assets/icon/home/新增IC.png' class="add" @click='handleAddAlarm'/>
    </div>
    <div class="content">
      <ul v-if='alarms.length'>
        <li
          class="alarm_item"
          v-for='(item, index) in alarms'
          :key='index'
          @touchstart='touchstart($event, item, index)'
          @touchend='touchend'
          @touchmove='touchmove'>
          <div class="info">
            <p class="head">{{item.alarmlockDate}}</p>
            <p class="desc">
              <span>{{item.alarmclockRemarks|| '闹钟'}}:</span>
              <template v-if='item.date.length===7'>
                <span v-if='item.date[0]=="1"' class="time">周日</span>
                <span v-if='item.date[1]=="1"' class="time">周一</span>
                <span v-if='item.date[2]=="1"' class="time">周二</span>
                <span v-if='item.date[3]=="1"' class="time">周三</span>
                <span v-if='item.date[4]=="1"' class="time">周四</span>
                <span v-if='item.date[5]=="1"' class="time">周五</span>
                <span v-if='item.date[6]=="1"' class="time">周六</span>
              </template>
              <template v-if='item.alarmclockWeek==="2"'>
                <span class="time">每天</span>
              </template>
              <template v-if='item.alarmclockWeek==="1"'>
                <span class="time">不重复</span>
              </template>
              <!-- <span v-else class="title">{{item.date[0]}}</span> -->
            </p>
          </div>
          <mt-switch @change='changeStatus(item, index)' :value="!item.alarmclockStatus"></mt-switch>
        </li>
      </ul>
      <!-- <div class='no_contact' v-else>还没有添加闹钟</div> -->
      <div class="action" ref='action'>
        <p class="editor" @click.stop='handleEditorAlarm'>修改</p>
        <!-- <p @click.stop='delAlarm'>删除</p> -->
      </div>
    </div>
    <add-alarm
      v-if='isShowAddAlarm'
      :title='title.add'
      @closeAddAlarm='addAlarm'></add-alarm>
    <add-alarm
      v-if='isShowEditorAlarm'
      :title='title.editor'
      :editorAlarm='selectAlarm'
      @closeEditorAlarm='editorAlarm'></add-alarm>
  </div>
</template>

<script>
import AddAlarm from '@/components/Home/AddAlarm'
// import Slider from '@/components/scroll'
import { Toast, Indicator } from 'mint-ui'
export default {
  data () {
    return {
      time: 0,
      isShowAddAlarm: false,
      isShowEditorAlarm: false,
      pickerVisible: '',
      alarms: [],
      oldAlarms: [],
      title: {
        add: '新增闹钟',
        editor: '修改闹钟'
      },
      selectAlarm: {
        index: '',
        alarm: {}
      }
    }
  },
  components: {
    AddAlarm
    // Slider
  },
  created () {
    // this.transAlarm('08:10-1-3-0111110')
    // this.transAlarm('08:10-1-2')
    this.getAlarms()
  },
  methods: {
    // 获取闹钟
    getAlarms () {
      const data = {
        wearerDeviceId: JSON.parse(localStorage.getItem('device')).wearerDeviceId
      }
      this.$http.get(`${config.httpBaseUrl}/alar/getAll`, {
        params: data
      }).then(res => {
        if (res.code === 200) {
          this.alarms = []
          res.date.alarmclock.forEach(item => {
            if (item.alarmclockStatus === '1') {
              item.alarmclockStatus = true
            } else {
              item.alarmclockStatus = false
            }
            if (item.alarmclockWeek == 1) {
              item.date = ["0", "0", "0", "0", "0", "0", "0"]
            } else if (item.alarmclockWeek == 2) {
              item.date = ["1", "1", "1", "1", "1", "1", "1"]
            } else {
              item.date = item.alarmclockWeek.split('')
            }
            this.alarms.push(item)
          })
          console.log(this.alarms)
        }
      })
    },
    closeAlarmSeting () {
      this.$router.go(-1)
    },
    // 新增闹钟
    handleAddAlarm () {
      this.selectAlarm = {
        index: '',
        alarm: {}
      }
      if (this.alarms.length >= 3) {
        return Toast({
          message: '闹钟个数最多三个\n请直接修改现有闹钟',
          iconClass: 'icon icon-success'
        })
      }
      this.isShowAddAlarm = true
    },
    addAlarm (bol, alarm) {
      this.isShowAddAlarm = false
      if (!bol) return
      let books = {
        currency1: '',
        currency2: '',
        currency3: '',
      }
      switch (this.alarms.length) {
        case 0:
          books.currency1 = alarm
          break
        case 1:
          books.currency2 = alarm
          break
        case 2:
          books.currency3 = alarm
          break
      }
      const data = {
        keyWord: 'REMIND',
        id: JSON.parse(localStorage.getItem('device')).wearerDeviceId,
        ...books,
        currency4: ''
      }
      Indicator.open('新增中...')
      this.$http.post(`/Appcommand/command`, data).then(res => {
        Indicator.close()
        if (res.code === 200) {
          Toast({
            message: '新增成功',
            iconClass: 'icon icon-success'
          })
          this.getAlarms()
        } else {
          Toast({
            message: '新增失败',
            iconClass: 'icon icon-success'
          })
        }
      })
    },
    // 删除闹钟
    delAlarm () {
      // this.alarms.splice(this.selectAlarm.index, 1)
      // Toast({
      //   message: '操作成功',
      //   iconClass: 'icon icon-success'
      // })
      // this.hideAction()
    },
    // 改变闹钟状态
    changeStatus (item, index) {
      let books = {
        currency1: '',
        currency2: '',
        currency3: '',
      }
      switch (index) {
        case 0:
          books.currency1 = item.alarmlockDate + '-0'
          break
        case 1:
          books.currency2 = item.alarmlockDate + '-0'
          break
        case 2:
          books.currency3 = item.alarmlockDate + '-0'
      }
      const data = {
        keyWord: 'REMIND',
        id: JSON.parse(localStorage.getItem('device')).wearerDeviceId,
        ...books,
        currency4: '1'
      }
      Indicator.open('修改中...')
      let timer = setTimeout(() => {
        Toast({
          message: '服务器出错',
          iconClass: 'icon icon-success'
        })
      }, 4000)
      this.$http.post(`${config.httpBaseUrl}/Appcommand/command`, data).then(res => {
        console.log(res)
        clearTimeout(timer)
        Indicator.close()
        if (res.code === 200) {
          Toast({
            message: '修改成功',
            iconClass: 'icon icon-success'
          })
          this.alarms.push(data)
        } else {
          Toast({
            message: '修改失败',
            iconClass: 'icon icon-success'
          })
        }
      })
    },
    // 长按事件
    touchstart (e, item, index) {
      this.time = setTimeout(() => {
        // 展示操作窗口
        let top = e.touches[0].clientY
        this.showAction(item, index, top)
      }, 500)
    },
    touchend (e) {
      clearTimeout(this.time)
    },
    touchmove () {
      clearTimeout(this.time)
    },
    // 展示操作窗口
    showAction(item, index, top) {
      this.selectAlarm.alarm = Object.assign({}, item)
      this.selectAlarm.index = index
      this.$refs.action.style.display = 'block'
      this.$refs.action.style.top = 15 + 90 * index + 'px'
    },
    // 隐藏操作栏
    hideAction () {
      if (!this.$refs.action) { return }
      this.$refs.action.style.display = 'none'
    },
    // 转换闹钟
    transAlarm (alarmInfo) {
      let alarm = {}
      const alarmArr = alarmInfo.split('-')
      alarm.time = alarmArr[0]
      switch (alarmArr[2]) {
        case '1':
          alarm.date = '不重复'
          break
        case '2':
          alarm.date = '每天'
          break
        case '3':
          alarm.date = alarmArr[3].split('')
      }
      this.alarms.push(alarm)
    },
    // 修改闹钟
    handleEditorAlarm () {
      this.isShowEditorAlarm = true
      this.hideAction()
      return
      if (this.selectAlarm.alarm.date[0] === '不重复') {
        this.date.forEach(item => {
          item.active = false
        })
      } else {
        this.selectAlarm.alarm.date.forEach((item, index) => {
          if (item === '0') {
            this.date[index].active = false
          } else {
            this.date[index].active = true
          }
        })
      }
    },
    editorAlarm (bol, alarm) {
      this.isShowEditorAlarm = false
      if (!bol) return
      let books = {
        currency1: '',
        currency2: '',
        currency3: '',
      }
      switch (this.selectAlarm.index) {
        case 0:
          books.currency1 = alarm
          break
        case 1:
          books.currency2 = alarm
          break
        case 2:
          books.currency3 = alarm
          break
      }
      const data = {
        keyWord: 'REMIND',
        id: JSON.parse(localStorage.getItem('device')).wearerDeviceId,
        ...books,
        currency4: ''
      }
      Indicator.open('修改中...')
      this.$http.post(`/Appcommand/command`, data).then(res => {
        Indicator.close()
        if (res.code === 200) {
          Toast({
            message: '修改成功',
            iconClass: 'icon icon-success'
          })
          this.getAlarms()
        } else {
          Toast({
            message: '修改失败',
            iconClass: 'icon icon-success'
          })
        }
      })
    }
    // hideeditorAlarm (bol) {
    //   this.isShowEditorAlarm = false
    //   const info = this.selectAlarm.alarm
    //   if (bol) {
    //     if (!(info.alarmlockDate && info.alarmclockRemarks)) {
    //       return Toast({
    //         message: '闹钟信息不能为空',
    //         iconClass: 'icon icon-error'
    //       })
    //     }
    //     let alarmclockWeek = ''
    //     let num = 0
    //     this.date.forEach(item => {
    //       if (item.active) {
    //         alarmclockWeek += '1'
    //         num += 1
    //       } else {
    //         alarmclockWeek += '0'
    //       }
    //     })
    //     if (!num) {
    //       alarmclockWeek = '1'
    //     } else if (num === 7) {
    //       alarmclockWeek = '2'
    //     }
    //     const data = {
    //       alarmlockDate: info.alarmlockDate,
    //       alarmclockWeek: alarmclockWeek,
    //       alarmclockWearerId: 9611812844,
    //       alarmclockRemarks: info.alarmclockRemarks,
    //       alarmclockStatus: info.alarmclockStatus,
    //       alarmclockId: info.alarmclockId
    //       key: 'REMIND'
    //     }
    //     this.$http.post(`${config.httpBaseUrl}/alar/insert`, data).then(res => {
    //       if (res.code === 200) {
    //         this.alarms.push(data)
    //       }
    //     })
    //     Toast({
    //       message: '操作成功',
    //       iconClass: 'icon icon-success'
    //     })
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.alarm_seting {
  position: fixed;
  top: .48rem;
  bottom: 0;
  background: #f0f2f5;
  z-index: 3;
  width: 100vw;
  .home_header {
    background: #15BF86;
    color: white;
    box-sizing: border-box;
    height: 0.96rem;
    padding: 0 0.26rem;
    font-size: .36rem;
    display: flex;
    align-items: center;
    .back {
      width: .18rem;
      height: .25rem;
    }
    .add {
      width: .24rem;
      height: .24rem;
    }
    .title {
      text-align: center;
      width: 100%;
    }
  }
  .content {
    overflow: auto;
    position: fixed;
    top: 1.44rem;
    bottom: 0;
    width: 100vw;
    .no_contact {
      margin-top: 50px;
      font-size: .4rem;
      text-align: center;
      color: red;
    }
    .alarm_item {
      display: flex;
      padding: 0 .5rem;
      height: 1.6rem;
      align-items: center;
      justify-content: space-between;
      background: #FFFFFF;
      margin-bottom: 10px;
      .info {
        display: flex;
        flex-direction: column;
        .head {
          font-size: .46rem;
          color: #15BF86;
        }
        .desc {
          margin-top: 10px;
          font-size: .24rem;
          color: #B9B9B9;
        }
      }
    }
    .action {
      width: 1.6rem;
      height: .65rem;
      box-shadow: 0px 1px 4px 0px rgba(109,109,109,0.5);
      font-size: .26rem;
      text-align: center;
      position: absolute;
      display: none;
      right: 100px;
      background: white;
      p {
        line-height: .65rem;
        &.editor {
          background: #D4F4EA;
        }
      }
    }
  }
}
</style>
