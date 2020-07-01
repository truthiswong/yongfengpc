import request from '@/utils/axios'
const VUE_APP_BASE_API = 'http://app.frt.asia/server/'
const VUE_APP_BASE_API1 = 'https://trade.frt.asia/server/'
// 获取验证码
export function getVerificationCode (data) {
  return request({
    url: VUE_APP_BASE_API + 'sso/code/send',
    method: 'post',
    data
  })
}
// 验证机构码
export function getAgentValid (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/open/agent/valid',
    method: 'post',
    data
  })
}
// 绑定机构码
export function getAgentBind (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/open/agent/bind',
    method: 'post',
    data
  })
}
// 注册
export function getRegister (data) {
  return request({
    url: VUE_APP_BASE_API + 'sso/auth/register',
    method: 'post',
    data
  })
}
// 登录
export function getLogin (data) {
  return request({
    url: VUE_APP_BASE_API + 'sso/auth/login',
    method: 'post',
    data
  })
}

// 自选列表
export function getStockPrice (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/stock/page',
    method: 'get',
    params:data
  })
}
// 自选列表1
export function getUserStocks (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/stocks',
    method: 'post',
    data
  })
}
// 添加自选
export function getUserStocksAdd (code) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/stock/add',
    method: 'post',
    data: {
      code: code
    }
  })
}
// 删除自选
export function getUserStocksDel (code) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/stock/del',
    method: 'post',
    data: {
      code: code
    }
  })
}
// -------------------------------------------------------------股票购买搜索------------------------------------------------------------
//股票指数
export function getMarketIndex (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/open/stock/market/index',
    method: 'post',
    data
  })
}
// 股票列表
export function getExchangeList (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/exchange/page',
    method: 'post',
    data
  })
}
// 股票排行
export function getHotExchange (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/open/stock/hot/exchange',
    method: 'post',
    data
  })
}
// 卖出平仓
export function getExchangeClose (id) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/exchange/close',
    method: 'post',
    data: {
      id: id
    }
  })
}
// 搜索股票
export function getStockSearch (keyword) {
  return request({
    url: VUE_APP_BASE_API + 'data/open/stock/search',
    method: 'post',
    data: {
      keyword: keyword
    }
  })
}
// 股票详情
export function getStockDetail(code) {
  return request({
    url: VUE_APP_BASE_API + 'data/open/stock/detail/' + code,
    method: 'post'
  })
}
// 交易量计算
export function getExchangeVolume(data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/exchange/volume',
    method: 'post',
    data
  })
}
// 手续费
export function getExchangeCommission(data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/exchange/commission',
    method: 'post',
    data
  })
}
// 购买股票
export function getExchangeEntrust(data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/exchange/entrust',
    method: 'post',
    data
  })
}
// --------------------------------------------------------------------资产------------------------------------------------------------
//  我的身份信息
export function getUserIdinfo (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/idinfo',
    method: 'get',
    data
  })
}
//  银行卡账户
export function getBankDetail (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/bank/detail',
    method: 'get',
    data
  })
}
// 资产信息
export function getFundBalance (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/fund/balance',
    method: 'post',
    data
  })
}
//  持仓数量
export function getCountHold (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/exchange/count/hold',
    method: 'get',
    data
  })
}
//  持仓实际本金
export function getPrincipalActual (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/exchange/sum/principalActual',
    method: 'get',
    data
  })
}
//  持仓名义本金
export function getPrincipalNominal (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/exchange/sum/principalNominal',
    method: 'get',
    data
  })
}
//  资金明细列表
export function getFundLogPage (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/fund/log/page',
    method: 'post',
    data
  })
}
// 账户余额
export function balance (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/fund/balance',
    method: 'post',
    data
  })
}
// 资金提现
export function withdrawNew (amount) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/fund/withdraw/new',
    method: 'post',
    data: {
      amount: amount
    }
  })
}
// 支付方式
export function settingRecharge () {
  return request({
    url: VUE_APP_BASE_API + 'data/user/setting/recharge',
    method: 'get'
  })
}
// 线下转账账户信息
export function transferaccount () {
  return request({
    url: VUE_APP_BASE_API + 'data/user/setting/transferaccount',
    method: 'get'
  })
}
// 充值
export function rechargeNew (data) {
  return request({
    url: VUE_APP_BASE_API1 + 'data/user/fund/recharge/new',
    method: 'post',
    data
  })
}
// 账户认证信息
export function bankDetail (data) {
  return request({
    url: VUE_APP_BASE_API1 + 'data/user/bank/detail',
    method: 'post',
    data
  })
}
// 实名认证
export function bankVerify (data) {
  return request({
    url: VUE_APP_BASE_API1 + 'data/user/bank/verify',
    method: 'post',
    data
  })
}
// ----------------------------------------------------------K线图------------------------------------------------------------------------------------
// 分时图
export function stockTsharing (code) {
  return request({
    url: VUE_APP_BASE_API1 + 'data/open/stock/tsharing/' + code,
    method: 'post',
  })
}
// K线
export function stockKline (data) {
  return request({
    url: VUE_APP_BASE_API1 + 'data/open/stock/kline/' + data.code,
    method: 'post',
    data: {
      beginDay: data.beginDay,
			time:data.klist
    }
  })
}
// -----------------------------------------------------------个人信息-------------------------------------
// 个人信息
export function userCurrent () {
  return request({
    url: VUE_APP_BASE_API1 + 'data/user/current',
    method: 'post'
  })
}
// 修改密码
export function userPasswd (data) {
  return request({
    url: VUE_APP_BASE_API1 + 'sso/self/passwd',
    method: 'post',
    data
  })
}