<template>
  <div class="home_header">
    <img class="headIcon" src="@/assets/icon/home/userImg.png" alt="">
    <span>{{title}}</span>
    <div class="device" @click='handleShowDeviceManage'>
      <img class="log" src="@/assets/icon/home/手表IC.png" alt="">
      <div class="deviceManage" v-if='isShowDeviceManage'>
        <p @click.stop>
          <img src="" alt="">
          <span>张老大的手表</span>
        </p>
        <p @click.stop>
          <img src="" alt="">
          <span>真相的手表</span>
        </p>
        <p @click.stop="handleAddDevice">
          <img src="" alt="">
          <span>新增设备</span>
        </p>
      </div>
    </div>
    <add-device
      v-if='isShowAddDevice'
      @closeAddDevice='closeAddDevice'></add-device>
  </div>
</template>

<script>
import AddDevice from '@/components/Home/AddDevice'
export default {
  props: ['title'],
  data () {
    return {
      isShowDeviceManage: false,
      isShowAddDevice: false
    }
  },
  components: {
    AddDevice
  },
  methods: {
    handleShowDeviceManage () {
      this.isShowDeviceManage = !this.isShowDeviceManage
    },
    // 新增设备
    handleAddDevice () {
      this.isShowAddDevice = true
      this.isShowDeviceManage = false
    },
    // 关闭新增设备页面
    closeAddDevice (deviceInfo) {
      if (deviceInfo) {
        console.log('新增设备')
      }
      this.isShowAddDevice = false
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
