// pages/commit/commit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: '', 
    },
    // bindTextAreaBlur:function(e){
    //     console.log(e.detail.value)
    //     this.setData({
    //         detail: e.detail.value // 更新detail的值
    //     })
    // },
    detailInput:function(e){
        // console.log(e)
        this.data.detail=e.detail.value
         console.log(this.data.detail)
    },

    send:function(e){
        var that=this
        wx.showLoading({
          title: '加载中',
        })
        //与服务器交互

        
        if(that.data.detail==''){
            setTimeout(() => {
                wx.hideLoading()
            }, 0);
            wx.showModal({
                title: '提示',
                content: '请输入树洞内容！',
                showCancel:false,
                success (res) {}
              })
        }
        else if(that.data.detail!=''){
    wx.request({
        url: 'http://localhost:5000/treehole/Message/publish_new_message',
        method:"POST",
        header:{
            "content-type":"application/x-www-form-urlencoded"
        },
        data:{
            user_id:getApp().globalData.user.id,
            username:getApp().globalData.user.username,
            face_url:getApp().globalData.userInfo.avatarUrl,
            content:that.data.detail,
            total_likes:0,
            send_timestamp:e.timeStamp,
        },
        success:function(res){
            console.log('commit_success'),
            console.log(that.data.detail)
            wx.showModal({
              title: '提示',
              content: '发送成功',
              complete: (res) => {
                if (res.cancel) {
                  
                }
            
                if (res.confirm) {
                  
                }
              }
            })
        },
        fail:function(res){
            console.log('commit fail')
        },
        complete:function(res){
            console.log('commit complete')
        }
      })
            setTimeout(() => {
                wx.hideLoading()
            }, 1000);
            // console.log("success")
            wx.redirectTo({
                url: '/pages/square/square'
              })
        };
    
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})