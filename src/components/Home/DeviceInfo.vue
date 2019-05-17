<template>
  <div class="add_device">
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='handleClose'/>
      <span class="title">绑定信息</span>
    </div>
    <div class="content">
      <p class="title">
        <img class='headImg' src="@/assets/icon/home/userImg.png" alt="">
        <img class='more' src="@/assets/icon/home/箭头 拷贝.png" alt="">
      </p>
      <p>
        <img src="@/assets/icon/home/昵称IC.png" alt="">
        <span>昵称</span>
        <input v-model="deviceInfo.name" type="text">
      </p>
      <p>
        <img src="@/assets/icon/home/生日IC.png" alt="">
        <span>生日</span>
        <input v-model="deviceInfo.name" type="text">
      </p>
      <div class="sex">
        <img src="@/assets/icon/home/性别IC.png" alt="">
        <span>性别</span>
        <div>男:<input name='sex' v-model="deviceInfo.name" type="radio"></div>
        <div>女:<input name='sex' v-model="deviceInfo.name" type="radio"></div>
      </div>
      <p>
        <img src="@/assets/icon/home/身高IC.png" alt="">
        <span>身高</span>
        <input v-model="deviceInfo.name" type="text">
      </p>
      <p>
        <img src="@/assets/icon/home/体重IC.png" alt="">
        <span>体重</span>
        <input v-model="deviceInfo.name" type="text">
      </p>
      <p>
        <img src="@/assets/icon/home/家庭住址ic .png" alt="">
        <span>家庭住址</span>
        <input v-model="deviceInfo.address" type="text">
      </p>
      <div class="next">
        <button @click='handlecomfirm'>确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add_device',
  data () {
    return {
      deviceInfo: {
        name: '',
        address: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeDeviceInfo')
    },
    handlecomfirm () {
      this.$emit('addDevice', this.deviceInfo)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.add_device {
  position: fixed;
  top: .48rem;
  bottom: 0;
  background: white;
  z-index: 3;
  width: 100vw;
  .home_header {
    background: #15BF86;
    color: white;
    box-sizing: border-box;
    height: 0.96rem;
    padding: 0 0.26rem;
    font-size: .36rem;
    line-height: .96rem;
    position: relative;
    .back {
      position: absolute;
      z-index: 2;
      width: .18rem;
      height: .25rem;
      top: .35rem;
    }
    .title {
      position: absolute;
      left: 0;
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
  .content {
    padding: .16rem;
    box-sizing: border-box;
    .title {
      display: flex;
      justify-content: space-between;
      .headImg {
        width: .7rem;
        height: .7rem;
      }
      .more {
        width: .18rem;
        height: .24rem;
      }
    }
    p {
      display: flex;
      align-items: center;
      font-size: .24rem;
      padding: 8px;
      border-bottom: 1px solid #EEEEEE;
      img {
        width: .43rem;
        height: .47rem;
      }
      span {
        margin-left: 15px;
        color: #B9B9B9;
      }
      input {
        flex: 1;
        text-align: right;
        outline: none;
      }
    }
    .sex {
      display: flex;
      align-items: center;
      font-size: .24rem;
      padding: 8px;
      border-bottom: 1px solid #EEEEEE;
      color: #B9B9B9;
      img {
        width: .43rem;
        height: .47rem;
      }
      span {
        margin-left: 15px;
        color: #B9B9B9;
      }
      >div {
        margin-left: 70px;
        display: flex;
        align-items: center;
        input {
          margin-left: 5px;
        }
      }
    }
    // .scan_wrapper {
    //   width: 100%;
    //   height: 1rem;
    //   border: 1px solid rgba(209,209,209,1);
    //   border-radius: 5px;
    //   display: flex;
    //   box-sizing: border-box;
    //   align-items: center;
    //   padding: 0 10px;
    //   input {
    //     width: 100px;
    //     font-size: .24rem;
    //     // height: 30px;
    //     background: transparent;
    //     outline: none;
    //     flex: 1;
    //   }
    //   img {
    //     width: .66rem;
    //     height: .66rem;
    //   }
    // }
    .next {
      color: white;
      margin: 20px auto;
      width: 5.3rem;
      line-height: .6rem;
      button {
        width: 5.3rem;
        height: .6rem;
        border: none;
        border-radius: 15px;
        outline: none;
        color: white;
        background: linear-gradient(-90deg,rgba(51,221,164,1), rgba(21,191,134,1))
      }
    }
  }
}
</style>
