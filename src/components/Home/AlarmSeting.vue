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
              <span>{{item.alarmclockRemarks|| '无'}}:</span>
              <template v-if='item.date.length>1'>
                <span v-if='item.date[0]=="1"' class="time">周日</span>
                <span v-if='item.date[1]=="1"' class="time">周一</span>
                <span v-if='item.date[2]=="1"' class="time">周二</span>
                <span v-if='item.date[3]=="1"' class="time">周三</span>
                <span v-if='item.date[4]=="1"' class="time">周四</span>
                <span v-if='item.date[5]=="1"' class="time">周五</span>
                <span v-if='item.date[6]=="1"' class="time">周六</span>
              </template>
              <span v-else class="title">{{item.date[0]}}</span>
            </p>
          </div>
          <mt-switch @change='changeStatus(item, index)' :value="item.alarmclockStatus"></mt-switch>
        </li>
      </ul>
      <!-- <div class='no_contact' v-else>还没有添加闹钟</div> -->
      <div class="action" ref='action'>
        <p class="editor" @click.stop='editorAlarm'>编辑</p>
        <p @click.stop='delAlarm'>删除</p>
      </div>
    </div>
    <message-box
      v-if='isShowAddAlarm'
      :title='title.add'
      @closeAddContact='addAlarm'
      class="add_black_list">
      <div class="add_black_list_wrapper">
        <p class="time"><label for="">时间</label><input v-model='alarmTime' @focus="selectTime" type="text"></p>
        <p class="title"><label for="">名称</label><input placeholder="" v-model='alarmName' class="name"/></p>
        <div class="alarm">
          <label for="">重复</label>
          <div>
            <span
            v-for='(item, index) in date'
            :key='index'
            :class='{active:item.active}'
            @click='item.active=!item.active'>{{item.label}}</span>
          </div>
        </div>
      </div>
    </message-box>
    <message-box
      v-if='isShowEditorAlarm'
      :title='title.editor'
      @closeAddContact='hideeditorAlarm'
      class="add_black_list">
      <div class="add_black_list_wrapper">
        <p class="time"><label for="">时间</label><input v-model='selectAlarm.alarm.alarmlockDate' @focus="selectTime" type="text"></p>
        <p class="title"><label for="">名称</label><input placeholder="" v-model='selectAlarm.alarm.alarmclockRemarks' class="name"/></p>
        <div class="alarm">
          <label for="">重复</label>
          <div>
            <span
            v-for='(item, index) in date'
            :key='index'
            :class='{active:item.active}'
            @click='item.active=!item.active'>{{item.label}}</span>
          </div>
        </div>
      </div>
    </message-box>
    <mt-datetime-picker
      ref='picker'
      v-model="pickerVisible"
      type="time"
      @confirm="handleConfirm">
    </mt-datetime-picker>
    <!-- <add-alarm
      v-if='isShowAddAlarm'></add-alarm> -->
  </div>
</template>

<script>
import AddAlarm from '@/components/Home/AddAlarm'
import MessageBox from '@/components/MessageBox'
import Slider from '@/components/scroll'
import { Switch, DatetimePicker, Toast } from 'mint-ui'
export default {
  data () {
    return {
      time: 0,
      isShowAddAlarm: false,
      isShowEditorAlarm: false,
      title: {
        add: '新增闹钟',
        editor: '修改闹钟'
      },
      pickerVisible: '',
      alarmTime: '',
      alarmName: '',
      alarms: [
      ],
      date: [
        {
          label: '周天',
          active: false
        },
        {
          label: '周一',
          active: false
        },
        {
          label: '周二',
          active: false
        },
        {
          label: '周三',
          active: false
        },
        {
          label: '周四',
          active: false
        },
        {
          label: '周五',
          active: false
        },
        {
          label: '周六',
          active: false
        }
      ],
      selectAlarm: {
        index: '',
        alarm: {}
      }
    }
  },
  components: {
    AddAlarm,
    Switch,
    MessageBox,
    DatetimePicker,
    Slider
  },
  created () {
    const data = {
      wearerDeviceId: JSON.parse(localStorage.getItem('device')).wearerDeviceId
    }
    this.$http.get(`${config.httpBaseUrl}/alar/getAll`, {
      params: data
    }).then(res => {
      if (res.code === 200) {
        res.date.alarmclock.forEach(item => {
          if (item.alarmclockStatus === 0) {
            item.alarmclockStatus = false
          } else {
            item.alarmclockStatus = true
          }
          if (item.alarmclockWeek == 1) {
            item.date = ['不重复']
          } else if (item.alarmclockWeek == 2) {
            item.date = ['每天']
          } else {
            item.date = item.alarmclockWeek.split('')
          }
          this.alarms.push(item)
        })
      }
    })
  },
  methods: {
    closeAlarmSeting () {
      this.$router.go(-1)
    },
    // 新增闹钟
    handleAddAlarm () {
      this.isShowAddAlarm = true
    },
    addAlarm (bol) {
      this.isShowAddAlarm = false
      if (bol) {
        if (!(this.alarmTime && this.alarmName)) {
          return Toast({
            message: '闹钟信息不能为空',
            iconClass: 'icon icon-error'
          })
        }
        let alarmclockWeek = ''
        let num = 0
        this.date.forEach(item => {
          if (item.active) {
            alarmclockWeek += '1'
            num += 1
          } else {
            alarmclockWeek += '0'
          }
        })
        if (!num) {
          alarmclockWeek = '1'
        } else if (num === 7) {
          alarmclockWeek = '2'
        }
        const data = {
          alarmlockDate: this.alarmTime,
          alarmclockWeek: alarmclockWeek,
          alarmclockWearerId: JSON.parse(localStorage.getItem('device')).wearerDeviceId,
          alarmclockRemarks: this.alarmName,
          alarmclockStatus: 1,
          key: 'REMIND'
        }
        this.$http.post(`${config.httpBaseUrl}/alar/insert`, data).then(res => {
          if (res.code === 200) {
            this.alarms.push(data)
            Toast({
              message: '操作成功',
              iconClass: 'icon icon-success'
            })
          }
        })
      }
    },
    // 时间选择期确认
    handleConfirm (value) {
      this.alarmTime = value
    },
    selectTime () {
      document.activeElement.blur()
      this.$refs.picker.open()
    },
    // 长按事件
    touchstart (e, item, index) {
      console.log(e)
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
    // 修改闹钟
    editorAlarm () {
      this.isShowEditorAlarm = true
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
    hideeditorAlarm (bol) {
      this.isShowEditorAlarm = false
      const info = this.selectAlarm.alarm
      // if (bol) {
      //   if (!(info.alarmlockDate && info.alarmclockRemarks)) {
      //     return Toast({
      //       message: '闹钟信息不能为空',
      //       iconClass: 'icon icon-error'
      //     })
      //   }
      //   let alarmclockWeek = ''
      //   let num = 0
      //   this.date.forEach(item => {
      //     if (item.active) {
      //       alarmclockWeek += '1'
      //       num += 1
      //     } else {
      //       alarmclockWeek += '0'
      //     }
      //   })
      //   if (!num) {
      //     alarmclockWeek = '1'
      //   } else if (num === 7) {
      //     alarmclockWeek = '2'
      //   }
      //   const data = {
      //     alarmlockDate: info.alarmlockDate,
      //     alarmclockWeek: alarmclockWeek,
      //     alarmclockWearerId: 9611812844,
      //     alarmclockRemarks: info.alarmclockRemarks,
      //     alarmclockStatus: info.alarmclockStatus,
      //     alarmclockId: info.alarmclockId
      //     key: 'REMIND'
      //   }
      //   this.$http.post(`${config.httpBaseUrl}/alar/insert`, data).then(res => {
      //     if (res.code === 200) {
      //       this.alarms.push(data)
      //     }
      //   })
      //   Toast({
      //     message: '操作成功',
      //     iconClass: 'icon icon-success'
      //   })
      // }
    },
    // 删除闹钟
    delAlarm () {
      this.alarms.splice(this.selectAlarm.index, 1)
      Toast({
        message: '操作成功',
        iconClass: 'icon icon-success'
      })
      this.hideAction()
    },
    // 改变闹钟状态
    changeStatus (item, index) {
      console.log(item, this.alarms[index])
    }
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
          .title {
          }
          .time {}
        }
      }
    }
    .action {
      width: 1.6rem;
      height: 1.3rem;
      box-shadow: 0px 1px 4px 0px rgba(109,109,109,0.5);
      font-size: .26rem;
      text-align: center;
      position: absolute;
      display: none;
      right: 100px;
      p {
        line-height: .65rem;
        &.editor {
          background: #D4F4EA;
        }
      }
    }
  }
  .add_black_list {
    .add_black_list_wrapper {
      width: 5.5rem;
      margin-top: 10px;
      align-items: center;
      justify-content: center;
      color: #B9B9B9;
      input {
        height: .5rem;
        text-align: right;
      }
      .title {
        border-bottom: 1px solid #DEDEDE;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0 5px;
      }
      .time {
        align-items: center;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #DEDEDE;
        padding-bottom: 5px;
      }
      .alarm {
        margin: 10px 0 0;
        border-bottom: 1px solid #DEDEDE;
        padding-bottom: 5px;
        align-items: center;
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
          width: .6rem;
          height: .6rem;
          text-align: center;
          line-height: .6rem;
          background: #C7C7C7;
          color: white;
          border-radius: 50%;
          margin: 0 2px;
          &.active {
            background: #15BF86;
          }
        }
      }
    }
  }
}
</style>
