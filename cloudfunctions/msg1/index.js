// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: 'o0IXs4jRK0209oABDgxhP3Lz5uEI',
      lang: 'zh_CN',
      data: {
        thing3: {
          value: '回锅肉*1'
        },
        character_string1: {
          value: 'y123'
        },
        amount4: {
          value: '￥20'
        },
        thing2: {
          value: 'QC0001'
        }
      },
      templateId: '_n8tCdfJFwQJbi7DO_NA1JorfsiNsXyx3tMJkK5aItU',
      miniprogramState: 'developer'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}