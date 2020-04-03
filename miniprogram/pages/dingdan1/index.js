// miniprogram/pages/dingdan1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    arr:'',
    sum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log(options)
    const db = wx.cloud.database();
    const _ = db.command
    db.collection('dingdan').doc(options.openid).get({//获取当前用户在dingdan数据库中的记录
        success: res => {
          console.log(res)
          that.setData({
            arr: res.data[0].dd,
            sum: res.data[0].sum,
            openid:options.openid
          })
        },
        fail: res => {
          that.setData({
            arr: [1, 2],
            sum: 99999,
            openid: options.openid
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this)
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

  }
})