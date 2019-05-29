<template>
  <div class="note_step">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='closeNoteStep'/>
      </span>
      <span class="title">计步</span>
      <span class="comfirm"></span>
    </div>
    <div class="content">
      <div class="one_day">
        <p class="title">
          <span :class='{active:!isBack}' class="back" @click="handleBack">前一天</span>
          <span class="date">{{getDate}}</span>
          <span :class='{active:!isNext}' class="next" @click="handleNext">后一天</span>
        </p>
        <div class="canvas_wrapper"><canvas id="canvas"></canvas></div>
        <div class="desc">
          <p class="step_title">今日步数</p>
          <p class="step_num">{{currentStep}}步</p>
        </div>
      </div>
      <div class="all_day">
        <div class="title">本周步数</div>
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
      // allStep: [],
      currentStep: '',
      allStep: [],
      currentIndex: 0,
      isBack: true,
      isNext: false,
    }
  },
  mounted () {
    this.currentStep = this.getStep.stepCount
    this.getWeekStep()
    this.$nextTick(() => {
      this.drawChart()
    })
  },
  computed: {
    ...mapGetters(['getStep']),
    getDate () {
      let date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * (this.currentIndex))
      return this.moment(date).format('YYYY-MM-DD')
    }
  },
  methods: {
    closeNoteStep () {
      this.$router.go(-1)
    },
    getChartDate (type) {
      const today = new Date().getDay()
      if (type === 'step') {
        let allStep = Object.assign([], this.allStep)
        return allStep.reverse()
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
    drawBg (ctx) {
      ctx.beginPath()
      ctx.lineWidth = 7
      ctx.strokeStyle = '#CCCCCC'
      ctx.arc(150, 75, 55, 0, 1 * Math.PI)
      ctx.stroke()
    },
    drawChart () {
      let c = document.getElementById('canvas')
      let ctx = c.getContext('2d')
      this.drawBg(ctx)
      ctx.beginPath()
      ctx.lineCap = 'round'
      ctx.lineWidth = 7
      ctx.strokeStyle = '#5FD3AC'
      ctx.arc(150, 75, 55, 1 * Math.PI, 2 * Math.PI)
      ctx.stroke()
    },
    initChart () {
      let chart = echarts.init(document.getElementById('chart'))
      const option = {
        grid: {
          left: '13%',
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
              color: '#56E4B4',
              label: {
                // 开启显示
                show: true,
                // 在上方显示
                position: 'top',
                // 数值样式
                textStyle: {
                  color: '#15BF86',
                  fontSize: 11
                }
              }
            }
          },
          data: this.getChartDate('step'),
          type: 'bar',
          barWidth: 15
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
      this.currentStep = this.allStep[this.currentIndex]
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
      this.currentStep = this.allStep[this.currentIndex]
      if (this.currentIndex === 0) {
        this.isNext = false
      }
    },
    // 获取一周脚步
    getWeekStep () {
      const data = {
        wearerDeviceId: JSON.parse(localStorage.getItem('device')).wearerDeviceId
      }
      this.$http.get(`${config.httpBaseUrl}/step/getweek`, {
        params: data
      }).then(res => {
        if (res.code === 200) {
          console.log(res.date.steps)
          res.date.steps.forEach((item, index) => {
            if (item) {
              this.allStep.push(item.stepCount)
            } else {
              this.allStep.push('0')
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
.note_step {
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
      position: relative;
      height: 4.4rem;
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
      .desc {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -25%);
        .step_title {
           font-size: .24rem;
           color: #888888;
           line-height: .4rem;
           text-align: center;
        }
        .step_num {
          font-size: .56rem;
          color: #15BF86;
        }
      }
      .canvas_wrapper {
        width: 300px;
        margin: 0 auto;
        height: 150px;
        #canvas {
          width: 300px;
          height: 150px;
        }
      }
    }
    .all_day {
      position: fixed;
      top: 5.84rem;
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
