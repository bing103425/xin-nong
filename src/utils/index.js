function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  //框架初始化自带的时间戳转换，不想删
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function timestampToTime(timestamp,type) {
  //自己封装的时间戳转换
  if(!(timestamp > 1000000000000)){
    timestamp = timestamp * 1000
  }
  var date = new Date(timestamp)    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear()
  var M = '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  var D = '-' + ( date.getDate() < 10 ? '0' + date.getDate() : date.getDate() )
  var h = '  ' + ( date.getHours() < 10 ? '0' + date.getHours() : date.getHours() )
  var m = ':' + ( date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() )
  var s = ':' + ( date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() )
  var dateType = type || 'sec'
  if(dateType =='month'){
      return Y + M    //年月
  }else if(dateType =='day'){
      return Y + M + D    //年月日
  }else if(dateType =='min'){
      return Y + M + D + h + m    //年月日时分
  }else if(dateType =='sec' || type == ''){
      return Y + M + D + h + m + s    //年月日时分秒
  }
}

export default {
  formatNumber,
  formatTime,
  timestampToTime
}
