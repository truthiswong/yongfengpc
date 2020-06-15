<template>
<div class="home">
  <div class="home_title title_text14500">融券（空）</div>
  <div class="from">
    <div class="fromList fromLine">
      <div class="title">代码：</div>
      <Select v-model="search" class="select" id="marginTradingSelect" multiple filterable remote :remote-method="remoteMethod" :loading="loading"  placeholder="代码/拼音/名称">
        <Option v-for="item in searchList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </div>
    <div class="fromList">
      <div style="display:flex" class="">
        <div class="title fromLine">价格：</div>
        <div>
          <div style="display:flex">
            <img src="../../../assets/addBtn.png" alt="" class="btnImg" @click="addReduceBtnCLick(1)">
            <Input placeholder="--" style="width: 213px" disabled v-model="list.volume" id="marginTradingInput"/>
            <img src="../../../assets/reduceBtn.png" alt="" class="btnImg" @click="addReduceBtnCLick(2)">
          </div>
          <div style="width:100%;margin-top:4px">
            <div class="title" style="float: left;text-align: left;width:100px">跌停：<span class="green">--</span></div>
            <div class="title" style="float: right;width:80px">涨停：<span class="red">--</span></div>
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
            <Input placeholder="--" style="width: 213px" disabled v-model="list.shares" id="marginTradingInput"/>
            <img src="../../../assets/reduceBtn.png" alt="" class="btnImg" @click="addReduceBtnCLick(4)">
          </div>
          <div style="width:100%;margin-top:4px">
            <RadioGroup type="button">
              <Radio label="1/2" style="width:86px;margin-right:10px"></Radio>
              <Radio label="1/3" style="width:86px;margin-right:9px"></Radio>
              <Radio label="全部" style="width:86px"></Radio>
            </RadioGroup>
          </div>
          <div style="width:100%;margin-top:4px">
            <div class="title" style="float: left;text-align: left;width:50%">可买份额：<span class="orange">--</span></div>
            <div class="title" style="float: right;width:50%">开仓市值：<span class="orange">--</span></div>
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
        <li><div class="text1">卖5</div><div class="text2">--</div><div class="text3">--</div></li>
        <li><div class="text1">卖4</div><div class="text2">--</div><div class="text3">--</div></li>
        <li><div class="text1">卖3</div><div class="text2">--</div><div class="text3">--</div></li>
        <li><div class="text1">卖2</div><div class="text2">--</div><div class="text3">--</div></li>
        <li class="bodertext"><div class="text1">卖1</div><div class="text2">--</div><div class="text3">--</div></li>
        <li style="margin-top:3px"><div class="text1">买1</div><div class="text2">--</div><div class="text3">--</div></li>
        <li><div class="text1">买2</div><div class="text2">--</div><div class="text3">--</div></li>
        <li><div class="text1">买3</div><div class="text2">--</div><div class="text3">--</div></li>
        <li><div class="text1">买4</div><div class="text2">--</div><div class="text3">--</div></li>
        <li><div class="text1">买5</div><div class="text2">--</div><div class="text3">--</div></li>
      </ul>
    </div>
  </div>
  <div style="position: relative;">
    <div class="transactionBtn">
      <div class="btnFrom">
        <div class="title_text text1">本金 --</div>
        <div class="title_text text2">服务费 --</div>
        <div class="title_text14500 text3">需支付：--元</div>
        <Button type="info" class="bnt1">融券(空)</Button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      search: '', //  搜索内容
      loading: false, // loding
      searchList: [], //  搜索列表
      list: {
        volume: '--',
        shares: '--'
      }
    }
  },
  methods: {
    // 股票搜索
    remoteMethod(query) {
      console.log(this);
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      } else {
        this.searchList = [];
      }
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
        if (this.list.shares <= '1000') {
          this.list.shares = '0'
        } if (this.list.shares > '1000') {
          this.list.shares -= '1000'
        } if (this.list.shares === '--') {
          this.list.shares = '0'
        }
      } else if (key === 4) {
        if (this.list.shares === '--') {
          this.list.shares = '1000'
        } else {
          this.list.shares = parseInt(this.list.shares) + 1000
        }
      }
    }
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
      background: #218DF2;
    }
  }
}
</style>
