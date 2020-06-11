<template>
  <div class="structure">
    <div style="margin:0 auto;display:flex;">
      <div class="assets">
        <div>
          <div class="my">
            <div class="my_title">我的资产</div>
            <div class="my_CardNumber">
              <div v-show="!list.type">（亲爱的用户您还没有开户，请前往<span class="opening">开户</span> 吧～）</div>
              <div v-show="list.type">（开户银行卡 622 **** **** *** 8927）</div>
            </div>
            <div class="my_text1">充值</div>
            <div class="my_text2">提现</div>
            <img src="../../assets/setUp.png" alt="" class="my_img">
          </div>
          <div class="myDetailed">
            <div class="position">
              <div class="text"><span>￥</span>{{list.text}}</div>
              <div class="title">可用余额</div>
            </div>
            <div class="position1">
              <div class="text"><span>￥</span>{{list.text1}}</div>
              <div class="title">总资产</div>
            </div>
            <div class="position2">
              <div class="text">{{list.text2}}</div>
              <div class="title">持仓单数</div>
            </div>
            <div class="position3">
              <div class="text">{{list.text3}}</div>
              <div class="title">持仓总名义本金</div>
            </div>
            <div class="position4">
              <div class="text">{{list.text4}}</div>
              <div class="title">实际本金</div>
            </div>
            <div class="position5">
              <div :class="Number(list.text5)>0?'text red':'text green'">{{list.text5}}</div>
              <div class="title">盈亏</div>
            </div>
          </div>
        </div>
        <div class="capital">
          <div class="title_text" style="margin-left:10px">资金明细</div>
          <div class="tab_title">
            <div class="tab_1">时间</div>
            <div class="tab_2">订单号</div>
            <div class="tab_3">金额</div>
            <div class="tab_4">状态</div>
          </div>
          <div class="tab_table">
            <div v-for="(item,index) of capitalList" :key="index" class="tab_table_list">
              <div class="tab_1">{{item.text}}</div>
              <div class="tab_2">{{item.text1}}</div>
              <div class="tab_3">{{item.text2}}</div>
              <div class="tab_4">{{item.text3}}</div>
            </div>
          </div>
        </div>
        <div class="order">
          <div class="tabList">
            <div class="title">订单</div>
            <div style="">
              <ul class="routerList">
                <router-link  :to="{ path: '/trade/assets/entrust'}"><li>委托</li></router-link>
                <router-link :to="{ path: '/trade/assets/position'}"><li>持仓</li></router-link>
                <router-link :to="{ path: '/trade/assets/closedPosition'}"><li>已平仓</li></router-link>
              </ul>
            </div>
          </div>
          <div style="height: calc(100% - 50px);">
            <router-view/>
          </div>
        </div>
      </div>
      <Financing></Financing>
      <SecuritiesLending></SecuritiesLending>
    </div>
  </div>
</template>

<script>
import Financing from './MarginTrading/financing'
import SecuritiesLending from './MarginTrading/securitiesLending'
export default {
  name: 'menuLift',
  components: {Financing, SecuritiesLending},
  data () {
    return {
      list: {
        type: false,
        text: '293872.54',
        text1: '142382.56',
        text2: '3',
        text3: '23820.74',
        text4: '22340.52',
        text5: '142382.56'
      },
      capitalList: [
        {
          text: '03-05 10:57',
          text1: '893274923872',
          text2: '432.28',
          text3: '出金完成'
        },
        {
          text: '03-05 10:57',
          text1: '893274923872',
          text2: '432.28',
          text3: '出金完成'
        },
        {
          text: '03-05 10:57',
          text1: '893274923872',
          text2: '432.28',
          text3: '出金完成'
        },
        {
          text: '03-05 10:57',
          text1: '893274923872',
          text2: '432.28',
          text3: '出金完成'
        },
        {
          text: '03-05 10:57',
          text1: '893274923872',
          text2: '432.28',
          text3: '出金完成'
        },
        {
          text: '03-05 10:57',
          text1: '893274923872',
          text2: '432.28',
          text3: '出金完成'
        },
        {
          text: '03-05 10:57',
          text1: '893274923872',
          text2: '432.28',
          text3: '出金完成'
        },
        {
          text: '03-05 10:57',
          text1: '893274923872',
          text2: '432.28',
          text3: '出金完成'
        },
        {
          text: '03-05 10:57',
          text1: '893274923872',
          text2: '432.28',
          text3: '出金完成'
        },
        {
          text: '03-05 10:57',
          text1: '893274923872',
          text2: '432.28',
          text3: '充值失败'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.structure{
  height: 100%;
  display: flex;
  // justify-content:space-around
  // justify-content: center;
}
.assets{
  width: 673px;
  height: 100%;
  border-left: 2px solid rgba(20,30,40,1);
  border-right: 2px solid rgba(20,30,40,1);
  .my{
    width: 100%;
    height: 41px;
    border-bottom: 1px solid rgba(48,59,75,1);
    font-size:12px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(221,221,221,1);
    position: relative;
    .my_title{
      position: absolute;
      font-size:18px;
      color:rgba(255,255,255,1);
      top: 8px;
      left: 10px;
    }
    .my_CardNumber{
      position: absolute;
      top: 14px;
      color: #838D9E;
      left: 78px;
      .opening{
        color: #218DF2;
        margin: 0 5px;
        cursor: pointer
      }
    }
    .my_text1{
      position: absolute;
      top: 12px;
      right: 58px;
      cursor: pointer
    }
    .my_text2{
      position: absolute;
      top: 12px;
      right: 100px;
      cursor: pointer
    }
    .my_img{
      width: 12px;
      height: 12px;
      position: absolute;
      top: 16px;
      right: 20px;
    }
  }
  .myDetailed{
    widows: 100%;
    height: 152px;
    border-bottom: 1px solid rgba(48,59,75,1);
    font-size:12px;
    position: relative;
    color:rgba(255,255,255,1);
    .text{
      font-size:20px;
      font-weight:600;
      text-align: left;
      span{
        font-size:14px;
        font-weight:500;
      }
    }
    .title{
      font-size:12px;
      font-weight:400;
      color:rgba(131,141,158,1);
      text-align: left;
    }
    .position{
      position: absolute;
      top: 20px;
      left: 10px;
    }
    .position1{
      position: absolute;
      top: 20px;
      left: 226px;
    }
    .position2{
      position: absolute;
      top: 20px;
      left: 442px;
    }
    .position3{
      position: absolute;
      top: 83px;
      left: 10px;
    }
    .position4{
      position: absolute;
      top: 83px;
      left: 226px;
    }
    .position5{
      position: absolute;
      top: 83px;
      left: 442px;
    }
  }
  .capital{
    width: 100%;
    height: 311px;
    border-bottom: 2px solid rgba(20,30,40,1);
    padding: 10px 0 0 0;
    .tab_title{
      width: 100%;
      height: 27px;
      color:rgba(131,141,158,1);
      border-bottom: 1px solid rgba(41,51,64,1);
      margin-top: 6px;
      position: relative;
    }
    .tab_table{
      width: 100%;
      height: calc(100% - 52px);
      box-sizing:border-box;
      overflow-x: hidden;
      .tab_table_list{
        width: 100%;
        height: 27px;
        position: relative;
        color:rgba(221,221,221,1);
      }
    }
    .tab_1{
      position: absolute;
      top: 5px;
      left: 10px;
    }
    .tab_2{
      position: absolute;
      top: 5px;
      right: 420px;
    }
    .tab_3{
      position: absolute;
      top: 5px;
      right: 216px;
    }
    .tab_4{
      position: absolute;
      top: 5px;
      right: 10px;
    }
  }
}
.tab_table::-webkit-scrollbar {
  display: none;
}
.order{
  height:  calc(100% - 504px);
  width: 100%;
  .tabList{
    height: 50px;
    width: 100%;
    border-bottom:1px solid rgba(48,59,75,1);
    display: flex;
    .title{
      height: 25px;
      margin: 12px 0;
      padding: 0 18px;
      font-size:18px;
      font-weight:500;
      color:rgba(222,221,221,1);
      border-right:1px solid rgba(48,59,73,1) ;
    }
    .routerList{
      margin-top: 13px;
      margin-left: 20px;
      font-size:12px;
      font-weight:500;
      list-style:none;
      display: flex;
      li{
        width:60px;
        height:24px;
        text-align: center;
        line-height: 22px;
        color:rgba(222,221,221,1);
        border:1px solid rgba(48,59,75,1);
      }
    }
    .routerList .router-link-active li{
      background:rgba(36,57,75,1);
    }
  }
}
</style>
