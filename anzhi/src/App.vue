<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
html {
  background:rgba(35,44,55,1);
  font-family:PingFangSC-Medium,PingFang SC;
}
body {
  background: #F6F6F6;
  background:rgba(35,44,55,1);
}
html,body {
  width: 100%;
  height: 100%;
}
.red {
  color:rgba(255,73,74,1);
}
.green {
  color:rgba(59,200,100,1);
}
.orange {
  color: #F08C26;
}
.red_back{
  background:rgba(227,53,49,1);
}
.bule_back{
  background:rgba(33,141,242,1);
}
.cursor{
  cursor: pointer
}
.flex_space-between{
  display:flex;
  justify-content:space-between
}
.title_text{
  font-size:12px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(222,221,221,1);
  text-align: left;
}
.title_text500{
  font-size:12px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:500;
  color:rgba(222,221,221,1);
  text-align: left;
}
.title_text14500{
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:500;
  color:rgba(222,221,221,1);
  text-align: left;
}
</style>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
