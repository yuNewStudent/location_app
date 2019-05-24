<template>
  <div class="add_device">
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='handleClose'/>
      <span class="title">绑定信息</span>
    </div>
    <div class="content">
      <p class="title">
        <img class='headImg' :src="deviceInfo.wearerImage?deviceInfo.wearerImage:require('@/assets/icon/home/userImg.png')" alt="">
       <input type="file" name="" style=" position: absolute;
            top:55px;
            right: 0;
            width: 100%;
            height:53px;
            border-radius: 50%;
            outline: none;
            opacity: 0;
            cursor: pointer;
            " accept="image/gif,image/jpeg,image/jpg,image/png" @change="fileChange">
        <img class='more' src="@/assets/icon/home/箭头 拷贝.png" alt="">
      </p>
      <p>
        <img src="@/assets/icon/home/昵称IC.png" alt="">
        <span>昵称</span>
        <input v-model="deviceInfo.wearerNickname" type="text">
      </p>
      <p>
        <img src="@/assets/icon/home/生日IC.png" alt="">
        <span>生日</span>
          <mt-datetime-picker
        @confirm="handleConfirm" 
        v-model="deviceInfo.wearerBirthday"
        :startDate="new Date('1900/1/1')"
        ref="picker"
        type="date"
        year-format="{value}-"
        month-format="{value}-"
        date-format="{value}">
      </mt-datetime-picker>
        <input v-model="deviceInfo.wearerBirthday" @focus="openPicker" type="text">
      </p>
      <div class="sex">
        <img src="@/assets/icon/home/性别IC.png" alt="">
        <span>性别</span>
        <div>男:<input name='sex' v-model="deviceInfo.wearerGender" value="1" type="radio"></div>
        <div>女:<input name='sex' v-model="deviceInfo.wearerGender" value="2" type="radio"></div>
      </div>
      <p>
        <img src="@/assets/icon/home/身高IC.png" alt="">
        <span>身高</span>
        <input v-model="deviceInfo.wearerHeight" type="text">
      </p>
      <p>
        <img src="@/assets/icon/home/体重IC.png" alt="">
        <span>体重</span>
        <input v-model="deviceInfo.wearerWeight" type="text">
      </p>
      <p>
        <img src="@/assets/icon/home/家庭住址ic .png" alt="">
        <span>家庭住址</span>
        <input v-model="deviceInfo.wearerAddress" type="text">
      </p>
      <div class="next">
        <button @click='handlecomfirm'>确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Switch, Toast, DatetimePicker } from 'mint-ui'
export default {
  name: 'add_device',
  data () {
    return {
      deviceInfo: {
        wearerHeight: '',
        wearerWeight: '',
        wearerImage:'',
        wearerAddress:"",
        wearerDeviceId:'12212112',
        wearerGender:'',
        wearerBirthday:'',
        wearerNickname:'',
        wearerAppuserId:'',
      }
    }
  },
  created () {
    var usernames=this.$cookie.get(('user')||'{}'); ;
    var userx=(JSON.parse(usernames)||'{}');
    this.deviceInfo.wearerAppuserId=userx.appuser.appuserId;
  },
  methods: {
    handleClose () {
      this.$emit('closeDeviceInfo')
    },
    openPicker() {
        this.$refs.picker.open();
        document.activeElement.blur();
      },
       fileChange(e) {
            var that = this;
            var file = e.target.files[0];
            console.log(file)
            var reader = new FileReader();
            reader.onload = function(e){
                that.deviceInfo.wearerImage  = e.target.result;
            }
            reader.readAsDataURL(file);
        },
    //日期选择
    handleConfirm (data) {
      this.deviceInfo.wearerBirthday = this.moment(data).format('YYYY-MM-DD')   //获取的时间为时间戳，getdata是自己写的一个转换时间的方法
    },
    handlecomfirm () {
        this.$http.post(`${config.httpBaseUrl}/wearer/insert`, this.deviceInfo).then(res => {
          if (res.code === 200) {
            console.log(this.deviceInfo);
            this.$emit('addDevice', this.deviceInfo)
            Toast({
              message: '信息添加成功',
              iconClass: 'icon icon-success'
            })
           }else{
             Toast({
              message: '信息添加失败',
              iconClass: 'icon icon-success'
            })
           }
        });
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
