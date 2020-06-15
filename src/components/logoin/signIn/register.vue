<template>
  <div class="login">
    <div class="list list1 cursor" style="display:flex" @click="typeClick(1)">
      <Icon type="ios-arrow-back" size="12px" style="margin-top:4px"/>
      手机注册
    </div>
    <Form :model="list" label-position="top" style="text-align: left;" id="registerForm" class="list list2"  ref="formValidate" :rules="ruleValidate">
      <FormItem label="机构邀请码" prop="cardNumber">
        <Input v-model="list.cardNumber" />
      </FormItem>
      <FormItem label="手机号" prop="account">
        <Input v-model="list.account"/>
      </FormItem>
      <FormItem label="验证码" prop="code">
        <div style="display:flex">
          <Input v-model="list.code" style="width:140px"/>
          <Button :disabled="btnDisabled" class="codeBtn cursor" type="primary" @click="codeClick">{{smsText}}</Button>
        </div>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="list.password"/>
      </FormItem>
      <FormItem label="确认密码" prop="password1">
        <Input type="password" v-model="list.password1"/>
      </FormItem>
      <FormItem style="margin-top:25px">
        <Button type="error" style="width:220px;" :loading="loading" @click="logoinClick('formValidate')">立即注册</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { getVerificationCode, getAgentValid, getAgentBind, getRegister } from '@/api/api';
export default {
  name: 'passwordLogin',
  components: {},
  data () {
    return {
      name: '< 手机注册',
      loading: false,
      smsText: '获取验证码',
      btnDisabled: false,
      list: {
        cardNumber: '',
        account: '',
        code: '',
        password: '',
        password1: ''
      },
      ruleValidate: {
        cardNumber: [
          { required: true, message: '机构邀请码不能为空', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 'list.account'() {
    //   if (this.list.account.length === 11) {
    //     this.btnDisabled = false
    //   } else {
    //     this.btnDisabled = true
    //   }
    // }
  },
  methods: {
    logoinLoading() {
      this.loading = true;
    },
    typeClick(key) {
      this.$emit('switchingMode', key)
    },
    logoinClick(name) {
      this.loading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.list.password === this.list.password1) {
            const data = {
              agentCode: this.list.cardNumber
            }
            getAgentValid(data).then(res => {
              const data1 = {
                agentCode: this.list.cardNumber,
                mobile: this.list.account,
                authcode: this.list.code
              }
              getAgentBind(data1).then(res => {
                const data2 = {
                  account: this.list.account,
                  code: this.list.code,
                  password: this.list.password,
                  profile: 'type:user',
                  type: 'mobile'
                }
                getRegister(data2).then(res => {
                  this.$Message.success('注册成功');
                  this.emptyData()
                }).catch(err => {
                  this.$Message.error(err.response.data.message)
                  this.loading = false
                })
              }).catch(err => {
                this.$Message.error(err.response.data.message)
                this.loading = false
              })
            }).catch(err => {
              this.$Message.error(err.response.data.message)
              this.loading = false
            })
          } else {
            this.$Message.success('密码不同请确认密码！');
            this.loading = false
          }
        } else {
          this.$Message.error('请全部填写!');
          this.loading = false
        }
      })
    },
    quickLogoin() {
      this.$Message.error('暂不可用');
    },
    // 验证码
    codeClick() {
      if (this.list.account.length === 11) {
        const data = {
          account: this.list.account,
          type: 'mobile'
        }
        getVerificationCode(data).then(res => {
          this.$Message.success('发送成功');
          this.btnDisabled = true;
          let num = 30;
          this.smsText = num;
          this.timer = setInterval(() => {
            num--;
            if (num >= 0) {
              this.smsText = num;
            } else {
              clearInterval(this.timer);
              this.smsText = '再次获取';
              this.btnDisabled = false;
            }
          }, 1000);
        }).catch(err => {
          this.$Message.error(err.response.data.message)
        })
      } else {
        this.$Message.error('手机号格式不正确')
      }
    },
    // 清空数据
    emptyData() {
      this.list.cardNumber = ''
      this.list.account = ''
      this.list.password = ''
      this.list.account = ''
      this.list.code = ''
      this.list.password = ''
      this.list.password1 = ''
      this.loading = false
      this.btnDisabled = false
    }
  }
}
</script>
<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  position: relative;
  .list{
    position: absolute;
    left: 67px;
  }
  .list1{
    top: 60px;
    font-size:14px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(50,50,50,1);
    .line{
      display: inline-block;
      width: 1px;
      height: 8px;
      margin: 6px 14px 0 12px;
      background:rgba(221,221,221,1);
    }
  }
  .list2{
    top: 100px;
  }
  .title{
    color:rgba(50,50,50,1);
    margin-left: 2px;
    margin-bottom: 4px;
  }
}
.codeBtn{
  width:80px;
  height:32px;
  // background:rgba(216,216,216,1);
  text-align: center;
  line-height: 32px;
  font-size:12px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  border-radius:0px 2px 2px 0px;
  border: 0;
  padding: 0;
}
</style>
