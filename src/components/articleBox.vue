<template>
	<div class="article-box active" @click="isShowDetail=!isShowDetail">
		<p class="title">
			{{newsItem.title}}
		</p>
		<div :class="{'progress': isShowDetail}">
	     	<div class="indeterminate"></div>
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
			font-size: 16px;
			text-align: center;
			font-family: '微软雅黑';
			/*white-space: nowrap;*/
		    text-overflow: ellipsis;
		    overflow: hidden;
		}
		.progress{
			margin: 20px auto 0;
			width: 120px;
			height: 2px;
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
					return {}
				}
			}
		},
		data(){
			return {
				isShowDetail: false
			}
		},
		ready(){
			
		}
	}
</script>