// miniprogram/pages/first/first.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
var arr=[]
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    time:true,
    src:'',
    a1:'chose',
    a2:'',
    a3:'',
    a4:'',
    only:0,
    arr1:[],
    sum:0,
    openid:'',
    doc:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dd();
    let that=this
    const db = wx.cloud.database();
    Toast.loading({
      mask: that.data.time,
      message: '加载中...',
      duration: 0
    });
    db.collection('caidan').get({
      success:function(res){
        // console.log(res)
        for (let i = 0; i < res.data[0].data.length;i++){
          arr[i] = { name: res.data[0].data[i].name, money: res.data[0].data[i].money, num: 0, type: res.data[0].data[i].type}
        }
        that.setData({
          arr: arr
        });
        Toast.clear();
      }
    })
    wx.cloud.getTempFileURL({
      fileList: ['cloud://nobody-9mfhz.6e6f-nobody-9mfhz-1301161431/images/logo.png'],
      success: res => {
        this.setData({
          src: res.fileList[0].tempFileURL
        })
      },
      fail: console.error
    });
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get',
      success: function (res) {
       that.setData({
         openid: res.result.event.userInfo.openId
       })
      },
      fail: console.error
    })
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
  handleClick: function (e){//侧边栏点击跳转
    let that=this
    // console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type=='1'){
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else if (e.currentTarget.dataset.type == '2'){
      wx.pageScrollTo({
        scrollTop: 1572
      })
    } else if (e.currentTarget.dataset.type == '3') {
      wx.pageScrollTo({
        scrollTop: 2358
      })
    } else if (e.currentTarget.dataset.type == '4') {
      wx.pageScrollTo({
        scrollTop: 3030
      })
    }
  },
  onPageScroll:function(e){//侧边栏类别显示
    // console.log(e.scrollTop)
    let that=this;
      if(e.scrollTop < 1570){
        that.setData({
          a1:'chose',
          a2:'',
          a3: '',
          a4: ''
        })
      } else if (e.scrollTop >= 1570 && e.scrollTop < 2355){
        that.setData({
          a1: '',
          a2: 'chose',
          a3: '',
          a4: ''
        })
      } else if (e.scrollTop >= 2355 && e.scrollTop < 3016) {
        that.setData({
          a1: '',
          a2: '',
          a3: 'chose',
          a4:''
        })
      } else if (e.scrollTop >= 3016)  {
        that.setData({
          a1: '',
          a2: '',
          a3: '',
          a4: 'chose'
        })
      }
  },
  msg:function(){//发送消息
    this.dd();
    let that = this
    let date=new Date();
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var time = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second
    wx.requestSubscribeMessage({
      tmplIds: ['SQ7voLiekIEI5TbPimqsdyNY54o4ObCQDb2-AmcZk6E','_n8tCdfJFwQJbi7DO_NA1JorfsiNsXyx3tMJkK5aItU'
      ],
      success(res) { 
        console.log(res)
      },
      fail(res){
        console.log(res)
      }
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'msg',
      // 传给云函数的参数
      data:{
        time:time,
        openid:that.data.openid
      },
      success: function (res) {
        console.log(res) // 3
        Toast.success('成功文案1');
      },
      fail: console.error
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'msg1',
      data: {
        time: time,                                                       
        openid: that.data.doc
      },
      success: function (res) {
        console.log(res) // 3
        Toast.success('成功文案2');
      },
      fail: console.error
    })
  
    
    // wx.request({
    //   url: 'http://127.0.0.1:8888/cheshi.do', //仅为示例，并非真实的接口地址
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   method:"post",
    //   data:{
    //     arr:that.data.a,
    //     time: time
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })
  },
  diandan(data){//传给子组件的函数，用于点菜
    for(let i=0;i<this.data.arr.length;i++){
      if (this.data.arr[i].name == data.detail.name){
        this.data.arr[i].num = data.detail.num;
      }
    }
    var arr1 = [];
    for (let i = 0; i < this.data.arr.length; i++) {
      if (this.data.arr[i].num > 0) {
        arr1.push(this.data.arr[i])
      }
    }
    this.setData({
      arr1: arr1
    })
    var sum = 0
    for (let i = 0; i < this.data.arr1.length; i++) {
      sum = sum + this.data.arr1[i].num * this.data.arr1[i].money
    }
   this.setData({
     sum:sum
   })
  },
  clear(){//清除购物车
    for(let i=0;i<this.data.arr.length;i++){
      arr[i] = { name: this.data.arr[i].name, type: this.data.arr[i].type, money: this.data.arr[i].money, num:0 }
    }
    this.setData({
      arr1:[],
      sum:0,
      arr:arr
    })
  },
  g_dian(e){//传给子组件的函数，用于点菜
    let arr1=[];
    arr1.push(...this.data.arr)
    // console.log(e)
    // console.log(arr1)
    for(let i=0;i<arr1.length;i++){
      if(arr1[i].name==e.detail.name){
        arr1[i].num=e.detail.num
      }
      if(arr1[i].num<=0){
        arr.splice(i,1)
      }
    }
    this.setData({
      arr:arr1
    })
  },
  dd(){
    let that=this
    const db = wx.cloud.database();
    var a=[]
    for(let i=0;i<this.data.arr1.length;i++){
      a[i] = this.data.arr1[i].name + "*" + this.data.arr1[i].num
    }
     wx.cloud.callFunction({
      // 云函数名称
      name: 'get',
      success: function (res) {//调用云函数获取openid
        db.collection('dingdan').where({
          _openid: res.result.event.userInfo.openId
        }).get({//获取当前用户在dingdan数据库中的记录（保证一个用户只有一条记录）
          success:resq=>{
           if(resq.data.length==0){//如果没有记录就新增
             db.collection('dingdan').add({
               data: {
                dd: a,
                sum: that.data.sum
              },
              success:res=>{
                console.log(res)
              }
             })
           }else{//有记录就修改
             db.collection('dingdan').doc(resq.data[0]._id).set({
               data: {
                 dd: a,
                 sum: that.data.sum
               },
               success: function (res) {
                 console.log(res)
                 that.setData({
                   doc: resq.data[0]._id
                 })
               }
             })
           }
          }
        })
      },
      fail: console.error
    })
  }
})