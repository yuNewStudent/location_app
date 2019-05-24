<template>
  <div class="device_list">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='back'/>
      </span>
      <span class="title">设备列表</span>
      <span class="comfirm"></span>
    </div>
    <div class="content">
       <div class="content_l" @touchstart='touchstart'
          @touchend='touchend'>
          <div class="content_left">
            <img src="@/assets/icon/my/log.jpg"/>
          </div>
          <div class="content_middle">
            <span>Mothers wathc</span>
          </div>
          <div class="content_right" @click="find">
             <span>查找设备</span>
          </div>
       </div>
       <!-- <div class="content_k"></div> -->
       <div class="content_l" @touchstart='touchstart(index)'
          @touchend='touchend'>
          <div class="content_left">
            <img src="@/assets/icon/my/log.jpg"/>
          </div>
          <div class="content_middle">
            <span>Mothers wathc</span>
          </div>
          <div class="content_right" @click="find">
             <span>查找设备</span>
          </div>
       </div>
       <div class="action" ref='action'>
        <p class="editor" @click.stop='showEditorContact'>解绑</p>
        <p @click.stop='delContact'>删除</p>
      </div>
       <div class="content_c">
         <P>若设备处于联网状态，则提示指令发送成功，设备端接收到指令后，即作出响铃提示。
若设备处于关机或未联网状态，则无法向设备端发送相关指令。</P>
       </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'MyPage'})
    },
    // 长按事件
    touchstart (item, index) {
      this.time = setTimeout(() => {
        // 展示操作窗口
        this.showAction(item, index)
      }, 500)
    },
    touchend (e) {
      clearTimeout(this.time)
    },
    find(){
      MessageBox({
        title: '确认查找该设备吗？',
        message: '点击"确认"后，即向该该设备发送指令。',
        showCancelButton: true
      });
    },
     // 修改联系人
    showEditorContact () {
      this.isShowEditorPhoneBook = true
    },
    delContact () {
      this.contacts.splice(this.selectPerson.index, 1)
      this.hideAction()
      Toast({
        message: '操作成功',
        iconClass: 'icon icon-success'
      })
    },
     showAction(index) {
      // this.selectPerson.person = item
      // this.selectPerson.index = index
      this.$refs.action.style.display = 'block'
      this.$refs.action.style.top = 90 + (index * 50) + 'px'
    },
    // 隐藏操作栏
    hideAction () {
      if (!this.$refs.action) { return }
      this.$refs.action.style.display = 'none'
    },
  }
}
</script>

<style lang='scss' scoped>
.device_list {
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
    width: 20%;
  }
  .content_left img {
    width:50px;
    height:46px;
    margin: .1rem 0rem 0rem .15rem;
    border-radius: 40px;
    background-color: #eee;
}
.content_middle{
  width:50%;
  margin: .35rem .0rem;
  font-size: .20rem;
}
.content_middle span{
  line-height: .25rem;
  font-size: .20rem;
}
.content_right{
  width:30%;
  margin: .35rem .0rem;
  background-color: #15BF86;
  font-size: .20rem;
  text-align: right;
  border-radius:.25rem .0rem .0rem .25rem;
  float: right;
}
.content_right span{
  line-height: .50rem;
  margin-right:.5rem;
  color: #FFFFFF;
}
.content_c{
  padding: 10px;
}
.content_c p{
font-size: 10px;
color: rgba(185, 185, 185, 1);
}
.action {
      width: 1.6rem;
      height: 1.3rem;
      box-shadow: 0px 1px 4px 0px rgba(109,109,109,0.5);
      font-size: .26rem;
      text-align: center;
      position: fixed;
      // top: 90px;
      display: none;
      right: 70px;
      p {
        line-height: .65rem;
        &.editor {
          background: #D4F4EA;
        }
      }
    }
}
</style>
