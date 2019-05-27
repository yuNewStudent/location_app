<template>
  <div>
    <header-page :title='head_title'></header-page>
    <slider class="home_page">
      <div class="content">
        <div class="setting">
          <ul>
            <router-link tag='li' to='/homepage/phonebook' class="setting_item">
              <img src="@/assets/icon/home/电话本IC.png" alt="">
              <p>电话本</p>
            </router-link>
            <router-link tag='li' to='/homepage/emergencycontact' class="setting_item">
              <img src="@/assets/icon/home/SOS联系人IC.png" alt="">
              <p>SOS号码</p>
            </router-link>
            <router-link tag='li' to='/homepage/alarmseting' class="setting_item">
              <img src="@/assets/icon/home/闹钟IC.png" alt="">
              <p>闹钟设置</p>
            </router-link>
            <router-link tag='li' to='/homepage/blacklist' class="setting_item">
              <img src="@/assets/icon/home/免打扰ic .png" alt="">
              <p>免打扰</p>
            </router-link>
          </ul>
        </div>
        <div class="current_address">
          <img src="@/assets/icon/home/定位IC.png" alt="">成都市武侯区桂溪街道基泰路112OCG国际中心
        </div>
        <ul class="information">
          <router-link tag='li' to='/homepage/notestep' class="information_item">
            <div class="information_title">
              <span class="text">计步</span>
              <img src="@/assets/icon/home/箭头 拷贝.png" alt="">
            </div>
            <div class="details">
              <span class="img">
                <img src="@/assets/icon/home/计步IC.png" alt="">
              </span>
              <div class="desc">
                <p class="time">更新时间：2019-05-14 19：40</p>
                <p class="step">
                  <span>3879步</span>
                  <span>距离5.3KM</span>
                </p>
              </div>
            </div>
          </router-link>
          <router-link tag='li' to='/homepage/heartrate' class="information_item">
            <div class="information_title">
              <span class="text">心率</span>
              <img src="@/assets/icon/home/箭头 拷贝.png" alt="">
            </div>
            <div class="details">
              <span class="img">
                <img src="@/assets/icon/home/心率IC.png" alt="">
              </span>
              <div class="desc">
                <p class="time">更新时间：{{heart[0].healthDate}}</p>
                <p class="step">
                  <span>{{heart[0].healthUptodate}}</span>
                </p>
              </div>
            </div>
          </router-link>
          <!-- <li class="information_item" @click='isShowSleepPage=!isShowSleepPage'>
            <div class="information_title">
              <span class="text">睡眠</span>
              <img src="@/assets/icon/home/箭头 拷贝.png" alt="">
            </div>
            <div class="details">
              <span class="img">
                <img src="@/assets/icon/home/睡眠IC.png" alt="">
              </span>
              <div class="desc">
                <p class="time">更新时间：2019-05-14 19：40</p>
                <p class="step">
                  <span>浅睡眠</span>
                </p>
              </div>
            </div>
          </li> -->
          <router-link tag='li' to='/homepage/bloodpressure' class="information_item">
            <div class="information_title">
              <span class="text">血压</span>
              <img src="@/assets/icon/home/箭头 拷贝.png" alt="">
            </div>
            <div class="details">
              <span class="img">
                <img src="@/assets/icon/home/血压IC.png" alt="">
              </span>
              <div class="desc">
                <p class="time">更新时间：{{heart[0].healthDate}}</p>
                <p class="step">
                  <span>高压{{blood[0].healthHighpressure}}</span>
                  <span>低压{{blood[0].healthLowpressure}}</span>
                </p>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </slider>
    <router-view></router-view>
  </div>
</template>

<script>
import Slider from '@/components/scroll'
import HeaderPage from '@/components/Header'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      head_title: '首页',
      heart: [],
      blood: []
    }
  },
  components: {
    Slider,
    HeaderPage
  },
  created () {
    this.getHearthRate()
  },
  computed: {
    ...mapGetters(['getHeart'])
  },
  methods: {
    ...mapMutations(['setHeart', 'setBlood']),
    // 获取心率and血压
    getHearthRate () {
      const data = {
        wearerDeviceId: localStorage.deviceId,
        date: this.moment(new Date()).format('YYYY-MM-DD')
      }
      this.$http.get(`${config.httpBaseUrl}/health/getAll`, {
        params: data
      }).then(res => {
        if (res.code === 200) {
          console.log(res.date.healths)
          res.date.healths.forEach((item, index) => {
            this.heart.push({
              healthDate: item.healthDate,
              healthHeartrate: item.healthHeartrate,
              healthUptodate: item.healthUptodate,
              healthLowheartrate: item.healthLowheartrate
            })
            this.setHeart(this.heart)
            this.blood.push({
              healthDate: item.healthDate,
              healthHighpressure: item.healthHighpressure + 'mmHg',
              healthLowpressure: item.healthLowpressure + 'mmHg'
            })
            this.setBlood(this.blood)
          })
          // console.log(this.heart, this.blood)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home_page {
  position: absolute;
  top: 0.96rem;
  bottom: 0;
  width: 100vw;
  overflow: hidden;
  .content {
    background: #f0f2f5;
    padding: 0.19rem 0.16rem 0;
    .setting {
      ul {
        display: flex;
        justify-content: space-between;
        .setting_item {
          display: flex;
          flex-direction: column;
          background: white;
          width: 1.54rem;
          align-items: center;
          box-sizing: border-box;
          padding: .2rem 0;
          img {
            height: 0.9rem;
            width: 0.9rem;
          }
          p {
            font-size: 0.26rem;
            padding-top: .2rem
          }
        }
      }
    }
    .current_address {
      height: .9rem;
      background: white;
      font-size: .26rem;
      margin: 0.16rem 0 0;
      display: flex;
      padding: 0 10px;
      align-items: center;
      img {
        width: .27rem;
        height: .35rem;
        margin-right: 5px;
      }
    }
    .information {
      overflow: auto;
      .information_item {
        background: white;
        padding: 0 10px;
        margin: 0.16rem 0 0;
        .information_title {
          height: .66rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #EFEFEF;
          align-items: center;
          .text {
            font-size: .26rem
          }
          img {
            width: .16rem;
            height: .2rem;
          }
        }
        .details {
          display: flex;
          padding: .2rem 0;
          .img {
            img {
              width: .9rem;
              height: .9rem;
            }
          }
          .desc {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 5px;
            .time {
              font-size: .22rem;
              margin-bottom: 5px;
              color: #B9B9B9;
            }
            .step {
              font-size: .26rem;
              color: #15BF86;
            }
          }
        }
      }
    }
  }
}
</style>
