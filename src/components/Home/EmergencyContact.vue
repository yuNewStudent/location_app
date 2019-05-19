<template>
  <div class="emergency_contact">
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='closeEmergencyContact'/>
      <span class="title">SOS联系人</span>
      <span @click='handleEditor' class="comfirm">{{type}}</span>
    </div>
    <div class="content">
      <ul>
        <li class="contact_item" :class="{editor:type!=='编辑'}">
          <p>
            <span>号码1:</span>
            <input placeholder="昵称" type="text" :disabled='type=="编辑"'>
          </p>
          <p>
            <span></span>
            <input placeholder="请输入联系电话" type="text" :disabled='type=="编辑"'>
          </p>
        </li>
        <li class="contact_item disabled" :class="{editor:type!=='编辑'}">
          <p>
            <span>号码2:</span>
            <input placeholder="昵称" type="text" :disabled='type=="编辑"'>
          </p>
          <p>
            <span></span>
            <input placeholder="请输入联系电话" type="text" :disabled='type=="编辑"'>
          </p>
        </li>
        <li class="contact_item disabled" :class="{editor:type!=='编辑'}">
          <p>
            <span>号码2:</span>
            <input placeholder="昵称" type="text" :disabled='type!=="编辑"'>
          </p>
          <p>
            <span></span>
            <input placeholder="请输入联系电话" type="text" :disabled='type=="编辑"'>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowAddPhoneBook: false,
      type: '编辑'
    }
  },
  components: {
  },
  methods: {
    closeEmergencyContact () {
      this.$emit('closeEmergencyContact')
    },
    handleEditor () {
      if (this.type === '编辑') {
        this.type = '确认'
      } else {
        this.type = '编辑'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.emergency_contact {
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
      width: .18rem;
      height: .25rem;
    }
    .title {
      text-align: center;
    }
    .comfirm {
      font-size: .28rem;
    }
  }
  .content {
    .contact_item {
      background: white;
      padding: 5px 10px;
      margin-bottom: 10px;
      &.editor {
        input {
          background: rgb(229,245,240);
          border: 1px solid rgb(186,247,227);
        }
      }
      p {
        display: flex;
        align-items: center;
        font-size: .25rem;
        margin: 10px 0;
        input {
          width: 3.5rem;
          padding: .15rem;
          border-radius:4px;
          background: #E6E6E6;
          border: 1px solid transparent;
        }
        span {
          width: .9rem;
        }
      }
    }
  }
}
</style>
