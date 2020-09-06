<template>
  <div>
    <Modal v-model="modal"  id="withdrawalModel" width="440" :mask-closable='false'>
      <div class="list" slot="footer">
        <div class="stepsList">
          <Steps :current="current" size="small" id="accountSteps">
            <Step title="身份验证"></Step>
            <Step title="银行卡绑定"></Step>
            <Step title="开户成功"></Step>
          </Steps>
        </div>
        <div class="contentSteps">
          <div class="steps_1" v-show="current == 0">
            <div>请提供身份证照进行实名认证</div>
            <div>
              <div class="infoList">
                <div class="infoList_name">姓名</div>
                <div class="infoList_content">{{list.name}}</div>
              </div>
              <div class="infoList">
                <div class="infoList_name">身份证号</div>
                <div class="infoList_content">{{list.idNo}}</div>
              </div>
            </div>
            <div class="flex_space-between steps_1_list">
              <div class="upload_back" v-show="img==''"></div>
              <img :src="img" alt="" class="upload_back" v-show="img!=''">
              <Upload
                :before-upload="handleUpload"
                :headers="headers"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                ref="upload"
                :show-upload-list='false'
                name='a'
                action="https://app.qfiilab.com/server/data/user/upload/idcarda">
                <Button type="primary" class="upload_img_btn" size="small" :loading="loading1">上传凭证照片</Button>
              </Upload>
            </div>
            <div class="flex_space-between steps_1_list" style="margin-top:11px">
              <div class="upload_back" v-show="img1==''"></div>
              <img :src="img1" alt="" class="upload_back" v-show="img1!=''">
              <Upload
                :before-upload="handleUpload1"
                :headers="headers"
                :on-success="uploadSuccess1"
                :on-error="uploadError"
                ref="upload"
                :show-upload-list='false'
                name='b'
                action="https://app.qfiilab.com/server/data/user/upload/idcardb">
                <Button type="primary" class="upload_img_btn" size="small" :loading="loading2">上传凭证照片</Button>
              </Upload>
            </div>
            <div style="text-align: center;margin-top:30px">
              <Button type="error" size="small" @click="tabSwitchCLick(1)">下一步</Button>
            </div>
          </div>
          <div class="steps_1" v-show="current == 1" style="height:360px">
            <div>请提供需绑定的银行卡信息</div>
            <div>
              <div class="infoList">
                <div class="infoList_name">银行卡号</div>
                <div class="infoList_content">{{cardList.accountNo}}</div>
              </div>
              <div class="infoList">
                <div class="infoList_name">开户银行</div>
                <div class="infoList_content">{{cardList.bankName}}</div>
              </div>
              <div class="infoList">
                <div class="infoList_name">预留手机号</div>
                <Input placeholder="请输入" style="width: 213px" size="small" v-model="cardList.preMobile" id="marginTradingInput"/>
              </div>
              <div class="infoList">
                <div class="infoList_name">开户支行</div>
                <Input placeholder="请输入" style="width: 213px" size="small" v-model="cardList.subbranch" id="marginTradingInput"/>
              </div>
            </div>
            <div class="flex_space-between steps_1_list">
              <div class="upload_back" v-show="img2==''"></div>
              <img :src="img2" alt="" class="upload_back" v-show="img2!=''">
              <Upload
                :before-upload="handleUpload2"
                :headers="headers"
                :on-success="uploadSuccess2"
                :on-error="uploadError"
                ref="upload"
                :show-upload-list='false'
                name='card'
                action="https://app.qfiilab.com/server/data/user/bank/upload/bankcard">
                <Button type="primary" class="upload_img_btn" size="small" :loading="loading3">上传凭证照片</Button>
              </Upload>
            </div>
            <div style="text-align: center;margin-top:30px">
              <Button type="error" size="small" @click="tabSwitchCLick(2)" :loading="btnLoading">下一步</Button>
            </div>
          </div>
          <div class="steps_1" v-show="current == 2" style="height:175px">
            <div style="text-align: center;margin-top:20px">
              <img src="../../../assets/success.png" alt="" style="width:37px;height:41px;">
            </div>
            <div style="text-align: center;margin-top:10px" class="steps_1_text12">恭喜您，开户成功 </div>
            <div style="text-align: center;margin-top:6px" class="steps_1_text2">
              <img src="../../../assets/smile.png" alt="" style="width:12px;height:12px;margin-right:10px">
              股市有风险，投资需谨慎。
            </div>
            <div style="text-align: center;margin-top:30px">
              <Button type="error" size="small" @click="tabSwitchCLick(3)">完成</Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { bankVerify } from '@/api/api';
export default {
  components: {},
  data () {
    return {
      loading1: false,
      loading2: false,
      loading3: false,
      btnLoading: false,
      modal: false,
      current: 0,
      img: '', // 身份证正面
      img1: '', // 身份证反面
      img2: '', // 银行卡
      headers: {
        Authorization: window.localStorage.getItem('token'),
        'X-TENANT-ID': 'frt:qfii_2020'
      },
      list: {
        name: '',
        idNo: ''
      },
      cardList: {
        accountNo: '',
        bankName: '',
        preMobile: '',
        subbranch: ''
      }
    }
  },
  methods: {
    getList(key) {
      if (key === true) {
        this.current = 1
      }
      this.modal = true
    },
    // 下一步
    tabSwitchCLick(key) {
      if (key === 1) {
        if (this.img === '') {
          this.$Message.error('请上传身份证正面照片')
        } else if (this.img1 === '') {
          this.$Message.error('请上传身份证反面照片')
        } else if (this.list.name === '' || this.list.idNo === '') {
          this.$Message.error('请上传有效身份证获取身份信息')
        } else {
          this.current = 1
        }
      } else if (key === 2) {
        this.btnLoading = true
        bankVerify(this.cardList).then(res => {
          this.$Message.success('认证成功')
          this.current = 2
          this.btnLoading = false
        }).catch(err => {
          this.btnLoading = false
          if (err.response) {
          this.$Message.error(err.response.data.message)
        } else {
          this.$Message.error('请求超时,请重试')
        }
        })
      } else if (key === 3) {
        this.modal = false
      }
    },
    // 选择图片
    handleUpload (file) {
      this.loading1 = true
      this.img = window.URL.createObjectURL(file)
    },
    // 上传照片成功返回
    uploadSuccess(response, file, fileList) {
      this.loading1 = false
      if (response.success === true) {
        this.list.name = response.data.name
        this.list.idNo = response.data.idNo
      } else {
        this.$Message.error(response.message)
      }
    },
    // 选择图片
    handleUpload1 (file) {
      this.loading2 = true
      this.img1 = window.URL.createObjectURL(file)
    },
    // 上传照片成功返回
    uploadSuccess1(response, file, fileList) {
      this.loading2 = false
      if (response.success === true) {
      } else {
        this.$Message.error(response.message)
      }
    },
    // 银行卡选择图片
    handleUpload2 (file) {
      this.loading3 = true
      this.img2 = window.URL.createObjectURL(file)
    },
    // 银行卡上传照片成功返回
    uploadSuccess2(response, file, fileList) {
      this.loading3 = false
      if (response.success === true) {
        this.cardList.accountNo = response.data.accountNo
        this.cardList.bankName = response.data.bankName
      } else {
        this.$Message.error(response.message)
      }
    },
    uploadError(error, file, fileList) {
      console.log(error, file, fileList);
      this.loading1 = false
      this.loading2 = false
      this.loading3 = false
      this.$Message.error('失败')
    }
  }
}
</script>
<style lang="less" scoped>
.list{
  text-align: left;
}
.stepsList{
  height: 105px;
  width: 100%;
  // background: #242C37;
  border-bottom:2px solid rgba(105,111,116,1);
  padding: 40px 20px 0 20px;
}
.contentSteps{
  background:rgba(44,54,69,1);
  padding: 20px 46px;
  font-size:12px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(131,141,158,1);
  .steps_1{
    width: 348px;
    height: 426px;
    .steps_1_list{
      align-items: center;
      margin-top: 20px;
    }
  }
}
.upload_back{
  // margin-top: 20px;
  width:200px;
  height:116px;
  background:rgba(36,44,55,1);
  border-radius:4px;
}
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
.steps_1_text12{
  font-size:12px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(203,205,211,1);
}
.steps_1_text2{
  font-size:12px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(75,86,102,1);
  line-height:17px;
}
</style>
