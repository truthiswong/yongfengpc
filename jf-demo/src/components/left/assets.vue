<template>
  <div class="structure">
    <div style="width:100%;display:flex;">
      <div class="assets">
        <div>
          <div class="my">
            <div class="my_title">我的资产</div>
            <div class="my_CardNumber" v-show="type==true || type=='true'">
              <div v-show="assetsList.accountNo==''">（亲爱的用户您还没有开户，请前往<span class="opening">开户</span> 吧～）</div>
              <div v-show="assetsList.accountNo!=''" class="cursor" @click="accountInfoCLick">（开户银行卡 {{assetsList.accountNo}}）</div>
            </div>
            <div class="my_text1" @click="withdrawalRechargeClick(1)">充值</div>
            <div class="my_text2" @click="withdrawalRechargeClick(2)">提现</div>
            <img src="../../assets/setUp.png" alt="" class="my_img cursor" @click="accountInfoCLick">
          </div>
          <div class="myDetailed">
            <div class="position">
              <div class="text"><span>￥</span>{{assetsList.balance}}</div>
              <div class="title">可用余额</div>
            </div>
            <div class="position1">
              <div class="text"><span>￥</span>{{assetsList.totalIn}}</div>
              <div class="title">总资产</div>
            </div>
            <div class="position2">
              <div class="text">{{assetsList.hold}}</div>
              <div class="title">持仓单数</div>
            </div>
            <div class="position3">
              <div class="text">{{assetsList.principalNominal}}</div>
              <div class="title">持仓总名义本金</div>
            </div>
            <div class="position4">
              <div class="text">{{assetsList.principalActual}}</div>
              <div class="title">实际本金</div>
            </div>
            <div class="position5">
              <div :class="Number(assetsList.profit)>0?'text red':'text green'">{{assetsList.profit}}</div>
              <div class="title">盈亏</div>
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
            <div class="tab_1">{{item.time}}</div>
            <div class="tab_2">{{item.id}}</div>
            <div :class="Number(item.amount)>0?'tab_3 red':'tab_3 green' ">{{item.amount}}</div>
            <div :class="item.status.name=='交易亏损'?'tab_4 red':'tab_4'">{{item.status.name}}</div>
          </div>
        </div>
      </div>
      <!-- <Financing ref="financing" @securitiesLendingFinancing="rechargeWithdrawalRefresh"></Financing> -->
      <MarginTrading ref="marginTrading" @securitiesLendingFinancing="rechargeWithdrawalRefresh"></MarginTrading>
      <Recharge ref="recharge" @rechargeWithdrawal="rechargeWithdrawalRefresh"></Recharge>
      <Withdrawal ref="withdrawal" @rechargeWithdrawal="rechargeWithdrawalRefresh"></Withdrawal>
      <AccountInfo ref="accountInfo" @modifyAccountInfo="modifyAccountInfoChange"></AccountInfo>
      <AccountInfoModify ref="accountInfoModify" ></AccountInfoModify>
    </div>
  </div>
</template>

<script>
import { getUserIdinfo, getBankDetail, getFundBalance, getCountHold, getPrincipalActual, getPrincipalNominal, getFundLogPage } from '@/api/api';
import { timeDate2 } from '@/api/account';
// import Financing from './MarginTrading/financing' // 融资
import MarginTrading from './MarginTrading/marginTrading' // 融资融券
import Recharge from './rechargeWithdrawal/recharge' // 充值
import Withdrawal from './rechargeWithdrawal/withdrawal' // 提现
import AccountInfo from './accountOpening/accountInfo' // 提现
import AccountInfoModify from './accountOpening/accountInfoModify' // 修改开户信息
export default {
  name: 'menuLift',
  components: {MarginTrading, Recharge, Withdrawal, AccountInfo, AccountInfoModify},
  data () {
    return {
      type: window.localStorage.getItem('loginType'),
      assetsList: {
        accountNo: '-',
        balance: '-',
        totalIn: '-',
        hold: '-',
        principalNominal: '-',
        principalActual: '-',
        profit: '-'
      },
      num: 0,
      capitalList: []
    }
  },
  mounted() {
    // this.$refs.financing.ascriptionTypeClick(1)
    this.$refs.marginTrading.ascriptionTypeClick(1)
    if (window.localStorage.getItem('loginType') == true || window.localStorage.getItem('loginType') == 'true') {
      this.getList() 
      this.aaa = setInterval(this.getList,5000)
      // this.getUserIdinfoList()
    }
  },
  methods: {
    getList() {
      // 银行卡信息
      getBankDetail().then(res => {
        this.assetsList.accountNo = res.data.accountNo
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
      // 资产信息
      getFundBalance().then(res => {
        const arr = res.data
        this.assetsList.balance = arr.balance
        this.assetsList.totalIn = arr.totalIn
        this.assetsList.profit = (Number(arr.balance) - Number(arr.totalIn)).toFixed(2)
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
      // 持仓数量
      getCountHold().then(res => {
        this.assetsList.hold = res.data
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
      // 持仓实际本金
      getPrincipalActual().then(res => {
        this.assetsList.principalActual = res.data
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
      // 持仓名义本金
      getPrincipalNominal().then(res => {
        this.assetsList.principalNominal = res.data
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
      // 资金明细
      getFundLogPage().then(res => {
        const arr = res.data.data
        arr.forEach(v => {
          v.time = timeDate2(v.timeCreated)
        });
        this.capitalList = arr
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
    },
    // 我的身份信息
    getUserIdinfoList() {
      getUserIdinfo().then(res => {
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
    },
    // 提现
    withdrawalRechargeClick(key) {
      if (this.type === true || this.type === 'true') {
        if (this.assetsList.accountNo !== '') {
          if (key === 1) {
            this.$refs.recharge.getList()
          } else {
            this.$refs.withdrawal.getList(this.assetsList.accountNo, this.assetsList.balance)
          }
        } else {
          this.$Message.error('您未开户，请开户！')
        }
      } else {
        this.$Message.error('您未登录，请登录！')
      }
    },
    // 修改开户信息
    modifyAccountInfoChange(key) {
      if (this.type === true || this.type === 'true') {
        this.$refs.accountInfoModify.getList(key)
      } else {
        this.$Message.error('您未登录，请登录！')
      }
    },
    // 开户信息弹窗
    accountInfoCLick() {
      if (this.type === true || this.type === 'true') {
        this.$refs.accountInfo.getList()
      } else {
        this.$Message.error('您未登录，请登录！')
      }
    },
    // 提现充值成功刷新数据列表
    rechargeWithdrawalRefresh(key) {
      this.getList()
      this.num = this.num +1
      if (key == '3') {
        this.$router.push({ 
          path: '/trade/assets/entrust', 
          query: {
            code: key + this.num
          } 
        })
      }
    }
  },
  beforeDestroy(){
    if (this.aaa) {
      clearInterval(this.aaa)
      this.aaa = null;
    }
    // this.$refs.financing.destroyedList()
    this.$refs.marginTrading.destroyedList()
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
  min-width: 673px;
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
}
.tab_table::-webkit-scrollbar {
  display: none;
}
.capital{
  min-width: 673px;
  height: 100%;
  // border-bottom: 2px solid rgba(20,30,40,1);
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
    // right: 420px;
    right: 357px;
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
.order{
  height:  calc(100% - 200px);
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
