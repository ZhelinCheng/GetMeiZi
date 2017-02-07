var app = getApp()
Page({
    data: {
        imgList: []
    },

    //第几页
    myPage: 1,

    //保存预览图片
    imgListUrl: [],

    myGetData: function (size, page, hide) {
        var that = this;

        wx.request({
            url: 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/' + size + '/' + page,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                var data = res.data.results,
                    list = that.data.imgList.concat(data);

                var urlLen = that.imgListUrl.length;

                for (var i in data) {
                    that.imgListUrl[urlLen++] = data[i].url
                }

                that.setData({
                    imgList: list
                });
                if (!hide) {
                    wx.hideToast()
                }
            }
        })
    },

    onReady: function () {
        // 生命周期函数--监听页面初次渲染完成
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
        this.myGetData(8, this.myPage++, 0);
    },

    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
        this.myGetData(8, this.myPage++);
    },
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            path: 'path' // 分享路径
        }
    },

    //页面事件
    showBigImg: function (e) {
        var picUrl = e.target.dataset.url,
            that = this;

        function arrIndex(arr, str) {
            // 如果可以的话，调用原生方法
            if (arr && arr.indexOf) {
                return arr.indexOf(str);
            }
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                // 定位该元素位置
                if (arr[i] == str) {
                    return i;
                }
            }
            // 数组中不存在该元素
            return -1;
        }

        console.log()

        wx.previewImage({
            current: picUrl, // 当前显示图片的http链接
            urls: that.imgListUrl.slice(arrIndex(that.imgListUrl,picUrl))// 需要预览的图片http链接列表
        })
    }
})