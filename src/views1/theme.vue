<template>
	<template v-if="loading">
		<loading-box></loading-box>
	</template>
	<div class="list-box">
		<ul>
			<router-link to="{name: 'detail',params:{detailId: item.id}}">
				<li v-for="item in themeDetail" >
					
					<news-box>
						<img :src="formatedUrl(item.images)" alt="图片" slot="image" v-if="item.images">
						<template slot="title">
							{{item.title}}
						</template>
					</news-box>
				</li>
			</router-link>
		</ul>
	</div>
</template>
<style lang="less" scoped>
	.list-box{
		ul{
			margin-left: 15%;
			list-style: none;
			li{
				width: 60%;
				cursor: pointer;
			}
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
<script lang="babel">
	export default{
		data() {
			return{
				themeId: '',
				themeDetail: [],
				loading: false
			}
		},
		components: {
			newsBox: require('../components/newsBox.vue'),
			loadingBox: require('../components/loading.vue')
		},
		route: {
			data: transition => {
				transition.next({
					themeId: transition.to.params.themeId
				})
			}
		},
		computed: {
			formatedUrl(val){
				if(typeof(val)==='string')
					return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
				else 
					return val[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		},
		mounted(){
			this.$nextTick(_ => {
				var that = this
				var themeDetailUrl = 'http://localhost:3333/getThemeDetail'
				this.loading = true
				$.ajax({
					url: themeDetailUrl,
					method: 'get',
					data: {'id': this.themeId},
					success: data => {
						this.themeDetail = JSON.parse(data).stories
						that.loading = false
					}
				})
			})
		}
	}
</script>