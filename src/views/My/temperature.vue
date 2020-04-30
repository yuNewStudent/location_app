<template>
  <div class="temperature">
    <header-page @changeDevice="changeDevice" :title="head_title"></header-page>
    <div class="temperature_l" :style="{backgroundImage:'url('+deviceInfo.wearerImage+')'}">
      <div class="temperature_lb">
        <div class="temperature_lbl">
          <img :src="deviceInfo.wearerImage" />
        </div>
        <div class="temperature_lbg">
          <p>
            {{deviceInfo.wearerNickname}}|
            <img src="../../assets/icon/home/gender.png" />
          </p>
        </div>
      </div>
    </div>
    <div class="temperature_i">
      <div class="temperature_il">
        <h3>年龄</h3>
        <h5>
          <span>{{age}}</span>岁
        </h5>
      </div>
      <div class="temperature_ic">
        <h3>家庭地址</h3>
        <h5>{{deviceInfo.wearerAddress}}</h5>
      </div>
      <div class="temperature_ir">
        <h3>联系电话</h3>
        <h5>{{deviceInfo.wearerNumber}}</h5>
      </div>
    </div>
    <div class="c"></div>
    <div class="temperature_today">
      <div class="temperature_todayt">
        <p>
          <img src="../../assets/icon/home/lq.png" />今日体温变化
        </p>
      </div>
      <div class="temperature_todayi">
        <div class="temperature_todayil">
          <input type="number" v-model="entryinput" name="number" placeholder="请输入本次测量体温" />
          <p>℃</p>
        </div>
        <div class="temperature_todayir" @click="entry()">
          <span>录入</span>
        </div>
      </div>

      <div class="temperature_todayc">
        <div id="chart"></div>
      </div>
    </div>
    <div class="c"></div>
    <div class="temperature_history">
      <div class="temperature_historyt">
        <p>
          <img src="../../assets/icon/home/lq.png" />历史体温变化
        </p>
      </div>
      <div class="temperature_historyi">
        <div class="temperature_historyil">
          <label>
            <input name="Fruit" v-model="radio" label="1" type="radio" value />本周
          </label>
          <label>
            <input name="Fruit" v-model="radio" label="2" type="radio" value />近半个月
          </label>
        </div>
        <div class="temperature_historyir">
          <p @click="open('picker')" size="large">开始时间-</p>
          <p @click="open1('picker1')" size="large">结束日期</p>
          <br />
          <mt-datetime-picker
            ref="picker"
            type="date"
            v-model="value"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleChange"
          ></mt-datetime-picker>
          <mt-datetime-picker
            ref="picker1"
            type="date"
            v-model="value1"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleChange1"
          ></mt-datetime-picker>
        </div>
      </div>
      <div class="temperature_historyz">
        <div class="temperature_historyzl">
          <p>
            最高体温:
            <span>37.2℃</span>
          </p>
        </div>
        <div class="temperature_historyzr">
          <p>
            平均体温:
            <span>37.2℃</span>
          </p>
        </div>
      </div>
      <div class="temperature_historyc">
        <div id="chartt"></div>
      </div>
    </div>
    <div class="temperature_boder"></div>
    <router-view></router-view>
  </div>
</template>
<script>
import Slider from "@/components/scroll";
import HeaderPage from "@/components/Header";
import { mapMutations, mapGetters } from "vuex";
import { Toast, Radio, DatetimePicker } from "mint-ui";
import AMap from "AMap";
export default {
  data() {
    return {
      head_title: "温度",
      value: null,
      value1: null,
      entryinput: "",
      radio:'1',
      age: null,
      deviceInfo: {},
      startDate: new Date("2014-1-1"),
      endDate: new Date()
      // username: ''t
    };
  },
  components: {
    Slider,
    HeaderPage
  },
  mounted() {
    this.deviceInfo = JSON.parse(localStorage.getItem("device"));
    console.log(this.deviceInfo);
    this.age = this.GetAge(this.deviceInfo.wearerBirthday);
    this.SeaToday();
    this.SeaWeek();
    console.log(this.age);
  },
  computed: {},
  methods: {
    open(picker) {
      console.log(picker);
      this.$refs[picker].open();
    },
    getWearerDeviceId() {
      if (!localStorage.getItem("device")) return;
      const wearerDeviceId = JSON.parse(localStorage.getItem("device"))
        .wearerDeviceId;
      return wearerDeviceId;
    },
    GetAge(strBirthday) {
      var returnAge,
        strBirthdayArr = strBirthday.split("-"),
        birthYear = strBirthdayArr[0],
        birthMonth = strBirthdayArr[1],
        birthDay = strBirthdayArr[2],
        d = new Date(),
        nowYear = d.getFullYear(),
        nowMonth = d.getMonth() + 1,
        nowDay = d.getDate();
      if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0周岁
      } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay; //日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            var monthDiff = nowMonth - birthMonth; //月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge; //返回周岁年龄
    },
    entry() {
      let _this = this;
       const data = {
        name:_this.deviceInfo.wearerNickname,
         temperature: _this.entryinput,
         identity:_this.deviceInfo.wearerDeviceId
      }
      this.$http
        .post(`${config.httpBaseUrl}/temp_user/add`,data)
        .then(res => {
          if (res.code === 200) {
            this.entryinput="";
            this.SeaToday();
             Toast({
              message: '温度添加成功',
              iconClass: 'icon icon-success'
            })
          }else{
             this.entryinput="";
              Toast({
              message: '温度添加失败',
              iconClass: 'icon icon-success'
            })
          }
        });
    },
    //查询当日体温
    SeaToday() {
      let _this = this;
       const data = {
        name:_this.deviceInfo.wearerNickname,
        identity:_this.deviceInfo.wearerDeviceId
      }
      this.$http.post(`${config.httpBaseUrl}/temp_data/SeaToday`,data).then(res => {
          if (res.code === 200) {
            console.log(res.date);
             this.initChart(res.date.today);
          }
        });
    },
    //本周体温
    SeaWeek(){
      let _this = this;
       const data = {
        name:_this.deviceInfo.wearerNickname,
        identity:_this.deviceInfo.wearerDeviceId
      }
      this.$http.post(`${config.httpBaseUrl}/temp_data/SeaWeek`,data).then(res => {
          if (res.code === 200) {
            this.initChartt(res.date.week);
          }
        });
    },
    open1(picker1) {
      console.log("121");
      this.$refs[picker1].open();
    },
    handleChange1(value) {
      console.log(value);
      this.date = value.toString();
      console.log(this.moment(value).format("YYYY-MM-DD"));
      console.log(value);
      // Toast({
      //   message: "已选择 " + value.toString(),
      //   position: "bottom"
      // });
    },
    handleChange(value) {
      console.log(value);
      console.log(this.endDate);
      console.log(this.startDate);
      this.date1 = value.toString();
      // console.log(this.moment(value).format('YYYY-MM-DD'))
      // console.log(value)
      Toast({
        message: "已选择 " + value.toString(),
        position: "bottom"
      });
    },
    // 获取心率and血压
    getHearthRate() {
      const data = {
        wearerDeviceId: this.getWearerDeviceId(),
        date: this.moment(new Date()).format("YYYY-MM-DD")
      };
      this.$http
        .get(`${config.httpBaseUrl}/health/getAll`, {
          params: data
        })
        .then(res => {
          if (res.code === 200) {
            const healths = res.date.healths;
            if (!healths[0]) {
              this.heart = [];
              this.blood = [];
            } else {
              this.heart = [
                {
                  healthDate: healths[0].healthDate,
                  healthHeartrate: healths[0].healthHeartrate,
                  healthUptodate: healths[0].healthUptodate,
                  healthLowheartrate: healths[0].healthLowheartrate
                }
              ];
              this.blood = [
                {
                  healthDate: healths[0].healthDate,
                  healthHighpressure: healths[0].healthHighpressure + "mmHg",
                  healthLowpressure: healths[0].healthLowpressure + "mmHg"
                }
              ];
            }
            this.setHeart(this.heart);
            this.setBlood(this.blood);
          }
        });
    },
    // 获取步数
    getStep() {
      const data = {
        wearerDeviceId: this.getWearerDeviceId(),
        date: this.moment(new Date()).format("YYYY-MM-DD")
      };
      this.$http
        .get(`${config.httpBaseUrl}/step/get`, {
          params: data
        })
        .then(res => {
          if (res.code === 200) {
            this.currentStep = {
              stepDate: res.date.step ? res.date.step.stepDate : "无",
              stepCount: res.date.step ? res.date.step.stepCount : "0"
            };
            this.setStep(this.currentStep);
          }
        });
    },
    // 获取当前位置
    getDeviceInfo() {
      const wearerDeviceId = this.getWearerDeviceId();
      this.$http
        .get(`${config.httpBaseUrl}/map/getMapuser`, {
          params: {
            userId: wearerDeviceId
          }
        })
        .then(res => {
          if (res.code === 200) {
            // 绘制当前人
            if (!res.date.pos) {
              this.deviceInfo = {
                address: "无信息",
                lng: "0.0",
                lat: "0.0"
              };
              this.setDevicePosition(this.deviceInfo);
              return;
            }
            this.translateGps(
              res.date.pos.locationBean.longitude,
              res.date.pos.locationBean.latitude
            ).then(data => {
              this.deviceInfo.lng = data[0].lng;
              this.deviceInfo.lat = data[0].lat;
              this.getAddress(data[0].lng, data[0].lat).then(data => {
                this.deviceInfo.address = data;
                this.setDevicePosition(this.deviceInfo);
              });
            });
          }
        });
    },
    // 改变了选中设备，重新获取数据
    changeDevice() {
      this.getHearthRate();
      this.getStep();
      this.getDeviceInfo();
    },
    initChartt(week) {
      let chartt = echarts.init(document.getElementById("chartt"));
      const option = {
        title: {
          text: "标准温度:36.9℃",
          left: "left",
          textStyle: {
            color: "#B9B9B9",
            fontSize: 8
          },
          bottom: "7%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["最低体温", "最高体温", "平均体温", "体温异常"],
          textStyle: {
            color: "#191818",
            fontSize: 10,
            fontStyle: "normal",
            fontWeight: "normal"
          },
          bottom: "-3%",
          left: "28%"
        },
        grid: {
          top: "8%",
          left: "7%",
          right: "5%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#B9B9B9",
                fontSize: 10
              }
            }
          }
        ],
        yAxis: [
          {
            // name:'IP',
            min: 0, //y轴的最小值
            max: 50, //y轴最大值
            interval: 10, //值之间的间隔
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#B9B9B9",
                fontSize: 10
              },
              formatter: "{value}℃"
            }
          }
        ],
        series: [
          {
            name: "最低体温",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            textStyle: {
              color: "#15BF86",
              fontSize: 10
            },
            smooth: true,
            itemStyle: {
              normal: {
                color: "#A3F8DC",
                lineStyle: {
                  color: "#A3F8DC"
                }
              }
            },
            data:week.temperature
          },
          {
            name: "最高体温",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            smooth: true,
            itemStyle: {
              normal: {
                color: "#FCB50A",
                lineStyle: {
                  color: "#FCB50A"
                }
              }
            },
            data: [20, 32, 9, 34, 29, 30, 13]
          },
          {
            name: "平均体温",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            smooth: true,
            itemStyle: {
              normal: {
                color: "#2B99FF",
                lineStyle: {
                  color: "#2B99FF"
                }
              }
            },
            data: [20, 32, 9, 34, 29, 30, 13]
          },
          {
            name: "体温异常",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            smooth: true,
            itemStyle: {
              normal: {
                color: "#F83D1E",
                lineStyle: {
                  color: "#F83D1E"
                }
              }
            },
            data: [2, 2, 10, 4, 9, 10, 13]
          }
        ]
      };
      chartt.setOption(option);
    },
    initChart(today) {
      let chart = echarts.init(document.getElementById("chart"));
      const option = {
        title: {
          text: "标准温度:36.9℃",
          left: "left",
          textStyle: {
            color: "#B9B9B9",
            fontSize: 8
          },
          bottom: "3%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["体温正常", "体温异常"],
          textStyle: {
            color: "#191818",
            fontSize: 10,
            fontStyle: "normal",
            fontWeight: "normal"
          },
          bottom: "3%"
        },
        grid: {
          top: "8%",
          left: "3%",
          right: "5%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data:today.time
            ,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#B9B9B9",
                fontSize: 10
              }
            }
          }
        ],
        yAxis: [
          {
            // name:'IP',
            min: 0, //y轴的最小值
            max: 50, //y轴最大值
            interval: 10, //值之间的间隔
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#B9B9B9",
                fontSize: 10
              },
              formatter: "{value}℃"
            }
          }
        ],
        series: [
          {
            name: "体温正常",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            textStyle: {
              color: "#15BF86",
              fontSize: 10
            },
            smooth: true,
            itemStyle: {
              normal: {
                color: "#A3F8DC",
                lineStyle: {
                  color: "#A3F8DC"
                }
              }
            },
            data:today.temperature,
          },
          {
            name: "体温异常",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            smooth: true,
            itemStyle: {
              normal: {
                color: "#F83D1E",
                lineStyle: {
                  color: "#F83D1E"
                }
              }
            },
            data: [20, 32, 9, 34, 29, 30, 13]
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.temperature {
  height: 11.2rem;
  overflow: hidden;
  overflow-y: auto;
  .home_header {
    font-size: 0.36rem;
    text-align: center;
    color: white;
    height: 0.96rem;
    line-height: 0.96rem;
    padding: 0 0.36rem 2.4rem;
    background: #15bf86;
  }
  .temperature_l {
    width: 100%;
    height: 3rem;
    // background: url("../../assets/icon/home/WechatIMG335.jpeg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .temperature_lb {
    width: 100%;
    height: 3rem;
    background: rgba(0, 0, 0, 1);
    opacity: 0.7;
  }
  .temperature_lbl {
    display: flex;
    text-align: center;
    padding-top: 0.6rem;
  }
  .temperature_lbl img {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    margin: 0 auto;
  }
  .temperature_lbg p {
    color: #ffffff;
    font-size: 17px;
    text-align: center;
  }
  .temperature_lbg p img {
    width: 22px;
    height: 18px;
  }
  .temperature_i {
    padding: 10px;
    display: flex;
    font-size: 14px;
    text-align: left;
  }
  .temperature_i h3 {
    color: #b9b9b9;
    line-height: 20px;
  }
  .temperature_il {
    width: 20%;
  }
  .temperature_ic {
    width: 50%;
  }
  .temperature_ir {
    width: 20%;
  }
  .c {
    width: 100%;
    height: 0.1rem;
    background-color: #f5f5f5;
  }
  .temperature_today {
    padding: 5px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(197, 197, 197, 0.2);
  }
  .temperature_todayt {
    font-size: 14px;
  }
  .temperature_todayi {
    padding: 10px;
    display: flex;
  }
  .temperature_todayil {
    width: 200px;
    height: 30px;
    border: 2px solid rgba(199, 199, 199, 1);
    background-color: #f5f5f5;
    display: flex;
    border-radius: 2px;
  }
  .temperature_todayil input {
    width: 185px;
    height: 30px;
    font-size: 14px;
    background-color: #f5f5f5;
  }
  .temperature_todayil p {
    color: #c7c7c7;
    font-size: 14px;
    line-height: 30px;
  }
  .temperature_todayir {
    width: 50px;
    line-height: 30px;
    padding-left: 5px;
    font-size: 14px;
    color: #15bf86;
  }
  .temperature_todayc {
    width: 100%;
    height: 200px;
    .title {
      font-size: 0.28rem;
      border-left: 2px solid #15bf86;
      padding-left: 5px;
    }
    #chart {
      height: 90%;
      width: 100%;
    }
  }
  .temperature_history {
    padding: 5px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(197, 197, 197, 0.2);
  }
  .temperature_historyt {
    font-size: 14px;
  }
  .temperature_historyi {
    padding: 10px;
    display: flex;
    margin-top: -10px;
  }
  .temperature_historyil label {
    font-size: 14px;
  }
  .temperature_historyc {
    width: 100%;
    height: 233px;
    .title {
      font-size: 0.28rem;
      border-left: 2px solid #15bf86;
      padding-left: 5px;
    }
    #chartt {
      height: 100%;
      width: 100%;
    }
  }
  // .temperature_boder {
  //   width: 100%;
  //   height: 1rem;
  // }
  .temperature_historyz {
    border-top: 1px solid rgba(239, 239, 239, 1);
    padding: 10px 20px;
    display: flex;
    font-size: 14px;
  }
  .temperature_historyzl {
    width: 50%;
    text-align: left;
  }
  .temperature_historyzl span {
    color: #15bf86;
  }
  .temperature_historyzr {
    width: 50%;
    text-align: right;
  }
  .temperature_historyzr span {
    color: #15bf86;
  }
  .temperature_todayt img {
    width: 2px;
    height: 10px;
    padding-right: 5px;
  }
  .temperature_history img {
    width: 2px;
    height: 10px;
    padding-right: 5px;
  }
  .temperature_historyil {
    width: 60%;
  }
  .temperature_historyir {
    width: 50%;
    display: flex;
    padding-top: 27px;
    text-align: right;
    font-size: 14px;
  }
}
</style>