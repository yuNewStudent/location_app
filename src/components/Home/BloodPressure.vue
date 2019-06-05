<template>
  <div class="blood_pressure">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='closeBloodPressure'/>
      </span>
      <span class="title">血压</span>
      <span class="comfirm"></span>
    </div>
    <div class="content">
      <div class="one_day">
        <p class="title">
          <span :class='{active:!isBack}' class="back" @click="handleBack">前一天</span>
          <span class="date">{{getDate}}</span>
          <span :class='{active:!isNext}' class="next" @click="handleNext">后一天</span>
        </p>
        <p class="text">当前血压</p>
        <div class="blood">
          <div class="high">高压:<span>{{currentBlood?currentBlood.healthHighpressure:'无数据'}}</span></div>
          <div class="low">低压<span>{{currentBlood?currentBlood.healthLowpressure:'无数据'}}</span></div>
        </div>
        <p class="long_range">远程测量</p>
      </div>
      <div class="all_day">
        <div class="title">本周血压</div>
        <div id="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      currentBlood: null,
      allBlood: [],
      lowPressures: [],
      highPressures: [],
      currentIndex: 0,
      isBack: true,
      isNext: false
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['getBlood']),
    // 获取日期
    getDate () {
      let date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * (this.currentIndex))
      return this.moment(date).format('YYYY-MM-DD')
    }
  },
  created () {
    this.currentBlood = this.getBlood[0]
    this.getWeekHearthRate()
  },
  methods: {
    closeBloodPressure () {
      this.$router.go(-1)
    },
    getChartDate (type) {
      const today = new Date().getDay()
      if (type === 'lowPressures') {
        let lowPressures = Object.assign([], this.lowPressures)
        return lowPressures.reverse()
      }
      if (type === 'highPressures') {
        let highPressures = Object.assign([], this.highPressures)
        return highPressures.reverse()
      }
      if (type === 'week') {
        let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        if (today !== 7) {
          const a = week.splice(0, today)
          week = week.concat(a)
        }
        return week
      }
    },
    initChart () {
      let chart = echarts.init(document.getElementById('chart'))
      const option = {
        grid: {
          top: 30
        },
        xAxis: {
          type: 'category',
          data: this.getChartDate('week')
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          itemStyle: {
            normal: {
              color: '#15BF86',
              label: {
                // 开启显示
                show: true,
                // 在上方显示
                position: 'bottom',
                // 数值样式
                textStyle: {
                  fontSize: 12,
                  fontWeight: 500
                }
              }
            }
          },
          data: this.getChartDate('lowPressures'),
          type: 'line'
        },
        {
          itemStyle: {
            normal: {
              color: '#E19C35',
              label: {
                // 开启显示
                show: true,
                // 在上方显示
                position: 'top',
                // 数值样式
                textStyle: {
                  color: '#E19C35',
                  fontSize: 12,
                  fontWeight: 500
                }
              }
            }
          },
          data: this.getChartDate('highPressures'),
          type: 'line'
        }]
      }
      chart.setOption(option)
    },
    // 展示前一天
    handleBack () {
      if (this.currentIndex === 6) {
        return Toast({
          message: '已更多无数据',
          iconClass: 'icon icon-success'
        })
      }
      this.currentIndex += 1
      this.currentBlood = this.allBlood[this.currentIndex]
      this.isNext = true
      if (this.currentIndex === 6) {
        this.isBack = false
      }
    },
    // 展示后一天
    handleNext () {
      if (this.currentIndex === 0) {
        return Toast({
          message: '已更多无数据',
          iconClass: 'icon icon-success'
        })
      }
      this.isBack = true
      this.currentIndex -= 1
      this.currentBlood = this.allBlood[this.currentIndex]
      if (this.currentIndex === 0) {
        this.isNext = false
      }
    },
    // 获取血压
    getWeekHearthRate () {
      const data = {
        wearerDeviceId: JSON.parse(localStorage.getItem('device')).wearerDeviceId
      }
      this.$http.get(`${config.httpBaseUrl}/health/getweek`, {
        params: data
      }).then(res => {
        if (res.code === 200) {
          // if (!res.date.healths.length) {
          //   return Toast({
          //     message: '无数据',
          //     iconClass: 'icon icon-success'
          //   })
          // }
          res.date.healths.forEach((item, index) => {
            if (item) {
              this.allBlood.push({
                healthHighpressure: item.healthHighpressure + 'mmHg',
                healthLowpressure: item.healthLowpressure + 'mmHg'
              })
              this.lowPressures.push(item.healthLowpressure)
              this.highPressures.push(item.healthHighpressure)
            } else {
              this.allBlood.push({
                healthHighpressure: '无数据',
                healthLowpressure: '无数据'
              })
              this.lowPressures.push('')
              this.highPressures.push('')
            }
          })
          this.initChart()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.blood_pressure {
  position: fixed;
  top: .48rem;
  bottom: 0;
  background: #f0f2f5;
  z-index: 3;
  width: 100vw;
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
    .one_day {
      padding: .36rem;
      background: white;
      height: 4rem;
      box-sizing: border-box;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: .24rem;
        .back {
          width: 1rem;
          height: .5rem;
          text-align: center;
          line-height: .5rem;
          color: #15BF86;
          border: 1px solid #15BF86;
        }
        .date {}
        .next {
          width: 1rem;
          height: .5rem;
          text-align: center;
          line-height: .5rem;
          color: #15BF86;
          border: 1px solid #15BF86;
        }
        .active {
          color: #B9B9B9;
          border: 1px solid #B9B9B9;
        }
      }
      .text {
        text-align: center;
        font-size: .28rem;
        margin: .5rem 0;
      }
      .blood {
        text-align: center;
        font-size: .26rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: .5rem 0;
        .high {
          margin-right: 20px;
        }
        span {
          font-size: .36rem;
          margin-left: 5px;
          color: #15BF86;
        }
      }
      .long_range {
        width: 4rem;
        height: .6rem;
        line-height: .6rem;
        background: linear-gradient(-90deg,rgba(21,191,134,1),rgba(51,221,164,1));
        border-radius: .30rem;
        font-size: .28rem;
        text-align: center;
        margin: 0 auto;
        color: white;
      }
    }
    .all_day {
      position: fixed;
      top: 5.54rem;
      bottom: 0;
      width: 100vw;
      background: white;
      margin-top: 10px;
      padding: 10px 10px 0;
      .title {
        font-size: .28rem;
        border-left: 2px solid #15BF86;
        padding-left: 5px;
      }
      #chart {
        height: 90%;
        width: 100%;
      }
    }
  }
}
</style>
