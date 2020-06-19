<template>
  <div class="top_tab">
    <Select v-model="search" class="top_tab_search" multiple filterable remote :remote-method="remoteMethod" :loading="loading" size="small" placeholder="代码/拼音/名称">
      <Option v-for="item in searchList" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select>
    <div class="logoin cursor" @click="logoin('1')" v-show="type == false || type == 'false'">
      <img src="../assets/headIcon.png" alt="" class="headIcon">
      <span>登陆</span>
    </div>
    <div class="login1" v-show="type == true || type == 'true'">
      <div class="cursor" style="margin-right:16px">
        <img src="../assets/feedback.png" alt="" style="width:14px;height:15px">
        <span>反馈</span>
      </div>
      <div class="cursor" style="margin-right:16px">
        <img src="../assets/news.png" alt="" style="width:14px;height:11px">
        <span>消息</span>
      </div>
      <div class="cursor" @click="logoin('2')">
        <img src="../assets/setUp.png" alt="" style="width:14px;height:14px">
        <span>设置</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header_top',
  components: {},
  data () {
    return {
      search: '', //  搜索内容
      type: window.localStorage.getItem('loginType'),
      loading: false, // loding
      searchList: []//  搜索列表
    }
  },
  watch: {
    type() {
      console.log(1)
    }
  },
  methods: {
    logoin(key) {
      this.$emit('headerTopClick', key)
    },
    // 股票搜索
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      } else {
        this.searchList = [];
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .top_tab{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 39px;
    background:#242C37;
    border-radius:3px 3px 0px 0px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(131,141,158,1);
    border-bottom: 2px solid #141E28;
    line-height: 37px;
    text-align: left;
    z-index: 888;
    // padding-right: 49px;
    .top_tab_search{
      width: 221px;
      margin-left: 47px;
    }
  }
  .logoin{
    position: absolute;
    top: 0;
    right: 10px;
    height: 100%;
    display: flex;
    span{
      font-size:12px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(221,221,221,1);
      margin-left: 5px;
    }
  }
  .headIcon{
    margin-top: 9px;
    width: 20px;
    height: 20px;
  }
  .login1{
    width: 170px;
    position: absolute;
    top: 0;
    right: 10px;
    height: 100%;
    display: flex;
    font-size:12px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(221,221,221,1);
    div{
      align-items: center;
      display: flex;
    }
    img{
      align-items: center;
    }
    span{
      margin-left: 8px;
    }
  }
</style>
