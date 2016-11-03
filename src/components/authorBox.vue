<template>
	<div class="autor-box-container">
		<!-- <div class="img-box"></div> -->
		<div class="header-box">
			<p class="title">{{extraData.title}}</p>
			<div class="bottom">
				<span class="popularity">点赞：{{extraData.popularity}}</span>
				<span class="comment-numbers">评论数：{{extraData.short_comments}}</span>
			</div>
		</div>
		<div class="comment-box">
			<ul>
				<li v-for="(item,index) in extraData.comments">
					<comment-component :comment-data="item"></comment-component>
				</li>
			</ul>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.header-box{
		position: relative;
		margin: 20px 10px 0 0;
		padding: 10px;
		width: 100%;
		height: 200px;
		border-radius: 5px;
		box-shadow: 1px 5px 10px rgba(0,0,0,0.1);
		transform:scale(.95);
		.title{
			margin-top: 50px;
			font-size: 22px;
			font-weight: bold;
			text-align: center;
		}
		.bottom{
			position: absolute;
			bottom: 5px;
			right: 15px;
			text-align: right;
		}
	}
</style>
<script lang="babel">
	
	export default{
		props: {
			extraData:{
				type: Object,
				required: true,
				default(){
					return {}
				}
			}
		},
		mounted(){
			this.$nextTick(_ => {
				if(!this.extraData.length)
				this.extraData.comments.push({
					content: '暂无评论信息',
				})
			})
		},
		components: {
			commentComponent: require('./commentBox.vue')
		}
	}
</script>