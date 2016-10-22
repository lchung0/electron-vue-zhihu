<template>
	<div class="detail-container">
		<div class="autor-box">
			
		</div>
		<div class="content-box" v-html="detailData.body">
		</div>
	</div>
</template>
<style lang="less">
	.detail-container{
		position: relative;
		display: flex;
		width: auto;
		height: 100%;
		.autor-box{
			position: fixed;
			flex: 0 400px;
			height: 100%;
			min-width: 400px;
			background: transparent;
		}
		.content-box{
			flex: 1 100%;
			margin-left: 400px;
			min-width: 600px;
			h2{
				font-size: 34px;
				font-weight: bold;
				text-align: center;
			}
			p{
				text-align:left;
				text-indent: 2em;
				padding-bottom: 10px;
				font-size: 16px;
			}
			.main-wrap{
				margin: 0 auto;
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
	}
</style>
<script lang="babel">
	export default{
		props: {
			detailData: {
				type: Object,
				require: true,
				default(){
					return {}
				}
			}
		},
		mounted(){
			this.$nextTick(_ => {
				let imgList = $('.detail-container img')
				console.log(imgList)
				for(let i = 0,len = imgList.length; i < len; i++){
					imgList[i].src = this.changeUrl(imgList[i].src) 
				}
				//设置图片居中...
				$('.content-image').parent().css('text-align','center')
			})
		},
		methods: {
			changeUrl(val){ 
				//解决盗链问题，参考http://www.yatessss.com/2016/07/08/使用vue完成知乎日报.html
				return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		}
	}
</script>