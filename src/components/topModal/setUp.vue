<template>
  <div>
    <Modal v-model="modal"  id="withdrawalModel" width="440" :mask-closable='false'>
      <div class="list" slot="footer">
        <div class="list_tab">
          <span class="name">头像</span>
          <img :src="userList.portrait" alt="" style="width:30px;height:30px" class="content">
          <Button type="error" size="small" class="btn" @click="signOutLogin">退出</Button>
        </div>
        <div class="list_tab top24">
          <span class="name">昵称</span>
          <span class="content" style="color:#CBCDD3" v-show="!nickname">{{userList.name}}</span>
          <Input class="content" style="width: 150px"  id="marginTradingInput" v-show="nickname" size="small" v-model="userList.name"/>
          <!-- <Button type="default" size="small" ghost v-show="!nickname" @click="nickname=!nickname" class="btn">修改</Button>
          <Button type="primary" size="small" v-show="nickname" @click="nickname=!nickname" class="btn">完成</Button> -->
        </div>
        <div class="line"></div>
        <div class="list_tab">
          <span class="name">手机号</span>
          <span class="content" style="color:#CBCDD3" >{{userList.mobile}}</span>
        </div>
        <div class="list_tab top24" v-show="!passwdType">
          <span class="name">密码</span>
          <span class="content" style="color:#CBCDD3;" >••••••••••••</span>
          <Button type="default" size="small" ghost class="btn" @click="passwdType = !passwdType">修改</Button>
        </div>
        <div v-show="passwdType">
          <div class="list_tab top24">
            <span class="name">密码</span>
            <Input class="content" style="width: 150px" type="password" v-model="passwdList.oldpwd" placeholder="请输入原密码"  id="marginTradingInput" size="small"/>
          </div>
          <div class="list_tab top24">
            <Input class="content" style="width: 150px" type="password" v-model="passwdList.newpwd" placeholder="请输入新密码"  id="marginTradingInput" size="small"/>
            <Button type="default" size="small" ghost class="btn" @click="passwdType = !passwdType">取消</Button>
          </div>
          <div class="list_tab top24">
            <Input class="content" style="width: 150px" type="password" v-model="passwdList.newpwd1" placeholder="请确认新密码"  id="marginTradingInput" size="small"/>
            <Button type="primary" size="small"  :loading="loading" @click="changePassword" class="btn">完成</Button>
          </div>
        </div>
        <div class="line"></div>
        <!-- <div class="list_tab">
          <span class="name">开户机构</span>
          <span class="content" style="color:#CBCDD3" >{{userList.name}}</span>
        </div> -->
        <div class="list_tab top24">
          <span class="name">协议及隐私声明</span>
          <span class="content" style="color:#4A90E2" >《协议及隐私声明书》</span>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { userCurrent, userPasswd } from '@/api/api';
export default {
  name: 'menuLift',
  components: {},
  data () {
    return {
      passwdType: false,
      loading: false,
      modal: false,
      nickname: false,
      userList: {},
      passwdList: {
        oldpwd: '',
        newpwd: '',
        newpwd1: ''
      }
    }
  },
  methods: {
    getList() {
      this.modal = true
      userCurrent().then(res => {
        if (res.data.portrait == null) {
          res.data.portrait ='../../assets/default_icon.png'
        } else {
        }
        this.userList = res.data
      })
    },
    // 修改密码
    changePassword() {
      if (this.passwdList.oldpwd != '' && this.passwdList.newpwd != '' && this.passwdList.newpwd1 != '' ) {
        if (this.passwdList.newpwd ==  this.passwdList.newpwd1) {
          this.loading = true
          userPasswd().then(res => {
            this.loading = false
            this.passwdType = false
            this.$Message.success('修改成功');
          }).catch(err => {
            this.$Message.error(err.response.data.message)
            this.loading = false
          })
        } else {
          this.$Message.error('两次新密码不相同')
        }
      } else {
        this.$Message.error('请全部输入')
      }
    },
    signOutLogin() {
      window.localStorage.setItem('loginType', false)
      window.localStorage.setItem('token', null)
      window.location.reload()
    }
  }
}
</script>
<style lang="less" scoped>
.list{
  background:rgba(36,44,55,1);
  padding: 40px 32px 30px 32px;
  font-size:14px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(222,221,221,1);
  .list_tab{
    display: flex;
    align-items: center;
    // justify-content:space-between
    position: relative;
    height: 30px;
    .name{
      position: absolute;
      top: 1px;
      left: 0;
    }
    .content{
      position: absolute;
      top: 3px;
      left: 144px;
    }
    .btn{
      position: absolute;
      top: 4px;
      right: 0;
    }
  }
  .top24{
    margin-top:24px
  }
  .line{
    margin: 26px 0;
    width:100%;
    height:1px;
    background:rgba(48,59,75,1);
  }
  .block{
    background:rgba(36,44,55,1);
    width: 44px;
    height: 5px;
  }
}
</style>
