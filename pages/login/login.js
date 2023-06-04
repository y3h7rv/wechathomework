// pages/login/login.js
Page({
   
    /**
     * 页面的初始数据
     */
    data: {
        phonenumber:"",
        password:"",
    },

    navigateToPage: function() {
        wx.navigateTo({
          url: '/pages/enroll/enroll'
        })
    },

    log:function(e){
        var that=this
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if(that.data.username==''){
            wx.showModal({
                title: '提示',
                content: '请输入用户名',
                showCancel:false,
                success (res) {}
              })
        }
        else if(that.data.phonenumber==''){
            wx.showModal({
                title: '提示',
                content: '请输入手机号',
                showCancel:false,
                success (res) {}
              })
        }
        else if(that.data.phonenumber.length!=11){
            wx.showModal({
                title: '提示',
                content: '手机号长度有误，请重新输入！',
                showCancel:false,
                success (res) {}
              })
        }
        else if(!myreg.test(that.data.phonenumber)){
            wx.showModal({
                title: '提示',
                content: '请输入正确的手机号码',
                showCancel:false,
                success (res) {}
              })
        }
        else if(that.data.password==''){
            wx.showModal({
                title: '提示',
                content: '请输入密码',
                showCancel:false,
                success (res) {}
              })
        }
        else{
            wx.request({
                url: 'http://localhost:5000/treehole/user/login',
                data:{
                  phone:that.data.phonenumber,
                  password:that.data.password
                },
                method:'POST',
                header:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                success:function(res){
                    if(res.data.code==10022){
                        wx.showModal({
                          title: '提示',
                          content: '请检查手机号和密码',
                          complete: (res) => {
                            if (res.cancel) {
                              
                            }
                        
                            if (res.confirm) {
                              
                            }
                          }
                        })
                    }else{
                    console.log(res.data)
                    getApp().globalData.user=res.data
                    console.log(getApp().globalData.user)
                    wx.redirectTo({
                        url: '/pages/square/square'
                      })
                    }
                },
                fail:function(res){
                    console.log('sign_method_failed')
                },
                complete:function(res){
                    console.log('sign_method_completed')
                }
              })

        };

    },

    phonenumberInput: function(e) {
        this.data.phonenumber = e.detail.value
    },

    passwordInput: function(e) {
        this.data.password = e.detail.value
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