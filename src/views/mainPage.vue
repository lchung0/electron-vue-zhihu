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
		methods:{
			setImgUrl(str){
				if(!str) {
					alert('setImgUrl str 为空')
					return ''
				}
				let re = /(src=\")\S*\"/g //匹配src字符串
				let that = this
				let newStr = str.replace(re,function(data){
					let targetStr = data.split('\"')
					return "src=\"" + that.changeUrl(targetStr[1]) + "\""
				})
				return newStr
			},
			showDetail(id){
				$.ajax({
					url: 'http://localhost:3333/getNewsDetail',
					method: 'get',
					data: {'id': id},
					dataType: 'json',
					success: data => {
						if(!data) return
						data.body = this.setImgUrl(data.body)
						for(let i = 0,len = data.extra.comments.length;i < len ;i++){
							data.extra.comments[i].avatar = this.changeUrl(data.extra.comments[i].avatar)
						}
						data.extra.image = this.changeUrl(data.extra.image)
						this.detailData = data
						this.$router.push('article/' + id)
					}
				})
			},
			changeUrl(val){ 
				//解决盗链问题，参考http://www.yatessss.com/2016/07/08/使用vue完成知乎日报.html
				return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		},
		components: {
			articleBox: require('../components/articleBox.vue'),
			articleDetail: require('../components/articleDetail.vue')
		}
	}
</script>