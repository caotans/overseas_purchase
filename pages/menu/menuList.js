const app = getApp()

Page({
  data: {
    showModalStatus: false
  },
  submit:function(){
    wx.showModal({
      title: '提示',
      content: '立即预定吗,亲?',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '跳转中...',
          })
          var nickName = app.globalData.userInfo.nickName;
          wx.showToast({
            title: '预定成功',
            icon: 'success',
            duration: 2000
          })
        } else if (res.cancel) {
          
        }
      }
    })
  
  },
  myOrder:function(){
    
     //查找以前的订单
     wx.showLoading({
       title: '加载订单中...',
     })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  //下拉刷新
  onPullDownRefresh:function(){

  }

})
