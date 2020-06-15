<template>
  <div class="home">
    <HeaderTop ref="headerTop" @headerTopClick="getLogoin"></HeaderTop>
    <HeaderBottom></HeaderBottom>
    <MenuLeft></MenuLeft>
    <div class="content_right">
      <div class="content_right_content">
        <router-view/>
      </div>
    </div>
    <Logoin ref="logoin"></Logoin>
  </div>
</template>

<script>
import Logoin from '../components/logoin/logoin'
import HeaderTop from '../components/HeaderTop'
import MenuLeft from '../components/MenuLeft'
import HeaderBottom from '../components/HeaderBottom'
export default {
  name: 'Home',
  components: {MenuLeft, HeaderTop, HeaderBottom, Logoin},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      search: '', //  搜索内容
      loading: false, // loding
      searchList: []//  搜索列表
    }
  },
  mounted() {
    if (window.localStorage.getItem('token') === null || window.localStorage.getItem('token') === undefined) {
      window.localStorage.setItem('loginType', false)
    } else {
      window.localStorage.setItem('loginType', true)
    }
  },
  methods: {
    getLogoin() {
      this.$refs.logoin.modalClick(true)
      console.log(1)
    }
  }
}
</script>
<style lang="less" scoped>
  .home{
    margin: 0;
    width: 100%;
    height: 100%;
    background:rgba(35,44,55,1);
  }
  .content_right{
    margin: auto;
    padding-left: 49px;
    margin-top: 37px;
    position: absolute;
    height: 100%;
    height: calc(100% - 66px);
    width: 100%;
    min-height: 826px;
    box-sizing: border-box;
    margin-bottom: 29px;
  }
  .content_right_content {
    min-height: 778px;
    min-width: 1387px;
    background:rgba(35,44,55,1);
    height: 100%;
  }
</style>
