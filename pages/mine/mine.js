// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        firco:"#979797",
        secco:"black",
        showdata:{},
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
        //   }
        // ]
    },

    first_select: function(){
        wx.redirectTo({
            url: '../square/square',
          })
    },

    second_select: function(){
        wx.navigateTo({
            url: '../commit/commit',
          })
    },

    third_select: function(){
        // wx.redirectTo({
        //     url: '../mine/mine',
        //   })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that=this;
        console.log(getApp().globalData.user.username)
        wx.request({
          url: 'http://localhost:5000/treehole/Message/get_one_user_all_messages',
          data:{
              username:getApp().globalData.user.username,
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
                console.log('get_my_content_failed')
            },
            complete:function(res){
                console.log('get_my_content_completed')
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