<template>
  <message-box
    class="add_contact"
    :title='title'
    @closeAddContact='AddContact'>
    <div class="content">
      <p class="header">
        <img class="head_img" src="@/assets/icon/home/userImg.png" alt="">
        <img class="select_img" src="@/assets/icon/home/箭头 拷贝.png" alt="">
      </p>
      <p class="name">
        <label for="">昵称</label>
        <input type="text" name="" id="">
      </p>
      <p class="phone">
        <label for="">电话号码</label>
        <input type="text" name="" id="">
      </p>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  data () {
    return {
      title: '新增电话本'
    }
  },
  components: {
    MessageBox
  },
  methods: {
    AddContact (bol) {
      this.$emit('AddContact', bol)
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

