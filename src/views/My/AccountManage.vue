<template>
  <div class="account_manage">
    <div class="home_header">
      <span class="back">
        <img  src='@/assets/icon/home/箭头.png' @click='back'/>
      </span>
      <span class="title">账号管理</span>
      <span class="comfirm"></span>
    </div>
    <div class="content">
      <div class="title">
        <img class="icont" :src="appuserImage?appuserImage:require('@/assets/icon/home/userImg.png')" alt="">
          <input type="file" name="" style=" position: absolute;
          top:42px;
          right: 0;
          width: 100%;
          border-radius: 50%;
          outline: none;
          opacity: 0;
          cursor: pointer;
          " accept="image/gif,image/jpeg,image/jpg,image/png" @change="fileChange">
        <span></span>
        <img class="more" src="@/assets/icon/my/箭头.png" alt="">
      </div>
      <ul>
        <li  class="item" @click="username">
          <img class="icon" src="@/assets/icon/my/用户名IC.png" alt="">
          <span>用户名</span>
          <span class="itemc">{{appuserName||'无'}}</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </li>
        <li  class="item" @click="passwordb">
          <img class="icon" src="@/assets/icon/my/密码IC.png" alt="">
          <span>密码</span>
          <span class="itemc" @touchend="touchend" v-if="play">******</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </li>
        <li  class="item" @click="changephone">
          <img class="icon" src="@/assets/icon/my/手机IC.png" alt="">
          <span>绑定手机号码</span>
          <span class="itemc">{{appuserNumber}}</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </li>
       </ul>
       <div @click='handleLogin' class="exitlogin">退出登陆</div>
    </div>
    <change-password
      v-if='isShowAddPhoneBook'
      @addContact='AddContact'
      :title='title.add'></change-password>
  </div>
</template>

<script>
import { Actionsheet, Toast, MessageBox } from 'mint-ui'
import ChangePassword from '@/components/my/changenumber'
export default {
  data () {
    return {
      inputtext : {
        phone : '',
        password:'',
      },
      play: true,
      appuserName:'',
      appuserImage:'',
      appuserId:'',
      title: {
        phone : '',
        password:'',
      },
      appuserNumber:'',
      isShowAddPhoneBook: false,
      title: {
        add: '修改密码'
      }
    }
  },
  components: {
    ChangePassword
  },
  created(){
    var usernames = this.$cookie.get(('user') || '{}')
    var userx = (JSON.parse(usernames) || '{}')
    this.appuserId = userx.appuser.appuserId
    this.getinformation()
  },
  methods: {
    touchend () {
    },
    // 查询用户信息
    getinformation(){
      this.$http.get(`${config.httpBaseUrl}/appuser/get`, {
        params: {
          appuserId: this.appuserId
        }
      }).then(res => {
        if (res.code === 200) {
          this.appuserName = res.date.appuser.appuserName
          this.appuserImage = res.date.appuser.appuserImage
          this.appuserNumber = res.date.appuser.appuserNumber
          let userInfo = {
            appuserName: this.appuserName,
            appuserImage: this.appuserImage,
            appuserNumber: this.appuserNumber,
            appuserId: res.date.appuser.appuserId
          }
          localStorage.setItem('user', JSON.stringify(userInfo))
          // this.$cookie.set('user', JSON.stringify(userInfo))
        }
      })
    },
    back () {
      this.$router.push({ name: 'MyPage'})
    },
    handleLogin () {
      var _this = this
      Toast({
        message: '退出登陆',
        iconClass: 'icon icon-success'
      })
      this.$cookie.delete('user') 
        _this.$router.push({
          name: 'Login'
      })
    },
    // 更改用户名
    username(){
      MessageBox.prompt('更改用户名', {
        inputValidator: (val) => {
          if (val === null) {
            return true//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
          }
        }, inputErrorMessage: '输入不能为空'
      }).then((val) => {
        this.$http.post(`${config.httpBaseUrl}/appuser/updatename`, {
          appuserName: val.value,
          appuserId:this.appuserId
        }).then(res => {
          if (res.code === 200) {
            this.getinformation()
            Toast({
              message: '操作成功',
              iconClass: 'icon icon-success'
            })
          }else{
          }
        })
      }, () => {
        console.info('cancel')
      })
    },
    passwordb () {
      this.isShowAddPhoneBook = true
    },
    fileChange (e) {
      var that = this
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.onload = function (e) {
        console.log(e.target.result)
        that.appuserImage  = e.target.result
        that.upload(that.appuserImage)
      }
      reader.readAsDataURL(file)
    },
    upload (url) {
      this.$http.post(`${config.httpBaseUrl}/appuser/updateImage`,{
        appuserImage: url,
        appuserId: this.appuserId
      }).then(res => {
        console.log(res)
        // if (res.code === 200) {
        //   Toast({
        //     message: '头像修改成功',
        //     iconClass: 'icon icon-success'
        //   })
        //   this.getinformation()
        // }
      })
    },
    AddContact (bol, personInfo) {
      console.log(personInfo)
      this.isShowAddPhoneBook = false
      if (bol) {
        for (var k in personInfo) {
          if (!personInfo[k]) {
            return Toast({
              message: '人员信息不能为空',
              iconClass: 'icon icon-error'
            })
          }else if(personInfo.appuserPassword!=personInfo.confirmpassword){
            return Toast({
              message: '输入密码不一致',
              iconClass: 'icon icon-error'
            })
          }else if(personInfo.appuserNumber!=this.appuserNumber){
            return Toast({
              message: '不是原手机号码',
              iconClass: 'icon icon-error'
            })
          }
        }
        var date = {
          appuserNumber:personInfo.appuserNumber,
          appuserPassword:personInfo.appuserPassword
        }
        this.$http.post(`${config.httpBaseUrl}/appuser/changePassword`, date).then(res => {
          if (res.code === 200) {
            this.getinformation()
            Toast({
              message: '操作成功',
              iconClass: 'icon icon-success'
            })
          }
        })
      } else {}
    },
    // 整个方法没有被执行
    homeTel () {
      let telValue = this.$refs.homeTel.value
      console.log(telValue)
      // 对比input内的值是否符合
      if (this.reg.test(telValue)) {
          this.isShowPhoneError = true
          this.cc = true;
          console.log('1')
      } else {
        this.isShowPhoneError = true 
        this.cc = false
        console.log('2')
      }
    },
    changephone () {
      MessageBox.prompt('更改手机号码', {
        inputValidator: (val) => {
          if (val === null) {
            return true//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
          }
        }, inputErrorMessage: '输入不能为空'
      }).then((val) => {
         this.$http
            .post(`${config.httpBaseUrl}/appuser/updatenumber`, {
                appuserNumber: val.value,
                appuserId:this.appuserId
            })
            .then(res => {
              if (res.code === 200) {
                this.getinformation();
              }else{

              }
            });
      }, () => {
        console.info('cancel')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.account_manage {
  width: 100vw;
  position: fixed;
  top: .48rem;
  bottom: 0;
  background: #ffffff;
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
    padding: 0 .26rem;
    .title {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #EFEFEF;
      padding: 20px 0 10px;
      justify-content: space-between;
      .icont {
        width: .9rem;
        height:.9rem;
        border-radius:50%;
      }
    }
    .more {
      text-align: right;
      width: .18rem;
      height: .24rem;
    }
    .item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #EFEFEF;
      padding: 20px 0 5px;
      .icon {
        width: .3rem;
        height: .32rem;
      }
      span {
        font-size: .26rem;
        flex: 1;
        margin-left: 10px;
      }
      .itemc {
        text-align: right;
        margin-right: .3rem;
      }
      .home_input {
        border: 1px solid;
      }
    }
    .exitlogin {
      width: 5rem;
      height: .80rem;
      line-height: .80rem;
      color: #ffffff;
      font-size: .38rem;
      text-align: center;
      background:#15BF86;
      margin: 0 auto;
      box-shadow: 0px 2px 6px 0px rgba(20,146,104,0.8);
      border-radius: .45rem;
      margin: 100px auto 0;
    }
  }
}
</style>