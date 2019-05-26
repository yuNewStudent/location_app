<template>
  <div class="home">
    <div class="bglayer"></div>
    <div class="contanier">
      <router-view></router-view>
    </div>
    <div class="nav">
      <ul>
        <li
          v-for='(item, index) in navs'
          :key='index'
          @click='handleRoute(item.name, index)'>
          <img v-if='index==active' :src="actives[index].icon" alt="">
          <img v-else :src="item.icon" alt="">
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { Indicator, Button, Actionsheet } from 'mint-ui'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      actives: [
        {
          icon: require('@/assets/icon/home/主页IC--高亮.png')
        },
        {
          icon: require('@/assets/icon/home/定位IC--高亮.png')
        },
        {
          icon: require('@/assets/icon/home/我的IC--高亮.png')
        }
      ],
      navs: [
        {
          title: '主页',
          icon: require('@/assets/icon/home/主页IC—灰.png'),
          name: 'HomePage'
        },
        {
          title: '定位',
          icon: require('@/assets/icon/home/定位IC-灰.png'),
          name: 'LocationPage'
        },
        {
          title: '我的',
          icon: require('@/assets/icon/home/我的IC-灰.png'),
          name: 'MyPage'
        }
      ]
      // sheetVisible: false,
      // actions: [
      //   {
      //     name: '拍照中中选择',
      //     method () {
      //     }
      //   },
      //   {
      //     name: '拍照',
      //     method () {
      //     }
      //   }
      // ],
      // map: null,
      // geocoder: null
    }
  },
  watch: {
    route (value) {
      console.log(value)
      switch (value) {
        case 'LocationPage':
          this.active = 1
          break
        case 'HomePage':
          this.active = 0
          break
        case 'MyPage':
          this.active = 2
      }
    }
  },
  created () {
    // this.$nextTick(() => {
    //   this.initMap()
    // })
  },
  computed: {
    route () {
      return this.$route.name
    }
  },
  components: {
    // Button,
    // Actionsheet
  },
  methods: {
    // 路由跳转
    handleRoute (name, index) {
      // this.active = index
      this.$router.push({
        name
      })
    }
    // handle () {
    //   Indicator.open('加载中...')
    //   setTimeout(() => {
    //     Indicator.close()
    //   }, 2000)
    // },
    // handleShowSheetVisible () {
    //   this.sheetVisible = true
    // }
  }
}
</script>

<style lang='scss' scoped>
.home {
  .bglayer {
    width: 100vw;
    height: .48rem;
    background: #15BF86;
  }
  .contanier {
    position: fixed;
    width: 100vw;
    top: .48rem;
    bottom: 1rem;
    z-index: 6;
  }
  .nav {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background: white;
    z-index: 5;
    ul {
      display: flex;
      justify-content: space-around;
      padding: 5px;
      border-top: 1px solid #DFDFDF;
      height: 1rem;
      box-sizing: border-box;
      li {
        display: flex;
        flex-direction: column;
        font-size: .2rem;
        align-items: center;
        flex: 1;
        img {
          width: .44rem;
          height: .46rem;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
