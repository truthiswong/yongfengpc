<template>
  <div>
    <Modal v-model="modal"  id="withdrawalModel" width="452" :mask-closable='false' @on-visible-change="visibleChange">
      <div class="list" slot="footer">
        <div class="top">
          <div class="title">提现</div>
          <div class="name">
            <span style="margin-left:32px">转账到</span>
            <span style="margin-left:76px">当前开户银行卡</span>
          </div>
          <div class="name" style="margin-top:4px">
            <span style="margin-left:144px">{{accountNo}}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="title">
            <div style="margin-left:32px">提现金额</div>
            <Input v-model="price" placeholder="请输入金额" style="width: 188px;margin-left:56px" id="withdrawalInput"/>
            <Button type="error" style="margin-left:20px" size="small" :loading="btnloading" @click="withdrawalCLick">立即提现</Button>
          </div>
          <div class="name">
            <span style="margin-left:144px">零钱余额 ¥{{balance}}，<span style="color:#218DF2" class="cursor" @click="wholeClick">全部提现</span></span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { withdrawNew } from '@/api/api';
export default {
  data () {
    return {
      btnloading: false,
      price: '',
      modal: false,
      accountNo: '',
      balance: ''
    }
  },
  methods: {
    getList(accountNo, balance) {
      this.modal = true
      this.accountNo = accountNo
      this.balance = balance
    },
    // 全部提现
    wholeClick() {
      this.price = this.balance
    },
    // 立即提现
    withdrawalCLick() {
      const numReg = /[^\d.]/g
      var numRe = new RegExp(numReg)
      if (!numRe.test(this.price)) {
        if (this.price === '0' || this.price === '') {
          this.$Message.error('请输入提现金额')
        } else if (Number(this.price) < 100) {
          this.$Message.error('提现金额必须大于100')
        } else if (Number(this.price) > Number(this.balance)) {
          this.$Message.error('提现金额不能大于账号余额')
        } else {
          this.btnloading = true
          withdrawNew(this.price).then(res => {
            this.btnloading = false
            this.modal = false
            this.$emit('rechargeWithdrawal', '1')
            this.$Message.success('恭喜您，提现成功，预计一个工作日到账，实际到账时间以银行/支付宝/微信到账时间为准。')
          }).catch(err => {
            this.btnloading = false
            if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
          })
        }
      } else {
        this.$Message.error('请输入数字')
      }
    },
    visibleChange() {}
  }
}
</script>
<style lang="less" scoped>
.list{
  height: 209px;
  width: 100%;
  text-align: center;
  .top{
    width: 100%;
    height: 101px;
    background:rgba(36,44,55,1);
    border-bottom:1px solid rgba(105,111,116,1);
    .title{
      margin-top: 4px;
      font-size:13px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .name{
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(221,221,221,1);
      margin-top: 20px;
      text-align: left;
    }
  }
  .bottom{
    width: 100%;
    height: 108px;
    background:rgba(44,54,69,1);
    .title{
      padding-top: 20px;
      display: flex;
      align-items: center;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(222,221,221,1);
    }
    .name{
      text-align: left;
      margin-top: 9px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(131,141,158,1);
    }
  }
}
</style>
