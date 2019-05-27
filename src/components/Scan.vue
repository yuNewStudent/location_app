<template>
  <div class="scan">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='back'/>
      </span>
      <span class="title">扫描二维码</span>
      <span class="comfirm"></span>
    </div>
    <div id="bcid"></div>
  </div>
</template>

<script>
let scan = null
export default {
  data () {
    return {
      codeUrl: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.startRecognize()
    })
  },
  methods: {
    back () {
      if (window.plus) {
        this.cancelScan()
        this.closeScan()
      }
      this.$emit('closeScanPage')
    },
    // 创建扫描控件
    startRecognize () {
      let that = this
      if (!window.plus) return
      scan = new plus.barcode.Barcode('bcid')
      this.startScan()
      scan.onmarked = onmarked
      function onmarked (type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = 'QR'
            break
          case plus.barcode.EAN13:
            type = 'EAN13'
            break
          case plus.barcode.EAN8:
            type = 'EAN8'
            break
          default:
            type = '其它' + type
            break
        }
        result = result.replace(/\n/g, '')
        that.codeUrl = result
        that.closeScan()
        that.$emit('closeScanPage', that.codeUrl)
      }
    },
    // 开始扫描
    startScan () {
      scan.start()
    },
    // 关闭扫描
    cancelScan () {
      scan.cancel()
    },
    // 关闭条码识别控件
    closeScan () {
      scan.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.scan {
  position: fixed;
  top: 0.48rem;
  bottom: 0;
  background: white;
  z-index: 3;
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
      width: 60px;
      img {
        width: .18rem;
        height: .25rem;
      }
    }
    .title {
      text-align: center;
      flex: 1;
    }
    .comfirm {
      width: 60px;
      text-align: right;
      font-size: .28rem;
    }
  }
  #bcid {
    position: fixed;
    top: 1.44rem;
    bottom: 0;
    width: 100vw;
    background: gray;
  }
}

</style>

