<template>
  <div>
    <message-box
      :title='title'
      @closeAddContact='addAlarm'
      class="add_black_list">
      <div class="add_black_list_wrapper">
        <p class="time"><label for="">时间</label><input v-model='alarmTime' @focus="selectTime" type="text"></p>
        <!-- <p class="title"><label for="">名称</label><input placeholder="" v-model='alarmName' class="name"/></p> -->
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
  </div>
</template>

<script>
import MessageBox from '@/components/MessageBox'
import { DatetimePicker, Toast } from 'mint-ui'
export default {
  props: ['title', 'editorAlarm'],
  data () {
    return {
      alarmTime: '',
      alarmName: '',
      pickerVisible: '',
      date: [
        {
          label: '周日',
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
    }
  },
  created () {
    if (this.editorAlarm) {
      this.alarmTime = this.editorAlarm.alarm.alarmlockDate
      this.editorAlarm.alarm.date.forEach((item, index) => {
        if (item === '1') {
          this.date[index] = true
        }
      })
    }
  },
  components: {
    MessageBox,
    DatetimePicker
  },
  methods: {
    addAlarm (bol) {
      if (!bol) {
        if (!this.editorAlarm) {
          this.$emit('closeAddAlarm', bol)
        } else {
          this.$emit('closeEditorAlarm', bol)
        }
        return
      }
      if (!this.alarmTime) {
        return Toast({
          message: '闹钟信息不能为空',
          iconClass: 'icon icon-error'
        })
      }
      let alarmInfo = []
      alarmInfo.push(this.alarmTime)
      alarmInfo.push('1')
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
        // 不重复
        alarmInfo.push('1')
      } else if (num === 7) {
        // 每天重复
        alarmInfo.push('2')
        // alarmclockWeek = '2'
      } else {
        // 选定日期
        alarmInfo.push('3')
        alarmInfo.push(alarmclockWeek)
        // alarmInfo = this.alarmTime + '3'
      }
      alarmInfo = alarmInfo.join('-')
      if (!this.editorAlarm) {
        this.$emit('closeAddAlarm', bol, alarmInfo)
      } else {
        this.$emit('closeEditorAlarm', bol, alarmInfo)
      }
    },
    selectTime () {
      document.activeElement.blur()
      this.$refs.picker.open()
    },
    // 时间选择期确认
    handleConfirm (value) {
      this.alarmTime = value
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
