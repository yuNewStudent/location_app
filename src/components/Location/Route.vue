<template>
  <div class="route_page">
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='closeRoute'/>
      <span class="title">行走轨迹</span>
      <span></span>
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
          <img src="@/assets/icon/location/日历IC.png" alt="">
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
import { DatetimePicker, Toast } from 'mint-ui'
export default {
  data () {
    return {
      map: null,
      timer: null,
      pickerVisible: {
        date: '2019-05-20',
        startTime: '',
        endTime: ''
      },
      polyline: null,
      routes: [],
      currentOpera: '回放'
    }
  },
  components: {
    DatetimePicker
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    // 初始化地图
    initMap () {
      this.map = new AMap.Map('map', {
        // 调整窗口大小
        resizeEnable: true,
        // 设置中心点
        center: [104.0574050, 30.540512],
        // 地图显示范围
        zoom: 14
      })
    },
    closeRoute () {
      this.$emit('closeRoute')
    },
    selectDate () {
      document.activeElement.blur()
      this.$refs.datepicker.open()
    },
    confirmDate (value) {
      this.pickerVisible.date = this.moment(value).format('YYYY-MM-DD')
    },
    selectStartTime () {
      document.activeElement.blur()
      this.$refs.startTime.open()
    },
    confirmStartTime (value) {
      this.pickerVisible.startTime = value
    },
    selectEndTime () {
      document.activeElement.blur()
      this.$refs.endTime.open()
    },
    confirmEndTime (value) {
      console.log(value)
      this.pickerVisible.endTime = value
    },
    handleplayback () {
      this.currentOpera = '回放'
      this.map && this.map.remove(this.polyline)
      if (!this.routes.length) {
        for (var k in this.pickerVisible) {
          if (!this.pickerVisible[k]) {
            return Toast({
              message: '查询条件不能有空',
              iconClass: 'icon icon-error'
            })
          }
        }
        const data = {
          startTime: this.pickerVisible.startTime.slice(0, 2),
          endTime: this.pickerVisible.endTime.slice(0, 2),
          date: this.pickerVisible.date,
          userId: 9512494668
        }
        this.$http.get(`${config.httpBaseUrl}/map/getAll`, {
          params: data
        }).then(res => {
          if (res.code === 200 && res.date.maplocations) {
            this.routes = res.date.maplocations
          } else {
            Toast({
              message: '没有查询到数据',
              iconClass: 'icon icon-error'
            })
          }
        })
      }
      
      let  i = 0
      this.timer = setInterval(() => {
        if (i > this.routes.length - 2) {
          return clearInterval(this.timer)
        }
        var path = []
        console.log(i)
        this.map.setZoomAndCenter(15, [this.routes[i].longitude, this.routes[i].latitude])
        this.translateGps(this.routes[i].longitude, this.routes[i].latitude).then(data => {
          path.push(new AMap.LngLat(data[0].lng, data[0].lat))
          this.translateGps(this.routes[i + 1].longitude, this.routes[i + 1].latitude).then(data => {
            path.push(new AMap.LngLat(data[0].lng, data[0].lat))
            this.polyline = new AMap.Polyline({
              path: path,
              strokeColor: '#15BF86',
              strokeWeight: 2,
              lineJoin: 'round',
              lineCap: 'round'
            })
            this.map.add(this.polyline)
            i += 1
          })
        })
      }, 1000)
      // for (let i = 0; i < this.routes.length - 2; i++) {
      //   this.timer = setTimeout(() => {
      //     var path = []
      //     this.map.setZoomAndCenter(15, [this.routes[i].longitude, this.routes[i].latitude])
      //     this.translateGps(this.routes[i].longitude, this.routes[i].latitude).then(data => {
      //       // this.drawMarker(data[0].lng, data[0].lat, 'person', index)
      //       path.push(new AMap.LngLat(data[0].lng, data[0].lat))
      //       this.translateGps(this.routes[i + 1].longitude, this.routes[i + 1].latitude).then(data => {
      //         // this.drawMarker(data[0].lng, data[0].lat, 'person', index)
      //         path.push(new AMap.LngLat(data[0].lng, data[0].lat))
      //         this.polyline = new AMap.Polyline({
      //           path: path,
      //           strokeColor: '#15BF86',
      //           strokeWeight: 2,
      //           lineJoin: 'round',
      //           lineCap: 'round'
      //         })
      //         this.map.add(this.polyline)
      //       })
      //     })
      //   }, i * 1000)
      // }
    },
    // 绘制起点坐标
    drawStartMark () {
      var marker
      const longitude = this.routes[0].longitude
      const latitude = this.routes[0].latitude
      this.translateGps(longitude, latitude).then(data => {
        marker = new AMap.Marker({
          icon: require('@/assets/icon/location/起点IC.png'),
          position: [data[0].lng, data[0].lat]
        })
        this.map.add(marker)
      })
    },
    // 绘制终点坐标
    drawEndMark () {
      var marker
      const longitude = this.routes.slice(-1)[0].longitude
      const latitude = this.routes.slice(-1)[0].latitude
      this.translateGps(longitude, latitude).then(data => {
        marker = new AMap.Marker({
          icon: require('@/assets/icon/location/终点IC.png'),
          position: [data[0].lng, data[0].lat]
        })
        this.map.add(marker)
      })
    },
    // 绘制路径
    drawLine () {
      var path = []
      this.routes.forEach(item => {
        this.translateGps(item.longitude, item.latitude).then(data => {
          path.push(new AMap.LngLat(data[0].lng, data[0].lat))
        })
      })
      setTimeout(() => {
        this.polyline = new AMap.Polyline({
          path: path,
          strokeColor: '#15BF86',
          strokeWeight: 2,
          lineJoin: 'round',
          lineCap: 'round'
        })
        this.map.add(this.polyline)
      }, 4000)
    },
    // 获取所有点位
    handletrajectory () {
      this.currentOpera = '轨迹'
      if (this.timer) {
        clearInterval(this.timer)
      }
      for (var k in this.pickerVisible) {
        if (!this.pickerVisible[k]) {
          return Toast({
            message: '查询条件不能有空',
            iconClass: 'icon icon-error'
          })
        }
      }
      this.map && this.map.clearMap()
      this.polyline && this.map.remove(this.polyline)
      const data = {
        startTime: this.pickerVisible.startTime.slice(0, 2),
        endTime: this.pickerVisible.endTime.slice(0, 2),
        date: this.pickerVisible.date,
        userId: 9512494668
      }
      this.$http.get(`${config.httpBaseUrl}/appPosition/getAPPtracks`, {
        params: data
      }).then(res => {
        if (res.code === 200 && res.date.maplocations) {
          this.routes = res.date.maplocations
          this.drawStartMark()
          this.drawLine()
          this.drawEndMark()
        } else {
          Toast({
            message: '没有查询到数据',
            iconClass: 'icon icon-error'
          })
        }
      })
    },
    // gps转高德坐标
    translateGps (lng, lat) {
      const gps = [lng, lat]
      return new Promise((resolve, reject) => {
        AMap.convertFrom(gps, 'gps', (status, result) => {
          if (result.info === 'ok') {
            resolve(result.locations)
          }
        })
      })
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
      >div {
        display: flex;
        align-items: center;
        height: .6rem;
        font-size: .26rem;
        box-sizing: border-box;
        padding: .1rem 5px;
        background: white;
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
        margin-right: 50px;
        input {
          width: 1.5rem;
        }
      }
      .time_start {
        margin-right: 10px;
        input {
          width: .8rem;
        }
      }
      .time_end {
        input {
          width: .8rem;
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
