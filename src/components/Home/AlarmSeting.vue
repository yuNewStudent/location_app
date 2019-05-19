<template>
  <div class="alarm_seting">
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='closeAlarmSeting'/>
      <span class="title">闹钟设置</span>
      <img src='@/assets/icon/home/新增IC.png' class="add" @click='handleAddAlarm'/>
    </div>
    <div class="content">
      <ul>
        <li class="alarm_item">
          <div class="info">
            <p class="head">05:50</p>
            <p class="desc">
              <span class="title">起床:</span>
              <span class="time">周一</span>
              <span class="time">周二</span>
            </p>
          </div>
          <mt-switch size='mini' v-model="value"></mt-switch>
        </li>
        <li class="alarm_item">
          <div class="info">
            <p class="head">05:50</p>
            <p class="desc">
              <span class="title">起床:</span>
              <span class="time">周一</span>
              <span class="time">周二</span>
            </p>
          </div>
          <mt-switch size='mini' v-model="value"></mt-switch>
        </li>
        <li class="alarm_item">
          <div class="info">
            <p class="head">05:50</p>
            <p class="desc">
              <span class="title">起床:</span>
              <span class="time">周一</span>
              <span class="time">周二</span>
            </p>
          </div>
          <mt-switch size='mini' v-model="value"></mt-switch>
        </li>
      </ul>
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
            :key='index'>{{item.label}}</span>
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
import { Switch, DatetimePicker } from 'mint-ui'
export default {
  data () {
    return {
      isShowAddAlarm: false,
      value: '',
      title: '添加闹钟',
      pickerVisible: '',
      alarmTime: '',
      alarmName: '',
      date: [
        {
          id: 1,
          label: '周一'
        },
        {
          id: 2,
          label: '周二'
        },
        {
          id: 3,
          label: '周三'
        },
        {
          id: 4,
          label: '周四'
        },
        {
          id: 5,
          label: '周五'
        },
        {
          id: 6,
          label: '周六'
        },
        {
          id: 7,
          label: '周天'
        }
      ]
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
    // 新增电话本
    handleAddAlarm () {
      this.isShowAddAlarm = true
    },
    addAlarm () {
      this.isShowAddAlarm = false
    },
    handleConfirm (value) {
      this.alarmTime = value
    },
    selectTime () {
      this.$refs.picker.open()
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
          background: #15BF86;
          color: white;
          border-radius: 50%;
          margin: 0 2px;
          font-size: .2rem;
        }
      }
    }
  }
}
</style>
