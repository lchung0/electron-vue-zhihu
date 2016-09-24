<template>
	<template v-if="loading">
		<loading-box></loading-box>
	</template>
	<div class="list-box">
		<ul>
			<li v-for="item in themeDetail" v-link="{name: 'detail',params: {detailId: item.id}}" >
				<news-box>
					<img :src="item.images | changeUrl" alt="图片" slot="image" v-if="item.images">
					<template slot="title">
						{{item.title}}
					</template>
				</news-box>
			</li>
		</ul>
	</div>
</template>
<style lang="less" scoped>
	.list-box{
		ul{
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
			},
			canReuse: transition => {
		      	return false
		    }
		},
		ready(){
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