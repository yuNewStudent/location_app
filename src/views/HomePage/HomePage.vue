<template>
  <div>
    <header-page @changeDevice='changeDevice' :title='head_title'></header-page>
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
            <!-- <router-link tag='li' to='/homepage/alarmseting' class="setting_item">
              <img src="@/assets/icon/home/闹钟IC.png" alt="">
              <p>闹钟设置</p>
            </router-link> -->
            <!-- <router-link tag='li' to='/homepage/blacklist' class="setting_item">
              <img src="@/assets/icon/home/免打扰ic .png" alt="">
              <p>免打扰</p>
            </router-link> -->
            <router-link tag='li' to='/homepage/controlphone' class="setting_item">
              <img src="@/assets/icon/home/短信设置IC.png" alt="">
              <p>短信设置</p>
            </router-link>
          </ul>
        </div>
        <div class="current_address">
          <img src="@/assets/icon/home/定位IC.png" alt="">
          <span class="text">{{deviceInfo.address || '无信息'}}</span>
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
                <p class="time">更新时间：{{currentStep.stepDate?currentStep.stepDate:'无'}}</p>
                <p class="step">
                  <span>{{currentStep.stepCount?currentStep.stepCount:'0'}}步</span>
                  <!-- <span>距离5.3KM</span> -->
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
                <p class="time">更新时间：{{heart.length?heart[0].healthDate:'无数据'}}</p>
                <p class="step">
                  <span>{{heart.length?heart[0].healthUptodate + 'bpm' :'无数据'}}</span>
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
                <p class="time">更新时间：{{blood.length?blood[0].healthDate:'无数据'}}</p>
                <p class="step">
                  <span>高压{{blood.length?blood[0].healthHighpressure:'无数据'}}</span>
                  <span>低压{{blood.length?blood[0].healthLowpressure:'无数据'}}</span>
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
import { Toast } from 'mint-ui'
import AMap from 'AMap'
export default {
  data () {
    return {
      head_title: '首页',
      heart: [],
      blood: [],
      currentStep: {},
      geocoder: null,
      deviceInfo: {
        address: '',
        lng: '',
        lat: ''
      }
    }
  },
  components: {
    Slider,
    HeaderPage
  },
  created () {
    AMap.plugin(['AMap.Geocoder'], () => {
      this.geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
    })
    this.getHearthRate()
    this.getStep()
    this.getDeviceInfo()
  },
  computed: {
    ...mapGetters(['getHeart'])
  },
  methods: {
    ...mapMutations(['setHeart', 'setBlood', 'setStep', 'setDevicePosition']),
    getWearerDeviceId () {
      if (!localStorage.getItem('device')) return
      const wearerDeviceId = JSON.parse(localStorage.getItem('device')).wearerDeviceId
      return wearerDeviceId
    },
    // 获取心率and血压
    getHearthRate () {
      const data = {
        wearerDeviceId: this.getWearerDeviceId(),
        date: this.moment(new Date()).format('YYYY-MM-DD')
      }
      this.$http.get(`${config.httpBaseUrl}/health/getAll`, {
        params: data
      }).then(res => {
        if (res.code === 200) {
          const healths = res.date.healths
          if (!healths[0]) {
            this.heart = []
            this.blood = []
          } else {
            this.heart = [{
              healthDate: healths[0].healthDate,
              healthHeartrate: healths[0].healthHeartrate,
              healthUptodate: healths[0].healthUptodate,
              healthLowheartrate: healths[0].healthLowheartrate
            }]
            this.blood = [{
              healthDate: healths[0].healthDate,
              healthHighpressure: healths[0].healthHighpressure + 'mmHg',
              healthLowpressure: healths[0].healthLowpressure + 'mmHg'
            }]
          }
          this.setHeart(this.heart)
          this.setBlood(this.blood)
        }
      })
    },
    // 获取步数
    getStep () {
      const data = {
        wearerDeviceId: this.getWearerDeviceId(),
        date: this.moment(new Date()).format('YYYY-MM-DD')
      }
      this.$http.get(`${config.httpBaseUrl}/step/get`, {
        params: data
      }).then(res => {
        if (res.code === 200) {
          this.currentStep = {
            stepDate: res.date.step ? res.date.step.stepDate : '无',
            stepCount: res.date.step ? res.date.step.stepCount : '0'
          }
          this.setStep(this.currentStep)
        }
      })
    },
    // 获取当前位置
    getDeviceInfo () {
      const wearerDeviceId = this.getWearerDeviceId()
      this.$http.get(`${config.httpBaseUrl}/map/getMapuser`, {
        params: {
          userId: wearerDeviceId
        }
      }).then(res => {
        if (res.code === 200) {
          // 绘制当前人
          if (!res.date.pos) {
            this.deviceInfo = {
              address: '无信息',
              lng: '0.0',
              lat: '0.0'
            }
            this.setDevicePosition(this.deviceInfo)
            return
          }
          this.translateGps(res.date.pos.locationBean.longitude, res.date.pos.locationBean.latitude).then(data => {
            this.deviceInfo.lng = data[0].lng
            this.deviceInfo.lat = data[0].lat
            this.getAddress(data[0].lng, data[0].lat).then(data => {
              this.deviceInfo.address = data
              this.setDevicePosition(this.deviceInfo)
            })
          })
        }
      })
    },
    // 根据经纬度获取地址
    getAddress (lng, lat) {
      const lnglat = [lng, lat]
      return new Promise((resolve, reject) => {
        this.geocoder.getAddress(lnglat, (status, result) => {
          console.log(status, result)
          if (status === 'complete' && result.regeocode) {
            // address = result.regeocode.formattedAddress
            resolve(result.regeocode.formattedAddress)
          } else {
            this.deviceInfo.address = '无信息'
            this.setDevicePosition(this.deviceInfo)
            return
          }
        })
      })
    },
    // gps转高德坐标
    translateGps (lng, lat) {
      const gps = [lng, lat]
      return new Promise((resolve, reject) => {
        AMap.convertFrom(gps, 'gps', (status, result) => {
          if (result.info === 'ok') {
            resolve(result.locations)
          }
        })
      })
    },
    // 改变了选中设备，重新获取数据
    changeDevice () {
      this.getHearthRate()
      this.getStep()
      this.getDeviceInfo()
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
  background: #f0f2f5;
  .content {
    padding: 0.19rem 0.16rem 0;
    .setting {
      ul {
        display: flex;
        justify-content: space-between;
        .setting_item {
          display: flex;
          flex-direction: column;
          background: white;
          flex: 1;
          align-items: center;
          box-sizing: border-box;
          padding: .2rem 0;
          &:nth-child(2) {
            margin: 0 20px;
          }
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
      font-size: .24rem;
      margin: 0.16rem 0 0;
      display: flex;
      padding: 0 10px;
      align-items: center;
      img {
        width: .27rem;
        height: .35rem;
        margin-right: 5px;
      }
      .text {
        line-height: .3rem;
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
