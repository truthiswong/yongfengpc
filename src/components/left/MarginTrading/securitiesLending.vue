<template>
<div class="home">
  <div class="home_title title_text14500">融券（少）
    <img src="../../../assets/fork.png" alt="" style="width:12px;height:12px;float: right;margin-top: 5px;" v-show="ascriptionType == 2" @click="returnClick">
  </div>
  <div class="from">
    <div class="fromList fromLine">
      <div class="title">代码：</div>
      <Select v-model="search" id="marginTradingSelect" class="select" filterable remote :remote-method="remoteMethod" :loading="loading"  placeholder="代码/拼音/名称" @on-change="stockSearchChange">
        <Option v-for="item in searchList" :value="item.code" :key="item.code">{{ item.nameCode }}</Option>
      </Select>
    </div>
    <div class="fromList">
      <div style="display:flex" class="">
        <div class="title fromLine">价格：</div>
        <div>
          <div style="display:flex">
            <img src="../../../assets/addBtn.png" alt="" class="btnImg" @click="addReduceBtnCLick(1)">
            <Input placeholder="--" style="width: 213px" disabled v-model="sharesDetail.nowPrice" id="marginTradingInput"/>
            <img src="../../../assets/reduceBtn.png" alt="" class="btnImg" @click="addReduceBtnCLick(2)">
          </div>
          <div style="width:100%;margin-top:4px">
            <div class="title" style="float: left;text-align: left;width:100px">跌停：<span class="green">{{sharesDetail.highLimit}}</span></div>
            <div class="title" style="float: right;width:80px">涨停：<span class="red">{{sharesDetail.downLimit}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="fromList">
      <div style="display:flex" class="">
        <div class="title fromLine">交易股数：</div>
        <div>
          <div style="display:flex">
            <img src="../../../assets/addBtn.png" alt="" class="btnImg" @click="addReduceBtnCLick(3)">
            <Input placeholder="--" style="width: 213px" disabled v-model="share1" id="marginTradingInput" @on-change="sharesChange"/>
            <img src="../../../assets/reduceBtn.png" alt="" class="btnImg" @click="addReduceBtnCLick(4)">
          </div>
          <div style="width:100%;margin-top:4px">
            <RadioGroup type="button" id="marginTradingRadioGroup" v-model="btn_num" @on-change="radioGroupChange">
              <Radio label="third" style="width:86px;margin-right:10px">1/3</Radio>
              <Radio label="half" style="width:86px;margin-right:9px">1/2</Radio>
              <Radio label="all" style="width:86px">全部</Radio>
            </RadioGroup>
          </div>
          <div style="width:100%;margin-top:4px">
            <div class="title" style="float: left;text-align: left;width:50%">可买份额：<span class="orange">{{share}}</span></div>
            <div class="title" style="float: right;width:50%">开仓市值：<span class="orange">{{enteringValue}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="fromList ">
      <div class="title fromLine">保证金：</div>
      <div class="lever">
        <div>0.0</div>
        <div>10倍杠杆</div>
      </div>
    </div>
    <div class="fromList" style="display:flex">
      <div class="title">买卖盘口：</div>
      <ul class="businessList">
        <li><div class="text1">卖5</div><div class="text2">{{sharesDetail.buy5_m}}</div><div class="text3">{{sharesDetail.buy5_n}}</div></li>
        <li><div class="text1">卖4</div><div class="text2">{{sharesDetail.buy4_m}}</div><div class="text3">{{sharesDetail.buy4_n}}</div></li>
        <li><div class="text1">卖3</div><div class="text2">{{sharesDetail.buy3_m}}</div><div class="text3">{{sharesDetail.buy3_n}}</div></li>
        <li><div class="text1">卖2</div><div class="text2">{{sharesDetail.buy2_m}}</div><div class="text3">{{sharesDetail.buy2_n}}</div></li>
        <li class="bodertext"><div class="text1">卖1</div><div class="text2">{{sharesDetail.buy1_m}}</div><div class="text3">{{sharesDetail.buy1_n}}</div></li>
        <li style="margin-top:3px"><div class="text1">买1</div><div class="text2">{{sharesDetail.sell1_m}}</div><div class="text3">{{sharesDetail.sell1_n}}</div></li>
        <li><div class="text1">买2</div><div class="text2">{{sharesDetail.sell2_m}}</div><div class="text3">{{sharesDetail.sell2_n}}</div></li>
        <li><div class="text1">买3</div><div class="text2">{{sharesDetail.sell3_m}}</div><div class="text3">{{sharesDetail.sell3_n}}</div></li>
        <li><div class="text1">买4</div><div class="text2">{{sharesDetail.sell4_m}}</div><div class="text3">{{sharesDetail.sell4_n}}</div></li>
        <li><div class="text1">买5</div><div class="text2">{{sharesDetail.sell5_m}}</div><div class="text3">{{sharesDetail.sell5_n}}</div></li>
      </ul>
    </div>
  </div>
  <div style="position: relative;">
    <div class="transactionBtn">
      <div class="btnFrom">
        <div class="title_text text1">本金 {{list.principal}}</div>
        <div class="title_text text2">服务费 {{list.serviceCharge}}</div>
        <div class="title_text14500 text3">需支付：{{list.payment}}元</div>
        <Button type="info" class="bnt1" :disabled="confirm" :loading="btnloading" @click="btnEntrust">融券(少)</Button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { getStockSearch, getStockDetail, getExchangeVolume, getExchangeCommission, getExchangeEntrust } from '@/api/api';
export default {
  data () {
    return {
      search: '', //  搜索内容
      btn_num: 'all', // 份额
      loading: false, // loding
      btnloading: false, // 购买股票lod
      confirm: true, // 购买禁用
      searchList: [], //  搜索列表
      sharesDetail: {
        highLimit: '--',
        downLimit: '--',
        nowPrice: ''
      }, // 股票详情
      code: '', // 搜索选中股票code
      share: 0, // 可买份额
      share1: '0',
      enteringValue: '', // 开仓市值
      list: {
        shares: '--',
        principal: '--',
        payment: '--',
        serviceCharge: '--',
        buy1_m: '--',
        buy2_m: '--',
        buy3_m: '--',
        buy4_m: '--',
        buy5_m: '--',
        sell1_m: '--',
        sell2_m: '--',
        sell3_m: '--',
        sell4_m: '--',
        sell5_m: '--',
        buy1_n: '--',
        buy2_n: '--',
        buy3_n: '--',
        buy4_n: '--',
        buy5_n: '--',
        sell1_n: '--',
        sell2_n: '--',
        sell3_n: '--',
        sell4_n: '--',
        sell5_n: '--'
      },
      ascriptionType: null
    }
  },
  methods: {
    // 判断组件归属页面
    ascriptionTypeClick(key) {
      this.ascriptionType = key
    },
    // 个股股票选择
    getList(code){
      this.ascriptionType = 2
      getStockSearch(code).then(res => {
        const arr = res.data
        arr.forEach(v => {
          v.nameCode = v.name + '(' + v.code + ')'
        });
        this.searchList = res.data
        this.search = code
        this.stockSearchChange(code)
        this.loading = false;
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
        this.loading = false;
      })
    },
    // 股票搜索
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        getStockSearch(query).then(res => {
          const arr = res.data
          arr.forEach(v => {
            v.nameCode = v.name + '(' + v.code + ')'
          });
          this.searchList = res.data
          this.loading = false;
        }).catch(err => {
          console.log(err);
          if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
          this.loading = false;
        })
        // setTimeout(() => {
        //   this.loading = false;
        // }, 2000);
      } else {
        this.searchList = [];
      }
    },
    // 选择股票
    stockSearchChange(key) {
      this.code = key
      this.stockDetail('1')
    },
    // 股票详情
    stockDetail(key) {
      getStockDetail(this.code).then(res => {
        const arr = res.data
        this.sharesDetail = arr
        this.tradingVolume(key)
        console.log(arr);
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
    },
    // 交易量计算
    tradingVolume(add) {
      const data = {
        positions: this.btn_num,
        type: 'loanStock',
        entrustPrice: this.sharesDetail.nowPrice,
        leverFold: '10'
      }
      getExchangeVolume(data).then(res => {
        if (add === '1') {
          this.share1 = res.data
          this.enteringValue = (Number(res.data) * Number(this.sharesDetail.nowPrice)).toFixed(0)
          this.list.principal = ((Number(res.data) * Number(this.sharesDetail.nowPrice)) / 10).toFixed(0)
          this.commission()
        } else {
          this.enteringValue = (Number(this.share1) * Number(this.sharesDetail.nowPrice)).toFixed(0)
          this.list.principal = (Number(this.enteringValue) / 10).toFixed(2)
          this.commission()
        }
        this.share = res.data
        if (Number(this.share1) >= 10000) {
          this.confirm = false
        } else {
          this.confirm = true
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('请先选择股票')
      })
    },
    // 佣金手续费
    commission() {
      const data = {
        volume: parseInt(this.share1),
        type: 'loanStock',
        entrustPrice: this.sharesDetail.nowPrice,
        leverFold: '10'
      }
      getExchangeCommission(data).then(res => {
        this.list.serviceCharge = res.data.charge
        this.list.payment = (Number(this.list.principal) + Number(this.list.serviceCharge)).toFixed(0)
      }).catch(err => {
        console.log(err)
        this.$Message.error('请先选择股票')
      })
    },
    // 数量选择
    radioGroupChange(key) {
      this.btn_num = key
      this.tradingVolume('1')
    },
    // 交易股数
    sharesChange(key) {
      // this.share1 = key
      if (Number(this.share1) >= 10000) {
        this.confirm = false
      } else {
        this.confirm = true
      }
      this.enteringValue = (Number(this.share1) * Number(this.sharesDetail.nowPrice)).toFixed(0)
      this.list.principal = (Number(this.enteringValue) / 10).toFixed(2)
      this.commission()
    },
    // 购买股票
    btnEntrust() {
      this.btnloading = true
      const data = {
        stockCode: this.sharesDetail.code,
        entrustPrice: this.sharesDetail.nowPrice,
        type: 'loanStock',
        volume: parseInt(this.share1),
        leverFold: '10'
      }
      getExchangeEntrust(data).then(res => {
        this.btnloading = false
        this.$Message.success('购买成功')
        if (this.ascriptionType === 1 || this.ascriptionType === '1') {
          this.$emit('securitiesLendingFinancing', '1')
        } else if (this.ascriptionType === 2 || this.ascriptionType === '2') {
          this.$emit('securitiesLendingFinancing', '1')
        }
      }).catch(err => {
        this.btnloading = false
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
    },
    addReduceBtnCLick(key) {
      if (key === 1) {
        if (this.list.volume <= '0.01') {
          this.list.volume = '0'
        } if (this.list.volume > '0.01') {
          const arr = (this.list.volume -= '0.01').toFixed(2)
          this.list.volume = arr
        } if (this.list.volume === '--') {
          this.list.volume = '0'
        }
      } else if (key === 2) {
        if (this.list.volume === '--') {
          this.list.volume = '0.01'
        } else {
          this.list.volume = (Number(this.list.volume) + 0.01).toFixed(2)
        }
      } else if (key === 3) {
        if (this.share1 <= '1000') {
          this.share1 = '0'
        } if (this.share1 > '1000') {
          this.share1 -= '1000'
        } if (this.share1 === '--') {
          this.share1 = '0'
        }
        this.tradingVolume()
      } else if (key === 4) {
        if (this.share1 === '--') {
          this.share1 = '1000'
        } else {
          this.share1 = parseInt(this.share1) + 1000
        }
        this.tradingVolume()
      }
    },
    // 返回
    returnClick() {
      this.$emit('securitiesLendingFinancing', '1')
    },
  }
}
</script>
<style lang="less" scoped>
.home{
  min-width: 359px;
  width: 100%;
  height: 100%;
  border-left: 1px solid rgba(20,30,40,1);
  border-right: 1px solid rgba(20,30,40,1);
  .home_title{
    width: 100%;
    height: 40px;
    background:#218DF2;
    padding: 10px;
    color:rgba(255,255,255,1);
  }
}
.from{
  position: relative;
  height: calc(100% - 57px);
  width: 359px;
  margin: 0 auto;
  padding: 0 10px;
  text-align: left;
  .fromList{
    margin-top: 17px;
    font-size:12px;
    font-weight:400;
    color:rgba(131,141,158,1);
    .title{
      display: inline-block;
      width: 60px;
      text-align: right;
    }
    .select{
      width: 277px;
    }
    .btnImg{
      width: 32px;
      height: 32px;
    }
    .lever{
      display: inline-block;
      width:86px;
      height:52px;
      text-align: center;
      border-radius:2px;
      opacity:0.79;
      border:1px solid #2d8cf0;
      padding-top: 6px;
      color:rgba(255,255,255,1);
    }
    .businessList{
      width:162px;
      height:227px;
      border-radius:2px;
      list-style:none;
      opacity:0.79;
      padding: 8px 0;
      border:1px solid rgba(75,86,102,1);
      li{
        height: 21px;
        width: 100%;
        position: relative;
        color:rgba(222,221,221,1);
        .text1{
          position: absolute;
          top:0;
          left: 10px;
        }
        .text2{
          position: absolute;
          top:0;
          left: 60px;
        }
        .text3{
          position: absolute;
          top:0;
          right: 10px;
        }
      }
      .bodertext{
        border-bottom: 1px solid rgba(75,86,102,1);
      }
    }
  }
  .fromLine{
    line-height: 32px;
  }
}
.transactionBtn{
  position: absolute;
  bottom: 0;
  left: 0;
  width:100%;
  height:107px;
  background:rgba(0,0,0,0.18);
  .btnFrom{
    width: 100%;
    height: 100%;
    position: relative;
    .text1{
      position: absolute;
      top: 20px;
      left: 20px;
      color:rgba(131,141,158,1);
    }
    .text2{
      position: absolute;
      top: 39px;
      color:rgba(131,141,158,1);
      left: 20px;
    }
    .text3{
      position: absolute;
      top: 62px;
      left: 20px;
    }
    .bnt1{
      position: absolute;
      right: 15px;
      bottom: 20px;
      // background: #E33531;
    }
  }
}
</style>
