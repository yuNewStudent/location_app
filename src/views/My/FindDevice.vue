<template>
  <div class="find_device">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='back'/>
      </span>
      <span class="title">寻找设备</span>
      <span class="comfirm"></span>
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'MyPage'})
    }
  }
}
</script>

<style lang='scss' scoped>
.find_device {
  width: 100vw;
  position: fixed;
  top: .48rem;
  bottom: 0;
  background: rgb(239,239,239);
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
  .content {
  }
}
</style>