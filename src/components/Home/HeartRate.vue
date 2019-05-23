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
          <span class="back" @click="handleBack">前一天</span>
          <span class="date">2019-05-16</span>
          <span class="next" @click="handleNext">后一天</span>
        </p>
        <div class="current">
          <div class="current_wrapper">
            <p class="text">当前心率</p>
            <p class="num">199<span>bpm</span></p>
            <p class="active">远程测量</p>
          </div>
        </div>
        <p class="desc">
          <span>最高:110bpm</span>
          <span>平均:86bpm</span>
          <span>最低:72bpm</span>
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
export default {
  data () {
    return {}
  },
  mounted () {
    console.log(1)
    this.initChart()
  },
  methods: {
    closeHeartRate () {
      this.$router.go(-1)
    },
    initChart () {
      let chart = echarts.init(document.getElementById('chart'))
      const option = {
        grid: {
          top: 30
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
          data: [89, 98, 79, 87, 93, 110, 77],
          type: 'line'
        }]
      }
      chart.setOption(option)
    },
    // 展示前一天
    handleBack () {},
    // 展示后一天
    handleNext () {}
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
        width: 300px;
      }
    }
  }
}
</style>
