<template>
  <div class="list">
    <div class="list_tab">
      <div class="tab cursor">市场</div>
      <div class="tab cursor">深沪</div>
      <div class="tab cursor">自选</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuLift',
  components: {},
  data () {
    return {
      tabBar: '1',
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.list{
  width: 100%;
  height: 100%;
  .list_tab{
    height: 41px;
    border-bottom: 1px solid rgba(41,52,64,1);
    display: flex;
    .tab{
      width:129px;
      height:41px;
      line-height: 41px;
      text-align: center;
      background:rgba(35,44,55,1);
      border: 1px solid rgba(36,57,75,1);
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(131,141,158,1);
    }
    .tab:hover{
      color:rgba(255,255,255,1);
      background:rgba(36,57,75,1);
    }
  }
}
</style>
