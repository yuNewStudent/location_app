<template>
  <div class="black_list" @click='hideAction'>
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='closeBlackList'/>
      </span>
      <span class="title">免打扰</span>
      <span @click='handleAddBlackList' class="comfirm">自定义</span>
    </div>
    <div class="content">
      <div class="night">
        <div class="show">
          <span>夜间免打扰</span>
          <mt-switch size='mini' v-model="night.open"></mt-switch>
        </div>
        <div class="desc">开启夜间免打扰模式，默认状态下手表将在晚上22:00到次日早上06:00之间断开网络连接</div>
      </div>
      <div class="normal">
        <div
          class="normal_item"
          v-for='(item, index) in blackList'
          :key='index'
          @touchstart='touchstart(item, index)'
          @touchend='touchend'>
          <span>{{item.nodisturbDate}}</span>
          <mt-switch size='mini' v-model="item.open"></mt-switch>
        </div>
        <div class="action" ref='action'>
          <p class="editor" @click.stop='showEditorBlack'>编辑</p>
          <p @click.stop='delBlack'>删除</p>
        </div>
      </div>
    </div>
    <message-box
      v-if='isShowAddBlackList'
      :title='title.add'
      @closeAddContact='addBlackList'
      class="add_black_list">
      <div class="add_black_list_wrapper">
        <input @focus="selectStartTime" v-model='newBlackList.start_time' class="start"/> ——
        <input @focus="selectEndTime" v-model='newBlackList.end_time' class="end"/>
      </div>
    </message-box>
    <message-box
      v-if='isShowEditorBlackList'
      :title='title.editor'
      @closeAddContact='edoitorBlackList'
      class="add_black_list">
      <div class="add_black_list_wrapper">
        <input @focus="selectStartTime" v-model='selectBlack.black.start_time' class="start"/> ——
        <input @focus="selectEndTime" v-model='selectBlack.black.end_time' class="end"/>
      </div>
    </message-box>
    <mt-datetime-picker
      ref='picker'
      v-model="pickerVisible"
      type="time"
      @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
import { Switch, Toast, DatetimePicker } from 'mint-ui'
import MessageBox from '@/components/MessageBox'
export default {
  data () {
    return {
      time: 0,
      title: {
        add: '新增免打扰',
        editor: '修改免打扰'
      },
      isShowAddBlackList: false,
      isShowEditorBlackList: false,
      pickerVisible: '',
      currentSelect: '',
      newBlackList: {
        start_time: '',
        end_time: '',
      },
      night: {
        open: false
      },
      selectBlack: {
        index: '',
        black: {}
      },
      blackList: [
        // {
        //   start_time: '8:20',
        //   end_time: '10:13',
        //   open: false,
        //   id: 1
        // },
        // {
        //   start_time: '5:20',
        //   end_time: '12:13',
        //   open: false,
        //   id: 1
        // }
      ],
      editor: false
    }
  },
  components: {
    Switch,
    MessageBox,
    DatetimePicker
  },
  created () {
    this.disturblist()
  },
  methods: {
     // 获取添加闹钟
    disturblist () {
      const wearerDeviceId = JSON.parse(localStorage.getItem('device')).wearerDeviceId
      this.$http.get(`${config.httpBaseUrl}/nod/getAll`, {
        params: {
          wearerDeviceId
        }
      }).then(res => {
        if (res.code === 200) {
          this.blackList=res.date.nodis
          }
        })
    },
    closeBlackList () {
      this.$router.go(-1)
    },
    handleAddBlackList () {
      this.isShowAddBlackList = true
    },
    addBlackList (bol) {
      this.isShowAddBlackList = false
      if (!bol) { return }
      if (!(this.newBlackList.start_time && this.newBlackList.end_time)) {
        return   Toast({
          message: '闹钟信息不能为空',
          iconClass: 'icon icon-error'
        })
      }
      const data = {
        id: JSON.parse(localStorage.getItem('device')).wearerDeviceId,
        keyWord: "SILENCETIME",
        currency1: this.newBlackList.start_time + '-' + this.newBlackList.end_time,
      }
      this.$http.post(`${config.httpBaseUrl}/Appcommand/command`, data).then(res => {
        if (res.code === 200) {
          this.disturblist()
          Toast({
            message: '新增成功',
            iconClass: 'icon icon-success'
          })
          }
      })
      this.blackList.push(this.newBlackList)
    },
    edoitorBlackList (bol) {
      this.isShowEditorBlackList = false
      if (!bol) { return }
      this.editor = false
      if (!(this.selectBlack.black.start_time && this.selectBlack.black.end_time)) {
        return  Toast({
          message: '闹钟信息不能为空',
          iconClass: 'icon icon-error'
        })
      }
      this.blackList.splice(this.selectBlack.index, 1, this.selectBlack.black)
      Toast({
        message: '修改成功',
        iconClass: 'icon icon-success'
      })
    },
    selectStartTime () {
      this.currentSelect = 'start'
      this.$refs.picker.open()
    },
    selectEndTime () {
      this.currentSelect = 'end'
      this.$refs.picker.open()
    },
    handleConfirm (value) {
      if (this.currentSelect === 'start') {
        if (this.editor) {
          this.selectBlack.black.start_time = value
        } else {
          this.newBlackList.start_time = value
        }
      } else {
        if (this.editor) {
          this.selectBlack.black.end_time = value
        } else {
          this.newBlackList.end_time = value
        }
      }
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
    // 展示操作窗口
    showAction(item, index) {
      this.selectBlack.black = item
      this.selectBlack.index = index
      this.$refs.action.style.display = 'block'
      this.$refs.action.style.top = .1 + 1.2 * (index * 1) + 'rem'
    },
    // 隐藏操作栏
    hideAction () {
      if (!this.$refs.action) { return }
      this.$refs.action.style.display = 'none'
    },
    // 显示修改免打扰
    showEditorBlack () {
      this.$refs.action.style.display = 'none'
      this.editor = true
      this.isShowEditorBlackList = true
    },
    // 删除免打扰
    delBlack () {
      this.blackList.splice(this.selectBlack.index, 1)
      Toast({
        message: '删除成功',
        iconClass: 'icon icon-success'
      })
      this.hideAction()
    }
  }
}
</script>

<style lang="scss" scoped>
.black_list {
  position: fixed;
  top: .48rem;
  bottom: 0;
  background: rgb(239,239,239);
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
    .night {
      font-size: .26rem;
      height: 2.5rem;
      .show {
        display: flex;
        padding: 0 20px;
        height: 1.2rem;
        justify-content: space-between;
        align-items: center;
        background: white;
        box-shadow:0px 2px 8px 0px rgba(178,178,178,0.2);
      }
      .desc {
        padding: .2rem 20px;
        color: #B9B9B9;
        line-height: .4rem;
        box-shadow:0px 2px 8px 0px rgba(178,178,178,0.2);
      }
    }
    .normal {
      overflow: auto;
      position: fixed;
      top: 3.8rem;
      bottom: 0;
      width: 100vw;
      .action {
        width: 1.6rem;
        height: 1.3rem;
        box-shadow: 0px 1px 4px 0px rgba(109,109,109,0.5);
        font-size: .26rem;
        text-align: center;
        position: absolute;
        // top: 90px;
        display: none;
        right: 100px;
        background: white;
        p {
          line-height: .65rem;
          &.editor {
            background: #D4F4EA;
          }
        }
      }
      .normal_item {
        font-size: .26rem;
        display: flex;
        padding: 0 20px;
        height: 1.2rem;
        justify-content: space-between;
        align-items: center;
        box-shadow:0px 2px 8px 0px rgba(178,178,178,0.2);
      }
      .normal_item:nth-child(odd) {
        background: white;
      }
    }
  }
  .add_black_list {
    .add_black_list_wrapper {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #DEDEDE;
      >input {
        border: 1px solid #DEDEDE;
        width: .7rem;
        height: .5rem;
        margin: 0 10px;
        padding: 0 10px;
      }
    }
  }
}
</style>
