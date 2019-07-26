<template>
  <div class="box">
    <div class="RealTimeMonitor">
      <div class="vide_call">
        <div class="call_wrapper" v-if='isShowCallWarpper'>
          <input v-model="targetAccid" type='text' placeholder='请输入呼叫id'>
          <button @click="startCalling">呼叫</button>
        </div>
        <button ref='hangupbtn' class="hangupbtn" @click="cancelCalling" v-if='isShowHangup'>挂断</button>
        <div class="video_contanier" ref='accepting' v-show='isShowAccepting'>
          <div class="self" ref='container'></div>
          <div class="you" ref='remoteContainer'></div>
          <div class="btns"><button @click="hangupbtnaccepted">挂断</button></div>
        </div>
        <!-- <div class="accept_wrapper" ref='acceptDiv' v-if='isShowAcceptDiv'>
          <span class="name">{{targetAccid}}来电</span>
          <button @click="handleAnswer" size='mini'>接听</button>
          <button @click="handleHangUp" size='mini'>挂断</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox  } from 'mint-ui'
import MD5 from '@/assets/js/md5.js'
export default {
  props: ['password', 'account'],
  data () {
    return {
      targetAccid: '',
      nim: null,
      netcall: null,
      beCalledInfo: null,
      sessionConfig: null,
      beCalling: false,
      isShowAccepting: false,
      isShowCallWarpper: true,
      // isShowAcceptDiv: false,
      isShowHangup: false,
      youWidth: document.documentElement.clientWidth,
      youHeight: document.documentElement.clientHeight
    }
  },
  methods: {
    initNim () {
      this.nim = NIM.getInstance({
        // debug:true,
        appKey: '45c6af3c98409b18a84451215d0bdd6e', // 1664477a1216e189119905d3e752f86b
        account: this.account,
        token:  MD5(this.password), // this.password
        onconnect: onConnect,
        onwillreconnect: onWillReconnect,
        ondisconnect: onDisconnect,
        onerror: onError
      })
      const self = this
      function onConnect () {
        // console.log('SDK Connected')
        // hasLogined1 = true
        Toast('登录成功')
        self.initNetCall()
      }
      function onWillReconnect (obj) {
        // console.log('SDK is reconnecting')
        // console.log(obj.retryCount)
        // console.log(obj.duration)
      }
      function onDisconnect (error) {
        console.log('Lost Connection')
        console.log(error)
        if (error) {
          switch (error.code) {
            case 302: 
              Toast('Password or account not matched')
              break
            case 417: break
            case 'kicked': break
            default: break
          }
        }
        // window.location.href = './login.html'
        // delCookie('accid')
        // delCookie('token')
      }
      function onError (error) {
        console.log(error)
        alert('Login error:' + error)
        // window.location.href = './login.html'
        // delCookie('accid')
        // delCookie('token')
      }
    },
    initNetCall () {
      NIM.use(WebRTC)
      const that = this
      this.netcall = WebRTC.getInstance({
        nim: that.nim,
        container: that.$refs.container,
        remoteContainer: that.$refs.remoteContainer,
        // chromeId: '',
        // 是否开启日志打印
        debug: false
      })
      // 被呼叫
      this.netcall.on('beCalling', obj => {
        this.showAcceptUI(obj, null, this)
        this.beCalledInfo = obj
      })
      // 被叫接受的通知
      this.netcall.on('callAccepted', obj => {
        console.log('on callAccepted', obj)
        // this.isShowAcceptDiv = false
        that.isShowHangup = false
        this.isShowAccepting = true
        this.isShowCallWarpper = false
        // console.log(obj)
        that.startConnect(obj)
      })
      this.netcall.on('hangup', obj => {
        console.log('on callAccepted', obj)
        Toast('电话被挂断')
        // resetWhenHangup()
        // this.isShowAcceptDiv = false
        this.isShowAccepting = false
        this.isShowCallWarpper = true
        this.netcall.hangup()
      })
    },
    // 拨打电话
    startCalling () {
      const pushConfig = {
        enable: true,
        needBadge: true,
        needPushNick: true,
        pushContent: '',
        custom: '',
        pushPayload: '',
        sound: ''
      }
      const that = this
      this.netcall.call({
        type: WebRTC.NETCALL_TYPE_VIDEO,
        account: that.targetAccid,
        pushConfig,
        sessionConfig: that.sessionConfig,
        webrtcEnable: true
      }).then(obj => {
        // 成功发起呼叫
        console.log('call success', obj)
        // remoteContainer1.style.display = 'block'
        this.isShowCallWarpper = false
        that.isShowHangup = true
        that.isCalling = true
      }).catch(err => {
        console.log(err)
        // 被叫不在线
        if (err.event.code === 11001) {
          console.log('callee offline', err)
          alert('对方不在线')
          // clearAcceptUI()
        }
      })
      // 对方拒绝接听
      that.netcall.on('callRejected', obj => {
        Toast('对方拒绝接听')
        that.isShowHangup = false
        that.isShowCallWarpper = true
        that.netcall.hangup()
      })
    },
    // 接听电话
    handleAnswer () {
      this.beCalling = false
      const that = this
      this.netcall.response({
        accepted: true,
        beCalledInfo: that.beCalledInfo,
        sessionConfig: that.sessionConfig
      })
        .catch(err => {
          console.log('接听失败', err)
        })
    },
    // 挂断电话
    handleHangUp () {
      const that = this
      this.netcall.control({
        channelId: that.beCalledInfo.channelId,
        command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
      })
      this.netcall.response({
        accepted: false,
        beCalledInfo: this.beCalledInfo
      })
      this.beCalledInfo = null
      this.beCalling = false
    },
    // 显示接听界面
    showAcceptUI (obj, accid, that) {
      this.isShowCallWarpper = false
      this.beCalling = true
      MessageBox({
        title: '来电提醒',
        message: `${obj.account}来电`,
        confirmButtonText: '接听',
        cancelButtonText: '挂断',
        showCancelButton: true
      }).then(action => {
        Toast('接听电话!')
        this.handleAnswer()
      }).catch(() => {
        Toast('已挂断电话')
        this.handleHangUp()
      })
    },
    // 开始通话
    startConnect (obj) {
      const netcall = this.netcall
      const that = this
      // this.$refs.accepting.style.
      // 连接媒体网关
      netcall.startRtc()
        .then(() => {
          // 开启麦克风
          return netcall.startDevice({
            type: WebRTC.DEVICE_TYPE_AUDIO_IN
          }).catch(err => {
            console.log(err)
            Toast('启动麦克风失败')
          })
        })
        .then(() => {
          // 设置采集音量
          netcall.setCaptureVolume(255)
          // 开启摄像头
          return netcall.startDevice({
            type: WebRTC.DEVICE_TYPE_VIDEO
          }).catch(err => {
            console.log(err)
            Toast('启动摄像头失败')
          })
        })
        .then(() => {
          // 开启本地视频预览
          netcall.startLocalStream(
            that.$refs.container
          )
          // 设置本地视频画面大小
          netcall.setVideoViewSize({
            width: 100,
            height: 140,
            cut: false
          })
        }).catch(err => {
          console.log('发生错误')
          console.log(err)
          netcall.hangup()
          // window.location.href = './callready.html'
        })
      // 播放对方声音
      // 开启本地音频播放
      netcall.on('remoteTrack', obj => {
        netcall.startDevice({
          type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
        }).catch(err => {
          console.log('播放对方的声音失败')
          console.log(err)
        })
        // 开启远程视频预览
        netcall.startRemoteStream({
          account: obj.account,
          node: that.$refs.remoteContainer
          // poster: 'http://dev.netease.im/images/logo2.png'
        })
        // 设置对端视频画面大小
        netcall.setVideoViewRemoteSize({
          account: obj.account,
          width: that.youWidth,
          height: that.youHeight,
          cut: false
        })
      })
    },
    // 通话过程中的挂断按钮
    hangupbtnaccepted () {
      this.netcall.hangup()
      this.isShowAccepting = false
      this.isShowCallWarpper = true
      Toast('你挂断了电话')
    },
    // 取消呼叫
    cancelCalling () {
      this.netcall.hangup()
      this.isShowHangup = false
      this.isShowCallWarpper = true
      Toast('已经取消呼叫')
    }
  },
  created () {
    this.initNim()
    this.sessionConfig = {
      videoQuality: WebRTC.CHAT_VIDEO_QUALITY_480P,
      videoFrameRate: WebRTC.CHAT_VIDEO_FRAME_RATE_NORMAL,
      videoBitrate: 0,
      recordVideo: false,
      recordAudio: false,
      highAudio: false,
      // bypassRtmp: false,
      // rtmpUrl: '',
      // rtmpRecord: false,
      // splitMode: WebRTC.LAYOUT_SPLITLATTICETILE
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' scoped>
.RealTimeMonitor {
  .vide_call {
    height: 100%;
    .call_wrapper {
      // width: 550px;
      // display: none;
      input {
        width: 4rem;
        line-height: .5rem;
        font-size: .28rem;
        border: 1px solid gray;
        box-sizing: border-box;
        padding: 0 .1rem;
      }
    }
    .video_contanier {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100vw;
      background: black;
      .you {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100vw;
      }
      .self {
        position: absolute;
        background: black;
        right: .4rem;
        top: .48rem;
        width: 100px;
        height: 140px;
        z-index: 2;
      }
      .btns {
        z-index: 1;
        position: absolute;
        bottom: 0;
        background: white;
        width: 100vw;
        height: .6rem;
        text-align: right;
        button {
          float: right;
        }
      }
    }
    .accept_wrapper {
      .name {
        color: white;
      }
    }
  }
}
</style>
