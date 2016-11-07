<template>
	<div class="main-page">
		<div class="container-box">
			<div class="article-list">
				<ul>
					<li v-for="(item,index) in newsList" @click="showDetail(item.id)">
						<article-box :news-item="item" :news-date="newsDate"></article-box>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.hide-box{
		opacity: 0 !important;
	}
	.container-box{
		position: relative;
		display: flex;
		justify: flex-start;
		flex-wrap: nowrap;
		width: 100%;
		height: 100%;
		padding: 20px;
		overflow: auto;
		.article-list{
			opacity: 1;
		}
		ul{
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			li{
				margin: 10px 10px 0 0;
			}
		}
	}
	.article-detail,
	.article-list{
		transition: all .5s;
	}
	
</style>
<script lang="babel">
	export default{
		data(){
			return {
				newsList: [],
				imgList: [],
				newsDate: '',
				detailData: {},
				loading: false,
			}
		},
		created(){
			eventHandler.$on('getNewsDetail',_ => {
				eventHandler.$emit('sendNewsData',this.detailData)
			})
			eventHandler.$on('changeMainPage',_ =>{
				this.getData()
			})
		},
		mounted(){
				this.loading = true
				this.getData()
		},
		methods:{
			getData(){
				let newsUrl = ''
				if(this.$route.fullPath.indexOf('theme') >= 0){
					newsUrl = 'http://localhost:3333/getThemeDetail'
					$.ajax({
						url: newsUrl,
						type: 'get',
						data: {
							id: this.$route.params.theme_id
						},
						success: data => {
							this.newsList = data.stories.slice(1,data.stories.length)
							this.loading = false
						}
					})
				}else{
				    newsUrl = 'http://localhost:3333/getNews'
				    $.get(newsUrl,data => {
						this.newsDate = data.date
						this.newsList = data.stories
						this.newsList.push({'title': '......','images':[]})
						this.imgList = data.top_stories
						this.loading = false
					})
				}
			},
			showDetail(id){
				$.ajax({
					url: 'http://localhost:3333/getNewsDetail',
					method: 'get',
					data: {'id': id},
					dataType: 'json',
					success: data => {
						if(!data) return
						this.detailData = data
						this.$router.push({
							path: '/article/' + id
						})
					}
				})
			}
		},
		components: {
			articleBox: require('../components/articleBox.vue'),
			articleDetail: require('../components/articleDetail.vue')
		}
	}
</script>