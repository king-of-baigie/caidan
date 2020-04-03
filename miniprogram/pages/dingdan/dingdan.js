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
    let that = this
    this.setData({
      openid:options.openid
    })
    console.log(this)
    Toast.loading({
      mask: true,
      message: "加载中。。。",
      duration: 0
    });
    const db = wx.cloud.database();
    db.collection('dingdan').where({
      _openid: that.data.openid
    })
    .get({//获取当前用户在dingdan数据库中的记录
      success:res=>{
        console.log(res)
        that.setData({
          arr:res.data[0].dd,
          sum: res.data[0].sum
        })
        Toast.clear();
      },
      fail:res=>{
        that.setData({
          arr: [1,2],
          sum: 99999
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
})