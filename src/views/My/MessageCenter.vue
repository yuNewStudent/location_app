<template>
  <div class="message_center">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='back'/>
      </span>
      <span class="title">消息中心</span>
      <span class="comfirm"></span>
    </div>
    <div class="content">
      <div class="content_l">
          <div class="content_left">
            <p class="content_d"></p>
          </div>
          <div class="content_middle">
            <div class="content_middler">
              <p>SOS报警</p>
              <span>2019-04-01 09:36</span>
            </div>
            <div class="content_middles">
              <p>PaPa`s watch进行了SOS报警</p>
            </div>
          </div>
          <div class="content_right" @click="find">
             <img src="@/assets/icon/my/2.png">
          </div>
       </div>
       <div class="content_r">
          <div class="content_left">
            <p class="content_rd"></p>
          </div>
          <div class="content_middle">
            <div class="content_middler">
              <p>SOS报警</p>
              <span>2019-04-01 09:36</span>
            </div>
            <div class="content_middles">
              <p>PaPa`s watch进行了SOS报警</p>
            </div>
          </div>
          <div class="content_right" @click="find">
             <img src="@/assets/icon/my/1.png">
          </div>
       </div>
       <!-- <div class="content_k"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'MyPage'})
    }
  }
}
</script>

<style lang='scss' scoped>
.message_center {
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
  .content_d{
    width:10px;
    height:10px;
    background:rgba(246,51,51,1);
    border-radius:50%;
  }
  .content_rd{
    width:10px;
    height:10px;
    background: rgb(239,239,239);
    border-radius:50%;
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
   box-shadow:0px 1px 4px 0px rgba(40,50,47,0.2);
    margin-bottom: 10px;
  }
  .content_r{
    width: 100%;
    display:flex;
    color: rgba(40, 50, 47, 0.2);
    background-color: #ffffff;
   box-shadow:0px 1px 4px 0px rgba(40,50,47,0.2);
    margin-bottom: 10px;
  }
  .content_left{
    width: 8%;
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
  width:72%;
  margin: .25rem .0rem;
}
.content_middler{
  display:flex;
}
.content_middler p{
  font-size: .30rem;
}
.content_middler span{
  font-size: .1rem;
  margin-top: 0.05rem;
  color:rgba(185,185,185,1);
}
.content_middles{
  margin-top: .1rem;
  font-size: .15rem;
}
.content_right{
  width:20%;
  margin: .25rem .0rem;
  font-size: .20rem;
  text-align: right;
  float: right;
}
.content_right img{
  width: 20px;
  height: 20px;
  margin-right: .20rem;
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