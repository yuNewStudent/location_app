<template>
  <div class="location_page">
    <header-page :title='head_title'></header-page>
    <div id="container"></div>
  </div>
</template>

<script>
import AMap from 'AMap'
import HeaderPage from '@/components/Header'
export default {
  data () {
    return {
      head_title: '定位'
    }
  },
  components: {
    HeaderPage
  },
  created () {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    // 初始化地图
    initMap () {
      console.log(AMap)
      this.map = new AMap.Map('container', {
        // 调整窗口大小
        resizeEnable: true,
        // 设置中心点
        center: [104.06406, 30.54311],
        // 地图显示范围
        zoom: 15
      })
      console.log(this.map)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.location_page {
  height: 100%;
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
  #container {
    width: 100vw;
    position: absolute;
    top: .96rem;
    bottom: 0;
  }
}
</style>
