<template>
	<div class="comment-box" >
		<div class="header-box" v-show="commentData.avatar">
			<img :src="commentData.avatar">
			<span class="author">{{commentData.author}}</span>
			<span class="time">{{commentData.time}}</span>
		</div>
		<div class="content">
			{{commentData.content}}
		</div>
		<div class="bottom-box">
			<span class="likes" v-show="commentData.likes">赞同：{{commentData.likes}}</span>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.comment-box{
		margin: 10px;
		padding: 10px;
		max-width: 400px;
		border-radius: 5px;
		box-shadow: 1px 5px 10px rgba(0,0,0,0.1);
		transform: scale(.95);
		transition: all .1s;
		&:hover{
			transform: scale(1);
			box-shadow: 1px 5px 10px rgba(0,0,0,0.3);
		}
		.header-box{
			width: 100%;
			height: 30px;
			line-height: 30px;
			img{
				width: 30px;
				height: 30px;
				border-radius: 50%;
			}
			.author,.time{
				vertical-align: top;
			}
			.author{
				font-weight: bold;
				text-decoration: underline;
			}
			.time{
				color: #858585
			}
		}
		.bottom-box{
			width: 100%;
			text-align: right;
		}
	}
</style>
<script lang="babel">
	export default{
		props:{
			commentData: {
				type: Object,
				require: true,
				default(){
					return {}
				}
			}
		}
	}
</script>