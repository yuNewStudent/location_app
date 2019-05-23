<template>
  <div class="warning_setting">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='back'/>
      </span>
      <span class="title">报警设置</span>
      <span class="comfirm"></span>
    </div>
    <div class="content">
      <div class="content_l">
          <div class="content_left">
            <p>SOS报警</p>
          </div>
          <div class="content_middle">
          </div>
          <div class="content_right" @click="find">
             <mt-switch v-model="value"></mt-switch>
          </div>
       </div>
       <!-- <div class="content_k"></div> -->
       <div class="content_l" @click="lowbattery">
          <div class="content_left">
             <p>低电量报警</p>
          </div>
          <div class="content_middle">
          </div>
          <div class="content_right" @click="find">
             <mt-switch v-model="value1"></mt-switch>
          </div>
       </div>
       <div class="content_c">
         <P>默认状态下，当手表电量低于10%时进行报警，您也可以通过点击
           <span class="content_t">"低电量报警"</span>进行<span class="content_t">自定义</span>设置。
         </P>
       </div>
       <div class="content_l">
          <div class="content_left">
            <p>智能围拦报警</p>
          </div>
          <div class="content_middle">
          </div>
          <div class="content_right" @click="find">
             <mt-switch v-model="value2"></mt-switch>
          </div>
       </div>
    </div>
  </div>
</template>

<script>
import { Switch } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
      value:false,
      value1:true,
      value2:true,
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'MyPage'})
    },
    find(){
    },
    //输入电量百分之比
    lowbattery(){
      MessageBox.prompt('请输入低电量报警百分比', {
          inputValidator: (val) => {
            if (val === null) {
              return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
            }
          }, inputErrorMessage: '输入不能为空'
        }).then((val) => {
          console.info(val.value)
        }, () => {
          console.info('cancel')
      });
    }
  }
}
</script>

<style lang='scss' scoped>
.warning_setting {
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
    width: 100%;
  }
  .content_k{
    width: 100%;
    background: rgb(239,239,239);
    height: .10rem;
  }
  .content_l{
    width: 100%;
    display:flex;
    background-color: #ffffff;
    box-shadow: 0px 15px 10px -20px #888888;
    margin-bottom: 10px;
  }
  .content_left{
    width: 30%;
    font-size: .20rem;
    margin: .25rem .0rem;
    line-height: .25rem;
  }
  .content_left p{
    margin-top: .1rem;
    margin-left: .2rem;
    line-height: .25rem;
  }
.content_middle{
  width:50%;
  margin: .25rem .0rem;
  font-size: .20rem;
}
.content_middle span{
  line-height: .25rem;
  font-size: .20rem;
}
.content_right{
  width:20%;
  margin: .25rem .0rem;
  font-size: .20rem;
  text-align: right;
  float: right;
}
.content_t{
  color: #000;
}
.content_c{
  padding:8px;
}
.content_c p{
font-size: 10px;
color: rgba(185, 185, 185, 1);
}
}
</style>