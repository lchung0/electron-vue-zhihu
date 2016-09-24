<template>
	<template v-if="loading">
		<loading-box></loading-box>
	</template>
	<div class="container">
		<div class="slider-box">
			<slider-box  :img-list="imgList"></slider-box>
		</div>
		<div class="list-box">
			<ul>
				<li v-for="item in newsList" v-link="{name: 'detail',params: {detailId: item.id}}">
					<news-box>
						<img :src="item.images | changeUrl" alt="图片" slot="image">
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
			cursor: pointer;
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
				imgList: [],
				loading: false
			}
		},
		components:{
			'news-box': require('../components/newsBox.vue'),
			'slider-box': require('../components/slider.vue'),
			'loading-box': require('../components/loading.vue')

		},
		ready(){
			var newsUrl = 'http://localhost:3333/getNews'
			this.loading = true
			$.get(newsUrl,data => {
				//console.log(data)
				this.newsList = JSON.parse(data).stories
				this.imgList = JSON.parse(data).top_stories
				// for(let p of this.newsList){
				// 	p.images = this.changeUrl(p.images)
				// }
				// for(let p of this.imgList){
				// 	var arr = []
				// 	arr.push(p.image)
				// 	console.log(typeof(p.image))
				// 	p.image = this.changeUrl(arr)
				// }
				this.loading = false
			})
		},
		methods: {
			// changeUrl(val){ //解决盗链问题，参考http://www.yatessss.com/2016/07/08/使用vue完成知乎日报.html
			// 	return val[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			// }
		},
		filters: {
			changeUrl(val){
				if(typeof(val)==='string')
					return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
				else 
					return val[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		}
	}
</script>