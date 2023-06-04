// pages/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showdata:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
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
                    showdata[i].total_likes++;
                    showdata[i].islike=1;
                    that.setData({
                        showdata:showdata,
                    })
                    console.log(e)
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
    onLoad(options) {
        console.log('username', options.username)
        var user_name=options.username;
        var that=this;
        wx.request({
            url: 'http://localhost:5000/treehole/Message/search_user',
            data:{
                username:user_name,
            },
            method:"POST",
            header:{
                "content-type":"application/x-www-form-urlencoded"
              },
              success:function(res){
                  console.log(res.data)
                  that.setData({
                      showdata:res.data
                  })
              },
              fail:function(res){
                  console.log('get_his/her_content_failed')
              },
              complete:function(res){
                  console.log('get_his/her_content_completed')
              }
          })
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
        wx.navigateBack({
            delta: 1,
          })
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