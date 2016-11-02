<template>
	<div class="detail-container">
		<div class="autor-box">
			
		</div>
		<div class="content-box">
			<a class="close-btn btn-floating waves-effect waves-light red" v-on:click="closeDetail(detailData.id)">
				<i class="iconfont icon-close"></i>
			</a>
			<div v-html="detailData.body">
			</div>
		</div>
	</div>
</template>
<style lang="less">
	.detail-container{
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: auto;
		height: 100%;
		z-index: 3000;
		.autor-box{
			position: fixed;
			flex: 0 400px;
			height: 100%;
			min-width: 400px;
			background: transparent;
			border-right: 1px solid #eee;
		}
		.content-box{
			flex: 1 100%;
			position: relative;
			margin-left: 400px;
			min-width: 600px;
			/*max-width: 1000px;*/
			.close-btn{
				position: fixed;
				top: 20px;
				right: 100px;
			}
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
		data(){
			return {
				detailData: {}
			}
		},
		created(){
			eventHandler.$on('sendNewsData', detailData => {
				this.detailData = detailData				
			}) //接收事件需在发送事件前面，否则接收不了
			eventHandler.$emit('getNewsDetail')
			if(!this.detailData.body) this.getNewsDetail(this.$route.params.id)
		},
		mounted(){
			$('img').length > 1 && this.animateImg()
			$('.detail-container img').length && this.setImgUrl()
		},
		methods: {
			animateImg(){
				// 图片加载完成之后动画效果出现
				$('img').each(function(){
					$(this).hide()
					$(this).load(function(){
						console.log('finished')
						$(this).show(500)
					})
				})
			},
			setImgUrl(){
				let imgList = $('.detail-container img')
				let that = this
				imgList.each(function() {
					$(this).attr('src',that.changeUrl($(this).attr('src')))
				})
				//设置图片居中...
				$('.content-image').parent().css('text-align','center')
			},
			getNewsDetail(id){
				let re = /(src=\")\S*\"/ //匹配src字符串，准备替换
				$.ajax({
					url: 'http://localhost:3333/getNewsDetail',
					method: 'get',
					data: {'id': id},
					dataType: 'json',
					success: data => {
						this.detailData = data
						console.log(data.body)
						console.warn(data.body.match(re))
						setTimeout(_ =>{
							this.animateImg()
							this.setImgUrl()
						},50)
					}
				})
			},
			closeDetail(id){
				eventHandler.$emit('closedetail',{id: id})
			},
			changeUrl(val){ 
				//解决盗链问题，参考http://www.yatessss.com/2016/07/08/使用vue完成知乎日报.html
				return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		}
	}
</script>