<template>
	<div class="article-box active" @click="isShowDetail=!isShowDetail">
		<p class="title">
			{{newsItem.title}}
		</p>
		<div class="progress" v-show="isShowDetail">
	     	<div class="indeterminate"></div>
	  	</div>
		<div class="img-box" v-show="newsItem.images.length">
			<img :src="formatedUrl(newsItem.images)" alt="">
		</div>
		<div class="bottom-box" v-show="newsItem.title!=='......'">
			<i class="iconfont icon-time"></i><span class="date">{{newsDate | formatTime}}</span>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.article-box{
		position: relative;
		width: 250px;
		height: 290px;
		border: 1px solid #eee;
		cursor: pointer;
		&:hover&.active{
			outline: 3px solid rgb(192,226,193);
		}
		.title{
			margin: 45px auto 0;
			width: 180px;
			min-height: 72px;
			max-height: 72px;
			font-size: 16px;
			text-align: center;
			font-family: '微软雅黑';
			/*white-space: nowrap;*/
		    text-overflow: ellipsis;
		    overflow: hidden;
		}
		.progress{
			margin: 10px auto 0;
			width: 120px;
			height: 2px;
		}
		.img-box{
			position: absolute;
			top: 60%;
			left: 50%;
			margin: -35px 0 0 -35px;
			width: 70px;
			height: 70px;
			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.bottom-box{
			position: absolute;
			left: 50%;
			margin-left: -90px;
			bottom: 26px;
			width: 180px;
			text-align: center;
			color: #858585;
			.date{
				display: inline-block;
				height: 25px;
				line-height: 25px;
				vertical-align: top;
			}
			.iconfont{
				display: inline-block;
				margin-right: 2px;
				font-size: 18px;
				height: 25px;
				line-height: 25px;
			}
		}
	}
</style>
<script lang="babel">
	export default{
		props: {
			newsItem: {
				type: Object,
				require: true,
				default(){
					return {
						title: '',
						images: []
					}
				}
			},
			newsDate: {
				type: String,
				require: true,
				default: ''
			}
		},
		data(){
			return {
				isShowDetail: false
			}
		},
		methods: {
			formatedUrl: function(val){
				if(val.length <= 0) return ''
				if(typeof(val)==='string')
					return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
				else 
					return val[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		},
		filters: {
			formatTime(val){
				let year = val.slice(0,4)
				let mon = val.slice(4,6)
				let day = val.slice(6,8)
				return year + '-' + mon + '-' + day
			}
		}
	}
</script>