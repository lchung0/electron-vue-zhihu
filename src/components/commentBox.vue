<template>
	<div class="comment-box" >
		<div class="header-box" v-show="commentData.avatar">
			<img :src="commentData.avatar">
			<span class="author">{{commentData.author}}</span>
			<span class="time">{{formatTime}}</span>
		</div>
		<div class="content">
			{{commentData.content}}
		</div>
		<div class="bottom-box">
			<span class="likes" v-show="commentData.likes >=0">
				<i class="iconfont icon-appreciate"></i> {{commentData.likes}}
			</span>
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
		.content{
			word-break: break-all;
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
		},
		computed: {
			formatTime(){
				//接口返回的时间少了几个数字，经过尝试，在后面加3个0，得到的结果比较准确
				let time = parseInt(this.commentData.time + '000',10)
				let result = new Date(time)
				return result.toLocaleString()
			}
		}
	}
</script>