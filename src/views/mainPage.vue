<template>
	<div class="container">
		<ul>
			<li v-for="(index,item) in newsList">
				<article-box :news-item="item"></article-box>
			</li>
		</ul>
	</div>
</template>
<style lang="less" scoped>
	.container{
		width: 100%;
		height: 100%;
		padding: 20px;
		ul{
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			li{
				margin: 10px 10px 0 0;
			}
		}
		
	}
</style>
<script lang="babel">
	export default{
		data(){
			return {
				newsList: [],
				imgList: [],
				loading: false
			}
		},
		ready(){
			var newsUrl = 'http://localhost:3333/getNews'
			this.loading = true
			$.get(newsUrl,data => {
				//console.log(data)
				this.newsList = JSON.parse(data).stories
				this.imgList = JSON.parse(data).top_stories
				this.loading = false
			})
		},
		components: {
			articleBox: require('../components/articleBox.vue')
		}
	}
</script>