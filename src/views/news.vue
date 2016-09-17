<template>
	<ul>
		<li v-for="item in newsList">
			<div>
				<img :src="item.images" alt="">
				{{item.images}}
				{{item.title}}				
			</div>
		</li>
	</ul>
</template>
<style lang="less" scoped>
	h1{
		color: red;
	}
</style>
<script lang="babel">
	export default{
		data(){
			return {
				newsList: []
			}
		},
		ready(){
			var newsUrl = 'http://localhost:3333/getNews'
			$.get(newsUrl,data => {
				this.newsList = JSON.parse(data).stories
			})
		}
	}
</script>