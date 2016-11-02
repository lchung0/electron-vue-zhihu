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
		<!-- <div class="article-detail" v-if="hasLoadedDetail">
			<article-detail :detail-data="detailData"></article-detail>
		</div> -->
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
				hasLoadedDetail: false
			}
		},
		created(){
			eventHandler.$on('closedetail',data => {
				this.closeDetail()
				eventHandler.$emit('closeProgressBar',data)
			})
			eventHandler.$on('getNewsDetail',_ => {
				eventHandler.$emit('sendNewsData',this.detailData)
			})
		},
		mounted(){
			this.$nextTick(_ => {
				let newsUrl = 'http://localhost:3333/getNews'
				this.loading = true
				$.get(newsUrl,data => {
					//console.log(data)
					this.newsDate = JSON.parse(data).date
					this.newsList = JSON.parse(data).stories
					this.newsList.push({'title': '......','images':[]})
					this.imgList = JSON.parse(data).top_stories
					this.loading = false
				})
			})
		},

		watch:{
			hasLoadedDetail(val){
				if(val){
					$('.article-list').addClass('hide-box')
					setTimeout(_ => {
						$('.article-detail').removeClass('hide-box')
					},700)
				} else {
					$('.article-list').removeClass('hide-box')
					$('.article-detail').addClass('hide-box')
				}
			}
		},
		methods:{
			showDetail(id){
				console.log('showDetail')
				this.hasLoadedDetail = false
				$.ajax({
					url: 'http://localhost:3333/getNewsDetail',
					method: 'get',
					data: {'id': id},
					dataType: 'json',
					success: data => {
						let that = this
						this.detailData = data
						this.hasLoadedDetail = true
						this.$router.push('article/' + id)
					}
				})
			},
			closeDetail(){
				this.hasLoadedDetail = false
			}
		},
		components: {
			articleBox: require('../components/articleBox.vue'),
			articleDetail: require('../components/articleDetail.vue')
		}
	}
</script>