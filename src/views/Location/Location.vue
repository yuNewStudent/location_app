<template>
  <div class="location_page">
    <header-page :title='head_title'></header-page>
    <div class="content">
      <div id="container"></div>
      <div class="control">
        <span class="battery"><img src="@/assets/icon/location/电池.png" alt=""></span>
        <div>
          <span class="fence" @click='isShowFencePage=!isShowFencePage'><img src="@/assets/icon/location/围栏.png" alt=""></span>
          <span class="route" @click='isShowRoutePage=!isShowRoutePage'><img src="@/assets/icon/location/轨迹.png" alt=""></span>
          <span class="navigation"><img src="@/assets/icon/location/导航.png" alt=""></span>
        </div>
      </div>
    </div>
    <fence-page
      v-if='isShowFencePage'
      @closeFence='isShowFencePage=!isShowFencePage'></fence-page>
      <route-page
        v-if='isShowRoutePage'
        @closeRoute='isShowRoutePage=!isShowRoutePage'></route-page>
  </div>
</template>

<script>
import AMap from 'AMap'
import HeaderPage from '@/components/Header'
import FencePage from '@/components/Location/Fence'
import RoutePage from '@/components/Location/Route'
export default {
  data () {
    return {
      head_title: '定位',
      isShowFencePage: false,
      isShowRoutePage: false,
      map: null,
      DeviceInfo: {}
    }
  },
  components: {
    HeaderPage,
    FencePage,
    RoutePage
  },
  created () {
    this.getDeviceInfo()
    this.timer = setInterval(() => {
      this.getDeviceInfo()
    }, 60000)
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    // 初始化地图
    initMap () {
      this.map = new AMap.Map('container', {
        // 调整窗口大小
        resizeEnable: true,
        // 设置中心点
        center: [104.0574050, 30.540512],
        // 地图显示范围
        zoom: 17
      })
      // 添加缩放标尺控件
      // AMap.plugin(['AMap.Scale'], () => {
      //   this.map.addControl(new AMap.Scale())
      // })
      AMap.plugin(['AMap.Geocoder'], () => {
        this.geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
      })
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
    // 信息窗体
    openInfo (lng, lat) {
      this.getAddress(lng, lat).then(data => {
        // 构建信息窗体中显示的内容
        let info = `
          <div style='font-size:.24rem; width: 5rem'>
            当前位置：<span>${data}</span>
          <div>`
        let infoWindow = new AMap.InfoWindow({
          // 使用默认信息窗体框样式，显示信息内容
          content: info,
          offset: new AMap.Pixel(5, -30)
        })
        infoWindow.open(this.map, this.map.getCenter())
      })
    },
    // 获取设备信息
    getDeviceInfo () {
      this.$http.get(`${config.httpBaseUrl}/appPosition/getAppposition`, {
        params: {
          userId: 9512494668
        }
      }).then(res => {
        if (res.code === 200) {
          this.DeviceInfo = res.date.pos
          // 绘制当前人
          this.translateGps(this.DeviceInfo.locationBean.longitude, this.DeviceInfo.locationBean.latitude).then(data => {
            this.map.setZoomAndCenter(14, [data[0].lng, data[0].lat])
            this.drawMarker(data[0].lng, data[0].lat)
            this.openInfo(data[0].lng, data[0].lat)
          })
        }
      })
    },
    // 根据经纬度获取地址
    getAddress (lng, lat) {
      const lnglat = [lng, lat]
      return new Promise((resolve, reject) => {
        this.geocoder.getAddress(lnglat, (status, result) => {
          if (status === 'complete' && result.regeocode) {
            // address = result.regeocode.formattedAddress
            resolve(result.regeocode.formattedAddress)
          } else {
            alert(JSON.stringify(result))
          }
        })
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
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.location_page {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw;
  .home_header {
    font-size: 0.36rem;
    background: #15BF86;
    color: white;
    box-sizing: border-box;
    height: 0.96rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.36rem;
    .headIcon {
      width: 0.64rem;
      height: 0.64rem;
      border-radius: 50%;
    }
    .device {
      position: relative;
      .log {
        width: 0.22rem;
        height: 0.46rem;
      }
      .deviceManage {
        position: absolute;
        right: -0.2rem;
        z-index: 2;
        background: white;
        p {
          color: black;
          font-size: .22rem;
          width: 1.8rem;
          line-height: .6rem;
          padding: 0 5px;
          display: flex;
        }
      }
    }
  }
  .content {
    position: fixed;
    top: 1.44rem;
    bottom: 1rem;
    #container {
      height: 100%;
      width: 100vw;
    }
    .control {
      position: fixed;
      top: 1.44rem;
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
  }
}
</style>
