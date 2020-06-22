<template>
  <div>
    <Modal v-model="modal"  id="withdrawalModel" width="340" :mask-closable='false'>
      <div class="list" slot="footer">
        <div class="list_title">添加股票</div>
        <Input  placeholder="输入代码 / 名称" v-model="search" clearable  size="small" class="list_input" id="optinalInput" @on-change="searchChange"/>
        <div class="searchList">
          <div class="demo-spin-col" v-if="spinShow">
            <Spin >
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
          </div>
          <div class="searchList_tab" v-for="item of searchList" :key="item.code">
            <div class="searchList_tab_code">{{item.code}}</div>
            <div class="searchList_tab_name">{{item.name}}</div>
            <img src="../../../assets/addCustom.png" alt="" class="searchList_tab_img" v-show="!item.type" @click="stocksAdd(item.code)">
            <img src="../../../assets/unselect.png" alt="" class="searchList_tab_img" v-show="item.type" @click="stocksDel(item.code)">
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
import { getUserStocks, getStockSearch, getUserStocksAdd, getUserStocksDel } from '@/api/api';
export default {
  name: 'menuLift',
  components: {},
  data () {
    return {
      spinShow: false,
      search: '',
      addImg: '../../../assets/addCustom.png',
      reduceImg: '../../../assets/unselect.png',
      modal: false,
      optionalList: [],
      searchList: []
    }
  },
  methods: {
    getList() {
      this.modal = true
      this.getStocks(1)
    },
    // 自选列表
    getStocks(key) {
      if (key === 2) {
        this.spinShow = true
      }
      getUserStocks().then(res => {
        const arr = res.data
        this.optionalList = arr
        if (this.searchList.length > 0) {
          this.searchList.forEach(v => {
            v.type = false
            for (const a of arr) {
              if (v.code === a) {
                v.type = true
                break
              }
            }
          });
        }
        if (key === 2) {
          this.spinShow = false
        }
      }).catch(err => {
        if (key === 2) {
          this.spinShow = false
        }
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
    },
    searchChange() {
      this.spinShow = true
      this.searchList = []
      getStockSearch(this.search).then(res => {
        const arr = res.data
        arr.forEach(v => {
          v.type = false
          for (const a of this.optionalList) {
            if (v.code === a) {
              v.type = true
              break
            }
          }
        });
        this.searchList = arr
        this.spinShow = false
      }).catch(err => {
        this.spinShow = false
        if (err.response.data) {
          if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
        } else {
          this.$Message.error('请求超时')
        }
      })
    },
    // 添加自选
    stocksAdd(code) {
      getUserStocksAdd(code).then(res => {
        this.$Message.success('添加成功')
        this.getStocks(2)
        this.$emit('AddOptionalListCLick', '1')
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
      })
    },
    // 删除自选
    stocksDel(code) {
      getUserStocksDel(code).then(res => {
        this.$Message.success('删除成功')
        this.getStocks(2)
        this.$emit('AddOptionalListCLick', '1')
      }).catch(err => {
        if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
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
