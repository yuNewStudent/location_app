<template>
  <div class="fence_page">
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='closeFence'/>
      <span class="title">智能围栏</span>
      <span @click='handleSave' class="save">保存</span>
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
    </div>
    <div class="footer">
      <p class="center">
        <label for="">请输入中心位置</label><input id='tipinput' type="text" v-model="centerAddress" @focus="writeAddress">
      </p>
      <div class="range">
        <div class="range_wraper">
          <div @click='handleReduce' class="start">0m</div>
          <div
            class="health"
            ref="progressBar"
            @touchstart='rangeStart'
            @touchmove='rangeMove'
            @touchend='rangeEnd'>
            <span class="control" ref='control'></span>
            <div class="active" ref='active'></div>
            <span class="text">{{defaultRange}}m</span>
          </div>
          <div class="end" @click='handleAdd'>5000m</div>
        </div>
        <div class="more" @click='isShowAddFence=!isShowAddFence'>自定义</div>
      </div>
    </div>
    <message-box
      v-if='isShowAddFence'
      :title="title"
      @closeAddContact='addFence'
      class="add_fence">
      <input type="text" v-model='rangeQuery'></message-box>
  </div>
</template>

<script>
import AMap from 'AMap'
import MessageBox from '@/components/MessageBox'
import { Toast } from 'mint-ui'
export default {
  props: ['deviceInfo'],
  data () {
    return {
      map: null,
      defaultRange: 200,
      isShowAddFence: false,
      title: '请输入围栏半径距离',
      centerAddress: '',
      centerLngLat: [],
      geocoder: null,
      marker: null,
      rangeQuery: '',
      circle: null
    }
  },
  components: {
    MessageBox
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
      this.getFence()
    })
  },
  methods: {
    // 初始化地图
    initMap () {
      this.map = new AMap.Map('map', {
        // 调整窗口大小
        resizeEnable: true,
        // 设置中心点
        center: [this.deviceInfo.lng, this.deviceInfo.lat],
        // 地图显示范围
        zoom: 15
      })
      this.map.on('click', (e) => {
        this.map.remove(this.circle)
        const location = [e.lnglat.lng, e.lnglat.lat]
        this.centerLngLat = location
        this.getCenterAddress(location)
        this.map.setZoomAndCenter(15, location)
        this.map.remove(this.marker)
        this.drawMarker(location)
        this.drawCircle([e.lnglat.lng, e.lnglat.lat], this.defaultRange)
      })
      AMap.plugin(['AMap.Geocoder'], () => {
        this.geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
      })
      AMap.plugin('AMap.Autocomplete', () => {
        // 实例化Autocomplete
        var autoOptions = {
          // input 为绑定输入提示功能的input的DOM ID
          input: 'tipinput'
        }
        var autoComplete = new AMap.Autocomplete(autoOptions)
        AMap.event.addListener(autoComplete, 'select', (e) => {
          this.centerLngLat = [e.poi.location.lng, e.poi.location.lat]
          this.map.remove(this.circle)
          this.map.remove(this.marker)
          this.drawCircle([e.poi.location.lng, e.poi.location.lat], this.defaultRange)
          this.drawMarker([e.poi.location.lng, e.poi.location.lat])
        })
        // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
      })
    },
    // 查询电子围栏
    getFence () {
      this.$http.get(`${config.httpBaseUrl}/map/getFence`, {
        params: {
          wearerDeviceId: JSON.parse(localStorage.getItem('device')).wearerDeviceId
        }
      }).then(res => {
        if (!res.date.fence) {
          this.centerLngLat = [104.06406, 30.54311]
        } else {
          this.centerLngLat = [res.date.fence.fenceLongitude, res.date.fence.fenceLatitude]
          this.defaultRange = res.date.fence.fenceRange * 1000
          const touchX = parseFloat(this.defaultRange * (this.$refs.progressBar.offsetWidth / 5000))
          // 设置按钮位置
          this.$refs.control.style.left = touchX - 3 + 'px'
          // 设置active宽度
          this.$refs.active.style.width = touchX + 'px'
        }
        this.map.setZoomAndCenter(14, this.centerLngLat)
        this.drawCircle(this.centerLngLat, this.defaultRange)
        this.getCenterAddress(this.centerLngLat)
        this.drawMarker(this.centerLngLat)
      })
    },
    // 根据经纬度获取地址
    getCenterAddress (lnglat) {
      this.geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.regeocode) {
          // address = result.regeocode.formattedAddress
          this.centerAddress = result.regeocode.formattedAddress
        } else {
          alert(JSON.stringify(result))
        }
      })
    },
    // 绘制icon
    drawMarker (lnglat) {
      this.marker = new AMap.Marker({
        icon: require('@/assets/icon/location/定位IC.png'),
        position: lnglat
      })
      this.map.add(this.marker)
    },
    // 绘制圆形范围
    drawCircle (lnglat, radius) {
      this.circle = new AMap.Circle({
        center: lnglat,
        radius: radius, // 半径
        strokeOpacity: 0,
        fillOpacity: 0.3,
        // 线样式还支持 'dashed'
        fillColor: '#1791fc',
        zIndex: 50
      })
      this.circle.setMap(this.map)
      this.circle.on('click', (e) => {
        this.map.remove(this.circle)
        const location = [e.lnglat.lng, e.lnglat.lat]
        this.centerLngLat = location
        this.getCenterAddress(location)
        this.map.setZoomAndCenter(15, location)
        this.map.remove(this.marker)
        this.drawMarker(location)
        this.drawCircle([e.lnglat.lng, e.lnglat.lat], this.defaultRange)
      })
      // 缩放至合适位置
      this.map.setFitView([this.circle])
    },
    // 信息窗体
    openInfo () {
      // 构建信息窗体中显示的内容
      let info = `
        <div style='font-size:.24rem; width: 5rem'>
          当前位置：<span>成都市高新区天府四街吉泰路5号OCG大厦B座</span>
        <div>`
      let infoWindow = new AMap.InfoWindow({
        // 使用默认信息窗体框样式，显示信息内容
        content: info
      })
      infoWindow.open(this.map, this.map.getCenter())
    },
    closeFence () {
      this.$emit('closeFence')
    },
    handleSave () {
      if (!this.defaultRange || !this.centerLngLat.length) {
        return Toast({
          message: '信息不能为空',
          iconClass: 'icon icon-error'
        })
      }
      const wearerDeviceId = JSON.parse(localStorage.getItem('device')).wearerDeviceId
      this.$http.get(`${config.httpBaseUrl}/wearer/insertfence`, {
        params: {
          wearerDeviceId: wearerDeviceId,
          range: this.defaultRange / 1000,
          longitude: this.centerLngLat[0],
          latitude: this.centerLngLat[1]
        }
      }).then(res => {
        if (res.code === 200) {
          Toast({
            message: '操作成功',
            iconClass: 'icon icon-success'
          })
        }
      })
    },
    rangeStart (e) {
      let moveStartX = e.touches[0].pageX
      let touchX = moveStartX - this.$refs.progressBar.offsetLeft
      // 设置按钮位置
      this.$refs.control.style.left = touchX - 3 + 'px'
      // 设置active宽度
      this.$refs.active.style.width = touchX + 'px'// 设置距离
      this.defaultRange = parseInt(touchX / (this.$refs.progressBar.offsetWidth / 5000))
      this.circle.setRadius(this.defaultRange)
      // 缩放至合适位置
      this.map.setFitView([this.circle])
    },
    rangeEnd (e) {

    },
    rangeMove (e) {
      let moveStartX = e.changedTouches[0].pageX
      let touchX = moveStartX - this.$refs.progressBar.offsetLeft
      this.currentPercent = touchX / this.$refs.progressBar.offsetWidth
      if (touchX > this.$refs.progressBar.offsetWidth) {
        touchX = this.$refs.progressBar.offsetWidth
      }
      if (this.currentPercent < 0) {
        touchX = 0
      }
      // 设置按钮位置
      this.$refs.control.style.left = touchX - 3 + 'px'
      // 设置active宽度
      this.$refs.active.style.width = touchX + 'px'
      // 设置距离
      this.defaultRange = parseInt(touchX / (this.$refs.progressBar.offsetWidth / 5000))
      this.circle.setRadius(this.defaultRange)
      // 缩放至合适位置
      this.map.setFitView([this.circle])
    },
    handleReduce () {
      this.defaultRange = this.defaultRange - 100
      if (this.defaultRange < 0) {
        this.defaultRange = 0
      }
      const touchX = parseFloat(this.defaultRange * (this.$refs.progressBar.offsetWidth / 5000))
      // 设置按钮位置
      this.$refs.control.style.left = touchX - 3 + 'px'
      // 设置active宽度
      this.$refs.active.style.width = touchX + 'px'
    },
    handleAdd () {
      this.defaultRange = this.defaultRange + 100
      if (this.defaultRange > 5000) {
        this.defaultRange = 5000
      }
      const touchX = parseFloat(this.defaultRange * (this.$refs.progressBar.offsetWidth / 5000))
      // 设置按钮位置
      this.$refs.control.style.left = touchX - 3 + 'px'
      // 设置active宽度
      this.$refs.active.style.width = touchX + 'px'
    },
    addFence () {
      this.isShowAddFence = false
      if (this.rangeQuery < 200 || this.rangeQuery > 5000) { return }
      this.defaultRange = this.rangeQuery
      const touchX = parseFloat(this.defaultRange * (this.$refs.progressBar.offsetWidth / 5000))
      // 设置按钮位置
      this.$refs.control.style.left = touchX - 3 + 'px'
      // 设置active宽度
      this.$refs.active.style.width = touchX + 'px'
    },
    writeAddress () {
      console.log(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.fence_page {
  position: fixed;
  top: .48rem;
  bottom: 0;
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
      bottom: 2.4rem;
    }
    .control {
      position: fixed;
      top: 1.44rem;
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
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 2.4rem;
    background: white;
    box-sizing: border-box;
    padding: 0 10px;
    .center {
      font-size: .24rem;
      padding: 10px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(223,223,223,1);
      input {
        flex: 1;
        height: .6rem;
        background:rgba(233,246,242,1);
        border: 1px solid rgba(148,235,206,1);
        border-radius: 3px;
        margin-left: 5px;
        padding: 0 10px;
      }
    }
    .range {
      font-size: .24rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5px;
      height: 1.1rem;
      .range_wraper {
        display: flex;
        align-items: center;
        margin-top: 5px;
        .start {}
        .health {
          position: relative;
          background: #BBBBBB;
          height: 1px;
          width: 4.2rem;
          margin: 0 5px;
          border-top: 10px solid white;
          border-bottom: 10px solid white;
          position: relative;
          .text {
            position: absolute;
            top: -20px;
            left: 5px;
          }
          .active {
            position: absolute;
            width: 100px;
            background: #55DDAF;
            height: 1px;
          }
          .control {
            position: absolute;
            display: inline-block;
            width: 6px;
            height: 6px;
            top: -3px;
            left: -3px;
            background:rgba(21,191,134,1);
            border-radius: 50%;
          }
        }
        .end {}
      }
      .more {
        margin-top: 5px;
      }
    }
  }
  .add_fence {
    padding: 10px;
    input {
      width: 4rem;
      height: .6rem;
      background:rgba(233,246,242,1);
      border: 1px solid rgba(148,235,206,1);
      border-radius: 3px;
      margin: 10px 10px;
      padding: 0 5px;
    }
  }
}
</style>
