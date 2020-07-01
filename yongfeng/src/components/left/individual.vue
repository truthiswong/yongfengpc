<template>
  <div class="individual">
    <div style="" class="optional">
      <div class="optional_tabs">
        <div :class="optionalTab==true?'optional_tab optional_tab1':'optional_tab'" @click="optionalTab=true">自选</div>
        <div :class="optionalTab==false?'optional_tab optional_tab1':'optional_tab'" @click="optionalTab=false">最近浏览</div>
      </div>
      <div class="optional_name">
        <div class="optional_name_title">自选股</div>
        <div class="optional_name_icon">
          <img src="../../assets/add.png" alt="" style="width:12px;height:12px;margin-right:8px" @click="addOptional">
          <img src="../../assets/setUp.png" alt="" style="width:12px;height:12px;margin-right:15px" @click="delOptional">
        </div>
      </div>
      <div class="optional_title">
        <span class="nameCode">名称|代码</span>
        <span class="price">价格</span>
        <span class="range" @click="spinShow1 = !spinShow1">涨跌幅</span>
      </div>
      <ul class="optional_list">
        <li v-for="item of optionalList" :key="item.code" :class="code==item.code?'optional_list_bule':''" @click="optionalCodeClick(item.code)">
          <span class="name">{{item.name}}</span>
          <span class="code">{{item.code}}</span>
          <span class="price">{{item.nowPrice}}</span>
          <span :class="item.diff_rate>0?'range red':'range green'">{{item.diff_rate>0?'+':''}}{{item.diff_rate}}%</span>
        </li>
      </ul>
    </div>
    <div style="" class="KList">
      <div class="KList_title">
        <div class="KList_title_name">{{stockBasis.name}}</div>
        <div :class="stockBasis.diff_money>0?'KList_title_nowPrice red':'KList_title_nowPrice green'"><span style="font-size:18px;">{{stockBasis.nowPrice}}</span>  {{stockBasis.diff_money}} {{stockBasis.diff_rate}}%</div>
      </div>
      <div class="KList_tab">
        <div class="KList_tab_list cursor" :style="klist=='5'?'background:#24394B':'background:#242C37'" @click="klistClick('5')">分时</div>
        <div class="KList_tab_list cursor" :style="klist=='day'?'background:#24394B':'background:#242C37'" @click="klistClick('day')">日线</div>
        <div class="KList_tab_list cursor" :style="klist=='week'?'background:#24394B':'background:#242C37'" @click="klistClick('week')">周线</div>
        <div class="KList_tab_list cursor" :style="klist=='month'?'background:#24394B':'background:#242C37'" @click="klistClick('month')">月线</div>
      </div>
      <div class="KList_echarts" id="spin">
        <Spin size="large" fix v-if="spinShow" >加载中...</Spin>
        <div id="kList" style="width:100%;height:570px;margin-top:5px">
        </div>
      </div>
      <div class="orderList">
        <div class="tabList">
          <div class="title">订单</div>
          <div style="">
            <ul class="routerList">
              <li class="cursor" :style="orderId == 1? 'background:#24394B':''" @click="orderCLick(1)">委托</li>
              <li class="cursor" :style="orderId == 2? 'background:#24394B':''" @click="orderCLick(2)">持仓</li>
              <li class="cursor" :style="orderId == 3? 'background:#24394B':''" @click="orderCLick(3)">已平仓</li>
            </ul>
          </div>
        </div>
        <div class="orderTable">
          <Position ref="position" v-show="orderId == 2"></Position>
          <ClosedPosition ref="closedPosition" v-show="orderId == 3"></ClosedPosition>
          <Entrust ref="entrust" v-show="orderId == 1"></Entrust>
        </div>
      </div>
    </div>
    <div style="" class="business" id="spin1">
      <Spin size="large" fix v-if="spinShow1" >加载中...</Spin>
      <div v-show="purchaseShow == 1" style="height:100%">
        <div class="sharesBasics">
          <div class="nameCode">{{stockBasis.code}} {{stockBasis.name}}</div>
          <div :class="stockBasis.diff_money>0?'priceRange red':'priceRange green'">{{stockBasis.nowPrice}} {{stockBasis.diff_money}} {{stockBasis.diff_rate}}%</div>
          <!-- <div class="addOptional">+ 添加自选</div> -->
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
    <AddOptionalList ref="addOptionalList" @AddOptionalListCLick="getStockPriceList"></AddOptionalList>
    <OptionalDel ref="optionalDel" @optionalDelCLick="getStockPriceList"></OptionalDel>
  </div>
</template>

<script>
import Financing from './MarginTrading/financing' // 融资
import SecuritiesLending from './MarginTrading/securitiesLending' // 融券
import AddOptionalList from './optional/addOptionalList' // 添加自选
import OptionalDel from './optional/optionalDel' // 删除自选
import Position from './orderList/position' // 持仓
import ClosedPosition from './orderList/closedPosition' // 平仓
import Entrust from './orderList/entrust' // 委托
import { getStockPrice, stockTsharing, stockKline, getStockDetail } from '@/api/api'
import  echarts  from '@/api/echarts.min'
import  {initKOption, initMOption}  from '@/api/k-line'
export default {
  name: 'menuLift',
  components: { AddOptionalList, OptionalDel, Financing, SecuritiesLending, Position, ClosedPosition, Entrust },
  data () {
    return {
      type: window.localStorage.getItem('loginType'),
      spinShow: false,
      spinShow1: false,
      purchaseShow: 1,
      orderId: 1, //订单类型
      klist:'5',
      optionalTab: true,
      optionalId: '',
      optionalList: [
      ],
      code: '601229',
      stockBasis: {
      },
      beginDay: '',
    }
  },
  watch: {
    $route() {
      this.code = this.$route.query.code
      this.purchaseShow =1
      this.getStockDetailList()
      this.getKList()
    }
  },
  mounted() {
    if (this.$route.query.code) {
      this.code = this.$route.query.code
    }
    if (this.type === true || this.type === 'true') {
      this.getStockPriceList()
    }
    this.getStockDetailList(1)
    this.getKList(1)
    this.aaa = setInterval(this.getStockDetailList,3000)
    // this.bbb = setInterval(this.getKList,3000)
  },
  methods: {
    //股票详情
    getStockDetailList(key) {
      if (key == 1) {
        this.spinShow1 = true
      }
      getStockDetail(this.code).then(res => {
        const arr = res.data
        arr.currcapital = (arr.currcapital).toFixed(0)
        this.stockBasis = arr
        this.spinShow1 = false
      }).catch(err => {
        this.spinShow1 = false
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
    },
    // 自选列表
    getStockPriceList() {
      const data = {
        showprice: 1
      }
      getStockPrice(data).then(res => {
        const arr = res.data.data
        this.optionalList = arr
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
    },
    getKList(key) {
      if (key == 1) {
        this.spinShow = true
      }
      if (this.klist !== '5') {
        let d = new Date()
        if (this.klist === 'day') {
          d.setMonth(d.getMonth() - 5)
        } else if (this.klist === 'week') {
          // d.setMonth(d.getMonth() - 30)
          d.setMonth(d.getMonth() - 23)
        } else if (this.klist === 'month') {
          d.setMonth(d.getMonth() - 24)
          // d.setMonth(d.getMonth() - 100)
        }
        let a = (d.toLocaleDateString()).split('/')
        if (Number(a[1]) < 10) {
          a[1] = '0' + a[1]
        }
        if (Number(a[2]) < 10) {
          a[2] = '0' + a[2]
        }
        this.beginDay = a[0] + a[1] + a[2]
        const data = {
          beginDay: this.beginDay,
          klist: this.klist,
          code: this.code
        }
        stockKline(data).then(res => {
          const arr = res.data.reverse()
          document.getElementById('kList').innerHTML = ''
          document.getElementById('kList').innerHTML = '<div id="k-content" style="width:100%;height:570px" ></div>';
          var kChart = echarts.init(document.getElementById('k-content'));
          kChart.setOption(initKOption(arr)); 
          window.onresize = function () {
            kChart.resize();
          }
          this.spinShow = false
        }).catch(err => {
          this.spinShow = false
          document.getElementById('kList').innerHTML = ''
          if (err.response) {
            this.$Message.error(err.response.data.message)
          } else {
            this.$Message.error('请求超时,请重试')
          }
        })
      } else {
        stockTsharing(this.code).then(res => {
          const arr = res.data
          document.getElementById('kList').innerHTML = ''
          document.getElementById('kList').innerHTML = '<div id="m-line" style="width:100%;height:570px"></div>';
          var mChart = echarts.init(document.getElementById('m-line'));
          mChart.setOption(initMOption(arr,this.stockBasis.market));
          window.onresize = function () {
            mChart.resize();
          }
          
          this.spinShow = false
        }).catch(err => {
          this.spinShow = false
          document.getElementById('kList').innerHTML = ''
          if (err.response) {
            this.$Message.error(err.response.data.message)
          } else {
            this.$Message.error('请求超时,请重试')
          }
        })
      }
      
    },
    klistClick(key) {
      if (this.klist === key) {
      } else {
        this.klist = key
        this.getKList()
      }
    },
    // 融资融券成功刷新列表
    rechargeWithdrawalRefresh(key) {
      this.purchaseShow =1
      this.orderCLick(1)
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
    // 添加自选
    addOptional() {
      this.$refs.addOptionalList.getList()
    },
    // 删除股票
    delOptional() {
      this.$refs.optionalDel.getList()
    },
    // 选择自选股
    optionalCodeClick(code) {
      this.code = code
      if (this.aaa) {
        clearInterval(this.aaa)
        this.aaa = null;
      }
      if (this.bbb) {
        clearInterval(this.bbb)
        this.bbb = null;
      }
      this.getStockDetailList()
      this.getKList()
      this.aaa = setInterval(this.getStockDetailList,3000)
      // this.bbb = setInterval(this.getKList,3000)
    },
    // 切换订单类型
    orderCLick(key) {
      this.orderId = key
      if (key == 1) {
        this.$refs.entrust.getSetIntervalList()
      } else if (key == 2) {
        this.$refs.position.getList()
      } else if (key == 3) {
        this.$refs.closedPosition.getList()
      }
    }
  },
  beforeDestroy(){
    if (this.aaa) {
      clearInterval(this.aaa)
      this.aaa = null;
    }
    if (this.bbb) {
      clearInterval(this.bbb)
      this.bbb = null;
    }
    this.$refs.financing.destroyedList()
    this.$refs.securitiesLending.destroyedList()
  }
}
</script>
<style lang="less" scoped>
.individual{
  height: 100%;
  display: flex;
  justify-content:center;
  color: #fff;
  .optional{
    box-sizing:border-box;
    width:290px;
    height: 100%;
    border-right: 2px solid rgba(20,30,40,1);
    .optional_tabs{
      border-bottom: 1px solid rgba(41,51,64,1);
      .optional_tab{
        display: inline-block;
        width:144px;
        height:41px;
        font-size:14px;
        line-height: 41px;
        text-align: center;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(131,141,158,1);
        background:rgba(36,44,55,1);
        cursor: pointer
      }
      .optional_tab1{
        background:rgba(36,57,75,1);
        color:rgba(255,255,255,1);
      }
    }
    .optional_name{
      height: 29px;
      line-height: 29px;
      border-bottom: 1px solid rgba(41,51,64,1);
      .optional_name_title{
        float: left;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(131,141,158,1);
        margin-left: 10px;
      }
      .optional_name_icon{
        float: right
      }
    }
    .optional_title{
      height: 25px;
      width: 288px;
      position: relative;
      line-height: 25px;
      border-bottom: 1px solid rgba(41,51,64,1);
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(222,221,221,1);
      .nameCode{
        position: absolute;
        left: 10px;
      }
      .price{
        position: absolute;
        right: 101px;
      }
      .range{
        position: absolute;
        right: 16px;
      }
    }
    .optional_list{
      box-sizing:border-box;
      height: calc(100% - 96px);
      overflow-x: hidden;
      li{
        width:288px;
        height:43px;
        position: relative;
        border-bottom: 1px solid rgba(41,51,64,1);
        font-size:12px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(221,221,221,1);
        .name{
          position: absolute;
          top: 6px;
          left: 10px;
        }
        .code{
          position: absolute;
          top: 23px;
          left: 10px;
          color:rgba(132,140,158,1);
        }
        .price{
          position: absolute;
          top: 14px;
          right: 100px;
        }
        .range{
          position: absolute;
          top: 14px;
          right: 14px;
        }
      }
      .optional_list_bule{
        background:rgba(36,57,75,0.8);
      }
    }
    .optional_list::-webkit-scrollbar {
      display: none;
    }
  }
}
.KList{
  min-width: 736px;
  width: 100%;
  .KList_title{
    height: 40px;
    width: 100%;
    display: flex;
    .KList_title_name{
      font-size:18px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(222,221,221,1);
      line-height: 40px;
      margin-left: 10px;
    }
    .KList_title_nowPrice{
      margin-left: 10px;
      font-size:14px;
      line-height: 44px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
    }
  }
  .KList_echarts{
    position: relative;
    text-align: center;
    display: flex;
    justify-content:center
  }
  .KList_tab{
    display: flex;
    .KList_tab_list{
      width:100%;
      height:30px;
      line-height: 30px;
      text-align: center;
      background:rgba(36,44,55,1);
      font-size:12px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(222,221,221,1);
      
    }
    .KList_tab_list:nth-child(n){
      border-bottom:1px solid #24394B;
      border-right:1px solid #24394B;
      border-top:1px solid #24394B;
    }
    .KList_tab_list:nth-child(1){
      border:1px solid #24394B;
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
.orderTable{
  height:calc(100% - 51px);
  width:736px;
  margin:0 auto;
  border-left: 1px solid rgba(48,59,75,1);
  border-right: 1px solid rgba(48,59,75,1);
}
// .bnt1{
//   position: absolute;
//   right: 15px;
//   bottom: 20px;
//   // background: #E33531;
// }
</style>
