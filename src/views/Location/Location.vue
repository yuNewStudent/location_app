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
      map: null
    }
  },
  components: {
    HeaderPage,
    FencePage,
    RoutePage
  },
  created () {
    this.$nextTick(() => {
      this.initMap()
      this.drawMarker(104.06406, 30.54311)
      this.openInfo()
    })
  },
  methods: {
    // 初始化地图
    initMap () {
      this.map = new AMap.Map('container', {
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
    }
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
