<template>
	<div class="detail">
		{{{detailData.body}}}
	</div>
</template>
<style lang="less">
	.detail{
		p{
			text-align:left;
			text-indent:2em;
			padding-bottom: 10px;
			font-size: 18px;
		}
		.main-wrap{
			max-width: 650px;
			line-height: 24px;
			font-family: '黑体';
		}
		.meta{
				margin: 5px 0;
				font-size: 18px;
				font-weight: bold;
		}
		.content img{
			display: inline-block;
			margin: 0 auto;
			max-width: 500px;
			max-height: 350px;
		}
		.answer{
			hr{
				margin: 5px 0;
			}
			a:hover{
				text-decoration: underline;
			}
			ul,ol{
				padding: 0 0 0 2em;
				li {
					padding-left: 4px;
					list-style: decimal;
					font-size: 16px;
				}
			}
			article h2{
				font-size: 20px;
			}
		}
	}
	
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
					setTimeout(_ => {
						let imgList = $('img')
						let that = this
						for(let i = 1,len = imgList.length; i < len; i++){
							imgList[i].src = that.changeUrl(imgList[i].src) 
						}
						//设置图片居中...虽然恶心，但没想到更好的方法
						$('.content-image').parent().css('text-align','center')
					},0)
				}
			})
			//未确定放在哪里
			/*setTimeout(_ => {
				let imgList = $('img')
				let that = this
				for(let i = 1,len = imgList.length; i < len; i++){
					imgList[i].src = that.changeUrl(imgList[i].src) 
					console.log(imgList[i].src)
				}
			},0)*/
		},
		methods: {
			changeUrl(val){ //解决盗链问题，参考http://www.yatessss.com/2016/07/08/使用vue完成知乎日报.html
				return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		}
	}
</script>