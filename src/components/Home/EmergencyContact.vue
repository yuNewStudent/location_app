<template>
  <div class="emergency_contact">
    <div class="home_header">
      <span class="back">
        <img src='@/assets/icon/home/箭头.png' @click='closeEmergencyContact'/>
      </span>
      <span class="title">SOS联系人</span>
      <span @click='handleEditor' class="comfirm">{{type}}</span>
    </div>
    <div class="content">
      <ul>
        <li
          v-for='(item, index) in contacts'
          :key='index'
          class="contact_item"
          :class="{editor:type!=='编辑'}">
          <p>
            <span>号码{{index+1}}:</span>
            <input v-model="item.sosName" type="text" :disabled='type=="编辑"'>
          </p>
          <p>
            <span></span>
            <input v-model="item.sosNumber" placeholder="请输入联系电话" type="text" :disabled='type=="编辑"'>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      type: '编辑',
      contacts: [
        // {
        //   sosName: '',
        //   sosNumber: '',
        //   sosWearerID: ''
        // },
        // {
        //   sosName: '',
        //   sosNumber: '',
        //   sosWearerID: ''
        // },
        // {
        //   sosName: '',
        //   sosNumber: '',
        //   sosWearerID: ''
        // }
      ]
    }
  },
  components: {

  },
  created () {
    this.getEmergency()
  },
  methods: {
    closeEmergencyContact () {
      this.$router.go(-1)
    },
    handleEditor () {
      if (this.type === '编辑') {
        this.type = '确认'
      } else {
        this.type = '编辑'
        this.saveEmergency()
      }
    },
    // 获取SOS
    getEmergency () {
      this.$http.get(`${config.httpBaseUrl}/sos/getAll`,{
        params: {
          wearerDeviceId: JSON.parse(localStorage.getItem('device')).wearerDeviceId
        }
      }).then(res => {
        if (res.code === 200) {
          res.date.soss.forEach((item, index) => {
            if (index > 2) return
            delete item.sosId
            this.contacts.push(item)
          })
        }
      })
    },
    // 设置SOS
    saveEmergency () {
      let data = []
      this.contacts.forEach(item => {
        // 单个sos不能有空
        if ((item.sosName && item.sosNumber) || (!item.sosName && !item.sosNumber)) {
          data.push({
            ...item
          })
        } else {
          return Toast({
            message: '单个免打扰信息不能有空',
            iconClass: 'icon icon-error'
          })
        }
      })
      this.$http.post(`${config.httpBaseUrl}/sos/insert`, data).then(res => {
        if (res.code === 200) {
          Toast({
            message: '操作成功',
            iconClass: 'icon icon-success'
          })
        }
      })
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
