<template>
	<div class="container">
		<div class="bg-box" :class="{'coverbg': isLoading}" :style="{'background-image': 'url('+fileUrl+')'}">
			<img v-show="isLoading" src="http://localhost:8080/static/images/loading.gif" alt="loading">
		</div>
		<a href="javascript;" v-link="{path: '/news'}">进入阅读</a>
	</div>
</template>
<style lang="less" scoped>
	.container{
		width: inherit;
		height: inherit;
		overflow-y: hidden;
		display: flex;
	}
	.bg-box{
		position: relative;
		display: inline-block;
		width: 400px;
		height: 100%;
		background-size: cover;
		&.coverbg{
			background-color: #02c4fc;
		}
		img{
			position: absolute;
			top: 50%;
			margin: -150px 0 0 0;
			height: auto;
			width: 100%;
		}
	}
</style>
<script lang="babel">
	export default{
		data(){
			return {
				fileUrl: '',
				isLoading: false
			}
		},
		ready(){
			var that = this
			var url = 'http://localhost:3333/getImage'
			that.isLoading = true
			$.get(url,data => {
				that.isLoading = false
				that.fileUrl = 'static/images/'+data+'.png'
			})
			
		}
	}
</script>