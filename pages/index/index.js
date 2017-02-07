//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgData: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    bgImg : '',
  },
  
  onReady: function () {
    var that = this;

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        that.setData({
          imgData: res.data.results,
          bgImg : res.data.results[0].url
        })
        wx.hideToast();
      }
    })
  },

  listenSwiper:function(e) {
      //切换背景图
      var that = this;
      this.setData({
          bgImg : that.data.imgData[e.detail.current].url
      })
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
