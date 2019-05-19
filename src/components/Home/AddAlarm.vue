<template>
  <div class="add_alarm">
    <div class="home_header">
      <span class="back">取消</span>
      <span class="title">添加闹钟</span>
      <span class="save">保存</span>
    </div>
    <div class="content">
      <input type="date">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.add_alarm {
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
    font-size: .28rem;
    display: flex;
    align-items: center;
    .back {
      display: inline-block;
      height: .25rem;
      width: .7rem;
    }
    .save {
      display: inline-block;
      height: .24rem;
      width: .7rem;
    }
    .title {
      text-align: center;
      width: 100%;
      font-size: .36rem;
    }
  }
}
</style>
