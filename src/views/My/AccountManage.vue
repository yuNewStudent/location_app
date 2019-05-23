<template>
  <div class="account_manage">
    <div class="home_header">
      <span class="back">
        <img  src='@/assets/icon/home/箭头.png' @click='back'/>
      </span>
      <span class="title">账号管理</span>
      <span class="comfirm"></span>
    </div>
    <div class="content">
       <ul>
        <li  class="item">
           <img class="icont" :src="adatar?adatar:require('@/assets/icon/my/log.jpg')" alt="">
           <input type="file" name="" style=" position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            outline: none;
            opacity: 0;
            cursor: pointer;
            " accept="image/gif,image/jpeg,image/jpg,image/png" @change="fileChange">
          <span></span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </li>
        <li  class="item" @click="username">
          <img class="icon" src="@/assets/icon/my/用户名IC.png" alt="">
          <span>用户名</span>
          <span class="itemc">哈喽牛小萌</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </li>
        <li  class="item" @click="passwordb">
          <img class="icon" src="@/assets/icon/my/密码IC.png" alt="">
          <span>密码</span>
          <span class="itemc">******</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </li>
        <li  class="item" @click="changephone">
          <img class="icon" src="@/assets/icon/my/手机IC.png" alt="">
          <span>绑定手机号码</span>
          <span class="itemc">15828658729</span>
          <img class="more" src="@/assets/icon/my/箭头.png" alt="">
        </li>
       </ul>
    </div>
    <changenumber
      v-if='isShowAddPhoneBook'
      @addContact='AddContact'
      :title='title.add'></changenumber>
  </div>
</template>

<script>
import { Actionsheet } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import changenumber from '@/components/my/changenumber'
export default {
  data () {
    return {
      inputtext : {
            phone : '',
            password:'',
        },
        isShowAddPhoneBook:false,
        title: {
        add: '修改密码',
      },
      adatar:"",
    }
  },
  components: {
    changenumber
  },
  methods: {
    back () {
      this.$router.push({ name: 'MyPage'})
    },
    username(){
      MessageBox.prompt('更改用户名', {
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
    },
    passwordb(){
      this.isShowAddPhoneBook = true
    },
    fileChange(e) {
            var that = this;
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function(e){
                console.log(e);
                that.adatar  = e.target.result;
            }
            reader.readAsDataURL(file);
        },
     AddContact (bol, personInfo) {
      this.isShowAddPhoneBook = false
      if (bol) {
        for (var k in personInfo) {
          if (!personInfo[k]) {
            return Toast({
              message: '人员信息不能为空',
              iconClass: 'icon icon-error'
            })
          }
        }
      }
      this.contacts.push(personInfo)
      Toast({
        message: '操作成功',
        iconClass: 'icon icon-success'
      })
    },
     homeTel(){                    // 整个方法没有被执行
        let telValue = this.$refs.homeTel.value;
        console.log(telValue)
        // 对比input内的值是否符合
        if(this.reg.test(telValue)){
            this.isShowPhoneError = true;
            this.cc = true;
            console.log('1')
        }else{
            this.isShowPhoneError = true ;
            this.cc = false;
            console.log('2')
        }
    },
    changephone(){
      MessageBox.prompt('更改手机号码', {
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
.account_manage {
  width: 100vw;
  position: fixed;
  top: .48rem;
  bottom: 0;
  background: #ffffff;
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
    padding: 0 .26rem;
    .item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #EFEFEF;
      padding: 10px 0 2px;
      .icon {
        width: .54rem;
        height: .54rem;
      }
      span {
        font-size: .26rem;
        flex: 1;
        margin-left: 10px;
      }
      .icont{
        width: 90px;
        margin-bottom: .2rem;
        height:90px;
        border-radius:50%;
      }
      .itemc{
        text-align: right;
        margin-right: .3rem;
      }
      .more {
        text-align: right;
        width: .18rem;
        height: .24rem;
      }
      .home_input{
        border: 1px solid;
      }
    }
  }
}
</style>