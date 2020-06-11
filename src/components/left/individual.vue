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
          <img src="../../assets/add.png" alt="" style="width:12px;height:12px;margin-right:8px">
          <img src="../../assets/setUp.png" alt="" style="width:12px;height:12px;margin-right:15px">
        </div>
      </div>
      <div class="optional_title">
        <span class="nameCode">名称|代码</span>
        <span class="price">价格</span>
        <span class="range">涨跌幅</span>
      </div>
      <ul class="optional_list">
        <li v-for="item of optionalList" :key="item.id" :class="optionalId==item.id?'optional_list_bule':''" @click="optionalId=item.id">
          <span class="name">{{item.name}}</span>
          <span class="code">{{item.code}}</span>
          <span class="price">{{item.price}}</span>
          <span :class="item.range>=0?'range red':'range green'">{{item.range>=0?'+':''}}{{item.range}}%</span>
        </li>
      </ul>
    </div>
    <div style="" class="KList">
      1111
    </div>
    <div style="" class="business">
      <div class="sharesBasics">
        <div class="nameCode">{{stockBasis.code}} {{stockBasis.name}}</div>
        <div :class="stockBasis.price1>0?'priceRange red':'priceRange green'">{{stockBasis.price}} {{stockBasis.price1}} {{stockBasis.range}}%</div>
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
              <div class="content">11</div>
            </div>
            <div class="width165">
              <div class="name">最低</div>
              <div class="content">11</div>
            </div>
          </li>
          <li>
            <div class="width165">
              <div class="name">今开</div>
              <div class="content">11</div>
            </div>
            <div class="width165">
              <div class="name">昨收</div>
              <div class="content">11</div>
            </div>
          </li>
          <li>
            <div class="width165">
              <div class="name">成交量</div>
              <div class="content">11</div>
            </div>
            <div class="width165">
              <div class="name">成交额</div>
              <div class="content">11</div>
            </div>
          </li>
          <li>
            <div class="width165">
              <div class="name">换手率</div>
              <div class="content">11</div>
            </div>
            <div class="width165">
              <div class="name">振幅</div>
              <div class="content">11</div>
            </div>
          </li>
          <li>
            <div class="width165">
              <div class="name">总市值</div>
              <div class="content">11</div>
            </div>
            <div class="width165">
              <div class="name">流通市值</div>
              <div class="content">12221</div>
            </div>
          </li>
          <li>
            <div class="width165">
              <div class="name">市盈率</div>
              <div class="content">11</div>
            </div>
            <div class="width165">
              <div class="name">市净率</div>
              <div class="content">11</div>
            </div>
          </li>
          <li>
            <div class="width165">
              <div class="name">涨停价</div>
              <div class="content">11</div>
            </div>
            <div class="width165">
              <div class="name">跌停价</div>
              <div class="content">11</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="businessHandicap">
        <div class="title_text">买卖盘口</div>
        <div class="businessTitle">
          <div class="orange title_text500">49.76%</div>
          <div class="blue title_text500">50.24%</div>
        </div>
        <div class="businessTable">
          <div class="businessTable_1" style="background:rgba(255,104,36,0.1);">
            <div class="businessTable_list">
              <span class="span1">买1</span>
              <span :class="stockBasis.price1>0?'span2 red':'span2 green'">11</span>
              <span class="span3">11</span>
            </div>
            <div class="businessTable_list">
              <span class="span1">买2</span>
              <span :class="stockBasis.price1>0?'span2 red':'span2 green'">11</span>
              <span class="span3">11</span>
            </div>
            <div class="businessTable_list">
              <span class="span1">买3</span>
              <span :class="stockBasis.price1>0?'span2 red':'span2 green'">11</span>
              <span class="span3">11</span>
            </div>
            <div class="businessTable_list">
              <span class="span1">买4</span>
              <span :class="stockBasis.price1>0?'span2 red':'span2 green'">11</span>
              <span class="span3">11</span>
            </div>
            <div class="businessTable_list">
              <span class="span1">买5</span>
              <span :class="stockBasis.price1>0?'span2 red':'span2 green'">11</span>
              <span class="span3">11</span>
            </div>
          </div>
          <div class="businessTable_1" style="background:rgba(33,141,242,0.1);">
            <div class="businessTable_list">
              <span class="span1">1</span>
              <span :class="stockBasis.price1>0?'span2 red':'span2 green'">11</span>
              <span class="span3">卖1</span>
            </div>
            <div class="businessTable_list">
              <span class="span1">2</span>
              <span :class="stockBasis.price1>0?'span2 red':'span2 green'">11</span>
              <span class="span3">卖2</span>
            </div>
            <div class="businessTable_list">
              <span class="span1">3</span>
              <span :class="stockBasis.price1>0?'span2 red':'span2 green'">11</span>
              <span class="span3">卖3</span>
            </div>
            <div class="businessTable_list">
              <span class="span1">4</span>
              <span :class="stockBasis.price1>0?'span2 red':'span2 green'">11</span>
              <span class="span3">卖4</span>
            </div>
            <div class="businessTable_list">
              <span class="span1">5</span>
              <span :class="stockBasis.price1>0?'span2 red':'span2 green'">11</span>
              <span class="span3">卖5</span>
            </div>
          </div>
        </div>
      </div>
      <div class="capitalStatistics">

      </div>
      <div class="inTransaction">
        <div class="title_text">交易中</div>
        <div class="bnt_tab">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuLift',
  components: {},
  data () {
    return {
      optionalTab: true,
      optionalId: '1',
      optionalList: [
        {
          id: '1',
          name: '菲达环保',
          code: '600526',
          price: '5.66',
          range: 3.08
        },
        {
          id: '2',
          name: '中央商场',
          code: '600526',
          price: '5.66',
          range: -3.08
        }
      ],
      stockBasis: {
        name: '菲达环保',
        code: '600526',
        price: '5.84',
        price1: -0.18,
        range: '-3.08'
      }
    }
  },
  methods: {
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
}
.business{
  min-width: 357px;
  text-align: right;
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
    height: 205px;
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
        margin-bottom: 3px;
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
    height: 167px;
    padding: 10px;
    border-bottom: 1px solid rgba(48,59,75,1);
    .businessTitle{
      margin-top:5px;
      width: 100%;
      display: flex;
      .orange{
        width:50%;
        background:rgba(255,104,36,1);
        height: 20px;
        line-height: 20px;
        text-align: left;
        padding-left: 5px;
      }
      .blue{
        width:50%;
        background:rgba(33,141,242,1);
        height: 20px;
        line-height: 20px;
        text-align: left;
        padding-left: 5px;
      }
    }
    .businessTable{
      display: flex;
      font-size:12px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      .businessTable_1{
        width: 50%;
        .businessTable_list{
          width:169px;
          height: 20px;
          position: relative;
          .span1{
            position: absolute;
            top: 0;
            left: 5px;
          }
          .span2{
            position: absolute;
            top: 0;
            left: 45px;
          }
          .span3{
            position: absolute;
            top: 0;
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
      height: 100%;
      line-height: 100%;
    }
  }
}
</style>
