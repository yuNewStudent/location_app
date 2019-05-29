<template>
  <div class="home_header">
    <span class="headIcon">
      <img :src="headImg" alt>
    </span>
    <span class="title">{{title}}</span>
    <div class="device" @click="handleShowDeviceManage">
      <img class="log" src="@/assets/icon/home/手表IC.png" alt>
      <div class="deviceManage" v-if="isShowDeviceManage">
        <p
          v-for="(item, index) in devices"
          :key="index"
          class="device_item"
          :class="{active: isActive(item.wearerDeviceId)}"
          @click.stop="selectDevice(item, index)"
        >
          <img src="@/assets/icon/header/手表IC.png" alt>
          <span>{{item.wearerNickname}}</span>
        </p>
        <p class="addBtn" @click.stop="handleAddDevice">
          <img src="@/assets/icon/home/新增设备ic .png" alt>
          <span>新增设备</span>
        </p>
      </div>
    </div>
    <add-device v-if="isShowAddDevice" @closeAddDevice="closeAddDevice"></add-device>
  </div>
</template>

<script>
import AddDevice from "@/components/Home/AddDevice";
export default {
  props: ["title"],
  data() {
    return {
      isShowDeviceManage: false,
      isShowAddDevice: false,
      appuserId:'',
      devices: []
    }
  },
  components: {
    AddDevice
  },
  created () {
    var usernames = localStorage.getItem(('user') || '{}') 
    var userx = (JSON.parse(usernames) || '{}')
    this.appuserId = userx.appuserId
    this.querylist()
  },
  computed: {
    headImg () {
      console.log(JSON.parse(localStorage.getItem('user')).appuserImage)
      return JSON.parse(localStorage.getItem('user')).appuserImage || require('@/assets/icon/home/userImg.png')
    }
  },
  methods: {
    querylist () {
      this.$http
        .get(`${config.httpBaseUrl}/wearer/getAll`, {
          params: {
            appuserId: this.appuserId,
          }
        })
        .then(res => {
          if (res.code === 200) {
            this.devices = res.date.wearers
          }
        })
    },
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
      this.querylist()
      this.isShowAddDevice = false
    },
    // 选择手表
    selectDevice (device, index) {
      let devices = document.getElementsByClassName('device_item')
      for (var i = 0; i < devices.length; i++) {
        devices[i].classList.remove('active')
      }
      devices[index].classList.add('active')
      localStorage.setItem('device', JSON.stringify(device))
    },
    isActive (id) {
      return id === JSON.parse(localStorage.getItem('device')).wearerDeviceId
    }
  }
}
</script>

<style lang="scss" scoped>
.home_header {
  font-size: 0.36rem;
  background: #15bf86;
  color: white;
  box-sizing: border-box;
  height: 0.96rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.36rem;
  .headIcon {
    width: 0.64rem;
    img {
      width: 0.64rem;
      height: 0.64rem;
      border-radius: 50%;
    }
  }
  .title {
    flex: 1;
    text-align: center;
  }
  .device {
    width: 0.64rem;
    text-align: right;
    position: relative;
    .log {
      width: 0.22rem;
      height: 0.46rem;
    }
    .deviceManage {
      position: absolute;
      right: -0.2rem;
      background: white;
      z-index: 2;
      border: 1px solid #efefef;
      .addBtn {
        border-top: 2px solid #efefef;
        img {
          width: 0.26rem;
          height: 0.26rem;
          margin-right: 5px;
        }
      }
      .active {
        background: #d9fbef;
      }
      .device_item {
        img {
          width: 0.22rem;
          height: 0.46rem;
          margin-right: 5px;
          margin-right: 5px;
        }
      }
      p {
        color: black;
        font-size: 0.22rem;
        width: 1.8rem;
        line-height: 0.6rem;
        padding: 0 5px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
