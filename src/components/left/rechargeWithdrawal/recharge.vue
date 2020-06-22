<template>
  <div>
    <Modal v-model="modal"  id="withdrawalModel" width="550" :mask-closable='false' @on-visible-change="visibleChange">
      <div class="list" slot="footer">
        <div class="title">充值</div>
        <div class="tabList">
          <div v-for="item of paymentMethodList" :class="item.code==defaultValue?'tabBar tabBar2':'tabBar tabBar1'" :key="item.code" @click="defaultValueClick(item.code)">{{item.name}}</div>
        </div>
        <div style="margin-top:22px;width:100%;height:339px">
          <div v-show="type">
            <div v-show="defaultValue=='offline'" class="tabContent">
              <div class="offlineList">
                <div class="account">
                  <div class="account_title">收款方账户</div>
                  <div class="content">转账时请务必仔细核对信息（单次充值金额需大于100元）</div>
                </div>
                <div class="accountList">
                  <div class="accountList_list">
                    <div class="accountList_title">收款人</div>
                    <div class="accountList_content">{{list.name}}</div>
                  </div>
                  <div class="accountList_list">
                    <div class="accountList_title">收款人账户</div>
                    <div class="accountList_content">{{list.account}}</div>
                  </div>
                  <div class="accountList_list">
                    <div class="accountList_title">收款银行</div>
                    <div class="accountList_content">{{list.bank}}</div>
                  </div>
                </div>
                <div class="bottom_content">
                  <Checkbox v-model="single" class="checkbox">已转账完成，提交打款信息</Checkbox>
                  <div class="bottom_content_Tips">预计一个工作日到账，实际到账时间以银行/支付宝/微信到账时间为准</div>
                  <div class="bottom_content_btn">
                    <Button type="error" size="small" @click="nextStepClick(1)">下一步</Button>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="defaultValue=='alipay_qr'" class="tabContent">
              <div class="offlineList">
                <div class="account">
                  <div class="account_title">支付宝收款二维码</div>
                  <div class="content">转账时请务必仔细核对信息（单次充值金额需大于100元）</div>
                </div>
                <div class="accountList" id="accountList">
                  <img :src="list.alipayQrcode" :data-original='`${list.alipayQrcode}`' alt="" style="width:79px;height:79px">
                </div>
                <div class="bottom_content">
                  <Checkbox v-model="single1" class="checkbox">已转账完成，提交打款信息</Checkbox>
                  <div class="bottom_content_Tips">预计一个工作日到账，实际到账时间以银行/支付宝/微信到账时间为准</div>
                  <div class="bottom_content_btn">
                    <Button type="error" size="small" @click="nextStepClick(2)">下一步</Button>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="defaultValue=='online'" class="tabContent">
              <div class="offlineList">
                <div class="account">
                  <div class="account_title">在线银行卡支付</div>
                  <div class="content">单次充值金额需大于100元</div>
                </div>
                <div class="bottom_content" >
                  <div class="upload_img" style="background-color: #242C37;">
                    <div class="title_name">
                      <div>充值金额</div>
                      <Input v-model="uploadList.amount" placeholder="请输入金额" style="width: 188px;margin-left:56px" id="withdrawalInput"/>
                    </div>
                    <Button type="error" class="upload_img_btn1" size="small" @click="submitUpload(1)">下一步</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tabContent" v-show="!type">
            <div class="offlineList">
              <div class="account">
                <div class="title_name">
                  <div>充值金额</div>
                  <Input v-model="uploadList.amount" placeholder="请输入金额" style="width: 188px;margin-left:56px" id="withdrawalInput"/>
                </div>
              </div>
              <div class="upload_img">
                <div>请仔细核查对转账流水信息，审核成功后充值成功</div>
                <div class="upload_back" v-show="img==''"></div>
                <img :src="img" alt="" class="upload_back" v-show="img!=''">
                <Upload
                  :before-upload="handleUpload"
                  :headers="headers"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  ref="upload"
                  :data='uploadList'
                  :show-upload-list='false'
                  name='certificate'
                  action="http://app.frt.asia/server/data/user/fund/recharge/new">
                  <Button type="primary" class="upload_img_btn" size="small">上传凭证照片</Button>
                </Upload>
                <Button type="error" class="upload_img_btn1" size="small" :loading="loading" @click="submitUpload(2)" >提交</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
// 查看图片
// import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { settingRecharge, transferaccount, rechargeNew } from '@/api/api';
export default {
  data () {
    return {
      loading: false,
      uploadList: {
        amount: '', // 充值金额
        type: ''
      },
      file: null, // 图片状态
      img: '',
      type: true, // 充值下一步
      single: false,
      single1: false, // 支付宝勾选
      modal: false,
      defaultValue: '',
      paymentMethodList: [],
      headers: {
        Authorization: window.localStorage.getItem('token'),
        'X-TENANT-ID': 'frt:qfii_2020'
      },
      list: {}
    }
  },
  mounted() {
    const ViewerDom = document.getElementById('accountList');
    const viewer = new Viewer(ViewerDom, {
      url: 'data-original'
    });
    console.log(viewer);
  },
  methods: {
    getList() {
      this.modal = true
      settingRecharge().then(res => {
        this.defaultValue = res.data.channel4pc[0].code
        this.paymentMethodList = res.data.channel4pc
      })
      transferaccount().then(res => {
        this.list = res.data
      })
    },
    // tab切换
    defaultValueClick(code) {
      this.cancel()
      this.defaultValue = code
    },
    // 下一步
    nextStepClick(key) {
      if (key === 1) {
        if (this.single === true) {
          this.uploadList.type = 'offline'
          this.type = false
        } else {
          this.$Message.error('请勾选确认')
        }
      } else {
        if (this.single1 === true) {
          this.uploadList.type = 'alipay_qr'
          this.type = false
        } else {
          this.$Message.error('请勾选确认')
        }
      }
    },
    // 提交
    submitUpload(key) {
      const numReg = /[^\d.]/g
      var numRe = new RegExp(numReg)
      if (!numRe.test(this.uploadList.amount)) {
        if (this.uploadList.amount === '0' || this.uploadList.amount === '') {
          this.$Message.error('请输入提现金额')
        } else if (Number(this.uploadList.amount) < 100) {
          this.$Message.error('提现金额必须大于100')
        } else if (Number(this.uploadList.amount) > Number(this.balance)) {
          this.$Message.error('提现金额不能大于账号余额')
        } else {
          this.loading = true
          if (key === 1) {
            this.uploadList.type = 'online'
            rechargeNew(this.uploadList).then(res => {
              console.log(res);
              this.$Message.success('成功')
              this.loading = false
              this.uploadList.amount = ''
              if (res.data.data.codeUrl) {
                window.open(res.data.data.codeUrl)
              }
            }).catch(err => {
              this.loading = false
              if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
            })
          } else {
            if (this.img !== '') {
              this.$refs.upload.post(this.file)
            } else {
              this.loading = false
              this.$Message.error('请上传图片')
            }
          }
        }
      } else {
        this.$Message.error('提现金额请输入数字')
      }
    },
    // 选择图片
    handleUpload (file) {
      this.file = file;
      this.img = window.URL.createObjectURL(file)
      return false;
    },
    // 上传照片成功返回
    uploadSuccess(response, file, fileList) {
      this.file = null;
      this.$Message.success('凭证上传成功，请客服人员审核')
      // this.goodsList()
      this.cancel()
    },
    uploadError(error, file, fileList) {
      console.log(error, file, fileList);
      this.$Message.error('失败')
      this.loading = false
    },
    // 取消上传
    cancel() {
      this.loading = false
      this.type = true
      this.file = null;
      this.img = ''
      this.uploadList.amount = ''
      this.uploadList.type = ''
    },
    visibleChange() {}
  }
}
</script>
<style lang="less" scoped>
.list{
  width: 100%;
  height: 361px;
  display: flex;
  background-color: #242C37;
  position: relative;
  .title{
    position: absolute;
    left: 0;
    top: 4px;
    width: 100%;
    text-align: center;
    color: #ffffff;
  }
  .tabList{
    margin-top: 22px;
    width: 104px;
    height: 339px;
    background-color: rgba(44,54,69,1);
    .tabBar{
      width:104px;
      height:40px;
      line-height: 40px;
      text-align: center;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(221,221,221,1);
      cursor: pointer
    }
    .tabBar1{
      background-color: rgba(44,54,69,1);
    }
    .tabBar2{
      background-color: rgba(39,48,61,1);
    }
  }
  .tabContent{
    width: 100%;
    height: 100%;
    box-sizing:border-box;
    width: calc(100% - 40px);
    margin: 0 20px;
    .offlineList{
      width: 100%;
      height: 100%;
      box-sizing:border-box;
      text-align: left;
      .account{
        height: 87px;
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid rgba(48,59,75,1);
        text-align: left;
        .account_title{
          font-size:14px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(221,221,221,1);
        }
        .content{
          margin-top: 10px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(131,141,158,1);
        }
      }
      .accountList{
        width: 100%;
        height: 120px;
        border-bottom: 1px solid rgba(48,59,75,1);
        padding-top: 20px;
        font-family:PingFangSC-Regular,PingFang SC;
        .accountList_list{
          display: flex;
          font-size:12px;
          width: 100%;
          margin-bottom: 14px;
          text-align: left;
          .accountList_title{
            width: 152px;
            color:rgba(222,221,221,1);
          }
          .accountList_content{
            color:rgba(203,205,211,1);
          }
        }
      }
      .bottom_content{
        color:rgba(221,221,221,1);
        height: 132px;
        width: 100%;
        font-size:12px;
        .checkbox{
          margin-top: 20px;
        }
        .bottom_content_Tips{
          padding-left: 20px;
          margin-top: 5px;
          color:rgba(131,141,158,1);
        }
        .bottom_content_btn{
          margin-top: 30px;
          text-align: right;
        }
      }
      .upload_img{
        background:rgba(44,54,69,1);
        height: 252px;
        width: 100%;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(131,141,158,1);
        padding: 20px 10px 0 10px;
        position: relative;
        .upload_back{
          margin-top: 20px;
          width:200px;
          height:116px;
          background:rgba(36,44,55,1);
          border-radius:4px;
        }
        .upload_img_btn{
          position: absolute;
          top: 104px;
          left: 240px;
        }
        .upload_img_btn1{
          position: absolute;
          bottom: 15px;
          right: 15px;
        }
      }
    }
  }
}
.title_name{
  padding-top: 20px;
  display: flex;
  align-items: center;
  font-size:14px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(222,221,221,1);
}
</style>
