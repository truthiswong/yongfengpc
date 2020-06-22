<template>
  <div class="list">
    <Affix :offset-top="40" style="width:100%">
      <div class="list_tab">
        <div class="tab cursor" :style="tabBar == '1'? 'background:rgba(36,57,75,1);':''" @click="tabClick('1')">沪深</div>
        <div class="tab cursor" :style="tabBar == '2'? 'background:rgba(36,57,75,1);':''" @click="tabClick('2')">港股</div>
        <div class="tab cursor" :style="tabBar == '3'? 'background:rgba(36,57,75,1);':''" @click="tabClick('3')">自选</div>
      </div>
    </Affix>
    <div class="table">
      <div class="table_title">
        <div class="textpad tab_text1 right">序号</div>
        <div class="textpad tab_text2 left">代码</div>
        <div class="textpad tab_text3 left">名称</div>
        <div class="textpad tab_text4 right">最新价</div>
        <div class="textpad tab_text5 right">涨跌额</div>
        <div class="textpad tab_text6 right">涨跌幅</div>
        <div class="textpad tab_text4 right">今开</div>
        <div class="textpad tab_text4 right">昨收</div>
        <div class="textpad tab_text4 right">最高价</div>
        <div class="textpad tab_text4 right">最低价</div>
        <div class="textpad tab_text5 right">振幅</div>
        <div class="textpad tab_text4 right">涨停价</div>
        <div class="textpad tab_text4 right">跌停价</div>
        <div class="textpad tab_text2 right">成交额</div>
        <div class="textpad tab_text7 right">成交量</div>
        <div class="textpad tab_text5 right">成交价</div>
      </div>
      <div class="table_name">
        <div v-for="(item,index) of list" :key="index" class="table_name_list" @click="tabListClick(item.code)">
          <div class="right tab_text1">{{Number(index) + 1}}</div>
          <div class="left tab_text2">{{item.code}}</div>
          <div class="left tab_text3">{{item.name}}</div>
          <div class="right tab_text4">{{item.nowPrice}}</div>
          <div :class="Number(item.diff_money) > 0?'right tab_text5 red':'right tab_text5 green'">{{item.diff_money}}</div>
          <div :class="Number(item.diff_rate) > 0?'right tab_text6 red':'right tab_text6 green'">{{item.diff_rate}}%</div>
          <div :class="Number(item.openPrice) >= Number(item.yestodayClosePrice)?'right tab_text4 red':'right tab_text4 green'">{{item.openPrice}}</div>
          <div class="right tab_text4">{{item.yestodayClosePrice}}</div>
          <div class="right tab_text4 red">{{item.todayMax}}</div>
          <div class="right tab_text4 green">{{item.todayMin}}</div>
          <div class="right tab_text5">{{item.swing}}%</div>
          <div class="right tab_text4 red">{{item.highLimit}}</div>
          <div class="right tab_text4 green">{{item.downLimit}}</div>
          <div class="right tab_text2">{{item.circulation_value}}</div>
          <div class="right tab_text7">{{item.currcapital}}</div>
          <div class="right tab_text5">{{item.closePrice}}</div>
        </div>
      </div>
    </div>
    <Drawer :closable="false" v-model="drawerType" width="362px" id="drawer" @on-close="drawerClose">
      <div style="" class="business" id="spin1">
        <div v-show="purchaseShow == 1" style="height:100%">
          <div class="sharesBasics">
            <div class="nameCode">{{stockBasis.code}} {{stockBasis.name}}</div>
            <div :class="stockBasis.diff_money>0?'priceRange red':'priceRange green'">{{stockBasis.nowPrice}} {{stockBasis.diff_money}} {{stockBasis.diff_rate}}%</div>
            <div class="addOptional">+ 添加自选</div>
          </div>
          <div class="mainIndicators">
            <div class="mainIndicators_title">
              <div>主要指标</div>
            </div>
            <ul class="mainIndicators_list">
              <li>
                <div class="width165">
                  <div class="name">最高</div>
                  <div class="content">{{stockBasis.todayMax}}</div>
                </div>
                <div class="width165">
                  <div class="name">最低</div>
                  <div class="content">{{stockBasis.todayMin}}</div>
                </div>
              </li>
              <li>
                <div class="width165">
                  <div class="name">今开</div>
                  <div class="content">{{stockBasis.openPrice}}</div>
                </div>
                <div class="width165">
                  <div class="name">昨收</div>
                  <div class="content">{{stockBasis.yestodayClosePrice}}</div>
                </div>
              </li>
              <li>
                <div class="width165">
                  <div class="name">成交量</div>
                  <div class="content">{{stockBasis.currcapital}}</div>
                </div>
                <div class="width165">
                  <div class="name">成交额</div>
                  <div class="content">{{stockBasis.circulation_value}}</div>
                </div>
              </li>
              <li>
                <div class="width165">
                  <div class="name">换手率</div>
                  <div class="content">{{stockBasis.turnover}}</div>
                </div>
                <div class="width165">
                  <div class="name">振幅</div>
                  <div class="content">{{stockBasis.swing}}</div>
                </div>
              </li>
              <li>
                <div class="width165">
                  <div class="name">总市值</div>
                  <div class="content">{{stockBasis.all_value}}</div>
                </div>
                <div class="width165">
                  <div class="name">流通市值</div>
                  <div class="content">{{stockBasis.circulation_value}}</div>
                </div>
              </li>
              <li>
                <div class="width165">
                  <div class="name">市盈率</div>
                  <div class="content">{{stockBasis.pe}}</div>
                </div>
                <div class="width165">
                  <div class="name">市净率</div>
                  <div class="content">{{stockBasis.pb}}</div>
                </div>
              </li>
              <li>
                <div class="width165">
                  <div class="name">涨停价</div>
                  <div class="content">{{stockBasis.highLimit}}</div>
                </div>
                <div class="width165">
                  <div class="name">跌停价</div>
                  <div class="content">{{stockBasis.downLimit}}</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="businessHandicap">
            <div class="title_text">买卖盘口</div>
            <div class="businessTitle">
              
              
            </div>
            <div class="businessTable">
              <div class="orange title_text500"></div>
              <div class="businessTable_1" style="background:rgba(255,104,36,0.1);">
                <div class="businessTable_list">
                  <span class="span1">买1</span>
                  <span :class="stockBasis.diff_money>0?'span2 red':'span2 green'">{{stockBasis.sell1_m}}</span>
                  <span class="span3">{{stockBasis.sell1_n}}</span>
                </div>
                <div class="businessTable_list">
                  <span class="span1">买2</span>
                  <span :class="stockBasis.diff_money>0?'span2 red':'span2 green'">{{stockBasis.sell2_m}}</span>
                  <span class="span3">{{stockBasis.sell2_n}}</span>
                </div>
                <div class="businessTable_list">
                  <span class="span1">买3</span>
                  <span :class="stockBasis.diff_money>0?'span2 red':'span2 green'">{{stockBasis.sell3_m}}</span>
                  <span class="span3">{{stockBasis.sell3_n}}</span>
                </div>
                <div class="businessTable_list">
                  <span class="span1">买4</span>
                  <span :class="stockBasis.diff_money>0?'span2 red':'span2 green'">{{stockBasis.sell4_m}}</span>
                  <span class="span3">{{stockBasis.sell4_n}}</span>
                </div>
                <div class="businessTable_list">
                  <span class="span1">买5</span>
                  <span :class="stockBasis.diff_money>0?'span2 red':'span2 green'">{{stockBasis.sell5_m}}</span>
                  <span class="span3">{{stockBasis.sell5_n}}</span>
                </div>
              </div>
              <div class="blue title_text500"></div>
              <div class="businessTable_1" style="background:rgba(33,141,242,0.1);">
                <div class="businessTable_list">
                  <span class="span1">卖1</span>
                  <span :class="stockBasis.diff_money>0?'span2 red':'span2 green'">{{stockBasis.buy1_m}}</span>
                  <span class="span3">{{stockBasis.buy1_n}}</span>
                </div>
                <div class="businessTable_list">
                  <span class="span1">卖2</span>
                  <span :class="stockBasis.diff_money>0?'span2 red':'span2 green'">{{stockBasis.buy2_m}}</span>
                  <span class="span3">{{stockBasis.buy2_n}}</span>
                </div>
                <div class="businessTable_list">
                  <span class="span1">卖3</span>
                  <span :class="stockBasis.diff_money>0?'span2 red':'span2 green'">{{stockBasis.buy3_m}}</span>
                  <span class="span3">{{stockBasis.buy3_n}}</span>
                </div>
                <div class="businessTable_list">
                  <span class="span1">卖4</span>
                  <span :class="stockBasis.diff_money>0?'span2 red':'span2 green'">{{stockBasis.buy4_m}}</span>
                  <span class="span3">{{stockBasis.buy4_n}}</span>
                </div>
                <div class="businessTable_list">
                  <span class="span1">卖5</span>
                  <span :class="stockBasis.diff_money>0?'span2 red':'span2 green'">{{stockBasis.buy5_m}}</span>
                  <span class="span3">{{stockBasis.buy5_n}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="capitalStatistics">
          </div> -->
          <div class="inTransaction">
            <div class="title_text">交易中</div>
            <div class="bnt_tab">
              <Button type="error" class="bnt1" style="margin-right:20px" @click="purchaseClick(2)">融资(多)</Button>
              <Button type="info" class="bnt1" @click="purchaseClick(3)">融券(少)</Button>
            </div>
          </div>
        </div>
        <Financing ref="financing" @securitiesLendingFinancing="rechargeWithdrawalRefresh" v-show="purchaseShow == 2"></Financing>
        <SecuritiesLending ref="securitiesLending" @securitiesLendingFinancing="rechargeWithdrawalRefresh" v-show="purchaseShow == 3"></SecuritiesLending>
      </div>
    </Drawer>
  </div>
</template>

<script>
import Financing from './MarginTrading/financing' // 融资
import SecuritiesLending from './MarginTrading/securitiesLending' // 融券
import { getHotExchange, getStockPrice, getStockDetail } from '@/api/api'
export default {
  name: 'menuLift',
  components: { Financing, SecuritiesLending },
  data () {
    return {
      purchaseShow: 1,
      drawerType: false,
      tabBar: '1',
      code: '',
      stockBasis: {},
      list:[]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const data = {}
      if (this.tabBar == '1') {
        data.markets = 'sh,sz',
        data.limit = '60'
      } else if(this.tabBar == '2') {
        data.markets = 'hk',
        data.limit = '60'
      } else if(this.tabBar == '3') {
        data.showprice = 1
      }
      if (this.tabBar == '1' || this.tabBar == '2') {
        getHotExchange(data).then(res => {
          const arr = res.data
          arr.forEach(v => {
            v.aa = ((v.diff_money/v.closePrice)*100).toFixed(2) 
          });
          
          this.list = arr
        })
      } else {
        getStockPrice(data).then(res => {
          const arr = res.data.data
          arr.forEach(v => {
            v.aa = ((v.diff_money/v.closePrice)*100).toFixed(2) 
          });
          this.list = arr
          // this.optionalList = arr
        }).catch(err => {
          if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
        })
      }
      
    },
    // tab切换
    tabClick(key) {
      this.tabBar = key
      this.getList()
    } ,
    // 选中股票
    tabListClick(code) {
      this.code = code 
      getStockDetail(this.code).then(res => {
        const arr = res.data
        arr.currcapital = (arr.currcapital).toFixed(0)
        this.stockBasis = arr
        this.drawerType = true
      }).catch(err => {
        this.drawerType = true
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
    },
    // 融资融券成功刷新列表
    rechargeWithdrawalRefresh(key) {
      this.purchaseShow = 1
      getStockDetail(this.code).then(res => {
        const arr = res.data
        arr.currcapital = (arr.currcapital).toFixed(0)
        this.stockBasis = arr
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
    },
    // 融资融券切换
    purchaseClick(key){
      this.purchaseShow = key
      if (key == 2) {
        this.$refs.financing.getList(this.code)
      } else if (key == 3) {
        this.$refs.securitiesLending.getList(this.code)
      }
    },
    drawerClose() {
      this.purchaseShow = 1
    }
  }
}
</script>
<style lang="less" scoped>
.list{
  width: 100%;
  height: 100%;
  .list_tab{
    height: 41px;
    width: 100%;
    display: flex;
    border-bottom: 1px solid rgba(44,55,68,1);
    .tab{
      width:129px;
      height:41px;
      line-height: 41px;
      text-align: center;
      background:rgba(35,44,55,1);
      border: 1px solid rgba(36,57,75,1);
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(131,141,158,1);
    }
    .tab:hover{
      color:rgba(255,255,255,1);
      background:rgba(36,57,75,1);
    }
  }
  .table{
    height: calc(100% - 51px);
    box-sizing:border-box;
    margin: 10px 14px 0 8px;
    .table_title{
      display: flex;
      border-collapse:collapse;
      div{
        border-collapse:collapse;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(131,141,158,1);
        border: 1px solid rgba(44,55,68,1);
      }
    }
    .table_name{
      height: calc(100% - 25px);
      border-collapse:collapse;
      overflow-x: hidden;
      .table_name_list{
        display: flex;
        border-collapse:collapse;
        color:rgba(221,221,221,1);
        div{
          height: 29px;
          border-collapse:collapse;
          line-height: 29px;
          padding: 0 12px;
          font-size:12px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          border: 1px solid rgba(44,55,68,1);
        }
      }
    }
    .table_name::-webkit-scrollbar {
      display: none;
    }
    .right{
      text-align: right;
    }
    .left{
      text-align: left;
    }
    .textpad{
      height: 25px;
      line-height: 25px;
      padding: 0 12px;
    }
    .tab_text1{
      min-width: 59px;
      width: 100%;
    }
    .tab_text2{
      min-width: 79px;
      width: 100%;
    }
    .tab_text3{
      min-width: 139px;
      width: 100%;
    }
    .tab_text4{
      min-width: 82px;
      width: 100%;
    }
    .tab_text5{
      min-width: 83px;
      width: 100%;
    }
    .tab_text6{
      min-width: 93px;
      width: 100%;
    }
    .tab_text7{
      min-width: 62px;
      width: 100%;
    }
  }
}
.business{
  min-width: 357px;
  text-align: right;
  position: relative;
  height: 100%;
  background: #242C37;
  border-left: 2px solid rgba(20,30,40,1);
  .sharesBasics{
    width: 100%;
    height: 71px;
    position: relative;
    border-bottom: 1px solid rgba(48,59,75,1);
    .nameCode{
      font-size:18px;
      position: absolute;
      top: 11px;
      left:10px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(222,221,221,1);
    }
    .priceRange{
      position: absolute;
      top: 34px;
      left:10px;
      font-size:18px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
    }
    .addOptional{
      position: absolute;
      top: 12px;
      right:10px;
      width:72px;
      height:25px;
      cursor: pointer;
      line-height: 24px;
      text-align: center;
      border-radius:2px;
      border:1px solid rgba(131,141,158,1);
      font-size:12px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
  }
  .mainIndicators{
    width: 100%;
    height: 225px;
    padding: 10px;
    border-bottom: 1px solid rgba(48,59,75,1);
    .mainIndicators_title{
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(222,221,221,1);
      text-align: left;
    }
    .mainIndicators_list{
      margin-top: 24px;
      li{
        margin-bottom: 6px;
        display: flex;
        justify-content:space-between;
        .width165{
          width: 165px;
          display: flex;
          justify-content:space-between;
          font-size:12px;
          font-family:PingFangSC-Medium,PingFang SC;
          .name{
            font-weight:400;
            color:rgba(131,141,158,1);
          }
          .content{
            font-weight:500;
            color:rgba(255,255,255,1);
          }
        }
      }
    }
  }
  .businessHandicap{
    width: 100%;
    // height: 167px;
    height: 414px;
    padding: 10px;
    border-bottom: 1px solid rgba(48,59,75,1);
    .businessTitle{
      margin-top:5px;
      width: 100%;
      display: flex;
      
    }
    .businessTable{
      .orange{
        width:100%;
        background:rgba(255,104,36,1);
        height: 20px;
        line-height: 20px;
        text-align: left;
        padding-left: 5px;
      }
      .blue{
        width:100%;
        background:rgba(33,141,242,1);
        height: 20px;
        line-height: 20px;
        text-align: right;
        padding-right: 5px;
      }
      // display: flex;
      font-size:12px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      .businessTable_1{
        width: 100%;
        .businessTable_list{
          width:100%;
          height: 30px;
          color:rgba(222,221,221,1);
          position: relative;
          .span1{
            position: absolute;
            top: 4px;
            left: 5px;
          }
          .span2{
            position: absolute;
            top: 4px;
            left: 150px;
          }
          .span3{
            position: absolute;
            top: 4px;
            right: 5px;
          }
        }
      }
    }
  }
  .capitalStatistics{
    height: 276px;
    width: 100%;
    border-bottom: 1px solid rgba(20,30,40,1);
  }
  .inTransaction{
    min-height: 107px;
    height: calc(100% - 719px);
    width: 100%;
    padding: 10px;
    .bnt_tab{
      height: calc(100% - 18px);
      display: flex;
      align-items: center;
      justify-content:center
    }
  }
}
.orderList{
  border-top: 1px solid rgba(48,59,75,1);
  height: calc(100% - 645px);
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
  }
}
</style>
