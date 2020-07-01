<template>
  <div class="home">
    <div class="title">
      <div class="tabTitle1 top3">代码</div>
      <div class="tabTitle2 top3">名称</div>
      <div class="tabTitle3 top3">委托时间</div>
      <div class="tabTitle4 top3">操作</div>
      <div class="tabTitle5 top3">委托价格</div>
      <div class="tabTitle6 top3">委托数量</div>
      <div class="tabTitle8 top3">当前价</div>
      <div class="tabTitle9 top3">实际盈亏</div>
    </div>
    <div class="tableList">
      <ul>
        <li v-for="(item,index) of list" :key="index" :class="item.type.name=='买多'?'tabred cursor tabLi':'bule cursor tabLi'">
          <div class="tabTitle1 top5">{{item.stockCode}}</div>
          <div class="tabTitle2 top5">{{item.sotckName}}</div>
          <div class="tabTitle3 top5">{{item.timeCreated}}</div>
          <div class="tabTitle4 top5">{{item.type.name}}</div>
          <div class="tabTitle5 top5">{{item.price}}</div>
          <div class="tabTitle6 top5">{{item.volume}}</div>
          <div class="tabTitle8 top5">{{item.nowPrice}}</div>
          <div :class="Number(item.nowProfitLoss)>0?'tabTitle9 top5 red':'tabTitle9 top5 green'">{{item.nowProfitLoss}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getExchangeList } from '@/api/api';
import { timeDate2 } from '@/api/account';
export default {
  name: 'entrust',
  components: {},
  data () {
    return {
      type: window.localStorage.getItem('loginType'),
      list: []
    }
  },
  mounted() {
    if (this.type === true || this.type === 'true') {
      this.getList()
    }
  },
  methods: {
    getList() {
      const data = {
        status: 'close',
        pageSize: '100',
        pageNo: '1'
      }
      getExchangeList(data).then(res => {
        const arr = res.data.data
        arr.forEach(v => {
          v.closeTime = timeDate2(v.closeTime)
          v.timeCreated = timeDate2(v.timeCreated)
        });
        this.list = arr
      })
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  height: 100%;
  width: 100%;
}
.title{
  width: 100%;
  height: 24px;
  position: relative;
  border-bottom: 1px solid rgba(41,51,64,1);
  font-size:12px;
  font-weight:400;
  color:rgba(131,141,158,1);
  .top3{
    top: 3px;
  }
}
.tableList{
  width: 100%;
  height: calc(100% - 31px);
  ul{
    height: 100%;
    overflow-x: hidden;
    list-style:none;
    .tabLi{
      height: 28px;
      width: 100%;
      border-bottom: 1px solid rgba(41,51,64,1);
      position: relative;
      .top5{
        top: 4px;
      }
    }
  }
}
ul::-webkit-scrollbar {
  display: none;
}
.tabTitle1{
  position: absolute;
  left: 28px;
}
.tabTitle2{
  position: absolute;
  left: 95px;
}
.tabTitle3{
  position: absolute;
  left: 220px;
}
.tabTitle4{
  position: absolute;
  left: 325px;
}
.tabTitle5{
  position: absolute;
  left: 382px;
}
.tabTitle6{
  position: absolute;
  right: 163px;
}
.tabTitle7{
  position: absolute;
  right: 150px;
}
.tabTitle8{
  position: absolute;
  right: 93px;
}
.tabTitle9{
  position: absolute;
  right: 10px;
}
.bule{
  color: #218DF2;
}
.tabred{
  color: #FF494A;
}
</style>
