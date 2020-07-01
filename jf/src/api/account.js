export function timeDate (data) {
  var now = new Date(data)
  var year = now.getFullYear();
  // 取得4位数的年份
  var month = now.getMonth() + 1;
  // 取得日期中的月份，其中0表示1月，11表示12月
  var date = now.getDate();
  // 返回日期月份中的天数（1到31）
  var hour = now.getHours();
  // 返回日期中的小时数（0到23）
  var minute = now.getMinutes();
  // 返回日期中的分钟数（0到59）
  var second = now.getSeconds();
  // 返回日期中的秒数（0到59）
  if (Number(month) < 10) {
    month = '0' + month
  }
  if (Number(date) < 10) {
    date = '0' + date
  }
  if (Number(hour) < 10) {
    hour = '0' + hour
  }
  if (Number(minute) < 10) {
    minute = '0' + minute
  }
  if (Number(second) < 10) {
    second = '0' + second
  }
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}
export function timeDate1 (data) {
  var now = new Date(data)
  var year = now.getFullYear();
  // 取得4位数的年份
  var month = now.getMonth() + 1;
  // 取得日期中的月份，其中0表示1月，11表示12月
  var date = now.getDate();
  // 返回日期月份中的天数（1到31）
  var hour = now.getHours();
  // 返回日期中的小时数（0到23）
  var minute = now.getMinutes();
  // 返回日期中的分钟数（0到59）
  var second = now.getSeconds();
  // 返回日期中的秒数（0到59）
  if (Number(month) < 10) {
    month = '0' + month
  }
  if (Number(date) < 10) {
    date = '0' + date
  }
  if (Number(hour) < 10) {
    hour = '0' + hour
  }
  if (Number(minute) < 10) {
    minute = '0' + minute
  }
  if (Number(second) < 10) {
    second = '0' + second
  }
  return year + '-' + month + '-' + date
}
export function timeDate2 (data) {
  var now = new Date(data)
  // 取得4位数的年份
  var month = now.getMonth() + 1;
  // 取得日期中的月份，其中0表示1月，11表示12月
  var date = now.getDate();
  // 返回日期月份中的天数（1到31）
  var hour = now.getHours();
  // 返回日期中的小时数（0到23）
  var minute = now.getMinutes();
  // 返回日期中的分钟数（0到59）
  var second = now.getSeconds();
  // 返回日期中的秒数（0到59）
  if (Number(month) < 10) {
    month = '0' + month
  }
  if (Number(date) < 10) {
    date = '0' + date
  }
  if (Number(hour) < 10) {
    hour = '0' + hour
  }
  if (Number(minute) < 10) {
    minute = '0' + minute
  }
  if (Number(second) < 10) {
    second = '0' + second
  }
  return month + '-' + date + ' ' + hour + ':' + minute
}
