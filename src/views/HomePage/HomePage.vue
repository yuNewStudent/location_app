<template>
  <div>
    <header-page :title='head_title'></header-page>
    <slider class="home_page">
      <div class="content">
        <div class="setting">
          <ul>
            <li class="setting_item" @click='showPhoneBook'>
              <img src="@/assets/icon/home/电话本IC.png" alt="">
              <p>电话本</p>
            </li>
            <li class="setting_item" @click='showEmergencyContact'>
              <img src="@/assets/icon/home/SOS联系人IC.png" alt="">
              <p>SOS号码</p>
            </li>
            <li class="setting_item" @click='showAlarmSeting'>
              <img src="@/assets/icon/home/闹钟IC.png" alt="">
              <p>闹钟设置</p>
            </li>
            <li class="setting_item" @click='showBlackList'>
              <img src="@/assets/icon/home/免打扰ic .png" alt="">
              <p>免打扰</p>
            </li>
          </ul>
        </div>
        <div class="current_address">
          <img src="@/assets/icon/home/定位IC.png" alt="">成都市武侯区桂溪街道基泰路112OCG国际中心
        </div>
        <ul class="information">
          <li class="information_item" @click='isShowNoteStep=!isShowNoteStep'>
            <div class="information_title">
              <span class="text">计步</span>
              <img src="@/assets/icon/home/箭头 拷贝.png" alt="">
            </div>
            <div class="details">
              <span class="img">
                <img src="@/assets/icon/home/计步IC.png" alt="">
              </span>
              <div class="desc">
                <p class="time">更新时间：2019-05-14 19：40</p>
                <p class="step">
                  <span>3879步</span>
                  <span>距离5.3KM</span>
                </p>
              </div>
            </div>
          </li>
          <li class="information_item" @click='isShowHeartRate=!isShowHeartRate'>
            <div class="information_title">
              <span class="text">心率</span>
              <img src="@/assets/icon/home/箭头 拷贝.png" alt="">
            </div>
            <div class="details">
              <span class="img">
                <img src="@/assets/icon/home/心率IC.png" alt="">
              </span>
              <div class="desc">
                <p class="time">更新时间：2019-05-14 19：40</p>
                <p class="step">
                  <span>58BPM</span>
                </p>
              </div>
            </div>
          </li>
          <li class="information_item" @click='isShowSleepPage=!isShowSleepPage'>
            <div class="information_title">
              <span class="text">睡眠</span>
              <img src="@/assets/icon/home/箭头 拷贝.png" alt="">
            </div>
            <div class="details">
              <span class="img">
                <img src="@/assets/icon/home/睡眠IC.png" alt="">
              </span>
              <div class="desc">
                <p class="time">更新时间：2019-05-14 19：40</p>
                <p class="step">
                  <span>浅睡眠</span>
                </p>
              </div>
            </div>
          </li>
          <li class="information_item" @click='isShowBloodPressure=!isShowBloodPressure'>
            <div class="information_title">
              <span class="text">血压</span>
              <img src="@/assets/icon/home/箭头 拷贝.png" alt="">
            </div>
            <div class="details">
              <span class="img">
                <img src="@/assets/icon/home/血压IC.png" alt="">
              </span>
              <div class="desc">
                <p class="time">更新时间：2019-05-14 19：40</p>
                <p class="step">
                  <span>高压100</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </slider>
    <phone-book
    v-if='isShowPhoneBook'
    @closePhoneBook='closePhoneBook'></phone-book>
    <emergency-contact
      v-if='isShowEmergencyContact'
      @closeEmergencyContact='closeEmergencyContact'></emergency-contact>
    <black-list
      v-if='isShowBlackList'
      @closeBlackList='closeBlackList'></black-list>
    <alarm-seting
      v-if='isShowAlarmSeting'
      @closeAlarmSeting='closeAlarmSeting'></alarm-seting>
    <note-step
      v-if='isShowNoteStep'
      @closeNoteStep='isShowNoteStep=!isShowNoteStep'></note-step>
    <heart-rate
      v-if='isShowHeartRate'
      @closeHeartRate='isShowHeartRate=!isShowHeartRate'></heart-rate>
    <sleep-page
      v-if='isShowSleepPage'
      @closeSleep='isShowSleepPage=!isShowSleepPage'></sleep-page>
    <blood-pressure
      v-if='isShowBloodPressure'
      @closeBloodPressure='isShowBloodPressure=!isShowBloodPressure'></blood-pressure>
  </div>
</template>

<script>
import Slider from '@/components/scroll'
import PhoneBook from '@/components/Home/PhoneBook'
import EmergencyContact from '@/components/Home/EmergencyContact'
import BlackList from '@/components/Home/BlackList'
import AlarmSeting from '@/components/Home/AlarmSeting'
import HeaderPage from '@/components/Header'
import NoteStep from '@/components/Home/NoteStep'
import HeartRate from '@/components/Home/HeartRate'
import SleepPage from '@/components/Home/Sleep'
import BloodPressure from '@/components/Home/BloodPressure'
export default {
  data () {
    return {
      isShowPhoneBook: false,
      isShowEmergencyContact: false,
      isShowBlackList: false,
      isShowAlarmSeting: false,
      isShowBloodPressure: false,
      isShowSleepPage: false,
      isShowHeartRate: false,
      isShowNoteStep: false,
      head_title: '首页'
    }
  },
  components: {
    Slider,
    HeaderPage,
    PhoneBook,
    EmergencyContact,
    BlackList,
    AlarmSeting,
    NoteStep,
    HeartRate,
    SleepPage,
    BloodPressure
  },
  methods: {
    // 电话本
    showPhoneBook () {
      this.isShowPhoneBook = true
    },
    closePhoneBook () {
      this.isShowPhoneBook = false
    },
    // SOS
    showEmergencyContact () {
      console.log(1)
      this.isShowEmergencyContact = true
    },
    closeEmergencyContact () {
      this.isShowEmergencyContact = false
    },
    // 免打扰
    showBlackList () {
      this.isShowBlackList = true
    },
    closeBlackList () {
      this.isShowBlackList = false
    },
    // 闹钟
    showAlarmSeting () {
      this.isShowAlarmSeting = true
    },
    closeAlarmSeting () {
      this.isShowAlarmSeting = false
    },
    // 计步
    // closeNoteStep () {
    //   this.isShowNoteStep = false
    // },
    // 心率
    // 睡眠
    // 血压
  }
}
</script>

<style lang="scss" scoped>
.home_page {
  position: absolute;
  top: 0.96rem;
  bottom: 0;
  width: 100vw;
  overflow: hidden;
  .content {
    background: #f0f2f5;
    padding: 0.19rem 0.16rem 0;
    .setting {
      ul {
        display: flex;
        justify-content: space-between;
        .setting_item {
          display: flex;
          flex-direction: column;
          background: white;
          width: 1.54rem;
          align-items: center;
          box-sizing: border-box;
          padding: .2rem 0;
          img {
            height: 0.9rem;
            width: 0.9rem;
          }
          p {
            font-size: 0.26rem;
            padding-top: .2rem
          }
        }
      }
    }
    .current_address {
      height: .9rem;
      line-height: .9rem;
      background: white;
      font-size: .26rem;
      margin: 0.16rem 0 0;
      display: flex;
      padding: 0 10px;
      align-items: center;
      img {
        width: .27rem;
        height: .35rem;
        margin-right: 5px;
      }
    }
    .information {
      overflow: auto;
      .information_item {
        background: white;
        padding: 0 10px;
        margin: 0.16rem 0 0;
        .information_title {
          height: .66rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #EFEFEF;
          align-items: center;
          .text {
            font-size: .26rem
          }
          img {
            width: .16rem;
            height: .2rem;
          }
        }
        .details {
          display: flex;
          padding: .2rem 0;
          .img {
            img {
              width: .9rem;
              height: .9rem;
            }
          }
          .desc {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 5px;
            .time {
              font-size: .22rem;
              margin-bottom: 5px;
              color: #B9B9B9;
            }
            .step {
              font-size: .26rem;
              color: #15BF86;
            }
          }
        }
      }
    }
  }
}
</style>
