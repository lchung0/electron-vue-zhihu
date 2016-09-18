<template>
	<div class="container">
		<div class="slider-box">
		
		</div>
		<div class="list-box">
			<ul>
				<li v-for="item in newsList">
					<news-box>
						<img :src="item.images" alt="图片" slot="image">
						<template slot="title">
							{{item.title}}
						</template>
					</news-box>
				</li>
			</ul>
		</div>
	</div>
</template>
<style lang="less" scoped>
	ul{
		list-style: none;
		li{
			width: 100%;
		}
		img{
			width: 100%;
			height: 100%;
		}
	}

</style>
<script lang="babel">
	export default{
		data(){
			return {
				newsList: [],
				item: []
			}
		},
		components:{
			'news-box': require('../components/newsBox.vue')
		},
		ready(){
			var newsUrl = 'http://localhost:3333/getNews'
			$.get(newsUrl,data => {
				//console.log(data)
				this.newsList = JSON.parse(data).stories
				this.item = JSON.parse(data).top_stories
				for(let p of this.newsList){
					p.images = this.changeUrl(p.images)
				}
				for(let p of this.item){
					p.image = this.changeUrl(p.image)
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