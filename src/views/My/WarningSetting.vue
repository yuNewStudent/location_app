<template>
  <div class="warning_setting">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='back'/>
      </span>
      <span class="title">报警设置</span>
      <span class="comfirm"></span>
    </div>
    <div class="content" v-if='show'>
      <div class="content_l">
        <div class="content_left">
          <p>SOS报警</p>
        </div>
        <div class="content_middle">
        </div>
        <div class="content_right">
          <mt-switch @change="changeSosStatus" v-model="alarmswitchSosType"></mt-switch>
        </div>
      </div>
      <div class="content_l">
        <div class="content_left">
          <p>低电量报警</p>
        </div>
        <div class="content_middle">
        </div>
        <div class="content_right">
          <mt-switch @change="lowbattery" v-model="alarmswitchElectricityType"></mt-switch>
        </div>
      </div>
      <div class="content_c">
        <P>默认状态下，当手表电量低于10%时进行报警，您也可以通过点击
          <span class="content_t">"低电量报警"</span>进行<span class="content_t">自定义</span>设置。
        </P>
      </div>
      <div class="content_l">
        <div class="content_left">
          <p>智能围拦报警</p>
        </div>
        <div class="content_middle">
        </div>
        <div class="content_right">
          <mt-switch @change='Intelligent' v-model="alarmswitchFenceType"></mt-switch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Switch, MessageBox, Toast } from 'mint-ui'
export default {
  data () {
    return {
      show: false,
      appuserId: '',
      alarmswitchSosType: false,
      alarmswitchElectricityType: false,
      alarmswitchFenceType: false,
    }
  },
  created () {
    var usernames = localStorage.getItem(('user') || '{}') 
    var userx = (JSON.parse(usernames) || '{}')
    this.appuserId = userx.appuserId
    this.Queryall()
  },
  methods: {
    Queryall(){
      this.$http.get(`${config.httpBaseUrl}/alarms/get`, {
        params:{
          appuserId: this.appuserId
        }
      }).then(res => {
        if (res.code === 200) {
          if (res.date.alarmswitch.alarmswitchSosType) {
            this.alarmswitchSosType = true
          } else {
            this.alarmswitchSosType = false
          }
          if(res.date.alarmswitch.alarmswitchElectricityType){
            this.alarmswitchElectricityType = true
          } else {
            this.alarmswitchElectricityType = false
          }
          if (res.date.alarmswitch.alarmswitchFenceType) {
            this.alarmswitchFenceType = true
          } else {
            this.alarmswitchFenceType = false
          }
        }
        this.show = true
      })
    },
    back () {
      this.$router.push({ name: 'MyPage'})
    },
    // SoS报警
    changeSosStatus () {
      this.changeStatus('sos', this.alarmswitchSosType)
    },
    // 智能围栏报警
    Intelligent () {
      this.changeStatus('fence', this.alarmswitchFenceType)
    },
    // 低电量报警
    lowbattery () {
      this.changeStatus('electricity', this.alarmswitchElectricityType)
    },
    changeStatus (type, status) {
      if (status) {
        status = 1
      } else {
        status = 0
      }
      this.$http.get(`${config.httpBaseUrl}/alarms/shutdown`, {
        params: {
          type,
          appuserId: this.appuserId,
          status
        }
      }).then(res => {
        if (res.code === 200) {
          Toast({
            message: '修改成功',
            iconClass: 'icon icon-success'
          })
        }
      })
    },
  }
}
</script>

<style lang='scss' scoped>
.warning_setting {
  width: 100vw;
  position: fixed;
  top: .48rem;
  bottom: 0;
  background: rgb(239,239,239);
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
    width: 100%;
  }
  .content_k{
    width: 100%;
    background: rgb(239,239,239);
    height: .10rem;
  }
  .content_l{
    width: 100%;
    display:flex;
    background-color: #ffffff;
    box-shadow: 0px 15px 10px -20px #888888;
    margin-bottom: 10px;
  }
  .content_left{
    width: 30%;
    font-size: .20rem;
    margin: .25rem .0rem;
    line-height: .25rem;
  }
  .content_left p{
    margin-top: .1rem;
    margin-left: .2rem;
    line-height: .25rem;
  }
.content_middle{
  width:50%;
  margin: .25rem .0rem;
  font-size: .20rem;
}
.content_middle span{
  line-height: .25rem;
  font-size: .20rem;
}
.content_right{
  width:20%;
  margin: .25rem .0rem;
  font-size: .20rem;
  text-align: right;
  float: right;
}
.content_t{
  color: #000;
}
.content_c{
  padding: 0 8px 8px;
}
.content_c p {
  font-size: .2rem;
  line-height: .4rem;
  color: rgba(185, 185, 185, 1);
  }
}
</style>