// pages/shoppingCart/submitOrder.js
import { add_order, payorder } from '../../api/index.js';

const app = getApp();
Page({
  data: {
    list: [],
    total:0
  },
  onLoad: function (options) {
   
    const list =wx.getStorageSync('unconfirmed');
    let total=0;
    for(let item of list){
      total += item.num * item.prices
    }
    this.setData({
      list,
      total
    })
  },
  
  confirmOrder: function (e) {
    const list=this.data.list;
    let order_list=[];
    for (let item of list){
      order_list.push({
        product_id: item.product_id,
        num: item.num
      })

    }

    add_order({ data: { parameter: JSON.stringify(order_list), shelves_id: list[0].shelves_id}}).then((res)=>{
      //添加成功后  删除购物车信息
      // wx.removeStorage({
      //   key: 'shopCart',
      // })
    
     
      payorder({ data: { order_id: res.id}, method:'POST' }).then((res1)=>{
        console.log(res1)
      })
      
     
    })
    
   

  },
  //支付
  payOrder() {
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
   
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})