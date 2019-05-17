<template>
  <div class="add_contact">
    <div class="wrapper">
      <div class="title">{{title}}</div>
      <slot></slot>
      <div class="bts">
        <span class="cancel" @click='handleCancel'>取消</span>
        <span class="comfirm" @click='handleComfirm'>确认</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
    }
  },
  methods: {
    handleCancel () {
      this.$emit('closeAddContact', false)
    },
    handleComfirm () {
      this.$emit('closeAddContact', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.add_contact {
  position: fixed;
  top: 0;
  width: 100vw;
  bottom: 0;
  background: rgba(0,0,0,.3);
  .wrapper {
    font-size: .26rem;
    position: absolute;
    width: 5rem;
    padding: 10px;
    background: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      line-height: .4rem;
    }
    .bts {
      text-align: right;
      margin-top: 15px;
      color: #15BF86;
      span {
        margin: 0 5px;
      }
    }
  }
}
</style>
