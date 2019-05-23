<template>
  <div class="alarm_seting" @click='hideAction'>
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='closeAlarmSeting'/>
      <span class="title">闹钟设置</span>
      <img src='@/assets/icon/home/新增IC.png' class="add" @click='handleAddAlarm'/>
    </div>
    <div class="content">
      <ul>
        <li
          class="alarm_item"
          v-for='(item, index) in alarms'
          :key='index'
          @touchstart='touchstart(item, index)'
          @touchend='touchend'>
          <div class="info">
            <p class="head">{{item.alarmTime}}</p>
            <p class="desc">
              <span class="title">{{item.alarmName}}:</span>
              <span
                class="time"
                v-for='(date, i) in item.date'
                :key='i'>{{date.name}}</span>
            </p>
          </div>
          <mt-switch size='mini' v-model="item.open"></mt-switch>
        </li>
      </ul>
      <div class="action" ref='action'>
        <p class="editor" @click.stop='editorAlarm'>编辑</p>
        <p @click.stop='delAlarm'>删除</p>
      </div>
    </div>
    <message-box
      v-if='isShowAddAlarm'
      :title='title'
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
import { Switch, DatetimePicker, Toast } from 'mint-ui'
export default {
  data () {
    return {
      time: 0,
      isShowAddAlarm: false,
      title: '添加闹钟',
      pickerVisible: '',
      alarmTime: '',
      alarmName: '',
      alarms: [
        {
          alarmName: '起床',
          alarmTime: '07:50',
          date: [
            {
              label: '周一',
              name: 'one',
              active: true
            },
            {
              label: '周二',
              name: 'two',
              active: true
            }
          ],
          id: 1,
          open: false
        },
        {
          alarmName: '起床',
          alarmTime: '07:50',
          date: [
            {
              label: '周一',
              name: 'one',
              active: true
            },
            {
              label: '周二',
              name: 'two',
              active: true
            }
          ],
          id: 1,
          open: true
        }
      ],
      date: [
        {
          id: 1,
          label: '周一',
          active: false
        },
        {
          id: 2,
          label: '周二',
          active: false
        },
        {
          id: 3,
          label: '周三',
          active: false
        },
        {
          id: 4,
          label: '周四',
          active: false
        },
        {
          id: 5,
          label: '周五',
          active: false
        },
        {
          id: 6,
          label: '周六',
          active: false
        },
        {
          id: 7,
          label: '周天',
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
    DatetimePicker
  },
  methods: {
    closeAlarmSeting () {
      this.$emit('closeAlarmSeting')
    },
    // 新增闹钟
    handleAddAlarm () {
      this.isShowAddAlarm = true
    },
    addAlarm (bol) {
      this.isShowAddAlarm = false
      if (bol) {
        const repeatDate = this.date.filter(item => {
          return item.active
        })
        if (!(repeatDate.length && this.alarmTime && this.alarmName)) {
          return Toast({
            message: '闹钟信息不能为空',
            iconClass: 'icon icon-error'
          })
        }
        this.alarms.push({
          alarmTime: this.alarmTime,
          alarmName: this.alarmName,
          date: repeatDate
        })
        console.log(this.alarms)
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
    touchstart (item, index) {
      this.time = setTimeout(() => {
        // 展示操作窗口
        this.showAction(item, index)
      }, 500)
    },
    touchend (e) {
      clearTimeout(this.time)
    },
    // 展示操作窗口
    showAction(item, index) {
      this.selectAlarm.alarm = item
      this.selectAlarm.index = index
      this.$refs.action.style.display = 'block'
      this.$refs.action.style.top = 90 + (index * 90) + 'px'
    },
    // 隐藏操作栏
    hideAction () {
      if (!this.$refs.action) { return }
      this.$refs.action.style.display = 'none'
    },
    // 修改闹钟
    editorAlarm () {
      this.alarmTime = this.selectAlarm.alarm.alarmTime
      this.alarmName = this.selectAlarm.alarm.alarmName
    },
    // 删除闹钟
    delAlarm () {
      this.alarms.splice(this.selectAlarm.index, 1)
      Toast({
        message: '操作成功',
        iconClass: 'icon icon-success'
      })
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
      position: fixed;
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
