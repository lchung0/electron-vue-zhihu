<template>
	<div class="carousel">
		<template v-for="(index,item) in imgList">
			<a class="carousel-item" @click="showModal(item.id)" :href="javascript;">
				<img :src="item.image | changeUrl">
			</a>
		</template>
	</div>
</template>
<style lang="less">
	.carousel{
		height: 300px;
	}
</style>
<script lang="babel">
	
	export default{
		props:{
			imgList: {
				type: Array,
				required: true
			}
		},
		ready(){
			setTimeout(_ => {
				$('.carousel').carousel()
			},1000)
		},
		methods: {
			showModal(id){
				var getDetailUrl = 'http://localhost:3333/getNewsDetail'
				$.get(getDetailUrl,{id: id}, data => {
					this.$root.$broadcast('showModal',{data: JSON.parse(data)})
				})
			}
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