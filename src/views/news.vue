<template>
	<ul>
		<li v-for="item in newsList">
			<div>
				<img :src="item.images" alt="">
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
				//console.log(data)
				this.newsList = JSON.parse(data).stories
				for(let p of this.newsList){
					p.images = this.changeUrl(p.images)
				}
				
			})
		},
		methods: {
			changeUrl(val){ //解决盗链问题，参考http://www.yatessss.com/2016/07/08/使用vue完成知乎日报.html
				return val[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		}
	}
</script>