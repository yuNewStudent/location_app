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
          <span class="back">前一天</span>
          <span class="date">2019-05-16</span>
          <span class="next">后一天</span>
        </p>
        <canvas id="canvas"></canvas>
        <div class="desc">
          
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
export default {
  data () {
    return {}
  },
  mounted () {
    this.$nextTick(() => {
      this.drawChart()
      this.initChart()
    })
  },
  methods: {
    closeNoteStep () {
      this.$emit('closeNoteStep')
    },
    drawChart () {
      let c = document.getElementById('canvas')
      let ctx = c.getContext('2d')
      ctx.beginPath()
      ctx.lineWidth = 7
      ctx.strokeStyle = '#CCCCCC'
      ctx.arc(150, 75, 55, 0, 1*Math.PI)
      ctx.stroke()
      ctx.beginPath()
      var gr = ctx.createRadialGradient(50, 50, 25, 100, 100, 100)
      //添加颜色端点
      gr.addColorStop(0,'#15BF86')
      gr.addColorStop(1,'#5FD3AC')
      ctx.lineWidth = 7
      ctx.strokeStyle = gr
      ctx.lineCap = 'round'
      ctx.arc(150, 75, 55, 1*Math.PI, 2*Math.PI)
      ctx.stroke()
    },
    initChart () {
      let chart = echarts.init(document.getElementById('chart'))
      const option = {
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          barWidth : 15,
          itemStyle: {
            normal: {
              color: '#56E4B4',
            }
          },
          data: [2000, 4000, 30000, 5000, 12000, 6000, 9000],
          type: 'bar'
        }]
      }
      chart.setOption(option)
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
      #canvas {
        width: 300px;
        height: 150px;
      }
    }
    .all_day {
      background: white;
      margin-top: 10px;
      padding: 10px 10px 0;
      .title {
        font-size: .28rem;
      }
      #chart {
        height: 250px;
      }
    }
  }
}
</style>
