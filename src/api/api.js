import request from '@/utils/axios'
const VUE_APP_BASE_API = 'http://app.frt.asia/server/'
// 账户余额
export function balance (data) {
  return request({
    url: VUE_APP_BASE_API + 'data/user/fund/balance',
    method: 'post',
    data
  })
}
