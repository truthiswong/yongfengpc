<template>
  <div>
    <Modal v-model="modal"  id="withdrawalModel" width="440" :mask-closable='false'>
      <div class="list" slot="footer">
        <div class="flex_space-between paddingBottom">
          <div class="title">您当前的开户信息：</div>
          <Button size="small" type="default" ghost @click="modifyClick">修改</Button>
        </div>
        <div class="contentList">
          <div class="infoList">
            <div class="infoList_name">姓名</div>
            <div class="infoList_content">{{list.accountName}}</div>
          </div>
          <div class="infoList">
            <div class="infoList_name">身份证号</div>
            <div class="infoList_content">{{list.idNo}}</div>
          </div>
          <div class="infoList">
            <div class="infoList_name">银行卡号</div>
            <div class="infoList_content">{{list.accountNo}}</div>
          </div>
          <div class="infoList">
            <div class="infoList_name">开户银行</div>
            <div class="infoList_content">{{list.bankName}}</div>
          </div>
          <div class="infoList">
            <div class="infoList_name">开户电话</div>
            <div class="infoList_content">{{list.preMobile}}</div>
          </div>
          <div class="infoList">
            <div class="infoList_name">开户支行</div>
            <div class="infoList_content">{{list.subbranch}}</div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { bankDetail } from '@/api/api';
export default {
  components: {},
  data () {
    return {
      modal: false,
      list: {}
    }
  },
  methods: {
    getList() {
      this.modal = true
      bankDetail().then(res => {
        this.list = res.data
      })
    },
    modifyClick() {
      this.modal = false
      this.$emit('modifyAccountInfo', this.list.confirm)
    }
  }
}
</script>
<style lang="less" scoped>
.list{
  height: 299px;
  width: 100%;
  background:rgba(36,44,55,1);
  padding: 40px 32px 20px 32px;
  .paddingBottom{
    padding-bottom: 26px;
    border-bottom: solid 1px rgba(48,59,75,1);
    .title{
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(240,140,38,1);
    }
  }
  .contentList{
    width: 100%;
    padding-top: 6px;
    .infoList{
      margin-top: 14px;
      font-size:12px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(222,221,221,1);
      display: flex;
      text-align: left;
      .infoList_name{
        width: 150px;
      }
      .infoList_content{
        color:rgba(203,205,211,1);
      }
    }
  }
}
</style>
