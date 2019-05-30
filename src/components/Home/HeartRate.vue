<template>
  <div class="heat_rate">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='closeHeartRate'/>
      </span>
      <span class="title">心率</span>
      <span class="comfirm"></span>
    </div>
    <div class="content">
      <div class="one_day">
        <p class="title">
          <span :class='{active:!isBack}' class="back" @click="handleBack">前一天</span>
          <span class="date">{{getDate}}</span>
          <span :class='{active:!isNext}' class="next" @click="handleNext">后一天</span>
        </p>
        <div class="current">
          <div class="current_wrapper">
            <p class="text">当前心率</p>
            <p class="num">{{currentHeart?currentHeart.healthUptodate:'无'}}<span>bpm</span></p>
            <!-- <p class="active">远程测量</p> -->
          </div>
        </div>
        <p class="desc">
          <span>最高:{{currentHeart?currentHeart.healthHeartrate:'无'}}bpm</span>
          <span>平均:{{currentHeart?(JSON.parse(currentHeart.healthHeartrate)+JSON.parse(currentHeart.healthLowheartrate))/2:'无'}}bpm</span>
          <span>最低:{{currentHeart?currentHeart.healthHeartrate:'无'}}bpm</span>
        </p>
      </div>
      <div class="all_day">
        <div class="title">本周心率</div>
        <div id="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { constants } from 'fs';
export default {
  data () {
    return {
      currentHeart: null,
      allHeart: [],
      hearts: [],
      currentIndex: 0,
      isBack: true,
      isNext: false
    }
  },
  created () {
    this.currentHeart = this.getHeart[0]
    this.getWeekHearthRate()
  },
  mounted () {
    // this.getHearthRate()
  },
  computed: {
    ...mapGetters(['getHeart']),
    // 获取日期
    getDate () {
      let date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * (this.currentIndex))
      return this.moment(date).format('YYYY-MM-DD')
    }
  },
  methods: {
    closeHeartRate () {
      this.$router.go(-1)
    },
    getChartDate (type) {
      const today = new Date().getDay()
      if (type === 'heart') {
        let hearts = Object.assign([], this.hearts)
        // const a = hearts.splice(0, 1)
        // hearts = hearts.concat(a)
        return hearts.reverse()
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
                position: 'top',
                // 数值样式
                textStyle: {
                  fontSize: 12,
                  fontWeight: 500
                }
              }
            }
          },
          data: this.getChartDate('heart'),
          type: 'line'
        }]
      }
      chart.setOption(option)
    },
    // 展示前一天
    handleBack () {
      if (this.currentIndex === 6) {
        return Toast({
          message: '无数据',
          iconClass: 'icon icon-success'
        })
      }
      this.currentIndex += 1
      this.currentHeart = this.allHeart[this.currentIndex]
      this.isNext = true
      if (this.currentIndex === 6) {
        this.isBack = false
      }
    },
    // 展示后一天
    handleNext () {
      if (this.currentIndex === 0) {
        return Toast({
          message: '无数据',
          iconClass: 'icon icon-success'
        })
      }
      this.isBack = true
      this.currentIndex -= 1
      this.currentHeart = this.allHeart[this.currentIndex]
      if (this.currentIndex === 0) {
        this.isNext = false
      }
    },
    // 获取一周心率
    getWeekHearthRate () {
      const data = {
        wearerDeviceId: JSON.parse(localStorage.getItem('device')).wearerDeviceId
      }
      this.$http.get(`${config.httpBaseUrl}/health/getweek`, {
        params: data
      }).then(res => {
        if (res.code === 200) {
          if (!res.date.healths.length) {
            return Toast({
              message: '无数据',
              iconClass: 'icon icon-success'
            })
          }
          res.date.healths.forEach((item, index) => {
            if (item) {
              this.allHeart.push({
                healthHeartrate: item.healthHeartrate,
                healthUptodate: item.healthUptodate,
                healthLowheartrate: item.healthLowheartrate
              })
              this.hearts.push(item.healthUptodate)
            } else {
              this.allHeart.push({
                healthHeartrate: '',
                healthUptodate: '',
                healthLowheartrate: ''
              })
              this.hearts.push('')
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
.heat_rate {
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
      height: 5rem;
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
      .current {
        border: .15rem solid #C5EDDC;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        margin: .3rem auto 0;
        box-sizing: border-box;
        .current_wrapper {
          border: .15rem solid #4CD3A2;
          border-radius: 50%;
          height: 2.4rem;
          text-align: center;
          .text {
            color: #888888;
            font-size: .24rem;
            margin-top: 25px;
          }
          .num {
            color: #15BF86;
            font-size: .7rem;
            margin: 5px 0;
            span {
              color: #15BF86;
              font-size: .42rem;
            }
          }
          .active {
            color: #15BF86;
            font-size: .24rem;
          }
        }
      }
      .desc {
        font-size: .26rem;
        margin-top: 10px;
        text-align: center;
        line-height: .3rem;
        span {
          margin: 0 10px;
        }
      }
    }
    .all_day {
      background: white;
      margin-top: 10px;
      padding: 10px 10px 0;
      position: fixed;
      bottom: 0;
      top: 6.5rem;
      width: 100vw;
      .title {
        font-size: .28rem;
        border-left: 2px solid #15BF86;
        padding-left: 5px;
      }
      #chart {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
