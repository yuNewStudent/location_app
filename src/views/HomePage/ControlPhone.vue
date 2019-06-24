<template>
  <div class="phone_book">
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='closePhoneBook'/>
      <span class="title">中控号码</span>
      <img v-if='!controlPhone' src='@/assets/icon/home/新增IC.png' class="add" @click='isShowAddControl=!isShowAddControl'/>
    </div>
    <div class="content">
      <div v-if='controlPhone' class="phone_num">
        <span class='text'>{{controlPhone}}</span>
        <span class='editor' @click='isShowEditorControl= !isShowEditorControl'>修改</span>
      </div>
      <div v-else class='no_contact'>
        <span>还没有中控号码<br/>请先增加</span>
      </div>
      <!-- <div class="action" ref='action'>
        <p class="editor" @click.stop='showEditorContact'>编辑</p>
        <p @click.stop='delContact'>删除</p>
      </div> -->
    </div>
    <change-control
      v-if='isShowAddControl'
      @addControl='addControl'
      :title='title.add'></change-control>
    <change-control
      v-if='isShowEditorControl'
      :title='title.editor'
      :selectPhone='controlPhone'
      @editorControl='editorControl'></change-control>
  </div>
</template>

<script>
import ChangeControl from '@/components/Home/ChangeControl'
import { Toast, Indicator } from 'mint-ui'
export default {
  data () {
    return {
      isShowAddControl: false,
      isShowEditorControl: false,
      title: {
        add: '新增中控号码',
        editor: '修改中控号码'
      },
      controlPhone: ''
      // time: 0,
      // appuserWearerId: '',
    }
  },
  components: {
    ChangeControl,
    Toast
  },
  created () {
    this.getControlPhone()
  },
  methods: {
    // 查询设备中控号码
    getControlPhone () {
      this.controlPhone = JSON.parse(localStorage.getItem('device')).werarerCenternumber
    },
    closePhoneBook () {
      this.$router.go(-1)
    },
    addControl (bol, phone) {
      this.isShowAddControl = false
      this.changeControl(bol, phone)
    },
    // 修改中控号码
    editorControl (bol, phone) {
      this.isShowEditorControl = false
      this.changeControl(bol, phone)
    },
    // 改变中控电话
    changeControl (bol, phone) {
      if (bol) {
        Indicator.open({
          text: '修改中...',
          spinnerType: 'fading-circle'
        })
        const data = {
          id: JSON.parse(localStorage.getItem('device')).wearerDeviceId,
          keyWord: 'CENTER',
          currency1: phone
        }
        this.$http.post(`${config.httpBaseUrl}/Appcommand/command`, data).then(res => {
          Indicator.close()
          if (res.code === 200) {
            this.controlPhone = phone
            // 添加至locastorage
            let device = JSON.parse(localStorage.getItem('device'))
            device.werarerCenternumber = phone
            localStorage.setItem('device', JSON.stringify(device))
            Toast({
              message: '操作成功',
              iconClass: 'icon icon-success'
            })
          } else {
            Toast({
              message: '设备不再线',
              iconClass: 'icon icon-success'
            })
          }
        })
      }
    }
    // // 长按事件
    // touchstart (item, index) {
    //   this.time = setTimeout(() => {
    //     // 展示操作窗口
    //     this.showAction(item, index)
    //   }, 500)
    // },
    // touchend (e) {
    //   clearTimeout(this.time)
    // },
    // // 隐藏操作栏
    // hideAction () {
    //   if (!this.$refs.action) { return }
    //   this.$refs.action.style.display = 'none'
    // },
    // // 展示操作窗口
    // showAction(item, index) {
    //   this.selectPerson.person = item
    //   this.selectPerson.index = index
    //   this.$refs.action.style.display = 'block'
    //   this.$refs.action.style.top = 10 + (index * 50) + 'px'
    // },
  }
}
</script>

<style lang="scss" scoped>
.phone_book {
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
    .back {
      width: .18rem;
      height: .25rem;
    }
    .add {
      width: .24rem;
      height: .24rem;
    }
    .title {
      text-align: center;
      width: 100%;
    }
  }
  .content {
    position: fixed;
    top: 1.44rem;
    bottom: 0;
    width: 100vw;
    overflow: auto;
    .phone_num {
      font-size: .4rem;
      padding: 0 10px;
      line-height: .8rem;
      display: flex;
      justify-content: space-between;
    }
    .no_contact {
      margin-top: 50px;
      font-size: .4rem;
      text-align: center;
      color: red;
    }
    // .contact_item {
    //   padding: 0 10px;
    //   height: 1rem;
    //   box-sizing: border-box;
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-between;
    //   background: white;
    //   margin-bottom: 5px;
    //   .info {
    //     font-size: .26rem;
    //     display: flex;
    //     flex-direction: column;
    //     .desc {
    //       p {
    //         margin: 5px 0;
    //       }
    //     }
    //   }
    //   .del {
    //     font-size: .24rem;
    //     width: 1.04rem;
    //     height: .44rem;
    //     text-align: center;
    //     line-height: .44rem;
    //     color: white;
    //     background: linear-gradient(-90deg,rgba(51,221,164,1), rgba(21,191,134,1));
    //     box-shadow: 0px 1px 4px 0px rgba(5,60,41,0.5);
    //     border-radius: .22rem;
    //   }
    // }
    // .action {
    //   width: 1.6rem;
    //   height: 1.3rem;
    //   box-shadow: 0px 1px 4px 0px rgba(109,109,109,0.5);
    //   font-size: .26rem;
    //   text-align: center;
    //   position: absolute;
    //   background: white;
    //   // top: 90px;
    //   display: none;
    //   right: 70px;
    //   p {
    //     line-height: .65rem;
    //     &.editor {
    //       background: #D4F4EA;
    //     }
    //   }
    // }
  }
}
</style>
