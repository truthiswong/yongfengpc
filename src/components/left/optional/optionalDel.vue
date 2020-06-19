<template>
  <div>
    <Modal v-model="modal"  id="withdrawalModel" width="450" :mask-closable='false'>
      <div class="list" slot="footer">
        <div class="list_title">删除股票</div>
        <div>自选股设置 (共{{num}}只):</div>
        <div class="searchList">
          <div class="searchList_tab" v-for="item of optionalList" :key="item.code">
            <div class="searchList_tab_code">{{item.code}}</div>
            <div class="searchList_tab_name">{{item.name}}</div>
            <span class="searchList_tab_nowPrice">{{item.nowPrice}}</span>
            <span :class="item.diff_rate>0?'searchList_tab_diff_rate red':'searchList_tab_diff_rate green'">{{item.diff_rate>0?'+':''}}{{item.diff_rate}}%</span>
            <img src="../../../assets/unselect.png" alt="" class="searchList_tab_img" @click="stocksDel(item.code)">
          </div>
        </div>
        <div style="text-align: center;">
          <Button type="error" size="small" @click="completeCLick">完成</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getStockPrice, getUserStocksDel } from '@/api/api';
export default {
  name: 'menuLift',
  components: {},
  data () {
    return {
      num: '',
      search: '',
      addImg: '../../../assets/addCustom.png',
      reduceImg: '../../../assets/unselect.png',
      modal: false,
      optionalList: []
    }
  },
  methods: {
    getList() {
      this.modal = true
      this.getStocks(1)
    },
    // 自选列表
    getStocks(key) {
      const data = {
        showprice: 1
      }
      getStockPrice(data).then(res => {
        const arr = res.data.data
        this.optionalList = arr
        this.num = arr.length
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    // 删除自选
    stocksDel(code) {
      getUserStocksDel(code).then(res => {
        this.$Message.success('删除成功')
        this.getStocks()
        this.$emit('optionalDelCLick', '1')
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    },
    completeCLick() {
      this.modal = false
    }
  }
}
</script>
<style lang="less" scoped>
.list{
  // height:456px;
  width: 100%;
  background:rgba(36,44,55,1);
  text-align: left;
  padding: 0 20px 18px 20px;
  .list_title{
    text-align: center;
    font-size:11px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(221,221,221,1);
    padding-top:5px
  }
  .list_input{
    margin-top: 20px;
  }
  .searchList{
    width: 100%;
    height: 344px;
    background: #0F1012;
    margin: 8px 0 14px 0;
    border-radius:4px;
    box-sizing: border-box;
    overflow-x: hidden;
    padding: 4px 0;
    .searchList_tab{
      width: 100%;
      height: 24px;
      font-size:14px;
      font-weight:500;
      color:rgba(221,221,221,1);
      position: relative;
      .searchList_tab_code{
        position: absolute;
        top: 2px;
        left: 8px;
      }
      .searchList_tab_name{
        position: absolute;
        top: 2px;
        left: 93px;
      }
      .searchList_tab_nowPrice{
        position: absolute;
        top: 2px;
        left: 250px;
      }
      .searchList_tab_diff_rate{
        position: absolute;
        top: 2px;
        right: 50px;
      }
      .searchList_tab_img{
        position: absolute;
        top: 2px;
        right: 8px;
        width: 16px;
        height: 16px;
      }
    }
  }
}
.searchList_tab:hover{
  background:rgba(36,57,75,1);
}
.demo-spin-col{
  height: 100%;
  width: 100%;
  position: relative;
  background:rgba(230, 230, 230, 0.075);
}
.searchList::-webkit-scrollbar {
  display: none;
}
</style>
