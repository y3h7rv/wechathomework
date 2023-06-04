// pages/mine/mine.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        firco:"#979797",
        secco:"black",
        showdata:{},
        user_name:"",
        face_url:"",
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

    search:function(){

    wx.showModal({
        editable:true,//显示输入框
        placeholderText:'请输入搜索用户名',//显示输入框提示信息
        success: res => {
          if (res.confirm) { //点击了确认
            console.log(res.content)//用户输入的值
            wx.request({
              url: 'http://localhost:5000/treehole/Message/search_user',
              data:{
                  username:res.content
              },
              method:"POST",
              header:{
                "content-type":"application/x-www-form-urlencoded"
              },
              success:function (res) {
                  if(res.data.code==10021)
                  {
                      wx.showModal({
                        title: '提示',
                        content: '用户不存在',
                        complete: (res) => {
                          if (res.cancel) {
                            
                          }
                      
                          if (res.confirm) {
                            
                          }
                        }
                      })
                  }else{
                      
                      wx.navigateTo({
                        url: '../search/search?username='+res.data[0].username,
                      })
                  }
              }
            })
          } else {
            console.log('用户点击了取消')
          }
        }
      })
    },
    delete:function(e) {
        var that=this;
        var showdata=that.data.showdata;

        for(var i=0;i<showdata.length;i++){
            if(showdata[i].id==e.target.id){
                wx.showModal({
                  title: '提示',
                  content: '是否删除',
                  complete: (res) => {
                    if (res.cancel) {
                      
                    }
                
                    if (res.confirm) {
                        wx.request({
                            url: 'http://localhost:5000/treehole/Message/delete_message',
                            data:{
                                user_id:getApp().globalData.user.id,
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
                                   content: '删除成功',
                                   complete: (res) => {
                                     if (res.cancel) {
                                       that.onLoad()
                                     }
                                 
                                     if (res.confirm) {
                                       that.onLoad()
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
                })

                
            }
        }
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
                    showdata[i].total_likes++;
                    showdata[i].islike=1;
                    that.setData({
                        showdata:showdata,
                    })
                    wx.request({
                        url: 'http://localhost:5000/treehole/Message/do_like',
                        data:{
                            user_id:getApp().globalData.user.id,
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that=this;
        that.setData({
            user_name:app.globalData.user.username,
            face_url:app.globalData.user.face_url
        }),
        wx.request({
          url: 'http://localhost:5000/treehole/Message/get_one_user_all_messages',
          data:{
              user_id:getApp().globalData.user.id,
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