<template>
  <div class="phone_book"
       @click='hideAction'>
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png'
           class="back"
           @click='closePhoneBook' />
      <span class="title">电话本</span>
      <img src='@/assets/icon/home/新增IC.png'
           class="add"
           @click='handleAddContact' />
    </div>
    <div class="content">
      <ul v-if='contacts.length'>
        <li class="contact_item"
            v-for='(item, index) in contacts'
            :key='index'
            @touchstart='touchstart(item, index)'
            @touchend='touchend'>
          <div class="info">
            <div class="desc">
              <p>{{item.phonebookName}}</p>
              <p>{{item.phonebookNnumber}}</p>
            </div>
          </div>
          <!-- <span class="del">删除</span> -->
        </li>
      </ul>
      <div class='no_contact'
           v-else>还没有添加电话本</div>
      <div class="action"
           ref='action'>
        <!-- <p class="editor" @click.stop='showEditorContact'>编辑</p> -->
        <p @click.stop='delContact'>删除</p>
      </div>
    </div>
    <add-contact v-if='isShowAddPhoneBook'
                 @addContact='AddContact'
                 :title='title.add'></add-contact>
    <!-- <editor-contact
      v-if='isShowEditorPhoneBook'
      :title='title.editor'
      :selectPerson='selectPerson.person'
      @editorContact='editorContact'></editor-contact> -->
  </div>
</template>

<script>
import AddContact from '@/components/Home/AddContact'
import EditorContact from '@/components/Home/AddContact'
import { Toast, Indicator } from 'mint-ui'
export default {
  data () {
    return {
      isShowAddPhoneBook: false,
      // isShowEditorPhoneBook: false,
      time: 0,
      appuserWearerId: '',
      contacts: [
        // {
        //   name: '女儿',
        //   phone: 123467800,
        //   id: 0
        // }
      ],
      title: {
        add: '新增电话本',
        editor: '修改电话本'
      },
      selectPerson: {
        index: '',
        person: {}
      }
    }
  },
  components: {
    AddContact,
    EditorContact,
    Toast
  },
  created () {
    this.getPhoneBoohs()
  },
  methods: {
    // 查询所有电话本
    getPhoneBoohs () {
      this.$http.get(`/phonebook/getAll`, {
        params: {
          wearerDeviceId: JSON.parse(localStorage.getItem('device')).wearerDeviceId
        }
      }).then(res => {
        if (res.code === 200) {
          this.contacts = res.date.Phonebook
        }
      })
    },
    closePhoneBook () {
      this.$router.go(-1)
    },
    // 新增电话本
    handleAddContact () {
      this.isShowAddPhoneBook = true
    },
    AddContact (bol, personInfo) {
      if (bol) {
        const data = this.setParams(personInfo)
        this.$http.post(`/Appcommand/command`, data).then(res => {
          Indicator.close()
          if (res.code === 200) {
            Toast({
              message: '添加成功',
              iconClass: 'icon icon-success'
            })
            this.getPhoneBoohs()
            this.isShowAddPhoneBook = false
          } else {
            Toast({
              message: '设置电话本失败',
              iconClass: 'icon icon-success'
            })
          }
        })
      } else {
        this.isShowAddPhoneBook = false
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
    showAction (item, index) {
      this.selectPerson.person = item
      this.selectPerson.index = index
      this.$refs.action.style.display = 'block'
      this.$refs.action.style.top = 10 + (index * 50) + 'px'
    },
    // 隐藏操作栏
    hideAction () {
      if (!this.$refs.action) { return }
      this.$refs.action.style.display = 'none'
    },
    // 修改联系人
    // showEditorContact () {
    //   this.isShowEditorPhoneBook = true
    // },
    // editorContact (bol, personInfo) {
    //   this.isShowEditorPhoneBook = false
    //   if (bol) {
    //     for (var k in personInfo) {
    //       if (!personInfo[k]) {
    //         return Toast({
    //           message: '人员信息不能为空',
    //           iconClass: 'icon icon-error'
    //         })
    //       }
    //     }
    //   }
    //   this.contacts.splice(this.selectPerson.index, 1, personInfo)
    //   Toast({
    //     message: '操作成功',
    //     iconClass: 'icon icon-success'
    //   })
    // },
    // 删除联系人
    delContact () {
      const data = {
        id: JSON.parse(localStorage.getItem('device')).wearerDeviceId,
        keyWord: 'DPHBX',
        currency1: this.selectPerson.person.phonebookNumbering
      }
      this.hideAction()
      Indicator.open({
        text: '正在删除...',
        spinnerType: 'fading-circle'
      })
      this.$http.post(`/Appcommand/command`, data).then(res => {
        Indicator.close()
        if (res.code === 200) {
          this.contacts.splice(this.selectPerson.index, 1)
          Toast({
            message: '操作成功',
            iconClass: 'icon icon-success'
          })
        } else {
          Toast({
            message: '删除失败',
            iconClass: 'icon icon-success'
          })
        }
      })
    },
    // 处理参数
    setParams (personInfo) {
      if (personInfo.name.length > 4) {
        return Toast({
          message: '昵称不能超过四位',
          iconClass: 'icon icon-error'
        })
      }
      if (personInfo.phone.length !== 11) {
        return Toast({
          message: '请输入正确的电话号码',
          iconClass: 'icon icon-error'
        })
      }
      for (var k in personInfo) {
        if (!personInfo[k]) {
          return Toast({
            message: '人员信息不能为空',
            iconClass: 'icon icon-error'
          })
        }
      }
      Indicator.open({
        text: '正在添加中...',
        spinnerType: 'fading-circle'
      })
      const currency3 = []
      if (this.contacts.length) {
        this.contacts.forEach(item => {
          currency3.push(item.phonebookNumbering)
        })
      }
      const books = {
        id: JSON.parse(localStorage.getItem('device')).wearerDeviceId,
        keyWord: 'PHBX',
        currency1: personInfo.name,
        currency2: personInfo.phone,
        currency3: currency3.join()
      }
      return {
        ...this.data,
        ...books
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.phone_book {
  position: fixed;
  top: 0.48rem;
  bottom: 0;
  background: #f0f2f5;
  z-index: 3;
  width: 100vw;
  .home_header {
    background: #15bf86;
    color: white;
    box-sizing: border-box;
    height: 0.96rem;
    padding: 0 0.26rem;
    font-size: 0.36rem;
    display: flex;
    align-items: center;
    .back {
      width: 0.18rem;
      height: 0.25rem;
    }
    .add {
      width: 0.24rem;
      height: 0.24rem;
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
    .no_contact {
      margin-top: 50px;
      font-size: 0.4rem;
      text-align: center;
      color: red;
    }
    .contact_item {
      padding: 0 10px;
      height: 1rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: white;
      margin-bottom: 5px;
      .info {
        font-size: 0.26rem;
        display: flex;
        flex-direction: column;
        .desc {
          p {
            margin: 5px 0;
          }
        }
      }
      .del {
        font-size: 0.24rem;
        width: 1.04rem;
        height: 0.44rem;
        text-align: center;
        line-height: 0.44rem;
        color: white;
        background: linear-gradient(
          -90deg,
          rgba(51, 221, 164, 1),
          rgba(21, 191, 134, 1)
        );
        box-shadow: 0px 1px 4px 0px rgba(5, 60, 41, 0.5);
        border-radius: 0.22rem;
      }
    }
    .action {
      width: 1.6rem;
      height: 0.65rem;
      box-shadow: 0px 1px 4px 0px rgba(109, 109, 109, 0.5);
      font-size: 0.26rem;
      text-align: center;
      position: absolute;
      background: white;
      // top: 90px;
      display: none;
      right: 70px;
      p {
        line-height: 0.65rem;
        &.editor {
          background: #d4f4ea;
        }
      }
    }
  }
}
</style>
