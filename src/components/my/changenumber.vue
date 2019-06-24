<template>
  <message-box
    class="add_contact"
    :title='title'
    @closeAddContact='AddContact'>
    <div class="content">
      <!-- <p class="header">
        <img class="head_img" src="@/assets/icon/home/userImg.png" alt="">
        <img class="select_img" src="@/assets/icon/home/箭头 拷贝.png" alt="">
      </p> -->
      <!-- <p class="name">
        <label for="">手机号码</label>
        <input disabled type="text" v-model='personInfo.appuserNumber'>
      </p> -->
      <p class="phone">
        <label for="">密码</label>
        <input :type="type" v-model='personInfo.appuserPassword'>
        <img @click='changeType' class="eye" :src="img" alt="">
      </p>
      <p class="phone">
        <label for="">新密码</label>
        <input :type="type" v-model='personInfo.confirmpassword'>
        <img @click='changeType' class="eye" :src="img" alt="">
      </p>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['title', 'selectPerson'],
  data () {
    return {
      type: 'password',
      img: require('@/assets/icon/login/eye—open.png'),
      // title: '新增电话本'
      personInfo: {
        appuserNumber: JSON.parse(localStorage.getItem('user')).appuserName,
        appuserPassword: '',
        confirmpassword: '',
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    AddContact (bol) {
      if (!this.selectPerson) {
        this.$emit('addContact', bol, this.personInfo)
      } else {
        this.$emit('editorContact', bol, this.personInfo)
      }
    },
     changeType () {
      if (this.type === 'text') {
        this.type = 'password'
        this.img = require('@/assets/icon/login/eye—open.png')
      } else {
        this.type = 'text'
        this.img = require('@/assets/icon/login/eye—close.png')
      }
    },
  },
  created () {
    if (this.selectPerson) {
      this.personInfo = this.selectPerson
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
    img.eye {
        width: .36rem;
        height: .16rem;
      }
  }
}
</style>
