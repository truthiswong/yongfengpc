import request from '@/utils/axios'
const VUE_APP_BASE_API = 'http://app.frt.asia/server/'

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
    url: VUE_APP_BASE_API + 'data/user/stock/price',
    method: 'post',
    data
  })
}
// -------------------------------------------------------------股票购买搜索------------------------------------------------------------
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
