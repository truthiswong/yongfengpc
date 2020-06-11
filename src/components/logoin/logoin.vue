<template>
  <div class="">
    <Modal v-model="modal" width="700" id="logoinModal">
      <div class="list" slot="footer">
        <div class="img">
          <img src="../../assets/logo.png" alt="" class="img_logo">
          <div class="img_title">丰融通 </div>
          <div class="img_title1">丰融通 </div>
          <div class="img_title2">让您的投资变得轻松简单 </div>
          <img src="../../assets/logoin_img.png" alt="" class="img_logo1">
        </div>
        <div class="signIn">
          <password-login ref="accountLogin" v-show="type == 1" @switchingMode="switchClick"></password-login>
          <quick-login ref="quickLogin" v-show="type == 2" @switchingMode="switchClick"></quick-login>
          <forget-password ref="forgetPassword" v-show="type == 3" @switchingMode="switchClick"></forget-password>
          <register-login ref="register" v-show="type == 4" @switchingMode="switchClick"></register-login>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import passwordLogin from './signIn/passwordLogin'
import quickLogin from './signIn/quickLogin'
import forgetPassword from './signIn/forgetPassword'
import register from './signIn/register'
export default {
  name: 'header_top',
  components: {
    'password-login': passwordLogin,
    'quick-login': quickLogin,
    'forget-password': forgetPassword,
    'register-login': register
  },
  data () {
    return {
      modal: false,
      type: 1
    }
  },
  methods: {
    modalClick(key) {
      this.modal = key
    },
    // 切换状态
    switchClick(key) {
      console.log(key)
    }
  }
}
</script>
<style lang="less" scoped>
.list{
  width: 700px;
  height: 500px;
  display: flex;
  .img{
    width:350px;
    height:500px;
    background:rgba(32,38,46,1);
    border-radius:4px 0px 0px 4px;
    position: relative;
    .img_logo{
      position: absolute;
      top: 32px;
      left: 20px;
      width: 28px;
      height: 28px;
    }
    .img_title{
      position: absolute;
      top: 36px;
      left: 54px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .img_title1{
      position: absolute;
      top: 142px;
      left: 45px;
      font-size:20px;
      font-weight:500;
      font-family:PingFangSC-Medium,PingFang SC;
      color:rgba(255,255,255,1);
    }
    .img_title2{
      position: absolute;
      top: 178px;
      left: 45px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
    .img_logo1{
      position: absolute;
      top: 249px;
      left: 39px;
      width: 271px;
      height: 200px;
    }
  }
  .signIn{
    width: 350px;
    height: 500px;
  }
}
</style>
