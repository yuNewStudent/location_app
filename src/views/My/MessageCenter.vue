<template>
  <div class="message_center">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='back'/>
      </span>
      <span class="title">消息中心</span>
      <span class="comfirm"></span>
    </div>
    <ul class="content">
      <!-- <li class="content_item">
        <div class="content_item_wrapper">
          <span class="content_d"></span>
          <div class="desc">
            <div class="ggggg">
              <p class="title">SOS报警</p>
              <p class="time">2019-04-01 09:36</p>
            </div>
            <p class="info">
              PaPa`s watch进行了SOS报警
            </p>
          </div>
        </div>
        <img class="isRead" src="@/assets/icon/my/2.png">
      </li>
      <li class="content_item">
        <div class="content_item_wrapper">
          <span class="content_d"></span>
          <div class="desc">
            <div class="ggggg">
              <p class="title">SOS报警</p>
              <p class="time">2019-04-01 09:36</p>
            </div>
            <p class="info">
              PaPa`s watch进行了SOS报警
            </p>
          </div>
        </div>
        <img class="isRead" src="@/assets/icon/my/2.png">
      </li> -->
      <li
        class="content_item"
        v-for='(item, index) in messages'
        :key='index' @click="read(item)">
        <div class="content_item_wrapper">
          <span class="content_d"></span>
          <div class="desc">
            <div class="ggggg">
              <p class="title">{{item.alarminformationType}}报警</p>
              <p class="time">{{item.alarminformationDate}}</p>
            </div>
            <p class="info" v-if="item.alarminformationType=='sos'">
              {{item.alarminformationName}}进行了{{item.alarminformationType}}报警
            </p>
            <p class="info" v-if="item.alarminformationType=='fence'">
              {{item.alarminformationName}}已经走出{{item.alarminformationType}}范围，请留意！
            </p>
             <p class="info" v-if="item.alarminformationType=='electricity'">
              {{item.alarminformationName}}电量低于10%,请尽快充电！
            </p>
          </div>
        </div>
        <span class="isRead">
          <img v-if='item.isRead' src="@/assets/icon/my/2.png">
          <img @click='handleChange' v-else src="@/assets/icon/my/选择—高亮 拷贝 2.png">
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wearerDeviceId:'',
      appuserId:'',
      messages: {}
    }
  },
  created(){
    var usernames = localStorage.getItem(('user') || '{}') 
    var userx = (JSON.parse(usernames) || '{}')
    this.appuserId = userx.appuserId;
    var devices = localStorage.getItem(('device') || '{}');
    var device=(JSON.parse(devices) || '{}')
    var wearerDeviceId=device.wearerDeviceId;
    this.wearerDeviceId=wearerDeviceId;
    this.information()
  },
  methods: {
    information(){
      this.$http
        .get(`${config.httpBaseUrl}/Alarminformation/get`, {
          params: {
            appuserId: this.appuserId,
            wearerDeviceId:this.wearerDeviceId,
          }
        })
        .then(res => {
          if (res.code === 200) {
            this.messages = res.date.alarminformations
            console.log(this.messages)
          }
        })
    },
    read(item){
        this.$http
        .get(`${config.httpBaseUrl}/Alarminformation/haavread`, {
          params: {
            appuserId: this.appuserId,
            type:item.alarminformationType,
            wearerDeviceId:this.wearerDeviceId,
          }
        })
        .then(res => {
          if (res.code === 200) {
           this.information();
          }
        })
    }, 
    back () {
      this.$router.push({ name: 'MyPage'})
    },
    handleChange (e) {
    }
  }
}
</script>

<style lang='scss' scoped>
.message_center {
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
      width: 90px;
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
      width: 90px;
      text-align: right;
      font-size: .28rem;
    }
  }
  .content {
    width: 100%;
    .content_item {
      width: 100%;
      background-color: #ffffff;
      box-shadow:0px 1px 4px 0px rgba(40,50,47,0.2);
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 10px 10px;
      .content_item_wrapper {
        display: flex;
        align-items: center;
        .content_d{
          width: 10px;
          height: 10px;
          background:rgba(246,51,51,1);
          border-radius: 50%;
        }
        .desc {
          margin-left: 5px;
          .ggggg {
            line-height: .5rem;
            .title {
              float: left;
              font-size: .30rem;
            }
            .time {
              float: right;
              font-size: .1rem;
              color: #b9b9b9;
            }
          }
          .info {
            line-height: .5rem;
            font-size: .15rem;
          }
        }
      }
      .isRead {
        img {
          position: relative;
          top: -10px;
          width: .3rem;
          height: .3rem;
        }
      }
    }
  }
}
</style>