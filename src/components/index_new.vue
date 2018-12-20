<template>
	<div class='index'>
		<!-- 音频文件 -->
		<audio src="" id="music" controls="controls" hidden></audio>
		<!-- <audio src="../../static/music/1.mp3" id="musicTwo" controls="controls" hidden></audio> -->
		<div class="loading" ref="isHide" style="text-align: center;">
			<!-- <img style="width:100%;height:100%" src="../assets/loading.png" alt="" /> -->
			<!-- <h1>{{count}}%</h1> -->
			<div class="container">
				<div id="line"></div>
				<div id="bar"></div>
			<p id="total"></p>

			</div>
		</div>
		<div class="indexmodal" v-show="modalShow">

		</div>
		<div class="wx">
			<p style="margin-top: 15%;text-align: center;">请使用竖屏浏览</p>
		</div>
	<div class="content" ref="content" style="overflow:hidden">
		<img src="../assets/title.png" style="width: 3.6rem;margin-left: 50%;position: relative;left: -1.8rem;top:10px" alt="">
		<div class="scroll-wrap">
			<p id="rewardList" style="margin-left:0" ref="rewardList">{{prizeData}}</p>
		</div>
		<p class="remain"  ref="remain" style="">您的抽奖机会为{{drawNum}}次，今天剩余{{remainCount}}次</p>

		<img class="music_icon" id="music_icon" v-if="musicYes" @click="clearMusic()" src="../assets/music_yes.png" alt="">
		<img class="music_icon" id="music_icon" v-if="!musicYes" @click="clearMusic()" src="../assets/music_no.png" alt="">
		<img :src="coinImg" ref="coinImg" class="coinImg" alt="">
		<transition name="slide-fade">
			<div class="tipmodal" v-show="tipShow">
					{{alertmessage}}
			</div>
		</transition>
		<div class="tipMsk" v-show="show">

		</div>
		<div class="tipText" v-show="show">
			{{noactive}}
		</div>
		<div class="center">
			<img src="../assets/point.png" style="position: absolute;z-index: 100;top: 2.1rem;width: 0.8rem;left:0.05rem" alt="">
			<img class="wheelBg" src="../assets/wheel11.png">
			<!-- <img ref="lightA" class="lightA" src="../assets/lighta.png" alt=""> -->
			<!-- <img ref="lightB" class="lightB" src="../assets/lighta.png" alt=""> -->
			<img ref="lightC" class="lightC" src="../assets/lightCC.png" alt="">
			<img ref="lightD" class="lightD" src="../assets/lightDD.png" alt="">
			<div class="wheel">
				<ul id="wheel" class="wheel-list" ref="mybox">
					<li v-for="item in mydata">
						<i style="transform: rotate(22deg) skewY(43deg);"></i>
						<div class="prize">
							<h3>{{item.name}}</h3>
						</div>
					</li>
				</ul>
				<div class="wheel-btn" @click="startRun()">
					<!-- <a id="button">
						START
					</a> -->
				</div>
			</div>

		</div>
 		<p class="Ptitle" style="">
			<button type="button" name="button" data-toggle="modal" data-target=".bs-example-modal-lg" @click="changeStyle()">活动规则</button>
			<button type="button" name="button" data-toggle="modal" data-target=".bs-example-modal-lg" @click="selectMyWin()">我的奖品</button>
		</p>
		<div class="ad" @click="aboutUs()">
			<!-- <img src="" alt=""> -->
		</div>

<!-- 实物中奖区域 -->
		<div class="allWin" style="height: 7.8rem;top:40px" v-if='trueWin'>
				<img :src="winImg" class="exImg" id="exImg" style="margin-top:0.2rem;height:2rem; width: 1.5rem" alt="">
				<p class="tipmsg" style="margin:0.1rem">{{Tip}}</p>
				<input type="text" class="writeName" v-model="userName" name="" value="" placeholder="填写姓名" @click='changeInput($event)'>
				<input type="text" class="writePhone" maxlength="13" v-model="userTel" name="" value="" placeholder="填写电话" @click='changeInput($event)'>
				<input type="text" class="writeAddr" v-model="userAddr" name="" value="" placeholder="填写地址" @click='changeInput($event)'>
				<span @click="getTrue()">确认领取</span>
				<p style="font-size:0.24rem;color:#646263">听说领到奖品的人，都在十分钟内填写完了</p>
				<img class="closeImg" @click="closeTrueWin()" src="../assets/close.png" alt="">
		</div>
		<!-- 虚拟中奖 -->
		<div class="allWin" style="height:50%;top:25%" v-if='xnWin'>
				<img :src="winImg" class="exImg" style="width:3rem;height:1.7rem;margin-top:0.83rem" alt="">
				<p class="tipmsg">{{Tip}}</p>
				<span @click="getXn()">确认领取</span>
				<img class="closeImg" @click="closeXnWin()" src="../assets/close.png" alt="">

		</div>
		<!-- 未中奖 -->
			<div class="lossWin" v-if='lossWin'>
				<img class="lossImg" src="../assets/nowin.png" alt="">
				<p>没中呢~再来一次，肯定中奖</p>
				<span @click="hideLossWin()">再玩一次</span>
				<span @click="aboutUs()">关注我们</span>
				<img class="closeImg" @click="closeLossWin()" src="../assets/close.png" alt="">
		</div>
<!-- 我的奖品、活动规则 -->
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
		  <div class="modal-dialog modal-lg" role="document">
		    <div class="modal-content">
				 <div class="modal-body">
					 <p class="modaltitle" style="margin-top:0.3rem;display:flex;width:80%;margin-left:10%;justify-content: space-between;">
			 			<button ref="activeRule" style="font-size:0.3rem" @click="change1($event)">活动规则</button>
			 			<button ref="myreward" style="font-size:0.3rem" @click="change2($event)">我的奖品</button>
			 		</p>
					 <div v-if="actIntro" class="luckDesc">
						 <h1 style="margin-top:0.3rem">活动奖品</h1>
						 <p>一等奖：iphone 7</p>
						 <p>二等奖：kindle</p>
						 <p>三等奖：中粮大米、京东卡、现金大礼包</p>
						 <h1 style="margin-top:0.3rem">活动时间</h1>
						 <p>2017年8月1日-2017年9月1日</p>
						 <h1 style="margin-top:0.3rem">活动规则</h1>
						 <p>1.活动期间，每位用户每天可抽奖3次。</p>
						 <p>2.实物类奖品需填写联系方式，否则将视为自动放弃奖品。</p>
						 <p>3.活动过程中，如出现违规作弊行为，将取消用户奖励。</p>
						 <p>4.活动最终解释权归善林(上海)金融信息服务有限公司所有。</p>
					 </div>
					 <div v-if="myFood" class="myFood" style=" max-height:7rem;overflow: auto;">
						<p v-if="myWinInfo" v-for="item in myWinInfo">
				 			<span>{{item.prizeName}}</span>
				 			<span class="spanone" data-dismiss="modal" aria-label="Close" @click="getFood(item)"  v-if="item.status=='0'">{{item.statusName}}</span>
				 			<span class="spantwo" v-if="item.status=='1'">{{item.statusName}}</span>
				 			<span class="spanthree" v-if="item.status=='2'">{{item.statusName}}</span>
						</p>
						<p v-if="!myWinInfo" style="text:center;justify-content:center;font-size:0.28rem">
							您暂时没有奖品
						</p>
					 </div>
				</div>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="opacity:1">
				       		 <span aria-hidden="true">
								 <img class="closeImg" src="../assets/close.png" alt="">
				       		 </span>
				        </button>
		    </div>
		  </div>
		</div>

	</div>

	</div>
</template>

<script>
	import {store} from '../vuex/store.js'
	export default {
		data() {
			return {
				mydata:[],
//				activeId:'',
				foodIds:[],
				foodData:'',
				noactive:'',
				show:false,
				alertmessage:'',
				tipShow:false,
				count:0,
				clr:'',
				isData:false,
				modalShow:false,
				prizeList:[],
			 	activeIndex: 0,
				myFood:false,
				actIntro:true,
				remainCount:'',
				trueWin:false,
				xnWin:false,
				lossWin:false,
				winImg:'',
				Tip:'',
				userName:'',
				userTel:'',
				userAddr:'',
				clr:'',
				timeNow:600,
				myWinInfo:'',
				drawNum:'',
				coinImg:'',
				coins:[
				{ src: require('../assets/coin/0.png') },
				{ src: require('../assets/coin/1.png') },
				{ src: require('../assets/coin/2.png') },
				{ src: require('../assets/coin/3.png') },
				{ src: require('../assets/coin/4.png') },
				{ src: require('../assets/coin/5.png') },
				{ src: require('../assets/coin/6.png') },
				{ src: require('../assets/coin/7.png') },
				{ src: require('../assets/coin/8.png') },
				{ src: require('../assets/coin/9.png') },
				{ src: require('../assets/coin/10.png') },
				{ src: require('../assets/coin/11.png') },
				{ src: require('../assets/coin/12.png') },
				{ src: require('../assets/coin/13.png') },
				{ src: require('../assets/coin/14.png') }
				],
				prizeData:'',
				music:true,
				musicYes:true,
				time:''
			}
		},
		methods: {
			// 转盘转动音效
			playMusic(str){
				if(this.music==true){
					document.getElementById("music").src=str
					document.getElementById("music").play()
				}else{
					document.getElementById("music").src=str
					document.getElementById("music").pause()
				}
			},
			clearMusic(){
				 if(this.music==true){
 					this.music=false
 					this.musicYes=false
				 }else{
 					this.music=true
 					this.musicYes=true

				 }
			},	
			// 关于我们
			aboutUs(){
				window.location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0MDc1NDQ3NQ==&scene=124#wechat_redirect"
			},
			change1(str){
				console.log(str);
				if(str.toElement.innerText=='活动规则'){
					this.myFood=false
					this.trueWin=false
					this.actIntro=true
					this.$refs.activeRule.style.color='#ffff00'
					this.$refs.myreward.style.color='#ffffff'
				}else if(str.toElement.innerText=='我的奖品'){
					this.myFood=true
					this.trueWin=false
					this.actIntro=false
				this.$refs.activeRule.style.color='#ffffff'
				this.$refs.myreward.style.color='#ffff00'
					this.selectMyWin()
				}
			},
			change2(str){
				console.log(str);
				if(str.toElement.innerText=='活动规则'){
					this.myFood=false
					this.actIntro=true
					this.trueWin=false
				}else if(str.toElement.innerText=='我的奖品'){
					this.myFood=true
					this.actIntro=false
					this.trueWin=false
					this.selectMyWin()
				}
			},
			changeInput(str){
				this.tipShow=false
			},
			changeStyle(){
				// #ffff00
				this.$refs.activeRule.style.color='#ffff00'
				this.$refs.myreward.style.color='#ffffff'
				this.myFood=false
				this.xnWin=false
				this.trueWin=false
				this.lossWin=false
				this.actIntro=true
			},
			getXn(){
				this.$http.post('/Dial-app/active/prizeLog',
				JSON.stringify({
					activeId:store.state.activeId,
					apdId:store.state.apdId,
					aprId:store.state.aprId,
					userToken:window.$userToken,
					type:0
				})).then(function(res){
					this.selectWinInfo();
					 window.location.href=store.state.linkurl
				})
			},
			// 手机号格式化dai
			formateStr(){
					var value = this.userTel;
					value = value.replace(/\D*/g,"");
					var result = [];
					for(var i = 0; i < value.length; i++){
							if (i==3||i==7){
									result.push(" " + value.charAt(i));
							}
							else{
									result.push(value.charAt(i));
							}
					}
					this.userTel = result.join("");
					return this.userTel;
			},
			getTrue(){
				this.$http.post('/Dial-app/active/prizeLog',
				JSON.stringify({
					activeId:store.state.activeId,
					apdId:store.state.apdId,
					aprId:store.state.aprId,
					userToken:window.$userToken
				})).then(function(res){
					if(this.userName==''){
						this.alertmessage='用户名不能为空！'
						this.tipShow=true
					}else {
						if(this.userName.length>20){
							this.alertmessage='用户名限制为20位之内！'
							this.tipShow=true
						}else{
					var rule = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
					//var rule = /^1\d{10}$/i;
					if(!rule.test(this.userTel.replace(/\s+/g, ''))) {
						this.alertmessage='手机号格式不正确!'
						this.tipShow=true
					}else {
							if(this.userAddr==''){
								this.alertmessage='地址为空,可能会收不到奖品！'
								this.tipShow=true
							}else {
								if(this.userAddr.length>100){
									this.alertmessage="地址过长，请重新输入"
									this.tipShow=true
								}else{
																	if(this.timeNow<1){
									this.alertmessage='已超过规定领奖时间，请继续关注抽奖活动'
									this.tipShow=true
								}else{
								this.$http.post('/Dial-app/active/receivePrize',
									 JSON.stringify({
												address: this.userAddr,
												aprId:store.state.aprId,
												mobilePhone:this.userTel,
												userName:this.userName
												}),
								{
									 'headers': {
										'Content-Type':'application/json',
									}
								}).then(function (response) {
									console.log(response)
									if(response.body.code=='000000'){
										// this.$router.push({path:'/foodSend'})
										// 点击获取奖品之后
										this.alertmessage='已成功领取奖品，预计20个工作日内寄出'
										this.tipShow=true
										var that=this
										setTimeout(function(){
											that.tipShow=false
											that.trueWin=false
											that.$refs.remain.style.opacity='1'
											that.selectWinInfo();
										},3000)
									}
									},function (response) {
				//                    console.log(response)
									})
							}
								}
							}
						}

					}
					}
				})
			},


			// 我的奖品页面领取
			getFood(str){
				console.log(str)
				this.$refs.remain.style.opacity='0'
				if(str.type==1){
					this.trueWin=true
					var that=this
					setTimeout(function(){
						that.getimg()
					},40)
				}else if(str.type==0){
					this.xnWin=true

				}
			},
			// 再拉一次
			hideLossWin(){
					this.lossWin=false
			},
			closeLossWin(){
				this.lossWin=false
				this.$refs.remain.style.opacity='1'
			},
			closeTrueWin(){
				this.trueWin=false
				this.$refs.remain.style.opacity='1'
			},
			closeXnWin(){
				this.xnWin=false
				this.$refs.remain.style.opacity='1'
			},
			addCount(){
			  this.clr = setInterval( () => {
			      var bar = document.getElementById("bar");
			      var total = document.getElementById("total");
			      if(bar){
				      if(bar.style.width == ''){
			        bar.style.width = 0
			      }
			      bar.style.width=parseInt(bar.style.width) + 1 + "%";
			      total.innerHTML = bar.style.width;
			      if(bar.style.width == "101%" || bar.style.width=="101" || total.innerHTML == "101%"){
			        clearInterval(this.clr);
					  this.$refs.isHide.style.display='none';
					  this.$refs.content.style.display='block';
					  this.forReward()
			        // return;
			      }
			      }
			  }, 50)
			},
			//			    页面加载获取当前活动的奖品
			loadPage() {
				this.$http.post('/Dial-app/active/progressPrize',
					JSON.stringify({
						activeId: 1,
					}), {
						'headers': {
							'Content-Type': 'application/json',
						}
					}).then(function(response) {
					console.log(response)
//					100036
					if(response.body.code=='000000'){
						this.isData=true
					}
					if(response.body.code=='100036'){
						this.$router.push({path:'/noactive'})
					}else{
						this.show=false
						this.mydata = response.body.prizeDetailDto;
						store.state.activeId=response.body.activeInfoDto.id;
						for(var i=0;i<response.body.prizeDetailDto.length;i++){
							this.foodIds.push(response.body.prizeDetailDto[i].id)
						}
						this.selectMyCount()

						console.log(this.foodIds)
					}

				}, function(response) {
					//                    console.log(response)
				})
			},
			IsCoin(){
			  	this.$refs.coinImg.style.display='block';
			  	var t=0;
				var iscoin=setInterval( () =>{
						this.coinImg=this.coins[t].src
						t++
						if(t==14){
						clearInterval(iscoin)
						var that=this
						setTimeout(function(){
							that.$refs.coinImg.style.display='none';
						},300)

				}
				},200)


			},
			myFunction(param){
				clearInterval(this.time)
				if(this.foodData.body.type=='0'){
					var arr = ["gogo","jixu","argin"];
					var arrIndex = Math.floor(Math.random()*arr.length);
					console.info(arr[arrIndex])
					this.playMusic("../../static/music/"+arr[arrIndex]+".mp3")
					store.state.tipmsg = this.foodData.body.message;
					this.lossWin=true
				}else if(this.foodData.body.type=='1'){
					this.playMusic('../../static/music/great.mp3')
					if(this.foodData.body.prizeRecordDto.type=='0'){
						this.IsCoin()
						this.xnWin=true
						this.$refs.remain.style.opacity='0'
					}else if(this.foodData.body.prizeRecordDto.type=='1') {
						this.IsCoin()
						this.trueWin=true
						setTimeout(function(){
							var imgdata=$("#exImg");
							if(imgdata[0].naturalWidth>imgdata[0].naturalHeight){
								$("#exImg").css({'width':'3rem','height':'1.7rem'})	
							}else{
								$("#exImg").css({'height':'2rem'})	

							}
						},70)
						this.$refs.remain.style.opacity='0'
						this.clr = setInterval( () => {
							this.timeNow=this.timeNow-1
							if (this.timeNow==0) {
									clearInterval(this.clr)
							}
						}, 1000)
					}


					store.state.foodImg = this.foodData.body.prizeRecordDto.picUrl;
					store.state.foodType = this.foodData.body.prizeRecordDto.type;
					store.state.foodName = this.foodData.body.prizeRecordDto.name;
					store.state.foodNum = this.foodData.body.prizeRecordDto.unitName;
					store.state.foodDesc = this.foodData.body.prizeRecordDto.prizeDesc;
					// this.$router.push({path:'/win'})
				}
			},
			circleFun(param){
					console.log("旋转");
					const wheelTime = 16;
					var wheelDeg = 360*wheelTime - param*45-90;
					this.$refs.mybox.style.transform = "rotate("+wheelDeg+"deg)";
					this.$refs.mybox.style.transition = "all 6s";
					var that = this;
					setTimeout(function(){
						that.$refs.mybox.style.transform = "rotate(0deg)";
						that.$refs.mybox.style.transition = "all 0s";
						that.myFunction(param);
						that.modalShow=false
					},6000)

			},
			startRun(){
				//接口获得中奖商品
				if(this.remainCount == 1||this.remainCount == 2||this.remainCount == 3){
					this.light()
					this.playMusic('../../static/music/run1.mp3')
				}else{
					this.playMusic('../../static/music/1.mp3')
				}
				this.modalShow=true
				this.$http.post('/Dial-app/draw/clickDraw',
				JSON.stringify({
					activeId:store.state.activeId,
					type:0,
					userToken:window.$userToken
				})).then(function(response){
					console.log(response)
					this.foodData=response
					if(response.body.code=="000000"){
						this.playMusic('../../static/music/run1.mp3')
						store.state.apdId = this.foodData.body.prizeRecordDto.id;
						store.state.aprId = this.foodData.body.prizeRecordDto.prizeRecordId;
						store.state.linkurl = this.foodData.body.prizeRecordDto.linkUrl;
						var food=response.body.prizeRecordDto.id
						var idx=this.foodIds.indexOf(food)
						this.remainCount=response.body.prizeNumDto.surplusNum
						this.winImg=response.body.prizeRecordDto.picUrl;
						this.Tip = response.body.prizeRecordDto.hintDesc;
						console.log(idx)
						var that=this
						setTimeout(() => {
							that.circleFun(idx);
						},500)
					}else if(response.body.code=="300014"){
						this.playMusic('../../static/music/1.mp3')
						this.modalShow=false
						this.alertmessage=response.body.message
						this.tipShow=true
				        setTimeout( () => {
				            this.tipShow=false
				        }, 2000)
					}
				})
			},
			mathRad(){
				return Math.random()
			},
			findInfo(str){
				this.$http.post('/Dial-app/cookie/findCookie',
				JSON.stringify({
					cookie:str,
				})).then(function(res){
					console.log(res);
					if (res.body.code=='300018') {
						localStorage.setItem('cookie',str)
						this.addInfo(str)
					}
				})
			},
			addInfo(str){
				this.$http.post('/Dial-app/cookie/add',
				JSON.stringify({
					cookie:str,
				})).then(function(res){
					console.log(res);
					if(res.body.code=='300019'){
							this.addInfo(str+1)
					}
				})
			},
			findLocal(){
				var local=localStorage.getItem('cookie')
				console.log(local);
				// localStorage不存在
				if(local==null){
						var num =this.mathRad()
						// localStorage.setItem('cookie',num) /cookie/findCookie
						this.findInfo(num)
				}else {

				}
			},
			getimg(){
				console.log($("#exImg"))
				var imgdata=$("#exImg");
					if(imgdata[0].naturalWidth>imgdata[0].naturalHeight){
						$("#exImg").css({'width':'3rem','height':'1.7rem'})	
					}else{
						$("#exImg").css({'height':'2rem'})	

					}
			},
			// 查询中奖信息
			selectWinInfo(){
				// /prizeRecord/allPrizeRecord
				this.$http.post('/Dial-app/prizeRecord/allPrizeRecord',
				JSON.stringify({
					activeIdPro:1,
				})).then(function(res){
					console.log(res);
					this.prizeList=res.body.receiveInfoDto;
					for(var i=0;i<this.prizeList.length;i++){
						this.prizeData=this.prizeData+"恭喜"+this.prizeList[i].nickName+"获得"+this.prizeList[i].prizeName+' 、 '
					}
				})
			},
			// 查询个人中奖纪录
			// /prizeRecord/personalPrizeRecord
			selectMyWin(){
					this.$refs.myreward.style.color='#ffff00'
					this.$refs.activeRule.style.color="#ffffff"
					this.actIntro=false
					this.xnWin=false
					this.trueWin=false
					this.lossWin=false
					this.myFood=true
				// /prizeRecord/allPrizeRecord
				this.$http.post('/Dial-app/prizeRecord/personalPrizeRecord',
				JSON.stringify({
					activeId:store.state.activeId,
					cookie:'',
					userToken:window.$userToken
				})).then(function(res){
					console.log(res);
					if (res.body.receiveInfoDto.length!='0') {
					this.myWinInfo=res.body.receiveInfoDto
					this.winImg=res.body.receiveInfoDto[0].picUrl
					store.state.aprId=res.body.receiveInfoDto[0].id
					store.state.apdId=res.body.receiveInfoDto[0].apdId
					store.state.activeId=res.body.receiveInfoDto[0].activeId
					store.state.linkurl=res.body.receiveInfoDto[0].linkUrl
					this.Tip = res.body.receiveInfoDto[0].hintDesc;
					}
				})
			},

			// 查询受奖次数
			// /active/prizeDrawAmount
			selectMyCount(){
				// /prizeRecord/allPrizeRecord
				this.$http.post('/Dial-app/active/prizeDrawAmount',
				JSON.stringify({
					activeId:store.state.activeId,
					userToken:window.$userToken
				})).then(function(res){
					console.log(res);
					this.remainCount=res.body.surplusNum
					this.drawNum=res.body.drawNum
				})
			},

			// 灯亮
			light(){
				var that=this
			this.time=setInterval(_ =>{
				if(that.$refs.lightC.style.display=='block'){
					  that.$refs.lightC.style.display='none';
					  that.$refs.lightD.style.display='block';
				}else{
					  that.$refs.lightC.style.display='block';
  					  that.$refs.lightD.style.display='none';
				}
			 
			},500)
			},

			// 循环展示中奖信息
			forReward(){
				var allrewardList=setInterval(_ => {
		      this.$refs.rewardList.style.marginLeft=this.$refs.rewardList.style.marginLeft.substr(0,this.$refs.rewardList.style.marginLeft.indexOf('p'))-2+"px"
	      		if(-this.$refs.rewardList.style.marginLeft.substr(0,this.$refs.rewardList.style.marginLeft.indexOf('p'))>$("#rewardList").outerWidth())
		      	{
		      		this.$refs.rewardList.style.marginLeft=0
		      	}
		     
		    }, 60);
			}
		},
		filters: {
		    capitalize: function (value) {
		      if (!value)
		      	return "../assets/iconNo.png";
		      else
		      	return value;

		    }
  		},
		created() {
		  //do something after creating vue instance

		},
		computed: {
			// top() {
			// 	return - this.activeIndex * 40 + 'px';
			// }
		},
		watch:{
			userTel: function(){
					this.formateStr();//输入号码格式化
			},
		},
		created:function(){

		},
		mounted: function() {
			window.getWxJsToken();
			if (this.$route.query.type==1) {
				this.loadPage()
					this.$refs.isHide.style.display='none'
					this.$refs.content.style.display='block'
			}else{
				this.loadPage()
				this.addCount();
			}
			this.selectWinInfo()
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		font-family: Arial, Helvetica, sans-serif;
		font-family: "微软雅黑";
		font-weight: normal;
	}
		.slide-fade-enter-active {
	 /*transition: all .3s ease;*/
	 animation: myfirst 0.5s;
 }
 .slide-fade-leave-active {
	 transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
 }

 .slide-fade-enter, .slide-fade-leave-active {
	 opacity: 0;
 }
 @keyframes myfirst {
	 0% {
		 left: 0px;
		 top: -1rem;
	 }
	 100% {
		 left: 0px;
		 top: 0.6rem;
	 }
 }

 .scroll-wrap{
    height: 32px;
    overflow: hidden;
    background: rgba(0,0,0,0.6);
    position: absolute;
    top: 0;
    width: 100%;
}
.scroll-wrap p{
	position: absolute;
	top: 0;
	display: inline-block;
    line-height: 32px;
    text-align: center;
	font-size: 0.23rem;
	color: white;
	font-family: 'FZLTTHK'!important;
	margin-bottom: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left:0;
    overflow: hidden;
}

.scroll-content{
  position: relative;
  transition: top 0.5s;
}
.scroll-content   li{
    line-height: 40px;
    text-align: center;
	font-size: 0.26rem;
	color: white;
	font-family: 'FZLTTHK'!important
  }
 .indexmodal{
	 height: 100%;
	 width: 100%;
	 background: rgba(0,0,0,0);
	 position: absolute;
	 z-index: 9999999999;
 }
 	.loading{ background:url(../assets/loading.png) no-repeat;background-size: 100%; width:100%;height:100%;position: relative;  z-index: 99999999999}
  /*进度条*/
.container{
  width:3.3rem;
  height: 0.15rem;
}
#bar{
  background:#ffff01;
  float:left;
  height:100%;
  /*width: 1%;*/
  text-align:center;
  line-height:150%;
  border-radius: 0.312rem;
  position: absolute;
  top: 7.14rem;
  left: 0.15rem;
}
#line{
  width: 3.3rem;
  height: 0.013rem;
  background: #fff;
  position: absolute;
  top:7.2rem;
  left: 0.15rem;
}
#total{
  position: absolute;
  top:7.5rem;
  width: 3.3rem;
  font-size: 0.2rem;
  color: #ff0;
}
 .content{
	 display: none;
	 height: 100%
 }
 	.tipmodal{
		position: absolute;
		width: 80%;
		margin-left: 10%;
		top: 0.6rem;
		height: 0.9rem;
		line-height: 0.9rem;
		text-align: center;
		color: white;
		border-radius: 0.45rem;
		background: rgba(0, 0, 0, 0.7);
		z-index: 999999999999;
		font-size: 0.24rem;
		font-family: 'FZLTTHK'!important;

	}
	.tipMsk{
		position: absolute;
		background: black;
		width: 100%;
		height: 100%;
		z-index: 9999;
		opacity: 0.6;
	}
	.tipText{
		width: 60%;
		height: 60px;
		position: absolute;
		top: 50%;
		margin-top: -30px;
		margin: 0 20%;
		color: white;
		z-index: 999999;
		text-align: center;
		line-height: 60px;
		background: rgba(0,0,0,0.6);
		border-radius: 30px;

	}
	ul,li {
		list-style: none;
	}

	.index {
		height:100%;
		background-image: url(../assets/bg1.png)!important;
		background-size: 100% 100%
	}
	/*转盘*/

	.wheel {
		    margin: auto;
		    top: 0;
		    left: 0.1rem;
		    bottom: 0.42rem;
		    right: 0;
		    height: 4rem;
		    border-radius: 50%;
		    width: 4.08rem;
		    position: absolute;
		}

	.wheel ul {
		list-style: none;
	}

	#wheel li:nth-child(1){
		transform: rotate(0deg);
	}
	#wheel li:nth-child(2){
		transform: rotate(45deg);
	}
	#wheel li:nth-child(2) h3{
		font-weight: bold;
	}
		#wheel li:nth-child(3){
		transform: rotate(90deg);
	}
		#wheel li:nth-child(4){
		transform: rotate(135deg);
	}
		#wheel li:nth-child(4) h3{
		font-weight: bold;
	}
		#wheel li:nth-child(5){
		transform: rotate(180deg);
	}
		#wheel li:nth-child(6){
		transform: rotate(225deg);
	}
		#wheel li:nth-child(6) h3{
		font-weight: bold;
	}
		#wheel li:nth-child(7){
		transform: rotate(270deg);
	}
		#wheel li:nth-child(8){
		transform: rotate(315deg);
	}
		#wheel li:nth-child(8) h3{
		font-weight: bold;
	}
	.wheel-list {
		transition: all 3s ease-in-out;
		position: relative;
		z-index: 20;
		display: block;
	    width: 100%;
	    height: 100%;
		overflow: hidden;
		/*background: #fff;*/
		border-radius: 50%!important;
		box-shadow: 0 0 6px 2px rgba(0, 0, 0, .4);
	}

	.wheel-list:before {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 100%;
		content: '';
		border-radius: 50%;
		box-shadow: inset 0 0 0 8px rgba(255, 255, 155, .5);
		background: 0;
	}

	.wheel-list li {
		position: absolute;
		top: 0;
		left: 0;
	    width: 100%;
	    height: 2rem;
		-moz-transform-origin: center bottom;
		-webkit-transform-origin: center bottom;
		-o-transform-origin: center bottom;
		-ms-transform-origin: center bottom;
		transform-origin: center bottom;
		overflow: hidden;
	}

	.wheel-list li i {
		position: absolute;
		top: 0;
		left: 0;
		margin-left: -50%;
		display: block;
		width: 100%;
		height: 100%;
		background: rgba(255, 221, 0, .3);
		content: '';
		/*box-shadow: 2px 0 0 rgba(255, 255, 255, 1), 0 2px 0 rgba(255, 255, 255, 1);*/
		-moz-transform-origin: right bottom;
		-webkit-transform-origin: right bottom;
		-o-transform-origin: right bottom;
		-ms-transform-origin: right bottom;
		transform-origin: right bottom;
	}

	.wheel-list li:nth-child(1) i {
		background: #fdf13d;
	}

	.wheel-list li:nth-child(2) i {
		background: #fdbb1c;
	}

	.wheel-list li:nth-child(3) i {
		background: #fdf13d;
	}

	.wheel-list li:nth-child(4) i {
		background: #fdbb1c;
	}

	.wheel-list li:nth-child(5) i {
		background: #fdf13d;
	}

	.wheel-list li:nth-child(6) i {
		background: #fdbb1c;
	}

	.wheel-list li:nth-child(7) i {
		background: #fdf13d;
	}

	.wheel-list li:nth-child(8) i {
		background: #fdbb1c;
	}

	.wheel-list .thanks {
		position: relative;
		margin: 0 auto;
		padding-top: 20px;
		width: 1em;
		color: #900;
		font-size: 18px;
		font-weight: 700;
		text-shadow: 0 1px 0 rgba(255, 255, 255, .4);
		font-weight: normal;
	}

	.wheel-list .prize {
		position: relative;
    margin: 0px 31%;
    padding-top: 10px;
    width: 35%;
    overflow: hidden;
    text-align: center;
    line-height: 20px;
		height: 60%
	}

	.wheel-list .prize h3 {
		font-size: 0.25rem;
		font-family: 'FZLTTHK'!important;
		height:0.5rem;
   		 font-weight: 900;
		margin: 0;
		color: #5f3713;
   		 margin-top: 0.2rem;
	}
	.wheel-list .prize div{
		width: 100%;
	}
	.wheel-list .prize img.bigMPic{
		width: 0.4rem
	}
	.wheel-list .prize img.smallMPic{
		  width: 0.7rem;
	}
	.wheel-list .prize img.onePic{
		width: 0.5rem
	}
	.wheel-list .prize .refresh{
		width: 0.5rem
	}
	.wheel-btn {
		position: absolute;
		z-index: 999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width:1.2rem;
		height: 1.2rem;
		background-image:url(../assets/start.png);
		background-size: cover;
	}

	.wheel-btn strong {
		position: absolute;
		top: 50%;
		display: block;
		color: #fff;
		font-size: 0.30rem;
		text-shadow: 2px 0 0 #c30, -2px 0 0 #c30, 0 2px 0 #c30, 0 -2px 0 #c30, 1px 1px 0 #c30, -1px -1px 0 #c30, -1px 1px 0 #c30, -1px -1px 0 #c30, 0 2px 6px #a30;
	}

	.wheel-btn a {
		color: #ff0;
		position: relative;
		display: inline-block;
		/*vertical-align: middle;*/
		width: 1.1rem;
		height: 1.1rem;
		line-height: 1.1rem;
		border: 0.05rem solid white;
		overflow: hidden;
		color: #ff0;
		color: #fff;
		font-size: 0.30rem;
		text-align: center;
		text-decoration: none;
		border-radius: 50%;
		background: rgb(235, 94, 0);
		position: relative;
	}
	.center{
		width: 4.94rem;
		 height: 5.12rem;
		 position: relative;
		 top: 0.03rem;
		margin: 0 auto;
	    /*overflow: hidden;*/
	}
	.wheelBg {
    width: 4.8rem;
   	height: 5.5rem;
    position: relative;
    /*top: 64%;*/
    left: 50%;
    margin-left: -2.4rem;
    /*margin-top: 1rem;*/
    z-index: 99;
	}
	.btn{

	}
	.exImg{
		margin-top:0.2rem;
		width:1.6rem;
		height:2.3rem
	}

	.luckDesc p {
		font-size: 0.20rem;
		margin-bottom: 0
	}
	.wx{
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
			z-index: 99999;
			position: absolute;
			font-size: 0.4rem;
			color: white;
			display: none;
	}
	p.Ptitle{
		position: absolute;
		bottom: 0.85rem;
		margin-bottom: 0;
		/*margin-top:0.3rem;*/
		display:flex;
		width:100%;
		justify-content: space-between;
		/*margin-top:0.9rem;*/
		height:1rem;
		align-items:center
	}
	p.Ptitle button{
	    font-family: 'FZLTTHK'!important;
		font-size: 0.28rem;
		background: none;
		border: none;
		color: white;
		line-height: 0.6rem!important;
		height: 0.6rem;
		width: 2rem;
		border-radius:0.3rem;
		background: url(../assets/btn_bg.png) no-repeat;
		background-size: 100%
	}
	p.Ptitle button:nth-child(1){
		margin-left: 15%
	}
	p.Ptitle button:nth-child(2){
		margin-right: 15%
	}

	.modaltitle button{
		font-family: 'FZLTTHK'!important;
		font-size: 0.32rem;
		background: none;
		border: none;
		color: white;
		height: 0.6rem;
		line-height: 0.6rem!important;
		width: 2rem;
		border-radius:0.3rem;
		background: url(../assets/btn_bg.png) no-repeat;
		background-size: 100%
	}

	.modal-dialog{
		height: 90%;
		margin: 5% 10px 5%
	}
	.modal-dialog .modal-content{
		height: 85%;
		margin: 40px 0.2rem 0;
		border: none;
		background-color: rgba(0,0,0,0.7)
	}
	.modal-dialog .modal-content h1{
		font-family: 'FZLTTHK'!important;
		margin-bottom: 0.1rem;
		color: #ffff00;
		font-size: 0.27rem;
		position:relative!important;
		top: 0!important;;
		text-align: left!important;;
		left:0!important;;
	    margin-left: 0!important;
	    width: 100%!important
	}
	.modal-dialog .modal-content p{
		font-family: 'FZLTTHK'!important;
		color: white;
		margin-bottom: 0.05rem!important;
		font-size: 0.22rem
	}

	.ad{
		position: absolute;
		bottom: 0;
		height: 0.9rem;
		width: 100%;
		line-height: inherit;
		background: url(../assets/ad.png) no-repeat;
		background-size: 100% 100%;
	}
	.ad img{
		position: relative;
		bottom: 0;
		width: 100%;
	}
	.allWin{
		position: absolute;
		top: 25%;
		height: 50%;
		margin: 0% 5% 0;
		width: 90%;
		text-align: center;
		z-index: 999999;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 0.3rem
	}
	.allWin img{
		width: 2rem;
		height: 2.5rem;
		margin-top: 0.5rem
	}
	.allWin input{
		width: 80%;
		font-size: 0.24rem;
		height: 0.8rem;
		padding-left: 1rem;
		color: white;
		border-radius: 0.3rem;
		margin-left: 10%;
		display: block;
		margin-bottom: 0.1rem
	}
	.allWin input.writeName{
		background: url(../assets/name.png) no-repeat 0.2rem center;
		background-size: auto 0.5rem
	}
	.allWin input.writePhone{
		background: url(../assets/phone.png) no-repeat 0.2rem center;
		background-size: auto 0.5rem
	}
	.allWin input.writeAddr{
		background: url(../assets/home.png) no-repeat 0.2rem center;
		background-size: auto 0.5rem
	}
	.allWin span{
		display: block;
		color: yellow;
		font-size: 0.3rem;
		height: 0.8rem;
		line-height: 0.8rem;
		width: 3rem;
		position: relative;
		left: 50%;
		margin-left: -1.5rem;
		border-radius: 0.4rem;
		margin-bottom: 0.2rem;
		border:1px solid #888;
	}

	.tipmsg{
		font-family: 'FZLTTHK'!important;
		color:#FBB03B;
		font-size:0.27rem;
		font-weight:bold;
		margin: 0.2rem 0 0.4rem
	}




	/*未中奖*/
	.lossWin{
		position: absolute;
		top: 40px;
		height: 76%;
		margin: 0 5% 0;
		width: 90%;
		text-align: center;
		z-index: 999999;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 0.3rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.lossWin img.lossImg{
		width: 2rem;
		margin-top: 1rem;
	}
 img.closeImg{
		width: 0.6rem;
		height: 0.6rem;
		position: absolute;
		bottom: -0.3rem;
		left: 50%;
		margin-left: -0.3rem
	}
	.lossWin p{
		font-size: 0.3rem;
		color: white;
		margin: 0.4rem 0;
		font-family: 'FZLTTHK'!important;

	}
	.lossWin span{
		display: block;
		width: 2.6rem;
		height: 0.7rem;
		line-height: 0.7rem;
		border-radius: 0.35rem;
		color: white;
		/*background: #615f60;*/
		font-size: 0.28rem;
		margin-bottom: 0.4rem;
		font-family: 'FZLTTHK'!important;
		border:1px solid #888;
		}


	/*我的中奖纪录*/
		.myFood p{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 0.8rem;
			margin: 0!important;
			border-radius: 0.4rem;
			border: 1px solid #eee;
		}
		.myFood p span{
			font-family: 'FZLTTHK'!important;
			color: white;
			font-size: 0.28rem
		}
		.myFood p span:nth-child(1){
			display:block;
			margin-left: 0.5rem
		}
		.myFood p span.spanthree{
			display:block;
			margin-right: 0.3rem;
			background: #656364;
			height: 0.6rem;
			width: 1.5rem;
			line-height: 0.6rem;
			text-align: center;
			border-radius: 0.3rem;
			border: 1px solid #aaa
		}
		.myFood p span.spantwo{
		    display: block;
		    margin-right: 0.3rem;
		    background: #656364;
		    height: 0.6rem;
		    width: 1.5rem;
		    line-height: 0.6rem;
		    text-align: center;
		    border-radius: 0.3rem;
		    border: 1px solid #aaa;
		}
		.myFood p span.spanone{
			display:block;
			margin-right: 0.3rem;
			/*background: #656364;*/
			color: yellow;
			height: 0.6rem;
			width: 1.5rem;
			line-height: 0.6rem;
			text-align: center;
			border-radius: 0.3rem;
			border: 1px solid #aaa
		}


		/*大转盘样式走马灯A*/
		.lightA{
			display: block;
		    width: 4.43rem;
		    height: 4.43rem;
		    position: absolute;
		    top: 0.13rem;
		    left: 50%;
		    margin-left: -2.165rem;
		    /* margin-top: 1rem; */
		    z-index: 88;
		}
		.lightB{
			display: none;
		    width: 4.44rem;
		    height: 4.44rem;
		    position: absolute;
		    top: 0.13rem;
		    left: 50%;
		    margin-left: -2.165rem;
		    /* margin-top: 1rem; */
		    z-index: 99;
		    transform: rotate(15deg);
		}
		.lightC{
		    display: block;
		      width: 5.42rem;
		    height: 5.39rem;
		    position: absolute;
		    top: -0.37rem;
		    left: 50%;
		    margin-left: -2.59rem;
		    /* margin-top: 1rem; */
		    z-index: 99;
		    /* transform: rotate(-30deg); */

		    /*transform: rotate(0.1deg);*/
		}
		.lightD{
			display: none;
		    width: 5.45rem;
		    height: 5.42rem;
		    position: absolute;
		    top: -0.40rem;
		    left: 50%;
		    margin-left: -2.62rem;
		    /* margin-top: 1rem; */
		    z-index: 99;
		    /* transform: rotate(-30deg); */
		}
		.coinImg{
			display: none;
			position: absolute;
		    z-index: 9999999999999999;
		    top: 0;
		    width: 100%;
		    height: 100%;
		}
		.remain{
			font-size:0.26rem;
			text-align:center;
			margin-bottom:0rem;
			margin-top: -0.19rem;
			color:white;
			/*position: absolute;*/
			/*z-index: */
			font-family: 'FZLTTHK'
		}

		.music_icon{
			position: absolute;
			right: 15px;
			top: 40px;
			width: 0.7rem;
			animation: rotation 3s linear infinite;
			transform-origin:center center;
			-moz-animation: rotation 3s linear infinite;
			-webkit-animation: rotation 3s linear infinite;
			-o-animation: rotation 3s linear infinite;
		}

		@-webkit-keyframes rotation{
			from {-webkit-transform: rotateZ(0deg);}
			to {-webkit-transform: rotateZ(360deg);}
			}


	@media screen and (max-width:321px) {
		.wheel-list .prize{
			/*padding-top: 0;*/
		}
	}

		@media screen and (min-width:420px) {
		.remain{
			/*margin-top: 1.7rem!important;*/


		}
/*		.center{
			top: 0.05rem
		}
		.lightC{
			top:-0.67rem;
	   		 margin-left: -2.95rem;
   		     transform: rotate(15.2deg);
   		     height: 6.02rem;
   		     width: 6.02rem
		}
		.lightD{
			top:-0.67rem;
	   		 margin-left: -2.96rem;
   		     transform: rotate(-0.2deg);
   		     height: 6.04rem;
   		     width: 6.03rem
		}
		.modaltitle{
			margin-top: 0!important
		}*/
	}

	@media screen and (max-width: 415px) and (min-width:376px) {
		.remain{
			/*margin-top: 1.8rem!important;*/
		}
		.center{
			/*top: 0.5rem*/
		}
	}

	@media screen and (max-width: 320px) {
		.remain{
			/*margin-top: 1.5rem!important;*/
		}
	}


</style>