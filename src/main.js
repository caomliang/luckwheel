// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import Vuex from 'vuex'
import router from './router'
import VueResource from 'vue-resource'
Vue.config.productionTip = false
Vue.use(VueResource);
/* eslint-disable no-new */
// function GetRequest(name)
// {
// 	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
// 	 var r = window.location.search.substr(1).match(reg);
// 	 if(r!=null)return  unescape(r[2]); return null;
// }
// 获取cookie
var GetRequest = function(key){
 var url = "?" + location.href.split("?")[1]; //获取url中"?"符后的字串
 var theRequest = new Object();
 var strs = [];
 if (url.indexOf("?") != -1) {
   var str = url.substr(1);//openid=123456
   if(str.indexOf("&")!=-1){
     strs = str.split("&")
   }else{
     strs[0] = str;
   }
   for(var i = 0; i < strs.length; i ++) {
           theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
   }
 }
 return theRequest[key];
};

/*获取到url后面的参数，并保存到全局*/
window.$nickName = decodeURI(GetRequest('nickname'));
window.$userToken = (GetRequest('userToken') == undefined ? "abcde": GetRequest('userToken'));
window.$activeId = GetRequest('activeId');
window.$detailId = GetRequest('detailId');
window.$sourceUserToken = GetRequest('sourceUserToken');

var jumpData = {
    'activeId': 1,
    'detailId':'',
    'userToken':''
};
function jumpUrl(){
	  $.ajax({
        url: "/Dial-app/weiXin/index",
        type: "get",
        data: jumpData,
        success: function (data) {
	            console.log(data);
        }
    })
}
jumpUrl();
var getSignParam = {
    'shareUrl': window.location.href,
    'userToken':window.$userToken,
    'activeId':GetRequest('activeId')
};
var getSignUrl = '/weiXin/getSign';
Vue.prototype.$footImg = "";
var pageShareData = function(){
  var a={}
  if(sessionStorage.getItem('name')=="qixi")
  {
        a =  {
    'title':'牛郎织女搞事情',
    'desc':'七夕默契大考验，花式虐狗绝技上线，看iPhone7花落谁家？',
    'mlink':'http://marketing.sd-bao.com/magpie-app/index.html?from=singlemessage&isappinstalled=0#/',
    // 'mlink':"http://"+window.location.host+"/Dial-app/weiXin/index?activeId=1" + "&userToken=" + GetRequest('userToken') +"&detailId="+GetRequest('detailId'),
    'imgUrl':'http://a2.qpic.cn/psb?/V12BOZke2okqgB/vx5WPU8cWn1Ykf8VJD9Th*Cv9bJVkVw*27sJtfdmhDU!/b/dD8BAAAAAAAA&bo=LAEsAQAAAAARBzA!&rf=viewer_4',
      }
  }else{
     a =  {
    'title':'幸运大转盘',
    'desc':'赢好礼，抽iPhone7，手快有，手慢无~',
    // 'mlink':'http://marketing.sd-bao.com/magpie-app/index.html?from=singlemessage&isappinstalled=0#/',
    'mlink':"http://"+window.location.host+"/Dial-app/weiXin/index?activeId=1" + "&userToken=" + GetRequest('userToken') +"&detailId="+GetRequest('detailId'),
    'imgUrl':'http://a2.qpic.cn/psb?/V12BOZke2okqgB/lB*yiV*jCmhaTOTjfZE5FuwdbmZRzEahqNf9uMLdqfc!/b/dD8BAAAAAAAA&bo=LAEsAQAAAAADByI!&rf=viewer_4',
        }
    }
    return a;
}
window.getWxJsToken = function () {  // 获取微信签名验证，得到config
    var saveData = JSON.stringify(getSignParam);
    console.log(saveData)
    $.ajax({
        url: "/Dial-app"+ getSignUrl,
        type: "post",
        data: saveData,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
            console.log(data);
            if (data.code == "000000") {
                var dataConf = data.weiXinJsSign;
                wxConfig(dataConf);
            }
        },
        error:function (e) {
        }
    })
 }
var sharemed =function(Type) {
    $.ajax({
        url: "/Dial-app/weiXin/saveShareRecord",
        type: "post",
        data: JSON.stringify({
        	'shareType':Type,
        	'shareUrl':pageShareData().mlink,
        	'userToken':window.$userToken
        }),
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
            console.log(data);
        }
    })
}
//微信配置
var wxConfig = function (conf) {
    wx.config({
        // debug: true,
        appId: conf.appId, //公众号的唯一标识
        timestamp: conf.timestamp, //生成签名的时间戳
        nonceStr: conf.nonceStr, //生成签名的随机串
        signature: conf.signature, //签名
        jsApiList: ['getLocalImgData',"chooseImage", "previewImage", "uploadImage", "downloadImage",'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
    });

    wx.ready(function(){
      //分享给朋友
      wx.onMenuShareAppMessage({
          title: pageShareData().title, // 分享标题
          desc: pageShareData().desc, // 分享描述
          link: pageShareData().mlink, // 分享链接
          imgUrl: pageShareData().imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
              //SaveShareType(1);分享成功后执行的回调
              sharemed(1)
          },
          cancel: function () {

          },

      });
      //分享给朋友圈
      wx.onMenuShareTimeline({
          title: pageShareData().title,  // 分享标题
          desc: pageShareData().desc, // 分享描述
          link: pageShareData().mlink, // 分享链接
          imgUrl: pageShareData().imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          success: function () {
            sharemed(2)
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
      });

      //分享到QQ
      wx.onMenuShareQQ({
          title: pageShareData().title, // 分享标题
          desc: pageShareData().desc, // 分享描述
          link: pageShareData().mlink, // 分享链接
          imgUrl: pageShareData().imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          success: function () {
                sharemed(3)
          },
          cancel: function () {

          }
      });

      //分享到腾讯微博
      wx.onMenuShareWeibo({
          title: pageShareData().title, // 分享标题
          desc: pageShareData().desc, // 分享描述
          link: pageShareData().mlink, // 分享链接
          imgUrl: pageShareData().imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          success: function () {
               sharemed(4)
          },
          cancel: function () {

          }
      });
      //分享到QQ空间
      wx.onMenuShareQZone({
          title: pageShareData().title, // 分享标题
          desc: pageShareData().desc, // 分享描述
          link: pageShareData().mlink, // 分享链接
          imgUrl: pageShareData().imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          success: function () {
                sharemed(5)
          },
          cancel: function () {

          }
      });
    });


	    wx.error(function(res){
          // alert("微信分享失败"+JSON.stringify(res))
	    });


      // alert("weixin config init success");
}





new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
})
