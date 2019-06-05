<template>
  <div class="add_device">
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='handleClose'/>
      <span class="title">新增设备</span>
    </div>
    <div class="content">
      <div class="scan_wrapper">
        <input type="text" v-model='code' placeholder="请输入15位注册码或点击扫描二维码">
        <img @click='isShowScanPage=!isShowScanPage' src="@/assets/icon/home/扫描IC.png" alt="">
      </div>
      <button class="next" @click='handleNext'>下一步</button>
    </div>
    <device-info
      v-if='isShowDeviceInfo'
      :code='code'
      @addDevice='addDevice'
      @closeDeviceInfo='closeDeviceInfo'></device-info>
    <scan-page
      v-if='isShowScanPage'
      @closeScanPage='closeScanPage'></scan-page>
  </div>
</template>

<script>
import DeviceInfo from '@/components/Home/DeviceInfo'
import ScanPage from '@/components/Scan'
import { Toast } from 'mint-ui'
import { userInfo } from 'os';
export default {
  name: 'add_device',
  data () {
    return {
      isShowDeviceInfo: false,
      isShowScanPage: false,
      code: ''
    }
  },
  components: {
    DeviceInfo,
    ScanPage
  },
  methods: {
    handleClose () {
      this.$emit('closeAddDevice')
    },
    handleNext () {
      if (!this.code) {
        return Toast({
          message: '注册码不能为空',
          iconClass: 'icon icon-success'
        })
      }
      // 判断设备是否被绑定过
      this.$http.get(`${config.httpBaseUrl}/wearer/Judge`, {
        params: {
          appuserId: JSON.parse(localStorage.getItem('user')).appuserId,
          wearerDeviceId: this.code.split('').filter((item, index) => {
            return index !== 0 && index !== 3 && index !== 6 && index !== 10 && index !== 14
          }).join('')
        }
      }).then(res => {
        if (res.code === 200) {
          if (res.date.Permission === 1) {
            this.isShowDeviceInfo = true
          } else {
            Toast({
              message: '绑定成功',
              iconClass: 'icon icon-success'
            })
            this.$emit('closeAddDevice')
          }
        } 
      })
    },
    closeDeviceInfo () {
      this.isShowDeviceInfo = false
    },
    addDevice (deviceInfo) {
      this.isShowDeviceInfo = false
      this.$emit('closeAddDevice', deviceInfo)
    },
    // 关闭扫描页面
    closeScanPage (codeUrl) {
      this.isShowScanPage = false
      if (codeUrl) {
        this.code = codeUrl + ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.add_device {
  position: fixed;
  left: 0;
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
    line-height: .96rem;
    position: relative;
    .back {
      position: absolute;
      z-index: 2;
      width: .18rem;
      height: .25rem;
      top: .35rem;
    }
    .title {
      position: absolute;
      left: 0;
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
  .content {
    padding: 1rem;
    box-sizing: border-box;
    .scan_wrapper {
      width: 100%;
      height: 1rem;
      border: 1px solid rgba(209,209,209,1);
      border-radius: 5px;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      padding: 0 10px;
      input {
        width: 100px;
        font-size: .24rem;
        // height: 30px;
        background: transparent;
        outline: none;
        flex: 1;
      }
      img {
        width: .66rem;
        height: .66rem;
      }
    }
    .next {
      display: inline-block;
      color: white;
      width: 100%;
      height: .6rem;
      line-height: .6rem;
      border: none;
      border-radius: 15px;
      outline: none;
      margin-top: 40px;
      background: linear-gradient(-90deg,rgba(51,221,164,1), rgba(21,191,134,1))
    }
  }
}
</style>
