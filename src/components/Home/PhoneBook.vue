<template>
  <div class="phone_book">
    <div class="home_header">
      <img src='@/assets/icon/home/箭头.png' class="back" @click='closePhoneBook'/>
      <span class="title">电话本</span>
      <img src='@/assets/icon/home/新增IC.png' class="add" @click='handleAddContact'/>
    </div>
    <div class="content">
      <ul>
        <li class="contact_item">
          <div class="info">
            <img src="" alt="">
            <div class="desc">
              <p>女儿</p>
              <p>12345678</p>
            </div>
          </div>
          <span class="del">删除</span>
        </li>
        <li class="contact_item">
          <div class="info">
            <img src="" alt="">
            <div class="desc">
              <p>女儿</p>
              <p>12345678</p>
            </div>
          </div>
          <span class="del">删除</span>
        </li>
        <li class="contact_item">
          <div class="info">
            <img src="" alt="">
            <div class="desc">
              <p>女儿</p>
              <p>12345678</p>
            </div>
          </div>
          <span class="del">删除</span>
        </li>
      </ul>
    </div>
    <add-contact
      v-if='isShowAddPhoneBook'
      @AddContact='AddContact'></add-contact>
  </div>
</template>

<script>
import AddContact from '@/components/Home/AddContact'
export default {
  data () {
    return {
      isShowAddPhoneBook: false
    }
  },
  components: {
    AddContact,
  },
  methods: {
    closePhoneBook () {
      this.$emit('closePhoneBook')
    },
    // 新增电话本
    handleAddContact () {
      this.isShowAddPhoneBook = true
    },
    AddContact (bol) {
      this.isShowAddPhoneBook = false
    }
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
    .contact_item {
      padding: 0 10px;
      height: 1rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: white;
      margin-bottom: 2px;
      .info {
        font-size: .26rem;
        display: flex;
        flex-direction: column;
        .desc {
          p {
            margin: 3px 0;
          }
        }
      }
      .del {
        font-size: .24rem;
        width: 1.04rem;
        height: .44rem;
        text-align: center;
        line-height: .44rem;
        color: white;
        background: linear-gradient(-90deg,rgba(51,221,164,1), rgba(21,191,134,1));
        box-shadow: 0px 1px 4px 0px rgba(5,60,41,0.5);
        border-radius: .22rem;
      }
    }
  }
}
</style>

