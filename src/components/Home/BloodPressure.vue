<template>
  <div class="blood_pressure">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='closeBloodPressure'/>
      </span>
      <span class="title">血压</span>
      <span class="comfirm"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    closeBloodPressure () {
      this.$emit('closeBloodPressure')
    }
  }
}
</script>

<style lang="scss" scoped>
.blood_pressure {
  
  position: fixed;
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
}
</style>
