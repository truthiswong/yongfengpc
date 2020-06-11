<template>
  <div class="left_tab">
    <img src="../assets/logo.png" alt="" class="left_tab_logo">
    <ul class="tabs">
      <router-link :to="{ path: '/trade/individual'}">
        <li>
          <img src="../assets/individual-grey.png" alt=""  class="img2">
          <img src="../assets/individual-colour.png" alt=""  class="img1">
          个股
        </li>
      </router-link>
      <router-link :to="{ path: '/trade/quotation'}">
        <li>
          <img src="../assets/quotation-grey.png" alt=""  class="img2">
          <img src="../assets/quotation-colour.png" alt=""  class="img1">
          行情
        </li>
      </router-link>
      <router-link :to="{ path: '/trade/assets'}">
        <li>
          <img src="../assets/assets-grey.png" alt=""  class="img2">
          <img src="../assets/assets-colour.png" alt=""  class="img1">
          资产
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'menuLift',
  components: {},
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
  .left_tab{
    position: fixed;
    top: 38px;
    left: 0;
    bottom: 0;
    z-index: 9999;
    width:49px;
    height:100%;
    background:rgba(20,30,40,1);
    .left_tab_logo{
      width: 38px;
      height: 38px;
      margin-top:3px;
    }
  }
  .tabs {
    font-size:12px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(130,141,158,1);
  }
  .tabs li{
    margin-top: 20px;
    color:rgba(130,141,158,1);
  }
  .tabs .router-link-active li{
    color:rgba(255,73,74,1);
  }
  .img1{
    margin: 0 auto;
    margin-bottom: 5px;
    width:20px;
    height:17px;
    display: none
  }
  .img2{
    margin: 0 auto;
    margin-bottom: 5px;
    width:20px;
    height:17px;
    display: block
  }
  .tabs .router-link-active .img1{
    display: block
  }
  .tabs .router-link-active .img2{
    display: none
  }
</style>
