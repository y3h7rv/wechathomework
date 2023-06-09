// pages/square/square.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        firco:"black",
        secco:"#979797",
        showNewImage: false, // 初始状态下不显示新图片
        showdata:{}
    },

    like:function(e) {
        var that=this;
        var showdata=that.data.showdata;
        for(var i=0;i<showdata.length;i++){
            if(showdata[i].id==e.target.id){
                if(showdata[i].islike==1){
                    wx.showModal({
                      title: '提示',
                      content: '已点赞',
                      complete: (res) => {
                        if (res.cancel) {
                          
                        }
                    
                        if (res.confirm) {
                          
                        }
                      }
                    })
                }else{
                    console.log(e)
                    showdata[i].total_likes++;
                    showdata[i].islike=1;
                    that.setData({
                        showdata:showdata,
                    })
                    wx.request({
                        url: 'http://localhost:5000/treehole/Message/do_like',
                        data:{
                            user_id:e.target.dataset.user_id,
                            id:e.target.id,
                        },
                        method:"POST",
                        header:{
                            "content-type":"application/x-www-form-urlencoded"
                          },
                          success:function(res){
                              console.log(res.data)
                             wx.showModal({
                               title: '提示',
                               content: '点赞成功',
                               complete: (res) => {
                                 if (res.cancel) {
                                   
                                 }
                             
                                 if (res.confirm) {
                                   
                                 }
                               }
                             })
                          },
                          fail:function(res){
                              console.log('do_like_failed')
                          },
                          complete:function(res){
                              console.log('do_like_completed')
                          }
                      })
                }
            }
        }
    
},
    first_select: function(){
        // wx.redirectTo({
        //     url: '../commit/commit',
        //   })
    },

    second_select: function(){
        wx.navigateTo({
            url: '../commit/commit',
          })
    },

    third_select: function(){
        wx.redirectTo({
            url: '../mine/mine',
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that=this
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: 'http://localhost:5000/treehole/Message/get_all_messages',
          header:{
              "content-type":'application/x-www-form-urlencoded'
          },
          method:"POST",
          success:function(res){
              that.setData({
                showdata:res.data
              })
              console.log(that.data.showdata)
          },
          fail:function(res){
              console.log("fail_to_get_message")
          },
          complete:function(res){
              console.log('finish_to_get_message')
              wx.hideLoading()
          },
          
        })
        setTimeout(function() {
            wx.hideLoading()
        }   
        , 2000);
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