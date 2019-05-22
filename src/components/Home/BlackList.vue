<template>
  <div class="black_list">
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
          <mt-switch size='mini' v-model="value"></mt-switch>
        </div>
        <div class="desc">开启夜间免打扰模式，默认状态下手表将在晚上22:00到次日早上06:00之间断开网络连接</div>
      </div>
      <div class="normal">
        <div class="normal_item">
          <span>23:00 - 7:00</span>
          <mt-switch size='mini' v-model="value"></mt-switch>
        </div>
        <!-- <div class="normal_item">
          <span>23:00 - 7:00</span>
          <mt-switch size='mini' v-model="value"></mt-switch>
        </div> -->
      </div>
    </div>
    <message-box
      v-if='isShowAddBlackList'
      :title='title'
      @closeAddContact='AddBlackList'
      class="add_black_list">
      <div class="add_black_list_wrapper">
        <input @focus="selectStartTime" v-model='start' class="start"/> ——
        <input @focus="selectEndTime" v-model='end' class="end"/>
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
import { Switch, DatetimePicker } from 'mint-ui'
import MessageBox from '@/components/MessageBox'
export default {
  data () {
    return {
      value: '',
      title: '新增免打扰',
      isShowAddBlackList: false,
      pickerVisible: '',
      currentSelect: '',
      start: '',
      end: ''
    }
  },
  components: {
    Switch,
    MessageBox,
    DatetimePicker
  },
  methods: {
    closeBlackList () {
      this.$emit('closeBlackList')
    },
    handleAddBlackList () {
      this.isShowAddBlackList = true
    },
    AddBlackList () {
      this.isShowAddBlackList = false
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
      console.log(this.currentSelect, value)
      if (this.currentSelect === 'start') {
        this.start = value
      } else {
        this.end = value
      }
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
      >div {
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
      .normal_item:nth-child(even) {

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
