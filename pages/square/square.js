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
        // list: [{
        //     face_url:"/images/加号 (1).png",
        //     username:"哆啦B梦",
        //     send_timestamp:"2023-5-31 22:11:20",
        //     content:"vbaejfvbeuakjscbfjhfcnlAKHFEWISCFHESDGVBSLAKvbdsjvldszknvslajnvgoes",
        //     total_likes:99,
        //   },
        //   {
        //     face_url:"/images/加号 (1).png",
        //     username:"哆啦B梦",
        //     send_timestamp:"2023-6-1 08:11:30",
        //     content:"我们在展室拜访了千里迢迢从安徽省合肥市前来参观的胡老教授，他告诉我们，作为当代大学生，更加需要重视学习中共党的发展历程，为构建中华民族伟大复兴而贡献力量。",
        //     total_likes:79,
        //   },
        //   {
        //     face_url:"/images/加号 (1).png",
        //     username:"哆啦D梦",
        //     send_timestamp:"2023-6-1 20:11:20",
        //     content:"vbaejfvbeuakjscbfjhfcnlAKHsfxbgsfhsgbsdgbsajnvgoes",
        //     total_likes:109,
        //   }
        // ]
    },

    changeImage: function() {
        this.setData({
          showNewImage: !this.data.showNewImage // 点击图片后显示/隐藏新图片
        })
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
    hideImage: function() {
        this.setData({
          showNewImage: false // 点击新图片后隐藏原来的图片
        })
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