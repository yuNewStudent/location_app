<template>
  <div class="register">
    <div class="bglayer"></div>
    <div class="home_header">忘记密码</div>
    <div class="content">
      <p class="user_name">
        <img src="@/assets/icon/login/手机IC.png" alt="">
        <input
          v-model="userInfo.name"
          placeholder="请输入账号"
          type="text">
      </p>
      <p class="password">
        <img class="pass" src="@/assets/icon/login/密码IC.png" alt="">
        <input
          v-model="userInfo.password"
          :type="passwordType"
          placeholder="请输入新密码">
        <img
          @click='changePasswordType'
          class="eye"
          :src="img">
      </p>
      <p class="resetpassword">
        <img class="pass" src="@/assets/icon/login/密码IC.png" alt="">
        <input
          v-model="userInfo.repassword"
          :type="reType"
          placeholder="请确认新密码">
        <img
          @click='changeReType'
          class="eye"
          :src="reImg">
      </p>
      <div class="login_btn" @click="Modify">确认</div>
    </div>
  </div>
</template>

<script>
import { Switch, Toast, DatetimePicker } from 'mint-ui'
export default {
  name: 'register',
  data () {
    return {
      passwordType: 'password',
      reType: 'password',
      img: require('@/assets/icon/login/eye—open.png'),
      reImg: require('@/assets/icon/login/eye—open.png'),
      userInfo: {
        name: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    Modify () {
      if(this.userInfo.password==this.userInfo.repassword){
        const data = {
          appuserNumber: this.userInfo.name,
          appuserPassword: this.userInfo.password
        }
        this.$http.post(`${config.httpBaseUrl}/appuser/changePassword`, data).then(res => {
          if (res.code === 200) {
            this.$router.push({
              name: 'Login'
            })
            Toast({
              message: '修改密码成功',
              iconClass: 'icon icon-success'
            })
           }else{
             Toast({
              message: '修改密码失败',
              iconClass: 'icon icon-success'
            })
           }
        });     
      }else{
         Toast({
          message: '两次输入密码不一致',
          iconClass: 'icon icon-success'
        })
      }
    },
    changePasswordType () {
      if (this.passwordType === 'text') {
        this.passwordType = 'password'
        this.img = require('@/assets/icon/login/eye—open.png')
      } else {
        this.passwordType = 'text'
        this.img = require('@/assets/icon/login/eye—close.png')
      }
    },
    changeReType () {
      if (this.reType === 'text') {
        this.reType = 'password'
        this.reImg = require('@/assets/icon/login/eye—open.png')
      } else {
        this.reType = 'text'
        this.reImg = require('@/assets/icon/login/eye—close.png')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.register {
  width: 100vw;
  height: 100vh;
  background: #49BA94;
  .bglayer {
    width: 100vw;
    height: .48rem;
    background: #49BA94;
  }
  .home_header {
    font-size: 0.36rem;
    text-align: center;
    color: white;
    height: 0.96rem;
    line-height: 0.96rem;
    padding: 0 0.36rem;
  }
  .content {
    text-align: center;
    width: 5.5rem;
    margin: 70px auto 0;
    font-size: .26rem;
    .head_img {
      display: inline-block;
      margin-top: 50px;
      width: 1.4rem;
      height: 1.4rem;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .user_name {
      background:rgba(255,255,255,0.6);
      display: flex;
      border-radius: .45rem;
      height: .9rem;
      padding: 0 .45rem;
      align-items: center;
      margin: 20px 0;
      img {
        width: .3rem;
        height: .32rem;
      }
      input {
        width: 100%;
        background: transparent;
        height: .32rem;
        margin-left: 10px;
      }
    }
    .password {
      background:rgba(255,255,255,0.6);
      display: flex;
      border-radius: .45rem;
      height: .9rem;
      padding: 0 .45rem;
      align-items: center;
      input {
        width: 100%;
        background: transparent;
        height: .32rem;
        margin-left: 10px;
      }
      img.pass {
        width: .3rem;
        height: .32rem;
      }
      img.eye {
        width: .36rem;
        height: .16rem;

      }
    }
    .resetpassword {
      background:rgba(255,255,255,0.6);
      display: flex;
      border-radius: .45rem;
      height: .9rem;
      padding: 0 .45rem;
      margin-top: 20px;
      align-items: center;
      input {
        width: 100%;
        background: transparent;
        height: .32rem;
        margin-left: 10px;
      }
      img.pass {
        width: .3rem;
        height: .32rem;
      }
      img.eye {
        width: .36rem;
        height: .16rem;

      }
    }
    .info {
      color: #FFFFFF;
      font-size: .24rem;
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    .login_btn {
      width: 5.50rem;
      height: .90rem;
      line-height: .90rem;
      color: #15BF86;
      font-size: .38rem;
      background:rgba(255,255,255,1);
      box-shadow: 0px 2px 6px 0px rgba(20,146,104,0.8);
      border-radius: .45rem;
      margin: 50px 0 20px;
    }
    .register_btn {
      color: black;
    }
  }
}
</style>
