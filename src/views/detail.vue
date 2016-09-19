<template>
	<div class="detail">
		{{{detailData.body}}}
	</div>
</template>
<style lang="less">
	
</style>
<script lang="babel">
	export default{
		data(){
			return{
				detailId: '',
				detailData: {}
			}
		},
		route:{
			data: transition => {
				transition.next({
					detailId: transition.to.params.detailId
				})
			},
			canReuse: transition => {
		      	return false
		    }
		},
		ready(){
			var data = {'id': this.detailId}
			$.ajax({
				url: 'http://localhost:3333/getNewsDetail',
				method: 'get',
				data: data,
				dataType: 'json',
				success: data => {
					this.detailData = data
				}
			})
			setTimeout(_ => {
				let imgList = $('img')
				let that = this
				for(let i = 1,len = imgList.length; i < len; i++){
					imgList[i].src = that.changeUrl(imgList[i].src)
					console.log(imgList[i].src)
				}
			},300)
		},
		methods: {
			changeUrl(val){ //解决盗链问题，参考http://www.yatessss.com/2016/07/08/使用vue完成知乎日报.html
				return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		}
	}
</script>