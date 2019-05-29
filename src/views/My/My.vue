<template>
  <div class="my_page">
    <div class="home_header">我的</div>
    <div class="user">
      <p class="head_img">
        <img src="@/assets/icon/home/userImg.png" alt="">
      </p>
      <p class="user_name">{{username||"无"}}</p>
    </div>
    <div class="content">
      <ul>
        <router-link tag='li' to='/my/deviceList' class="item">
          <img class="icon" src="@/assets/icon/my/设备列表IC.png" alt="">
          <span>设备列表</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </router-link>
        <router-link tag='li' to='/my/warningSetting' class="item">
          <img class="icon" src="@/assets/icon/my/报警设置IC.png" alt="">
          <span>报警设置</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </router-link>
        <router-link tag='li' to='/my/messagecenter' class="item">
          <img class="icon" src="@/assets/icon/my/消息中心IC.png" alt="">
          <span>消息中心</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </router-link>
        <!-- <router-link tag='li' to='/my/finddevice' class="item">
          <img class="icon" src="@/assets/icon/my/找设备IC.png" alt="">
          <span>找设备</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </router-link> -->
        <router-link tag='li' to='/my/accountManage' class="item">
          <img class="icon" src="@/assets/icon/my/账号管理IC.png" alt="">
          <span>账号管理</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  created () {
    var usernames = localStorage.getItem(('user')||'{}')
    var userx = (JSON.parse(usernames)||'{}')
    if(userx === '{}'){
      this.username = ''
    }else{
      this.username = userx.appuserNumber
    }
  }
}
</script>

<style lang="scss" scoped>
.my_page {
  .home_header {
    font-size: 0.36rem;
    text-align: center;
    color: white;
    height: 0.96rem;
    line-height: 0.96rem;
    padding: 0 0.36rem 2.4rem;
    background: #15BF86;
  }
  .user {
    text-align: center;
    width: 5.00rem;
    height: 3.00rem;
    background:rgba(255,255,255,1);
    box-shadow: 0px 2px 5px 0px rgba(40,50,47,0.4);
    border-radius: .10rem;
    padding: .61rem;
    box-sizing: border-box;
    position: fixed;
    top: 1.7rem;
    left: 50%;
    margin-left: -2.5rem;
    .head_img {
      display: inline-block;
      width: 1.2rem;
      height: 1.2rem;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .user_name {
      margin-top: 10px;
      font-size: .28rem;
    }
  }
  .content {
    padding: 0 .26rem;
    margin-top: 80px;
    .item {
      height: .6rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #EFEFEF;
      padding: 10px 0 2px;
      .icon {
        width: .54rem;
        height: .54rem;
      }
      span {
        font-size: .26rem;
        flex: 1;
        margin-left: 10px;
      }
      .more {
        text-align: right;
        width: .18rem;
        height: .24rem;
      }
    }
  }
}
</style>
