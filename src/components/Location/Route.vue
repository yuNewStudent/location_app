<template>
  <div class="route_page">
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='closeRoute'/>
      <span class="title">行走轨迹</span>
    </div>
    <div class="content">
      <div id="map"></div>
      <div class="control">
        <span class="battery"><img src="@/assets/icon/location/电池.png" alt=""></span>
        <!-- <div>
          <span class="fence"><img src="@/assets/icon/location/围栏.png" alt=""></span>
          <span class="route"><img src="@/assets/icon/location/轨迹.png" alt=""></span>
          <span class="navigation"><img src="@/assets/icon/location/导航.png" alt=""></span>
        </div> -->
      </div>
      <div class="slect_date">
        <div class="date">
          <img src="" alt="">
          <input @focus="selectDate" type="text" v-model="pickerVisible.date">
        </div>
        <div class="time_start">
          <img src="@/assets/icon/location/时钟IC.png" alt="">
          <input @focus="selectStartTime" type="text" v-model="pickerVisible.startTime">
        </div>
        <div class="time_end">
          <img src="@/assets/icon/location/时钟IC.png" alt="">
          <input @focus="selectEndTime" type="text" v-model="pickerVisible.endTime">
        </div>
      </div>
      <div class="bts">
        <span class="playback" :class='{active:currentOpera=="回放"}' @click="handleplayback">回放</span>
        <span class="trajectory" :class='{active:currentOpera=="轨迹"}' @click="handletrajectory">轨迹</span>
      </div>
    </div>
    <mt-datetime-picker
      ref='startTime'
      v-model="pickerVisible.startTime"
      type="time"
      @confirm="confirmStartTime">
    </mt-datetime-picker>
    <mt-datetime-picker
      ref='endTime'
      v-model="pickerVisible.endTime"
      type="time"
      @confirm="confirmEndTime">
    </mt-datetime-picker>
    <mt-datetime-picker
      ref='datepicker'
      v-model="pickerVisible.date"
      type="date"
      @confirm="confirmDate">
    </mt-datetime-picker>
  </div>
</template>

<script>
import AMap from 'AMap'
import { DatetimePicker } from 'mint-ui'
export default {
  data () {
    return {
      map: null,
      pickerVisible: {
        date: '',
        startTime: '',
        endTime: ''
      },
      currentOpera: '回放'
    }
  },
  components: {
    DatetimePicker
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
      this.drawMarker(104.06406, 30.54311)
    })
  },
  methods: {
    // 初始化地图
    initMap () {
      this.map = new AMap.Map('map', {
        // 调整窗口大小
        resizeEnable: true,
        // 设置中心点
        center: [104.06406, 30.54311],
        // 地图显示范围
        zoom: 15
      })
      // 添加缩放标尺控件
      // AMap.plugin(['AMap.Scale'], () => {
      //   this.map.addControl(new AMap.Scale())
      // })
      // AMap.plugin(['AMap.Geocoder'], () => {
      //   this.geocoder = new AMap.Geocoder({
      //     radius: 1000,
      //     extensions: 'all'
      //   })
      // })
    },
    // 绘制icon
    drawMarker (longitude, latitude) {
      let marker
      marker = new AMap.Marker({
        icon: require('@/assets/icon/location/定位IC.png'),
        position: [longitude, latitude]
      })
      this.map.add(marker)
    },
    closeRoute () {
      this.$emit('closeRoute')
    },
    selectDate () {
      this.$refs.datepicker.open()
    },
    confirmDate (value) {
      console.log(value)
      this.pickerVisible.date = value
    },
    selectStartTime () {
      this.$refs.startTime.open()
    },
    confirmStartTime (value) {
      this.pickerVisible.startTime = value
    },
    selectEndTime () {
      this.$refs.endTime.open()
    },
    confirmEndTime (value) {
      this.pickerVisible.endTime = value
    },
    handleplayback () {
      this.currentOpera = '回放'
    },
    handletrajectory () {
      this.currentOpera = '轨迹'
    }
  }
}
</script>

<style lang="scss" scoped>
.route_page {
  position: fixed;
  top: .48rem;
  bottom: 0rem;
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
    justify-content: space-between;
    .back {
      width: .18rem;
      height: .25rem;
    }
    .title {
      text-align: center;
    }
    .save {
      font-size: .26rem;
    }
  }
  .content {
    height: 100%;
    #map {
      width: 100vw;
      position: absolute;
      top: .96rem;
      bottom: 0;
    }
    .control {
      position: fixed;
      top: 2.44rem;
      bottom: 1rem;
      right: 5px;
      display: flex;
      flex-direction: column;
      margin: 5px 0;
      span {
        display: inline-block;
        width: .9rem;
        height: .9rem;
        margin: 5px 0;
        img {
          width: .9rem;
          height: .9rem;
        }
      }
      >div {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
      }
    }
    .slect_date {
      position: absolute;
      top: 1rem;
      display: flex;
      width: 100vw;
      padding: 10px 20px;
      box-sizing: border-box;
      justify-content: space-between;
      >div {
        display: flex;
        align-items: center;
        height: .6rem;
        font-size: .26rem;
        box-sizing: border-box;
        padding: .1rem 5px;
        background: white;
        margin: 0 5px;
        img {
          width: .33rem;
          height: .34rem;
        }
        input {
          height: .4rem;
          margin-left: 5px;
        }
      }
      .date {
        input {
          width: 1.2rem;
        }
      }
      .time_start {
        input {
          width: 1rem;
        }
      }
      .time_end {
        input {
          width: 1rem;
        }
      }
    }
    .bts {
      width: 4rem;
      height: .7rem;
      font-size: .32rem;
      position: fixed;
      bottom: 30px;
      color: black;
      background: white;
      border-radius: .35rem;
      left: 50%;
      margin-left: -2rem;
      .playback {
        left: 0;
      }
      .trajectory {
        right: 0;
      }
      span {
        text-align: center;
        position: absolute;
        display: inline-block;
        width: 2rem;
        height: .7rem;
        line-height: .7rem;
        border-radius: .35rem;
        &.active {
          background: #E19C35;
        }
      }
    }
  }
}
</style>
