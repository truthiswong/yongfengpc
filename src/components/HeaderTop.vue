<template>
  <div class="top_tab">
    <Select v-model="search" class="top_tab_search" multiple filterable remote :remote-method="remoteMethod" :loading="loading" size="small" placeholder="代码/拼音/名称">
      <Option v-for="item in searchList" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select>
    <div class="logoin cursor" @click="logoin">
      <img src="../assets/headIcon.png" alt="" class="headIcon">
      <span>登陆</span>
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
      loading: false, // loding
      searchList: []//  搜索列表
    }
  },
  methods: {
    logoin() {
      this.$emit('headerTopClick', '1')
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
    z-index: 99999;
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
</style>
