<template>
	<div class="noactive" style="text-align: center;">
	</div>
</template>

<script>
	export default{
		data() {
			return{

			}
		},
		methods:{
			back(){
					this.$router.push({path:'/index?type=1'})
			},
			backHome(){
					this.$router.push({path:'/index?type=1'})
			}
		}
	}
</script>

<style scoped>
	.noactive{ background-image:url(../assets/nowinBg.png);background-size: 100%;width: 100%;height: 100%}
	h1{
		color: white;
		text-align: center;
		font-size: 14px;
		padding: 100px 0 24px;
	}
	img.nowin{
		text-align: center;
   		 width: 80%;
   		 margin-top:100px
	}
	img.close{
		display: block;
		text-align: center;
		width: 50px;
		height: 50px;
		margin: 0px auto 30px;
	}
</style>
