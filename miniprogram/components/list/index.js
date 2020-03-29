// components/list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:{
      type: String,
      value:'111'
    },
    src:{
      type: String
    },
    money:{
      type:String
    },
    type:{
      type:String
    },
    only:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    src:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.triggerEvent('callSomeFun', {
        name: this.data.name,
        num: event.detail,
        money: this.data.money
      })
    }
  }
})
