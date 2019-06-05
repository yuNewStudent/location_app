<template>
  <message-box
    class="add_contact"
    :title='title'
    @closeAddContact='addControl'>
    <div class="content">
      <p class="phone">
        <label for="">电话号码</label>
        <input type="text" v-model='controlPhone'>
      </p>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['title', 'selectPhone'],
  data () {
    return {
      // title: '新增电话本'
      controlPhone: ''
    }
  },
  components: {
    MessageBox
  },
  methods: {
    addControl (bol) {
      if (!this.selectPhone) {
        this.$emit('addControl', bol, this.controlPhone)
      } else {
        this.$emit('editorControl', bol, this.controlPhone)
      }
    }
  },
  created () {
    console.log(this.selectPhone)
    if (this.selectPhone) {
      this.controlPhone = this.selectPhone
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
  .content {
    font-size: .24rem;
    color: #B9B9B9;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 0;
      .head_img {
        width: .6rem;
        height: .6rem;
      }
      .select_img {
        width: .16rem;
        height: .2rem;
      }
    }
    p {
      border-bottom: 1px solid rgb(238,238,238);
      padding: 15px 0 5px;
      display: flex;
      label {
        width: 70px;
      }
    }
  }
}
</style>
