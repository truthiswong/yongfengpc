<template>
  <div class="header_bottom">
    <div class="list" v-for="(item,index) of dataList" :key="index">
      <div class="list_name">{{item.name}}</div>
      <div :class="Number(item.bb)>0 ? 'list_name red' : 'list_name green'">{{item.nowPrice}}</div>
      <div :class="Number(item.bb)>0 ? 'list_name red' : 'list_name green'">{{item.bb}}</div>
      <div :class="Number(item.bb)>0 ? 'list_name red' : 'list_name green'">{{item.aa}}%</div>
      <div class="list_name list_cc">{{item.cc}}亿</div>
    </div>
  </div>
</template>

<script>
import { getMarketIndex } from '@/api/api'
export default {
  name: 'header_bottom',
  components: {},
  data () {
    return {
      dataList:[]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 指数列表
    getList() {
      getMarketIndex().then(res => {
        const arr = res.data
        arr.forEach(v => {
          v.bb = (v.nowPrice - v.yestodayClosePrice).toFixed(2)
          v.aa = ((v.bb / v.nowPrice) * 100).toFixed(2) 
          v.tradeAmount = v.tradeAmount +''
          v.cc = v.tradeAmount.substring(0,v.tradeAmount.length-8)
        });
        this.dataList = arr 
      })
    }
    
  }
}
</script>
<style lang="less" scoped>
.header_bottom{
  position: fixed;
  display: flex;
  bottom: 0;
  height: 29px;
  left: 49px;
  background:rgba(35,44,55,1);
  right: 0;
  z-index: 888;
  border-top: 2px solid rgba(20,30,40,1);
  .list{
    display: flex;
    line-height: 29px;
    font-size:12px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(221,221,221,1);
    .list_name{
      margin: 0 10px;
    }
    .list_cc{
      color: #F08C26;
    }
  }
}
</style>
