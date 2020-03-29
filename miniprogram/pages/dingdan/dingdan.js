// miniprogram/pages/dingdan/dingdan.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    src:'',
    sum:'',
    openid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid:options.openid
    })
    Toast.loading({
      mask: true,
      message: '加载中...',
      duration: 0
    });
    let that=this
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get',
      success: function (res) {//调用云函数获取openid
        db.collection('dingdan').where({
          _openid: res.result.event.userInfo.openId
        })
        .get({//获取当前用户在dingdan数据库中的记录
          success:res=>{
            console.log(res)
            that.setData({
              arr:res.data[0].dd,
              sum: res.data[0].sum
            })
            Toast.clear();
          }
        })
      }
    })
    // wx.cloud.getTempFileURL({
    //   fileList: ['cloud://nobody-9mfhz.6e6f-nobody-9mfhz-1301161431/images/logo.png'],
    //   success: res => {
    //     that.setData({
    //       src: res.fileList[0].tempFileURL
    //     })
    //   },
    //   fail: console.error
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  zhifu(){
    var a = Date.parse(new Date());
    console.log(a);
    console.log(typeof a)
    wx.requestPayment({
      timeStamp: a.toString(),
      nonceStr: '12138',
      package: 'prepay_id=123',
      signType: 'MD5',
      paySign: 'a22',
      success(res) { console.log(res)},
      fail(res) { console.log(res) }
    })
  }
})