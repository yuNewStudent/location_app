<template>
  <div class="message_center">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png'
             @click='back' />
      </span>
      <span class="title">消息中心</span>
      <span class="comfirm"></span>
    </div>
    <ul class="content"
        v-if='messages.length'>
      <li v-for='(item, index) in messages'
          :key='index'>
        <div class="content_item"
             v-for='(item, index) in item'
             :key='index'>
          <div class="content_item_wrapper">
            <span class="content_d"></span>
            <div class="desc"
                 v-if="item.alarminformationType=='sos'">
              <div class="ggggg">
                <p class="title">sos报警</p>
                <p class="time">{{item.alarminformationDate}}</p>
              </div>
              <p class="info">
                {{item.alarminformationName}}进行了sos报警
              </p>
            </div>
            <div class="desc"
                 v-if="item.alarminformationType=='fence'">
              <div class="ggggg">
                <p class="title">电子围栏报警</p>
                <p class="time">{{item.alarminformationDate}}</p>
              </div>
              <p class="info"
                 v-if="item.alarminformationType=='fence'">
                {{item.alarminformationName}}已经走出电子围栏范围，请留意！
              </p>
            </div>
            <div class="desc"
                 v-if="item.alarminformationType=='electricity'">
              <div class="ggggg">
                <p class="title">低电量报警</p>
                <p class="time">{{item.alarminformationDate}}</p>
              </div>
              <p class="info"
                 v-if="item.alarminformationType=='electricity'">
                {{item.alarminformationName}}电量低于10%,请尽快充电！
              </p>
            </div>
          </div>
          <span class="isRead"
                @click="read(item, index)">
            <img v-if='item.isRead'
                 src="@/assets/icon/my/2.png">
            <img @click='handleChange'
                 v-else
                 src="@/assets/icon/my/选择—高亮 拷贝 2.png">
          </span>
        </div>
      </li>
    </ul>
    <div v-else>
      <div class="nolist">
        <img src="@/assets/icon/my/wu.png">
        <P>您关注的手表状态良好,还没有报警信息</P>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wearerDeviceId: '',
      appuserId: '',
      messages: []
    }
  },
  created () {
    var usernames = localStorage.getItem(('user') || '{}')
    var userx = (JSON.parse(usernames) || '{}')
    this.appuserId = userx.appuserId
    var devices = localStorage.getItem(('device') || '{}')
    var device = (JSON.parse(devices) || '{}')
    var wearerDeviceId = device.wearerDeviceId
    this.wearerDeviceId = wearerDeviceId
    this.information()
  },
  methods: {
    information () {
      this.$http
        .get(`${config.httpBaseUrl}/Alarminformation/get`, {
          params: {
            appuserId: this.appuserId,
            wearerDeviceId: this.wearerDeviceId,
          }
        })
        .then(res => {
          if (res.code === 200) {
            if (res.date.alarminformations.length > 0) {
              this.messages = res.date.alarminformations
            } else {
            }
          }
        })
    },
    read (item, index) {
      this.$http.get(`${config.httpBaseUrl}/Alarminformation/havread`, {
        params: {
          appuserId: this.appuserId,
          havreadAlarminfoId: item.alarminformationId,
          wearerDeviceId: this.wearerDeviceId,
        }
      })
        .then(res => {
          if (res.code === 200) {
            this.messages.splice(index, 1)
            this.information()
          }
        })
    },
    back () {
      this.$router.push({ name: 'MyPage' })
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
  top: 0.48rem;
  bottom: 0;
  background: rgb(239, 239, 239);
  .home_header {
    background: #15bf86;
    color: white;
    box-sizing: border-box;
    height: 0.96rem;
    padding: 0 0.26rem;
    font-size: 0.36rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .back {
      width: 90px;
      img {
        width: 0.18rem;
        height: 0.25rem;
      }
    }
    .title {
      text-align: center;
      flex: 1;
    }
    .comfirm {
      width: 90px;
      text-align: right;
      font-size: 0.28rem;
    }
  }
  .content {
    width: 100%;
    position: fixed;
    top: 1.44rem;
    bottom: 0;
    overflow: auto;
    .content_item {
      width: 100%;
      background-color: #ffffff;
      box-shadow: 0px 1px 4px 0px rgba(40, 50, 47, 0.2);
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 10px 10px;
      .content_item_wrapper {
        display: flex;
        align-items: center;
        .content_d {
          width: 10px;
          height: 10px;
          background: rgba(246, 51, 51, 1);
          border-radius: 50%;
        }
        .desc {
          margin-left: 5px;
          .ggggg {
            line-height: 0.5rem;
            .title {
              float: left;
              font-size: 0.3rem;
              margin-right: 5px;
            }
            .time {
              float: right;
              font-size: 0.1rem;
              color: #b9b9b9;
            }
          }
          .info {
            line-height: 0.5rem;
            font-size: 0.15rem;
          }
        }
      }
      .isRead {
        img {
          position: relative;
          top: -10px;
          width: 0.3rem;
          height: 0.3rem;
        }
      }
    }
  }
  .nolist {
    width: 100vw;
    position: absolute;
    top: 0.96rem;
    bottom: 0;
    text-align: center;
    background: white;
    img {
      margin-top: 50px;
      width: 5.5rem;
      height: 6.05rem;
      border-radius: 50%;
    }
    p {
      font-size: 14px;
      color: #888888;
    }
  }
}
</style>