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
      page: "pages/dingdan/dingdan?openid=" + event.openid,
      touser: wxContext.OPENID,
      lang: 'zh_CN',
      data: {
        character_string3: {
          value: 'QC0001'
        },
        thing2: {
          value: '点击查看详情查看'
        },
        character_string1: {
          value: 'y123'
        },
        time4: {
          value: event.time
        },
        thing6:{
          value: '幺囡饭店'
        }
      },
      templateId: 'SQ7voLiekIEI5TbPimqsdyNY54o4ObCQDb2-AmcZk6E',
      miniprogramState: 'developer'
    })
    console.log(result)
    return { result, openid: wxContext.OPENID,a}
  } catch (err) {
    console.log(err)
    return { err,openid: wxContext.OPENID}
  }
}