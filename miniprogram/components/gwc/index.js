// components/gwc/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr:{
      type:Array
    },
    sum:{
      type:String
    },
    src:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPopup() {
      this.setData({ show: true });
      // console.log(this)
    },

    onClose() {
      this.setData({ show: false });
    },
    diandan(e){
      // console.log(e);
      // console.log(this.data)
      for(let i=0;i<this.data.arr.length;i++){
        if (this.data.arr[i].name === e.detail.name){
          this.data.arr[i].num = e.detail.num;
        }
      }
      this.triggerEvent('g_dian', e.detail)
      this.triggerEvent('g_diandan', e.detail)
    },
    msg(){
      this.triggerEvent('msg')
    }
  }
})
